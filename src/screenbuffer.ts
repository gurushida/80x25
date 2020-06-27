import { OPAQUE } from "./images";
import { PaintTask } from "./paintTask";
import { HotspotScreenBuffer } from "./hotspots";
import { center } from "./utils";
import { ActionBarPaintInfo } from "./actionManager";

export const WIDTH = 80;
export const HEIGHT = 25;

const EMPTY_LINE = ' '.repeat(WIDTH);

export enum ActionBarButton {
    TALK = 'Talk',
    USE = 'Use',
    GIVE = 'Give',
    TAKE = 'Take',
    LOOK = 'Look',
    MAP = 'map',
    INVENTORY = '...',
}

export class ScreenBuffer {

    buffer: string[][];
    hotspotBuffer: HotspotScreenBuffer;
    actionBar: string | undefined;
    hoveredDialogLine: number | undefined;

    constructor() {
        this.hotspotBuffer = new HotspotScreenBuffer();
        this.buffer = [];
        this.clear();
    }

    clear() {
        this.buffer = [];
        this.hotspotBuffer.clear();
        this.actionBar = undefined;
        this.hoveredDialogLine = undefined;

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

    copyHotspotScreenBuffer(dst: HotspotScreenBuffer) {
        dst.copyFrom(this.hotspotBuffer);
    }

    getContent() {
        const lines = this.buffer.map(row => row.join(''));
        if (this.actionBar) {
            lines[HEIGHT - 1] = this.actionBar;
        }
        if (this.hoveredDialogLine !== undefined) {
            lines[this.hoveredDialogLine] = '{bold}' + lines[this.hoveredDialogLine] + '{/bold}';
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
                const hotspot = task.hotspotFilter ? task.hotspotFilter(i, j) : undefined;

                if (hotspot) {
                    this.hotspotBuffer.set(xPos, yPos, hotspot);
                }
            }
        }
    }

    paintActionBar(info: ActionBarPaintInfo) {
        if (!info.actionToHighlight) {
            this.actionBar = 'Talk Use Give Take Look map ...';
        } else {
            switch(info.actionToHighlight) {
                case ActionBarButton.TALK: this.actionBar = '{bold}Talk{/bold} Use Give Take Look map ...'; break;
                case ActionBarButton.USE: this.actionBar = 'Talk {bold}Use{/bold} Give Take Look map ...'; break;
                case ActionBarButton.GIVE: this.actionBar = 'Talk Use {bold}Give{/bold} Take Look map ...'; break;
                case ActionBarButton.TAKE: this.actionBar = 'Talk Use Give {bold}Take{/bold} Look map ...'; break;
                case ActionBarButton.LOOK: this.actionBar = 'Talk Use Give Take {bold}Look{/bold} map ...'; break;
                case ActionBarButton.MAP: this.actionBar = 'Talk Use Give Take Look {bold}map{/bold} ...'; break;
                case ActionBarButton.INVENTORY: this.actionBar = 'Talk Use Give Take Look map {bold}...{/bold}'; break;
            }
        }

        this.actionBar = this.actionBar + center(info.text, WIDTH - 'Talk Use Give Take Look map ...'.length);
    }


    private printString(left: number, top: number, str: string) {
        if (top < 0 || top >= HEIGHT) {
            return;
        }

        for (let i = 0 ; i < str.length ; i++) {
            const x = left + i;
            if (x < 0 || x >= WIDTH) {
                continue;
            }
            this.set(str.charAt(i), x, top);
        }
    }


    /**
     * If there is a dialog running, the lower lines are used to display the options.
     * If there is no option at all, the last line is left empty.
     */
    paintDialogOptions(hoveredOption: number, options: string[]) {
        for (let i = 0 ; i < options.length ; i++) {
            this.printString(0, HEIGHT - options.length + i, EMPTY_LINE);
            this.printString(0, HEIGHT - options.length + i, options[i]);
            if (i === hoveredOption) {
                this.hoveredDialogLine = HEIGHT - options.length + i;
            }
        }
    }

}
