import { ActionBarButton } from "./screenbuffer";
import { Hotspot, GuyPosition, isHotspot } from "./hotspots";
import { InventoryObject, isInventoryObject } from "./inventory";
import { Action } from "./actions";
import { SceneId } from "./scene";

export enum InternalAction {
    CLICK_ON_INVENTORY_BUTTON,
    HIDE_INVENTORY,
    CLICK_ON_MAP_BUTTON,
    HIDE_MAP,
}

export type InternalActionListener = (action: InternalAction) => void;

export interface SceneActionListener {
    walk(x: number, y: number);
    give(what: InventoryObject, to: Hotspot);
    use(what: InventoryObject | Hotspot);
    useObjectOn(what: InventoryObject, on: InventoryObject | Hotspot);
    talk(who: InventoryObject | Hotspot);
    take(what: InventoryObject | Hotspot);
    look(what: InventoryObject | Hotspot);

    changeScene(sceneId: SceneId, pos: GuyPosition | undefined);
    quit();
    skip();
}

export class ActionManager {

    // The action the player has clicked on
    private selectedAction?: ActionBarButton;

    private buttonToHighlight: ActionBarButton | undefined;

    // The first thing the player has clicked on
    private first?: InventoryObject;

    // The thing currently hovered by the mouse
    private hovered: Hotspot | InventoryObject | undefined;

    private internalActionListeners: InternalActionListener[] = [];
    private sceneActionListeners: SceneActionListener[] = [];

    reset() {
        this.sceneActionListeners = [];
        this.selectedAction = undefined;
        this.buttonToHighlight = undefined;
        this.first = undefined;
        this.hovered = undefined;
    }

    setSelectedAction(action: ActionBarButton | undefined) {
        this.selectedAction = action;
        this.buttonToHighlight = undefined;
        this.first = undefined;
    }

    handleMouseEventActionBar(action: ActionBarButton, button: 'left' | 'right' | undefined) {
        if (button) {
            if (action === ActionBarButton.INVENTORY) {
                this.fireInternalAction(InternalAction.CLICK_ON_INVENTORY_BUTTON);
            } else if (action === ActionBarButton.MAP) {
                this.fireInternalAction(InternalAction.CLICK_ON_MAP_BUTTON);
            } else {
                this.setSelectedAction(action);
            }
        } else {
            this.buttonToHighlight = action;
            this.hovered = undefined;
        }
    }

    handleInventoryEvent(item: InventoryObject | undefined, button: 'left' | 'right' | undefined) {
        if (!item) {
            return;
        }

        this.buttonToHighlight = ActionBarButton.LOOK;
        this.hovered = item;
        if (button === 'right') {
            this.fireLookAction(item);
        } else if (button === 'left' && this.selectedAction) {
            if (this.selectedAction === ActionBarButton.TALK) {
                this.fireTalkAction(item);
            } else if (this.selectedAction === ActionBarButton.TAKE) {
                this.fireTakeAction(item);
            } else if (this.selectedAction === ActionBarButton.LOOK) {
                this.fireLookAction(item);
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
        if (hotspot && hotspot.movementHotspot) {
            if (buttonClicked) {
                this.fireChangeSceneAction(hotspot.movementHotspot, hotspot.guyPositionForAction);
            } else {
                this.hovered = hotspot;
            }
            return;
        }

        if (buttonClicked === 'left') {
            this.hovered = undefined;
            this.processLeftClick(hotspot, x, y);
        } else if (buttonClicked === 'right') {
            this.hovered = undefined;
            if (hotspot && hotspot.rightClickAction) {
                switch (hotspot.rightClickAction) {
                    case Action.LOOK: this.fireLookAction(hotspot); break;
                    case Action.TALK: this.fireTalkAction(hotspot); break;
                    case Action.USE: this.fireUseAction(hotspot); break;
                }
            }
        } else {
            // Just hovering
            this.hovered = hotspot;
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
            this.fireLookAction(hotspot);
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

    private fireLookAction(what: InventoryObject | Hotspot) {
        this.setSelectedAction(undefined);
        for (const listener of this.sceneActionListeners) {
            listener.look(what);
        }
    }

    private fireChangeSceneAction(sceneId: SceneId, position: GuyPosition | undefined) {
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

    public getActionBarPaintInfo(): ActionBarPaintInfo {
        if (isHotspot(this.hovered) && this.hovered.movementHotspot) {
            // If we have a hotspot like a door, its description
            // is something like 'Enter shop' that must be used as is
            return {
                text: this.hovered.description,
                actionToHighlight: this.buttonToHighlight,
            };
        }
        const first = this.first ? this.first : undefined;
        const hovered = isHotspot(this.hovered) ? this.hovered.description : (this.hovered || '');

        if (!this.selectedAction) {
            return {
                text: hovered,
                actionToHighlight: this.buttonToHighlight,
            };
        }

        let text: string = '';
        if (this.selectedAction === ActionBarButton.GIVE) {
            // We can give an object from the inventory
            if (first) {
                text = `Give ${first} to ${hovered}`;
            } else if (hovered && isInventoryObject(hovered)) {
                text = `Give ${hovered}`;
            } else {
                text = 'Give';
            }
        } else if (this.selectedAction === ActionBarButton.USE) {
            if (first) {
                if (this.canUseDirectly(first)) {
                    text = `Use ${first}`;
                } else {
                    text = `Use ${first} with ${hovered}`;
                }
            } else if (hovered) {
                text = `Use ${hovered}`;
            } else {
                text = 'Use';
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
                text = `${verb} ${first}`;
            } else if (hovered) {
                text = `${verb} ${hovered}`;
            } else {
                text = `${verb}`;
            }
        }

        return {
            text: text.trim(),
            actionToHighlight: this.buttonToHighlight,
        }
    }
}


export interface ActionBarPaintInfo {
    actionToHighlight?: ActionBarButton;
    text: string;
}

