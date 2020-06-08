import { OPAQUE } from "./imagesUtils";
import { PaintTask } from "./animationsUtils";
import { HotspotScreenBuffer } from "./hotspots";

export const WIDTH = 80;
export const HEIGHT = 25;

export class ScreenBuffer {

    buffer: string[][];
    hotspotBuffer: HotspotScreenBuffer;

    constructor() {
        this.hotspotBuffer = new HotspotScreenBuffer();
        this.buffer = [];
        this.clear();
    }

    clear() {
        this.buffer = [];
        this.hotspotBuffer.clear();

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
                const hotspot = task.hotspotFilter && task.hotspotFilter(i, j);

                if (hotspot) {
                    this.hotspotBuffer.set(xPos, yPos, hotspot);
                }
            }
        }
    }
}