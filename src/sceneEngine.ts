import { Animation, ICanTalkAnimation, isCanTalkAnimation } from "./animations";
import { ScreenBuffer, HEIGHT, ActionBarButton, WIDTH } from "./screenBuffer";
import { Hotspot, GuyPosition, isHotspot, HotspotId } from "./hotspots";
import { Inventory, InventoryObject, isInventoryObject } from "./inventory";
import { PaintTask } from "./paintTask";
import { DialogEngine } from "./dialogEngine";
import { UI } from "./ui";
import { InventoryEvent } from "./inventoryUI";
import { ActionManager, InternalAction, SceneActionListener } from "./actionManager";
import { SceneId, SceneLoader, SceneData } from "./scene";
import { Triggers } from "./triggers";
import { GuyAnimation } from "./resources/animations/guy";
import { Runnable } from "./runnable";
import { Cue, Dialog } from "./dialog";
import { TalkingCharacter } from "./characters";
import { OUTSIDE_ICE_CREAM_SHOP_LOADER } from "./resources/scenes/iceCreamShopOutside";
import { Matrix } from "./matrix";
import { debug } from "./main";
import { OUTSIDE_BANK_LOADER } from "./resources/scenes/bank";
import { INSIDE_ICE_CREAM_SHOP_LOADER } from "./resources/scenes/iceCreamShopInside";
import { DOCK_LOADER } from "./resources/scenes/dock";
import { invariant } from "./utils";
import { ARCADE_LOADER } from "./resources/scenes/arcade";
import { OUTSIDE_PUB_LOADER } from "./resources/scenes/pub_outside";
import { INSIDE_PUB_LOADER } from "./resources/scenes/pub_inside";

export class SceneEngine implements SceneActionListener {

    private currentDialog: DialogEngine | undefined = undefined;
    private currentDialogOption: number | undefined = undefined;
    private buffer: ScreenBuffer;
    private hotspotBuffer = new Matrix<HotspotId>(WIDTH, HEIGHT);
    private hotspots: Hotspot[];
    private staticImages: PaintTask[];
    private animations: Animation[];
    private showActionBar: boolean = false;
    private actionManager = new ActionManager();
    private guyAnimation: GuyAnimation | undefined;
    private guyPosition: GuyPosition | undefined;

    constructor(private ui: UI, private triggers: Triggers, private inventory: Inventory) {
        this.buffer = ui.buffer;
        this.hotspots = []
        this.staticImages = [];
        this.animations = [];
        this.ui.addInventoryListener(event => {
            this.processInventoryEvent(event);
        });
        this.ui.addMapListener(sceneId => this.loadScene(sceneId));

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
                case InternalAction.HIDE_INVENTORY: this.hideInventory(); break;
                case InternalAction.HIDE_MAP: this.hideMap(); break;
            }
        });
        this.actionManager.addSceneActionListener(this);
    }

    private reset() {
        this.staticImages = [];
        this.animations = [];
        this.showActionBar = false;
        this.hotspots = [];
        this.currentDialog = undefined;
        this.actionManager.reset();
        this.hideMap();
        this.hideInventory();
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
        } else if (this.showActionBar) {
            this.paintActionBar();
        }

        this.buffer.copyHotspotScreenBuffer(this.hotspotBuffer);
    }

    private hideInventory() {
        this.ui.hideInventory();
    }

    private hideMap() {
        this.ui.hideMap();
    }

    private paintActionBar() {
        this.buffer.paintActionBar(this.actionManager.getActionBarPaintInfo());
    }

    setCurrentDialog(currentDialog: DialogEngine | undefined) {
        this.currentDialog = currentDialog;
    }

    private handleDialogMouseEvent(y: number, buttonClicked: 'left' | 'right' | undefined) {
        invariant(this.currentDialog, 'currentDialog should be defined');
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
        invariant(this.currentDialog, 'currentDialog should be defined');
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
        if (this.ui.isMapVisible()) {
            this.hideMap();
        } else if (!this.showActionBar || this.currentDialog || this.ui.isMapVisible()) {
        } else {
            this.ui.showMap(this.triggers);
        }
    }

    private clickedOnInventoryButton() {
        if (!this.showActionBar || this.currentDialog || this.ui.isMapVisible()) {
            // We don't want to use the inventory when the action bar
            // isn't visible or if there is a dialog going on
            return;
        }
        if (this.ui.isInventoryVisible()) {
            this.ui.hideInventory();
        } else {
            this.ui.showInventory(this.inventory);
        }
    }

    private addImage(task: PaintTask) {
        this.staticImages.push(task);
    }

    /*
    private removeImage(task: PaintTask) {
        const pos = this.staticImages.indexOf(task);
        if (pos !== - 1) {
            this.staticImages.splice(pos, 1);
        }
    }*/

    private addAnimation(animation: Animation) {
        this.animations.push(animation);
    }

    /*private removeAnimation(animation: Animation) {
        const pos = this.animations.indexOf(animation);
        if (pos !== - 1) {
            this.animations.splice(pos, 1);
        }
    }*/

    private processInventoryEvent(event: InventoryEvent) {
        if (event.item) {
            this.actionManager.handleInventoryEvent(event.item, event.button);
        }
    }


    loadScene(sceneId: SceneId) {
        const sceneData = loadSceneData(sceneId, this.triggers);
        if (!sceneData) {
            debug(`No data for scene ${sceneId}`);
            return;
        }

        debug(`load scene ${sceneId}`);
        this.reset();

        debug(`Loading ${sceneData.images.length} images`);
        for (const image of sceneData.images) {
            this.addImage(image);
        }

        debug(`Loading ${sceneData.animations.length} animations`);
        for (const animation of sceneData.animations) {
            this.addAnimation(animation);
        }

        this.hotspots = sceneData.hotspots;
        debug(`Loading ${sceneData.hotspots.length} hotspots`);
        this.showActionBar = sceneData.showActionBar;

        if (sceneData.guyPosition) {
            this.guyPosition = {
                left: sceneData.guyPosition.left,
                top: sceneData.guyPosition.top,
                lookToTheRight: sceneData.guyPosition.lookToTheRight,
                minLeft: sceneData.guyPosition.minLeft,
                maxLeft: sceneData.guyPosition.maxLeft,
            }
            this.guyAnimation = new GuyAnimation(this.guyPosition)
            this.addAnimation(this.guyAnimation);
        } else {
            this.guyPosition = undefined;
            this.guyAnimation = undefined;
        }
        debug('scene loaded');
    }

    private walkTo(pos: GuyPosition | undefined, then?: Runnable) {
        if (this.guyAnimation) {
            if (pos) {
                this.guyAnimation.walkTo({ pos, then });
            } else {
                if (then) {
                    then();
                }
            }
        } else {
            if (then) {
                then();
            }
        }
    }

    walk(x: number, y: number) {
        if (!this.guyPosition) {
            return;
        }
        const moveToRight = x > this.guyPosition.left;
        const dst: GuyPosition = {
            left: x,
            top: y,
            lookToTheRight: moveToRight
        };
        this.walkTo(dst, undefined);
    }

    say(textSegments: Cue[], then?: Runnable) {
        if (this.guyAnimation) {
            this.guyAnimation.say(textSegments, then);
        }
    }

    give(what: InventoryObject, to: Hotspot) {
        this.say([[ 'I cannot do that.' ]]);
    }

    use(what: InventoryObject | Hotspot) {
        if (!isHotspot(what) || !what.useDirectly) {
            this.say([[ 'I cannot use this.' ]]);
        } else {
            this.say(what.useDirectly.comment);
        }
    }

    useObjectOn(what: InventoryObject, on: InventoryObject | Hotspot) {
        this.say([[ 'I cannot use this with that.' ]]);
    }

    private runDialog(dialog: Dialog, triggers: Triggers) {
        const characterMap = new Map<TalkingCharacter, ICanTalkAnimation>();
        for (const animation of this.animations) {
            if (isCanTalkAnimation(animation)) {
                characterMap.set(animation.getCharacter(), animation);
            }
        }
        if (this.guyAnimation) {
            characterMap.set(this.guyAnimation.getCharacter(), this.guyAnimation);
        }

        for (const ch of dialog.characters) {
            if (!characterMap.get(ch)) {
                throw new Error(`No animation for character ${ch}`);
            }
        }
        const dialogEngine = new DialogEngine(this, dialog, triggers, characterMap);
        dialogEngine.run(undefined);
    }

    talk(who: InventoryObject | Hotspot) {
        if (!isHotspot(who) || !who.dialog) {
            this.say([[ 'I cannot talk to that.' ]]);
        } else {
            const dialog = who.dialog;
            this.walkTo(who.guyPositionForAction, () => {
                this.runDialog(dialog, this.triggers);
            });
        }
    }

    take(what: InventoryObject | Hotspot) {
        if (isInventoryObject(what)) {
            this.say([[ 'I already have it.' ]]);
        } else if (!what.take) {
            this.say([[ 'I cannot take that.' ]]);
        } else if (what.take.dialog) {
            const dialog = what.take.dialog;
            this.walkTo(what.take.guyPositionForAction, () => {
                this.runDialog(dialog, this.triggers);
            });
        } else {
            this.say(what.take.comment);
        }
    }

    look(what: InventoryObject | Hotspot) {
        if (isInventoryObject(what)) {
            this.say(what.lookAt);
        } else {
            this.walkTo(what.guyPositionForAction, () => {
                this.say(what.lookAt);
            });
        }
    }

    changeScene(sceneId: SceneId, pos: GuyPosition | undefined) {
        this.walkTo(pos, () => this.loadScene(sceneId));
    }

    quit() {
        process.exit(0);
    }

    skip() {
        if (this.currentDialog) {
            this.currentDialog.skipToNextCue();
            return;
        }

        if (this.guyAnimation) {
            this.guyAnimation.skipToNextCue();
        }
    }

}


function getSceneLoader(sceneId: SceneId): SceneLoader | undefined {
    switch(sceneId) {
        case SceneId.INSIDE_ICE_CREAM_SHOP: return INSIDE_ICE_CREAM_SHOP_LOADER;
        case SceneId.OUTSIDE_ICE_CREAM_SHOP: return OUTSIDE_ICE_CREAM_SHOP_LOADER;
        case SceneId.OUTSIDE_BANK: return OUTSIDE_BANK_LOADER;
        case SceneId.DOCK: return DOCK_LOADER;
        case SceneId.ARCADE: return ARCADE_LOADER;
        case SceneId.OUTSIDE_PUB: return OUTSIDE_PUB_LOADER;
        case SceneId.INSIDE_PUB: return INSIDE_PUB_LOADER;
        default: return undefined;
    }
}


function loadSceneData(sceneId: SceneId, triggers: Triggers): SceneData | undefined {
    const loader = getSceneLoader(sceneId);
    return loader ? loader.load(triggers) : undefined;
}
