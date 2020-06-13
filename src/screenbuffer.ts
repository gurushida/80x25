import { OPAQUE } from "./imagesUtils";
import { PaintTask } from "./animation/animationsUtils";
import { HotspotScreenBuffer, Hotspots } from "./hotspots";
import { Action } from "./actions";
import { InventoryObject } from "./inventory";

export const WIDTH = 80;
export const HEIGHT = 25;

export class ScreenBuffer {

    buffer: string[][];
    hotspotBuffer: HotspotScreenBuffer;
    actionBar: string | undefined;

    constructor() {
        this.hotspotBuffer = new HotspotScreenBuffer();
        this.buffer = [];
        this.clear();
    }

    clear() {
        this.buffer = [];
        this.hotspotBuffer.clear();
        this.actionBar = undefined;

        for (let top = 0 ; top < HEIGHT; top++) {
            this.buffer[top] = [];
            this.hotspotBuffer[top] = [];
            for (let left = 0 ; left < WIDTH; left++) {
                this.set(' ', left, top);
            }
        }
    }

    private set(ch: string, left: number, top: number) {
        this.buffer[top][left] = ch;
    }

    getContent(dst: HotspotScreenBuffer) {
        dst.copyFrom(this.hotspotBuffer);
        const lines = this.buffer.map(row => row.join(''));
        if (this.actionBar) {
            lines[HEIGHT - 1] = this.actionBar;
        }
        return lines.join('\n');
    }

    paint(task: PaintTask) {
        for (let i = 0 ; i < task.image.width ; i++) {
            const xPos = task.left + i;
            if (xPos < 0 || xPos >= WIDTH) {
                continue;
            }
            for (let j = 0 ; j < task.image.height ; j++) {
                const yPos = task.top + j;
                if (yPos < 0 || yPos >= HEIGHT) {
                    continue;
                }

                if (task.image.mask[j][i] === OPAQUE) {
                    this.set(task.image.rows[j][i], xPos, yPos);
                }
                const hotspot = task.hotspotFilter ? task.hotspotFilter(i, j) : Hotspots.NONE;

                if (hotspot !== Hotspots.NONE) {
                    this.hotspotBuffer.set(xPos, yPos, hotspot);
                }
            }
        }
    }

    paintActionBar(selectedAction: Action | undefined, description: string | undefined,
                   rightClickAction: Action | undefined, inventoryObject: InventoryObject | undefined) {
        if (!rightClickAction) {
            this.actionBar = 'Talk Use Give Take Look map ...';
        } else {
            switch(rightClickAction) {
                case Action.TALK: this.actionBar = '{bold}Talk{/bold} Use Give Take Look map ...'; break;
                case Action.USE: this.actionBar = 'Talk {bold}Use{/bold} Give Take Look map ...'; break;
                case Action.GIVE: this.actionBar = 'Talk Use {bold}Give{/bold} Take Look map ...'; break;
                case Action.TAKE: this.actionBar = 'Talk Use Give {bold}Take{/bold} Look map ...'; break;
                case Action.LOOK: this.actionBar = 'Talk Use Give Take {bold}Look{/bold} map ...'; break;
            }
        }

        let text: string;
        if (selectedAction) {
            text = selectedAction;
            if (selectedAction === Action.GIVE) {
                // We can object an object from the inventory
                if (inventoryObject) {
                    text = text + ' ' + inventoryObject + ' to';
                    if (description) {
                        text = text + ' ' + description;
                    }
                }
            } else {
                if (selectedAction === Action.USE && inventoryObject) {
                    text = text + ' ' + inventoryObject + ' with';
                }
                if (description) {
                    text = text + ' ' + description;
                }
            }
        } else if (description) {
            text = description;
        } else {
            text = '';
        }

        const padding = WIDTH - 'Talk Use Give Take Look map ...'.length - text.length;
        if (padding % 2 === 0) {
            this.actionBar = this.actionBar + ' '.repeat(padding / 2) + text + ' '.repeat(padding / 2);
        } else {
            this.actionBar = this.actionBar + ' '.repeat(padding / 2) + text + ' '.repeat((padding / 2) + 1);
        }
    }

}