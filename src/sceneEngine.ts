import { Animation } from "./animations";
import { ScreenBuffer, HEIGHT, ActionBarButton } from "./screenbuffer";
import { HotspotScreenBuffer, Hotspot } from "./hotspots";
import { INVENTORY } from "./inventory";
import { PaintTask } from "./paintTask";
import { DialogEngine } from "./dialogEngine";
import { UI } from "./ui";
import { InventoryEvent } from "./inventoryUI";
import { ActionManager, InternalAction, SceneActionListener } from "./actionManager";

export class SceneEngine {

    private currentDialog: DialogEngine | undefined = undefined;
    private currentDialogOption: number | undefined = undefined;
    private buffer: ScreenBuffer;
    private hotspotBuffer = new HotspotScreenBuffer();
    private hotspots: Hotspot[];
    private staticImages: PaintTask[];
    private animations: Animation[];
    private showActionBar: boolean = false;
    private actionManager = new ActionManager();

    constructor(private ui: UI) {
        this.buffer = ui.buffer;
        this.hotspots = []
        this.staticImages = [];
        this.animations = [];
        this.ui.addInventoryListener(event => {
            this.processInventoryEvent(event);
        });

        ui.addMoveListener(e => {
            ui.setTitle(`${e.x},${e.y}`);
            this.handleMouseEvent(e.x, e.y, undefined);
        });

        ui.addClickListener(e => {
            this.handleMouseEvent(e.x, e.y, e.button);
        });

        ui.addKeyListener(['escape', 'q', 'C-c'], () => this.actionManager.quit());
        ui.addKeyListener(['space', 'enter'], () => this.actionManager.skip());
        ui.addKeyListener('m', () => this.clickedOnMapButton());
        ui.addKeyListener('i', () => this.clickedOnInventoryButton());
        this.actionManager.addInternalActionListener(action => {
            switch (action) {
                case InternalAction.CLICK_ON_INVENTORY_BUTTON: this.clickedOnInventoryButton(); break;
                case InternalAction.CLICK_ON_MAP_BUTTON: this.clickedOnMapButton(); break;
                case InternalAction.HIDE_INVENTORY: this.ui.hideInventory(); break;
                case InternalAction.HIDE_MAP: this.hideMap(); break;
            }
        });
    }

    reset() {
        this.staticImages = [];
        this.animations = [];
        this.showActionBar = false;
        this.hotspots = [];
        this.currentDialog = undefined;
        this.actionManager.reset();
    }

    tick() {
        this.buffer.clear();
        const paintTasks: PaintTask[] = [ ...this.staticImages ];

        for (const animation of this.animations) {
            const tasks = animation.tick();
            if (tasks) {
                for (const task of tasks) {
                    paintTasks.push(task);
                }
            }
        }

        paintTasks.sort((a, b) => a.zIndex - b.zIndex);
        for (const task of paintTasks) {
            this.buffer.paint(task);
        }

        if (this.currentDialog) {
            this.buffer.paintDialogOptions(this.currentDialogOption, this.currentDialog.getOptionsToChooseFrom());
        } else if (this.setShowActionBar) {
            this.paintActionBar();
        }

        this.buffer.copyHotspotScreenBuffer(this.hotspotBuffer);
    }


    hideMap() {
    }

    private paintActionBar() {
        this.buffer.paintActionBar(this.actionManager.getActionBarPaintInfo());
    }

    setCurrentDialog(currentDialog: DialogEngine) {
        this.currentDialog = currentDialog;
    }

    setHotspots(hotspots: Hotspot[]) {
        this.hotspots = hotspots;
    }

    setShowActionBar(show: boolean) {
        this.showActionBar = show;
    }

    private handleDialogMouseEvent(y: number, buttonClicked: 'left' | 'right' | undefined) {
        this.currentDialogOption = this.getDialogOption(y);
        if (buttonClicked) {
            if (this.currentDialogOption !== undefined) {
                this.currentDialog.setPlayerChoice(this.currentDialogOption);
            }
        }
    }

    private getHotspot(x: number, y: number): Hotspot | undefined {
        const hotspotId = this.hotspotBuffer.get(x, y);
        if (!hotspotId) {
            return undefined;
        }

        return this.hotspots.find(h => h.hotspotId === hotspotId);
    }

    /**
     * Invoked when we get a mouse event that is neither about
     * the inventory nor the map.
     * @param x -1 if outside the zone; a value in [0;WIDTH[ otherwise
     * @param y -1 if outside the zone; a value in [0;HEIGHT[ otherwise
     * @param buttonClicked button clicked or undefined if the event is just a mouse move
     */
    private handleMouseEvent(x: number, y: number, buttonClicked: 'left' | 'right' | undefined) {
        if (this.currentDialog) {
            this.handleDialogMouseEvent(y, buttonClicked);
            return;
        }

        this.currentDialogOption = undefined;
        const hotspot = this.getHotspot(x, y);
        const action = this.getActionBarButton(x, y);

        if (action) {
            this.actionManager.handleMouseEventActionBar(action, buttonClicked);
        } else {
            // When we click anywhere else than an action button or inside the inventory,
            // we want to hide the inventory
            if (buttonClicked) {
                this.ui.hideInventory();
            }
            this.actionManager.handleMouseEventHotspot(hotspot, x, y, buttonClicked);
        }
    }


    private getDialogOption(mouseY: number): number | undefined {
        const nOptions = this.currentDialog.getOptionsToChooseFrom().length;
        if (nOptions === 0) {
            // Do nothing
            return undefined;
        }

        if (mouseY < HEIGHT - nOptions) {
            return undefined;
        }

        const index = mouseY - (HEIGHT - nOptions);
        return index < nOptions ? index : undefined;
    }

    private getActionBarButton(x: number, y: number): ActionBarButton | undefined {
        if (!this.showActionBar || y !== HEIGHT - 1) {
            return undefined;
        }
        if (x >= 0 && x <= 3) {
            return ActionBarButton.TALK;
        } else if (x >= 5 && x <= 7) {
            return  ActionBarButton.USE;
        } else if (x >= 9 && x <= 12) {
            return ActionBarButton.GIVE;
        } else if (x >= 14 && x <= 17) {
            return ActionBarButton.TAKE;
        } else if (x >= 19 && x <= 22) {
            return ActionBarButton.LOOK;
        } else if (x >= 24 && x <= 26) {
            return ActionBarButton.MAP;
        } else if (x >= 28 && x <= 30) {
            return ActionBarButton.INVENTORY;
        } else {
            return undefined;
        }
    }

    private clickedOnMapButton() {
        this.ui.hideInventory();
    }

    private clickedOnInventoryButton() {
        if (!this.showActionBar || this.currentDialog) {
            // We don't want to use the inventory when the action bar
            // isn't visible or if there is a dialog going on
            return;
        }
        if (this.ui.isInventoryVisible()) {
            this.ui.hideInventory();
        } else {
            this.ui.showInventory(INVENTORY);
        }
    }

    addImage(task: PaintTask) {
        this.staticImages.push(task);
    }

    removeImage(task: PaintTask) {
        const pos = this.staticImages.indexOf(task);
        if (pos !== - 1) {
            this.staticImages.splice(pos, 1);
        }
    }

    addAnimation(animation: Animation) {
        this.animations.push(animation);
    }

    removeAnimation(animation: Animation) {
        const pos = this.animations.indexOf(animation);
        if (pos !== - 1) {
            this.animations.splice(pos, 1);
        }
    }

    addSceneActionListener(listener: SceneActionListener) {
        this.actionManager.addSceneActionListener(listener);
    }

    removeSceneActionListener(listener: SceneActionListener) {
        this.actionManager.removeSceneActionListener(listener);
    }

    private processInventoryEvent(event: InventoryEvent) {
        this.actionManager.handleInventoryEvent(event.item, event.button);
    }
}
