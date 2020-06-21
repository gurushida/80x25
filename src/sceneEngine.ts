import { Animation } from "./animations";
import { ScreenBuffer, HEIGHT } from "./screenbuffer";
import { Hotspot, HotspotMap, GuyPosition } from "./hotspots";
import { Action } from "./actions";
import { InventoryObject, INVENTORY } from "./inventory";
import { PaintTask } from "./paintTask";
import { DialogEngine } from "./dialogEngine";
import { UI } from "./ui";

export interface SceneEvent {
    x: number;
    y: number;
    hotspot: Hotspot;
    // Where the guy should be to interact with the hotspot
    guyPosition?: GuyPosition;
    inventoryObject: InventoryObject | undefined;
    action: Action | undefined;
}

export type SceneListener = (event: SceneEvent) => void;

export class SceneEngine {

    private currentDialog: DialogEngine | undefined = undefined;
    private currentDialogOption: number | undefined = undefined;
    private buffer: ScreenBuffer;
    private staticImages: PaintTask[];
    private animations: Animation[];
    private showActionBar: boolean = false;
    private selectedAction: Action | undefined;
    private inventoryObject: InventoryObject | undefined;

    private hotspotMap: HotspotMap | undefined = undefined;
    private sceneListeners: SceneListener[];

    private x: number;
    private y: number;
    private hotspot: Hotspot | undefined;

    constructor(private ui: UI) {
        this.buffer = ui.buffer;
        this.staticImages = [];
        this.animations = [];
        this.sceneListeners = [];
    }

    reset() {
        this.staticImages = [];
        this.animations = [];
        this.showActionBar = false;
        this.selectedAction = undefined;
        this.inventoryObject = undefined;
        this.hotspotMap = undefined;
        this.sceneListeners = [];
        this.currentDialog = undefined;
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
    }


    showInventory(items: InventoryObject[]) {
        this.ui.showInventory(items);
    }


    hideInventory() {
        this.ui.hideInventory();
    }


    private paintActionBar() {
        // When painting the action bar, we only take the hotspot, if any,
        // into account if it is not located on the same line as the action
        // bar itself
        const hotspotInfo = (this.hotspotMap && this.hotspot && this.y != (HEIGHT - 1))
          ? this.hotspotMap.get(this.hotspot)
          : undefined;

        if (hotspotInfo && hotspotInfo.isMovementHotspot) {
            this.buffer.paintActionBar(undefined, hotspotInfo.description, undefined, undefined);
        } else {
            this.buffer.paintActionBar(this.selectedAction, hotspotInfo && hotspotInfo.description,
                hotspotInfo && hotspotInfo.rightClickAction, this.inventoryObject);
        }
    }

    setCurrentDialog(currentDialog: DialogEngine) {
        this.currentDialog = currentDialog;
    }

    setHotspotMap(map: HotspotMap | undefined) {
        this.hotspotMap = map;
    }

    setShowActionBar(show: boolean) {
        this.showActionBar = show;
    }

    setSelectedAction(action: Action | undefined) {
        this.selectedAction = action;
        this.setInventoryObject(undefined);
    }

    setInventoryObject(obj: InventoryObject | undefined) {
        this.inventoryObject = obj;
    }

    setCurrentHotspot(x: number, y: number, buttonClicked: 'left' | 'right' | undefined, hotspot: Hotspot | undefined) {
        if (this.currentDialog) {
            this.currentDialogOption = this.getDialogOption(y);
            if (buttonClicked) {
                if (this.currentDialogOption !== undefined) {
                    this.currentDialog.setPlayerChoice(this.currentDialogOption);
                }
            }
            return;
        }

        this.currentDialogOption = undefined;
        this.x = x;
        this.y = y;
        this.hotspot = hotspot;
        const info = this.hotspot && this.hotspotMap.get(this.hotspot);
        if (buttonClicked && info && info.isMovementHotspot) {
            this.fireSceneAction(Action.CHANGE_SCREEN);
            return;
        }

        if (buttonClicked === 'left') {
            this.processLeftClick();
        } else if (buttonClicked === 'right') {
            this.processRightClick();
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


    private processLeftClick() {
        if (this.showActionBar && this.y === HEIGHT - 1) {
            this.processActionBarClick();
            return;
        }

        if (this.ui.isInventoryVisible()) {
            this.ui.hideInventory();
            return;
        }

        if (!this.hotspot || !this.selectedAction) {
            // By default, we want to walk to the click position
            this.fireSceneAction(Action.WALK);
            return;
        }

        // If we have both a hotspot and a selected action,
        // we need to check if this is a GIVE/USE action that
        // requires an inventory object to be completed
        if (this.selectedAction === Action.GIVE || this.selectedAction === Action.USE) {
            if (this.inventoryObject) {
                this.fireSceneAction(this.selectedAction);
            }
        } else {
            this.fireSceneAction(this.selectedAction);
        }
    }

    private processRightClick() {
        if (this.showActionBar && this.y === HEIGHT - 1) {
            this.processActionBarClick();
            return;
        }

        if (this.ui.isInventoryVisible()) {
            this.ui.hideInventory();
            return;
        }

        const hotspotInfo = this.hotspotMap && this.hotspotMap.get(this.hotspot);
        if (hotspotInfo && hotspotInfo.rightClickAction) {
            this.fireSceneAction(hotspotInfo.rightClickAction);
        }
    }

    /**
     * When clicking on the action bar, we treat left and right clicks the same.
     */
    private processActionBarClick() {
        if (this.x >= 0 && this.x <= 3) {
            this.setSelectedAction(Action.TALK);
        } else if (this.x >= 5 && this.x <= 7) {
            this.setSelectedAction(Action.USE);
        } else if (this.x >= 9 && this.x <= 12) {
            this.setSelectedAction(Action.GIVE);
        } else if (this.x >= 14 && this.x <= 17) {
            this.setSelectedAction(Action.TAKE);
        } else if (this.x >= 19 && this.x <= 22) {
            this.setSelectedAction(Action.LOOK);
        } else if (this.x >= 24 && this.x <= 26) {
            this.clickedOnMapButton();
        } else if (this.x >= 28 && this.x <= 30) {
            this.clickedOnInventoryButton();
        } else {
            this.ui.hideInventory();
            this.setSelectedAction(undefined);
        }
    }

    public clickedOnMapButton() {
        this.ui.hideInventory();
        this.fireSceneAction(Action.SHOW_MAP);
    }

    public clickedOnInventoryButton() {
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

    addSceneListener(listener: SceneListener) {
        this.sceneListeners.push(listener);
    }

    removeSceneListener(listener: SceneListener) {
        const pos = this.sceneListeners.indexOf(listener);
        if (pos !== - 1) {
            this.sceneListeners.splice(pos, 1);
        }
    }

    fireSceneAction(action: Action) {
        if (action === Action.SHOW_MAP && !this.showActionBar) {
            // Map only make sense when the action bar is visible
            return;
        }

        const info = this.hotspot && this.hotspotMap.get(this.hotspot);
        const event: SceneEvent = {
            action,
            x: this.x,
            y: this.y,
            hotspot: this.hotspot,
            guyPosition: info && info.guyPositionForAction,
            inventoryObject: this.inventoryObject,
        }
        for (const listener of this.sceneListeners) {
            listener(event);
        }
    }

}
