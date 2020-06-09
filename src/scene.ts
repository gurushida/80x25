import { Animation, PaintTask } from "./animationsUtils";
import { ScreenBuffer, HEIGHT } from "./screenbuffer";
import { AsciiImage } from "./imagesUtils";
import { HotspotFilter, HotspotInfo, Hotspots } from "./hotspots";
import { Action } from "./actions";
import { InventoryObject } from "./inventory";
import { UI } from "./ui";

export interface PaintTaskZ {
    task: PaintTask;
    zIndex: number;
}

export interface AnimationZ {
    animation: Animation;
    zIndex: number;
}

export class Scene {

    buffer: ScreenBuffer;
    staticImages: PaintTaskZ[];
    animations: AnimationZ[];
    showActionBar: boolean = false;
    selectedAction: Action | undefined;
    inventoryObject: InventoryObject | undefined;

    hotspotMap: Map<Hotspots, HotspotInfo> = new Map();

    x: number;
    y: number;
    hotspot: Hotspots | undefined;

    constructor(buffer: ScreenBuffer, private ui: UI) {
        this.buffer = buffer;
        this.staticImages = [];
        this.animations = [];
    }

    tick() {
        this.buffer.clear();
        this.staticImages.sort((a, b) => a.zIndex - b.zIndex);
        this.animations.sort((a, b) => a.zIndex - b.zIndex);
        for (const task of this.staticImages) {
            this.buffer.paint(task.task);
        }

        for (const animation of this.animations) {
            const task = animation.animation.tick();
            if (task) {
                this.buffer.paint(task);
            }
        }

        if (this.setShowActionBar) {
            this.paintActionBar();
        }
    }

    private paintActionBar() {
        // When painting the action bar, we only take the hotspot, if any,
        // into account if it is not located on the same line as the action
        // bar itself
        const hotspotInfo = (this.hotspot && this.y != (HEIGHT - 1))
          ? this.hotspotMap.get(this.hotspot)
          : undefined;

        this.buffer.paintActionBar(this.selectedAction, hotspotInfo && hotspotInfo.description,
                                     hotspotInfo && hotspotInfo.rightClickAction, this.inventoryObject);
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

    setCurrentHotspot(x: number, y: number, buttonClicked: 'left' | 'right' | undefined, hotspot: Hotspots | undefined) {
        this.x = x;
        this.y = y;
        this.hotspot = hotspot;
        if (buttonClicked === 'left') {
            this.ui.debug('left click ');
            this.processLeftClick();
        } else if (buttonClicked === 'right') {
            this.ui.debug('right click ');
            this.processRightClick();
        }
    }

    private processLeftClick() {
        if (this.showActionBar && this.y === HEIGHT - 1) {
            this.processActionBarClick();
            return;
        }
    }

    private processRightClick() {
        if (this.showActionBar && this.y === HEIGHT - 1) {
            this.processActionBarClick();
            return;
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
            this.showMap();
        } else if (this.x >= 28 && this.x <= 30) {
            this.showInventory();
        } else {
            this.setSelectedAction(undefined);
        }
    }

    public showMap() {
    }

    public showInventory() {
        this.setInventoryObject(InventoryObject.COIN);
    }

    addImage(task: PaintTaskZ) {
        this.staticImages.push(task);
    }

    removeImage(task: PaintTaskZ) {
        const pos = this.staticImages.indexOf(task);
        if (pos !== - 1) {
            this.staticImages.splice(pos, 1);
        }
    }

    addAnimation(animation: AnimationZ) {
        this.animations.push(animation);
    }

    removeAnimation(animation: AnimationZ) {
        const pos = this.animations.indexOf(animation);
        if (pos !== - 1) {
            this.animations.splice(pos, 1);
        }
    }
}


export function getPaintTaskZ(image: AsciiImage, left: number, top: number, zIndex: number,
                              hotspotFilter: HotspotFilter | undefined): PaintTaskZ {
    return {
        zIndex,
        task: {
            left, top, image, hotspotFilter
        }
    };
}