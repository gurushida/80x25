import * as blessed from 'blessed';
import { WIDTH, HEIGHT, ScreenBuffer } from './screenbuffer';

export interface MouseEvent {
    X: number;
    Y: number;
}

type MouseListener = (event: MouseEvent) => void;

export class UI {

    // The full terminal screen
    screen: blessed.Widgets.Screen;

    // The 80x25 area the game + 1 character border around it
    private box: blessed.Widgets.BoxElement;

    private clickListeners: MouseListener[] = [];
    private moveListeners: MouseListener[] = [];

    screenBuffer: ScreenBuffer;

    constructor() {
        this.screen = blessed.screen({
            smartCSR: true,
            title: '80x25'
        });

        this.box = blessed.box({
            top: 'center',
            left: 'center',
            width: WIDTH + 2,
            height: HEIGHT + 2,
            content: `Welcome to {underline}80x25{/underline} !`,
            tags: true,
            border: {
              type: 'line'
            },
        });

        this.screen.append(this.box);

        this.box.on('mousemove', (data) => {
            this.fireEvent(this.moveListeners, data.x, data.y);
        });

        this.box.on('mouseout', (data) => {
            this.fireEvent(this.moveListeners, data.x, data.y);
        });

        this.box.on('click', (data) => {
            this.fireEvent(this.clickListeners, data.x, data.y);
        });

        this.screen.key(['escape', 'q', 'C-c'], function(ch, key) {
            return process.exit(0);
        });

        this.screenBuffer = new ScreenBuffer();
        this.render();
    }

    private fireEvent(listeners: MouseListener[], globalX: number, globalY: number) {
        let X = globalX - (this.box.left as number) - 1;
        if (X < 0 || X >= WIDTH) {
            X = -1;
        }
        let Y = globalY - (this.box.top as number) - 1;
        if (Y < 0 || Y >= HEIGHT - 2) {
            Y = -1;
        }

        const event: MouseEvent = (X == -1 || Y === -1) ? { X: -1, Y: -1 } : { X, Y };
        for (const listener of listeners) {
            listener(event);
        }
    }

    addClickListener(listener: MouseListener) {
        this.clickListeners.push(listener);
    }

    removeClickListener(listener: MouseListener) {
        const pos = this.clickListeners.indexOf(listener);
        if (pos !== - 1) {
            this.clickListeners.splice(pos, 1);
        }
    }

    addMoveListener(listener: MouseListener) {
        this.moveListeners.push(listener);
    }

    removeMoveListener(listener: MouseListener) {
        const pos = this.moveListeners.indexOf(listener);
        if (pos !== - 1) {
            this.moveListeners.splice(pos, 1);
        }
    }

    render() {
        this.box.setContent(this.screenBuffer.asString());
        this.screen.render();
    }

}
