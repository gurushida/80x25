import { AsciiImage, OPAQUE } from "./imagesUtils";

export const WIDTH = 80;
export const HEIGHT = 25;

export class ScreenBuffer {

    buffer: string[][];

    constructor() {
        this.buffer = [];
        this.clear();
    }

    clear() {
        this.buffer = [];

        for (let top = 0 ; top < HEIGHT; top++) {
            this.buffer[top] = [];
            for (let left = 0 ; left < WIDTH; left++) {
                this.set(' ', left, top);
            }
        }
    }

    private set(ch: string, left: number, top: number) {
        this.buffer[top][left] = ch;
    }

    asString() {
        const lines = this.buffer.map(row => row.join(''));
        return lines.join('\n');
    }

    paint(img: AsciiImage, left: number, top: number) {
        for (let i = 0 ; i < img.width ; i++) {
            const xPos = left + i;
            if (xPos < 0 || xPos >= WIDTH) {
                continue;
            }
            for (let j = 0 ; j < img.height ; j++) {
                const yPos = top + j;
                if (yPos < 0 || yPos >= HEIGHT) {
                    continue;
                }

                if (img.mask[j][i] === OPAQUE) {
                    this.set(img.rows[j][i], xPos, yPos);
                }
            }
        }
    }
}