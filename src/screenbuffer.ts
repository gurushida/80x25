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
        this.buffer[y][x] = ch[0];
    }

    asString() {
        const lines = this.buffer.map(row => row.join(''));
        return lines.join('\n')
    }
}