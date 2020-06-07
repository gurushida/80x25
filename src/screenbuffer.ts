import { AsciiImage, OPAQUE } from "./images";

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

        for (let y = 0 ; y < HEIGHT; y++) {
            this.buffer[y] = [];
            for (let x = 0 ; x < WIDTH; x++) {
                this.set(' ', x, y);
            }
        }
    }

    private set(ch: string, x: number, y: number) {
        this.buffer[y][x] = ch;
    }

    asString() {
        const lines = this.buffer.map(row => row.join(''));
        return lines.join('\n');
    }

    paint(img: AsciiImage, x: number, y: number) {
        for (let i = 0 ; i < img.width ; i++) {
            const xPos = x + i;
            if (xPos < 0 || xPos >= WIDTH) {
                continue;
            }
            for (let j = 0 ; j < img.height ; j++) {
                const yPos = y + j;
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