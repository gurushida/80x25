import { AsciiImage } from "../imagesUtils";
import { HotspotFilter } from "../hotspots";

/**
 * Defines something to paint and where to paint it.
 */
export interface PaintTask {
    top: number;
    left: number;
    image: AsciiImage;
    hotspotFilter?: HotspotFilter;
}

/**
 * This represents an animation step, i.e.
 * what to draw, how long until next update,
 * what offsets to add to the current coordinates
 * on next update.
 */
export interface AnimationStep {
    image: AsciiImage;
    durationInTicks: number;
    offsetX: number;
    offsetY: number;
    hotspotFilter?: HotspotFilter;
}


/**
 * This represents an animation running at 50fps.
 * On every tick, this returns a paint task or undefined
 * if the animation has stopped and should be removed from
 * the scene.
 */
export interface Animation {
    tick: () => PaintTask | undefined;
}


export class ImageAnimation implements Animation {

    left: number;
    top: number;
    steps: AnimationStep[];
    loop: boolean;
    currentStep: number;
    ticksUntilUpdate: number;
    defaultHotspotFilter: HotspotFilter | undefined;


    constructor(initialLeft: number, initialTop: number, loop: boolean, hotspotFilter: HotspotFilter | undefined, steps: AnimationStep[]) {
        this.left = initialLeft;
        this.top = initialTop;
        this.steps = steps;
        this.loop = loop;
        this.currentStep = 0;
        this.ticksUntilUpdate = steps[0].durationInTicks;
        this.defaultHotspotFilter = hotspotFilter;
    }

    tick(): PaintTask {
        if (this.currentStep >= this.steps.length) {
            return undefined;
        }

        const paintTask: PaintTask = {
            left: this.left,
            top: this.top,
            image: this.steps[this.currentStep].image,
            hotspotFilter: this.steps[this.currentStep].hotspotFilter
              ? this.steps[this.currentStep].hotspotFilter
              : this.defaultHotspotFilter,
        };

        this.ticksUntilUpdate = this.ticksUntilUpdate - 1;

        if (this.ticksUntilUpdate === 0) {
            // Time to move on the next step
            this.left = this.left + this.steps[this.currentStep].offsetX;
            this.top = this.top + this.steps[this.currentStep].offsetY;
            this.currentStep = this.currentStep + 1;

            if (this.currentStep >= this.steps.length) {
                if (this.loop) {
                    this.currentStep = 0;
                    this.ticksUntilUpdate = this.steps[this.currentStep].durationInTicks;
                }
            } else {
                this.ticksUntilUpdate = this.steps[this.currentStep].durationInTicks;
            }
        }

        return paintTask;
    }
}
