import * as blessed from 'blessed';
import { InventoryObject, Inventory } from './inventory';

const WIDTH = 30;
const HEIGHT = 6;

export interface InventoryEvent {
    item: InventoryObject | undefined;
    button?: 'left' | 'right';
}

export type InventoryListener = (event: InventoryEvent) => void;

export class InventoryUI {

    private box: blessed.Widgets.BoxElement;
    private items: InventoryObject[] = [];
    private topVisibleItem = 0;
    private hoveredItem: number | undefined = undefined;
    private listeners: InventoryListener[] = [];

    constructor(private parent: blessed.Widgets.BoxElement) {
        this.box = blessed.box({
            top: 0,
            left: 'center',
            width: WIDTH + 2,
            height: HEIGHT + 2,
            content: '',
            tags: true,
            border: {
                type: 'line'
            },
        });
        this.box.on('mousemove', (data) => {
            this.hoveredItem = this.getItemIndex(data.y);
            this.render();
            this.fireInventoryEvent(this.hoveredItem !== undefined ? this.items[this.hoveredItem] : undefined, undefined);
        });
        this.box.on('mouseout', (data) => {
            this.hoveredItem = undefined;
            this.render();
            this.fireInventoryEvent(undefined, undefined);
        });
        this.box.on('click', (data) => {
            this.hoveredItem = this.getItemIndex(data.y);
            this.render();
            this.fireInventoryEvent(this.hoveredItem !== undefined ? this.items[this.hoveredItem] : undefined, data.button);
        });
        this.box.on('wheeldown', (data) => {
            if ((this.items.length - 1 - this.topVisibleItem) >= HEIGHT) {
                this.topVisibleItem++;
                this.hoveredItem = this.getItemIndex(data.y);
                this.render();
                this.fireInventoryEvent(this.hoveredItem !== undefined ? this.items[this.hoveredItem] : undefined, data.button);
            }
        });
        this.box.on('wheelup', (data) => {
            if (this.topVisibleItem > 0) {
                this.topVisibleItem--;
                this.hoveredItem = this.getItemIndex(data.y);
                this.render();
                this.fireInventoryEvent(this.hoveredItem !== undefined ? this.items[this.hoveredItem] : undefined, data.button);
            }
        });
        this.box.hide();
        parent.append(this.box);
    }

    private getItemIndex(mouseY: number): number | undefined {
        let Y = mouseY - (this.parent.top as number) - 2;
        if (Y < 0 || Y + this.topVisibleItem >= this.items.length) {
            return undefined;
        } else {
            return Y + this.topVisibleItem;
        }
    }

    public show(inventory: Inventory) {
        this.items = inventory.items;
        this.topVisibleItem = 0;
        this.hoveredItem = undefined;
        this.render();
        this.box.show();
    }

    private render() {
        let content = '';
        for (let i = 0 ; i < HEIGHT && i + this.topVisibleItem < this.items.length; i++) {
            const item = i + this.topVisibleItem;
            if (item === this.hoveredItem) {
                content = content + `{bold}${this.items[item].objectId}{/bold}\n`;
            } else {
                content = content + `${this.items[item].objectId}\n`;
            }
        }
        this.box.setContent(content);
    }

    addInventoryListener(listener: InventoryListener) {
        this.listeners.push(listener);
    }

    removeInventoryListener(listener: InventoryListener) {
        const pos = this.listeners.indexOf(listener);
        if (pos !== - 1) {
            this.listeners.splice(pos, 1);
        }
    }

    private fireInventoryEvent(item: InventoryObject | undefined, button: 'left' | 'right' | undefined) {
        const event: InventoryEvent = { item, button };
        for (const listener of this.listeners) {
            listener(event);
        }
    }

    hide() {
        this.box.hide();
    }

    isVisible() {
        return this.box.visible;
    }
}
