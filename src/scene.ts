import { Animation, PaintTask } from "./animationsUtils";
import { ScreenBuffer } from "./screenbuffer";
import { AsciiImage } from "./imagesUtils";

export interface PaintTaskZ {
    task: PaintTask;
    zIndex: number;
}

export interface AnimationZ {
    animation: Animation;
    zIndex: number;
}

export class Scene {

    buffer: ScreenBuffer;
    staticImages: PaintTaskZ[];
    animations: AnimationZ[];

    constructor(buffer: ScreenBuffer) {
        this.buffer = buffer;
        this.staticImages = [];
        this.animations = [];
    }

    tick() {
        this.buffer.clear();
        this.staticImages.sort((a, b) => a.zIndex - b.zIndex);
        this.animations.sort((a, b) => a.zIndex - b.zIndex);
        for (const task of this.staticImages) {
            this.buffer.paint(task.task.image, task.task.left, task.task.top);
        }

        for (const animation of this.animations) {
            const task = animation.animation.tick();
            if (task) {
                this.buffer.paint(task.image, task.left, task.top);
            }
        }
    }

    addImage(task: PaintTaskZ) {
        this.staticImages.push(task);
    }

    removeImage(task: PaintTaskZ) {
        const pos = this.staticImages.indexOf(task);
        if (pos !== - 1) {
            this.staticImages.splice(pos, 1);
        }
    }

    addAnimation(animation: AnimationZ) {
        this.animations.push(animation);
    }

    removeAnimation(animation: AnimationZ) {
        const pos = this.animations.indexOf(animation);
        if (pos !== - 1) {
            this.animations.splice(pos, 1);
        }
    }
}


export function getPaintTaskZ(image: AsciiImage, left: number, top: number, zIndex: number) {
    return {
        zIndex,
        task: {
            left, top, image
        }
    };
}