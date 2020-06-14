import * as blessed from 'blessed';
import { WIDTH, HEIGHT, ScreenBuffer } from './screenBuffer';
import { HotspotScreenBuffer, Hotspot } from './hotspots';

export interface MouseEvent {
    x: number;
    y: number;
    hotspot: Hotspot;
    button?: 'left' | 'right';
}

export type MouseListener = (event: MouseEvent) => void;

export class UI {

    // The full terminal screen
    private screen: blessed.Widgets.Screen;

    // The 80x25 area the game + 1 character border around it
    private box: blessed.Widgets.BoxElement;

    private clickListeners: MouseListener[] = [];
    private moveListeners: MouseListener[] = [];

    buffer = new ScreenBuffer;
    private hotspotBuffer = new HotspotScreenBuffer();

    constructor() {
        this.screen = blessed.screen({
            smartCSR: true,
            title: '80x25',
            debug: true
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
            this.fireEvent(this.moveListeners, data.x, data.y, data.button);
        });

        this.box.on('mouseout', (data) => {
            this.fireEvent(this.moveListeners, data.x, data.y, data.button);
        });

        this.box.on('click', (data) => {
            this.fireEvent(this.clickListeners, data.x, data.y, data.button);
        });

        this.render();
    }

    addKeyListener(key: string | string[], runnable: () => void) {
        this.screen.key(key, function(ch, key) { runnable(); });
    }

    private fireEvent(listeners: MouseListener[], globalX: number, globalY: number, button: 'left' | 'right' | undefined ) {
        let X = globalX - (this.box.left as number) - 1;
        if (X < 0 || X >= WIDTH) {
            X = -1;
        }
        let Y = globalY - (this.box.top as number) - 1;
        if (Y < 0 || Y >= HEIGHT) {
            Y = -1;
        }

        const event: MouseEvent = (X === -1 || Y === -1)
            ? { x: -1, y: -1, hotspot: undefined, button: undefined }
            : { x: X, y: Y, hotspot: this.hotspotBuffer.get(X, Y), button };
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
        this.box.setContent(this.buffer.getContent(this.hotspotBuffer));
        this.screen.render();
    }

    debug(msg: string) {
        this.screen.debug(msg);
    }

    setTitle(msg: string) {
        this.screen.title = msg;
    }
}
