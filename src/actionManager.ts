import { ActionBarButton, isActionBarButton } from "./screenBuffer";
import { Hotspot, isHotspot, GuyPositionForAction } from "./hotspots";
import { InventoryObject, isInventoryObject } from "./inventory";
import { SceneId } from "./scene";

export enum InternalAction {
    CLICK_ON_INVENTORY_BUTTON,
    HIDE_INVENTORY,
    CLICK_ON_MAP_BUTTON,
    HIDE_MAP,
}

export type InternalActionListener = (action: InternalAction) => void;

export interface SceneActionListener {
    walk(x: number, y: number): void;
    give(what: InventoryObject, to: Hotspot): void;
    use(what: InventoryObject | Hotspot): void;
    useObjectOn(what: InventoryObject, on: InventoryObject | Hotspot): void;
    talk(who: InventoryObject | Hotspot): void;
    take(what: InventoryObject | Hotspot): void;
    look(what: InventoryObject | Hotspot, xClick: number | undefined): void;

    changeScene(sceneId: SceneId, pos: GuyPositionForAction | undefined): void;
    quit(): void;
    skip(): void;
}

export class ActionManager {

    // The action the player has clicked on
    private selectedAction?: ActionBarButton;

    // The first thing the player has clicked on
    private first?: InventoryObject;

    // The thing currently hovered by the mouse
    private hovered: ActionBarButton | Hotspot | InventoryObject | undefined;

    private internalActionListeners: InternalActionListener[] = [];
    private sceneActionListeners: SceneActionListener[] = [];

    reset() {
        this.selectedAction = undefined;
        this.first = undefined;
        this.hovered = undefined;
    }

    setSelectedAction(action: ActionBarButton | undefined) {
        this.selectedAction = action;
        this.first = undefined;
    }

    handleMouseEventActionBar(action: ActionBarButton, button: 'left' | 'right' | undefined) {
        this.hovered = action;
        if (button) {
            if (action === ActionBarButton.INVENTORY) {
                this.fireInternalAction(InternalAction.CLICK_ON_INVENTORY_BUTTON);
            } else if (action === ActionBarButton.MAP) {
                this.fireInternalAction(InternalAction.CLICK_ON_MAP_BUTTON);
            } else {
                this.setSelectedAction(action);
            }
        }
    }

    handleInventoryEvent(item: InventoryObject, button: 'left' | 'right' | undefined) {
        this.hovered = item;
        if (button === 'right') {
            this.fireLookAction(item, undefined);
        } else if (button === 'left' && this.selectedAction) {
            if (this.selectedAction === ActionBarButton.TALK) {
                this.fireTalkAction(item);
            } else if (this.selectedAction === ActionBarButton.TAKE) {
                this.fireTakeAction(item);
            } else if (this.selectedAction === ActionBarButton.LOOK) {
                this.fireLookAction(item, undefined);
            } else if (this.selectedAction === ActionBarButton.GIVE) {
                this.first = item;
            } else if (this.selectedAction === ActionBarButton.USE) {
                if (this.first) {
                    this.fireUseObjectOnAction(this.first, item);
                } else if (this.canUseDirectly(item)) {
                    this.fireUseAction(item);
                } else {
                    this.first = item;
                }
            }
        }
    }

    handleMouseEventHotspot(hotspot: Hotspot | undefined, x: number, y: number,
                            buttonClicked: 'left' | 'right' | undefined) {
        this.hovered = hotspot;
        if (hotspot !== undefined && hotspot.movementHotspot) {
            if (buttonClicked) {
                this.fireChangeSceneAction(hotspot.movementHotspot, hotspot.guyPositionForAction);
            } else {
                this.hovered = hotspot;
            }
            return;
        }

        if (buttonClicked === 'left') {
            this.processLeftClick(hotspot, x, y);
        } else if (buttonClicked === 'right') {
            if (hotspot && hotspot.rightClickAction) {
                switch (hotspot.rightClickAction) {
                    case ActionBarButton.LOOK: this.fireLookAction(hotspot, x); break;
                    case ActionBarButton.TALK: this.fireTalkAction(hotspot); break;
                    case ActionBarButton.USE: this.fireUseAction(hotspot); break;
                }
            }
        }
    }

    private processLeftClick(hotspot: Hotspot | undefined, x: number, y: number) {
        if (!hotspot || !this.selectedAction) {
            // By default, we want to walk to the click position
            this.fireWalkAction(x, y);
            return;
        }

        // If we have both a hotspot and a selected action,
        // we need to check if this is a GIVE/USE action that
        // requires an inventory object to be completed
        if (this.selectedAction === ActionBarButton.GIVE) {
            if (isInventoryObject(this.first)) {
                this.fireGiveAction(this.first, hotspot);
            }
        } else if (this.selectedAction === ActionBarButton.USE) {
            if (isInventoryObject(this.first)) {
                this.fireUseObjectOnAction(this.first, hotspot);
            } else if (this.canUseDirectly(hotspot)) {
                this.fireUseAction(hotspot);
            }
        } else if (this.selectedAction === ActionBarButton.TALK) {
            this.fireTalkAction(hotspot);
        } else if (this.selectedAction === ActionBarButton.TAKE) {
            this.fireTakeAction(hotspot);
        } else if (this.selectedAction === ActionBarButton.LOOK) {
            this.fireLookAction(hotspot, x);
        }

    }

    addInternalActionListener(listener: InternalActionListener) {
        this.internalActionListeners.push(listener);
    }

    removeInternalActionListener(listener: InternalActionListener) {
        const pos = this.internalActionListeners.indexOf(listener);
        if (pos !== - 1) {
            this.internalActionListeners.splice(pos, 1);
        }
    }

    private fireInternalAction(action: InternalAction) {
        for (const listener of this.internalActionListeners) {
            listener(action);
        }
    }

    addSceneActionListener(listener: SceneActionListener) {
        this.sceneActionListeners.push(listener);
    }

    removeSceneActionListener(listener: SceneActionListener) {
        const pos = this.sceneActionListeners.indexOf(listener);
        if (pos !== - 1) {
            this.sceneActionListeners.splice(pos, 1);
        }
    }

    private fireWalkAction(x: number, y: number) {
        this.setSelectedAction(undefined);
        for (const listener of this.sceneActionListeners) {
            listener.walk(x, y);
        }
    }

    private fireGiveAction(obj: InventoryObject, to: Hotspot) {
        this.setSelectedAction(undefined);
        for (const listener of this.sceneActionListeners) {
            listener.give(obj, to);
        }
    }

    /**
     * The most common use case is to use an object on
     * something else. This function returns true for
     * things that can be used directly like a light switch.
     */
    private canUseDirectly(obj: InventoryObject | Hotspot) {
        if (isHotspot(obj)) {
            return true;
        }
        return false;
    }

    private fireUseAction(obj: InventoryObject | Hotspot) {
        this.setSelectedAction(undefined);
        for (const listener of this.sceneActionListeners) {
            listener.use(obj);
        }
    }

    private fireUseObjectOnAction(obj: InventoryObject, on: InventoryObject | Hotspot) {
        this.setSelectedAction(undefined);
        for (const listener of this.sceneActionListeners) {
            listener.useObjectOn(obj, on);
        }
    }

    private fireTalkAction(who: InventoryObject | Hotspot) {
        this.setSelectedAction(undefined);
        for (const listener of this.sceneActionListeners) {
            listener.talk(who);
        }
    }

    private fireTakeAction(what: InventoryObject | Hotspot) {
        this.setSelectedAction(undefined);
        for (const listener of this.sceneActionListeners) {
            listener.take(what);
        }
    }

    private fireLookAction(what: InventoryObject | Hotspot, xClick: number | undefined) {
        this.setSelectedAction(undefined);
        for (const listener of this.sceneActionListeners) {
            listener.look(what, xClick);
        }
    }

    private fireChangeSceneAction(sceneId: SceneId, position: GuyPositionForAction | undefined) {
        this.setSelectedAction(undefined);
        for (const listener of this.sceneActionListeners) {
            listener.changeScene(sceneId, position);
        }
    }

    quit() {
        for (const listener of this.sceneActionListeners) {
            listener.quit();
        }
    }

    skip() {
        for (const listener of this.sceneActionListeners) {
            listener.skip();
        }
    }

    private getActionButtonToHighlight(): ActionBarButton | undefined {
        if (this.hovered === undefined) {
            return undefined;
        }
        if (isInventoryObject(this.hovered)) {
            return ActionBarButton.LOOK;
        }
        if (isHotspot(this.hovered)) {
            return this.hovered.rightClickAction;
        }
        return this.hovered;
    }

    public getActionBarPaintInfo(): ActionBarPaintInfo {

        if (isHotspot(this.hovered) && this.hovered.movementHotspot) {
            // If we have a hotspot like a door, its description
            // is something like 'Enter shop' that must be used as is
            return {
                text: this.hovered.description,
                actionToHighlight: this.getActionButtonToHighlight(),
            };
        }
        const first = this.first ? this.first : undefined;
        const hoveredObject: InventoryObject | Hotspot | undefined =
          !isActionBarButton(this.hovered) ? this.hovered : undefined;
        const hoveredDescription = hoveredObject == undefined
            ? ''
            : (isHotspot(hoveredObject) ? hoveredObject.description : hoveredObject.objectId);

        if (!this.selectedAction) {
            return {
                text: hoveredDescription,
                actionToHighlight: this.getActionButtonToHighlight(),
            };
        }

        let text: string = '';
        if (this.selectedAction === ActionBarButton.GIVE) {
            // We can give an object from the inventory
            if (first) {
                text = `Give ${first.objectId} to ${hoveredDescription}`;
            } else if (isInventoryObject(hoveredObject)) {
                text = `Give ${hoveredDescription}`;
            } else {
                text = 'Give';
            }
        } else if (this.selectedAction === ActionBarButton.USE) {
            if (first) {
                if (this.canUseDirectly(first)) {
                    text = `Use ${first.objectId}`;
                } else {
                    text = `Use ${first.objectId} with ${hoveredDescription}`;
                }
            } else {
                text = `Use ${hoveredDescription}`;
            }
        } else {
            let verb: string;
            if (this.selectedAction === ActionBarButton.TALK) {
                verb = 'Talk to';
            } else if (this.selectedAction === ActionBarButton.LOOK) {
                verb = 'Look at';
            } else if (this.selectedAction === ActionBarButton.TAKE) {
                verb = 'Take';
            } else {
                throw new Error(`Unexpected action ${this.selectedAction}`);
            }

            if (first) {
                text = `${verb} ${first.objectId}`;
            } else {
                text = `${verb} ${hoveredDescription}`;
            }
        }

        return {
            text: text.trim(),
            actionToHighlight: this.getActionButtonToHighlight(),
        }
    }
}


export interface ActionBarPaintInfo {
    actionToHighlight?: ActionBarButton;
    text: string;
}

