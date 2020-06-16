import { AsciiImage } from "./images";
import { HotspotFilter } from "./hotspots";
import { ZIndex } from "./zIndex";
import { PaintTask } from "./paintTask";
import { Cue } from "./dialog";
import { Runnable } from "./runnable";
import { TalkingCharacter } from "./characters";


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
 * On every tick, this returns an array of paint tasks or undefined
 * if the animation has stopped and should be removed from
 * the scene.
 */
export interface Animation {
    tick: () => PaintTask[] | undefined;
}


/**
 * This interface describes an animated character that can talk.
 */
export interface ICanTalkAnimation extends Animation {

    // Who is talking in this animation
    getCharacter(): TalkingCharacter;

    // Invoke this method to start talking
    say(cues: Cue[], then: Runnable | undefined);

    // Invoke this method to make the character stop talking.
    // Does nothing if the character is not talking
    shutUp();

    // Where to anchor the text when starting to talk
    getTalkAnchor(): { talkAnchorLeft: number, talkAnchorBottom: number };

    skipToNextCue();

    // How to start/stop the character animation (mouth, gestures, ...)
    // when talking begins/stops
    startTalkingAnimation(): Animation;
    stopTalkingAnimation();

    // Indicates whether or not the character is currently talking
    isTalking(): boolean;

    // Delegate tick method describing what to do when
    // the character is not talking
    tickNonTalking: () => PaintTask[] | undefined;
}


export function isCanTalkAnimation(a: Animation): a is ICanTalkAnimation {
    return 'getCharacter' in a && 'say' in a && 'shutUp' in a;
}


export class ImageAnimation implements Animation {

    left: number;
    top: number;
    zIndex: ZIndex;
    steps: AnimationStep[];
    loop: boolean;
    currentStep: number;
    ticksUntilUpdate: number;
    defaultHotspotFilter: HotspotFilter | undefined;


    constructor(initialLeft: number, initialTop: number, zIndex: ZIndex, loop: boolean,
                hotspotFilter: HotspotFilter | undefined, steps: AnimationStep[]) {
        this.left = initialLeft;
        this.top = initialTop;
        this.zIndex = zIndex;
        this.steps = steps;
        this.loop = loop;
        this.currentStep = 0;
        this.ticksUntilUpdate = steps[0].durationInTicks;
        this.defaultHotspotFilter = hotspotFilter;
    }

    skipToNextStep() {
        this.ticksUntilUpdate = 0;
    }

    tick(): PaintTask[] {
        if (this.currentStep >= this.steps.length) {
            return undefined;
        }

        const paintTask: PaintTask = {
            left: this.left,
            top: this.top,
            zIndex: this.zIndex,
            image: this.steps[this.currentStep].image,
            hotspotFilter: this.steps[this.currentStep].hotspotFilter
              ? this.steps[this.currentStep].hotspotFilter
              : this.defaultHotspotFilter,
        };

        this.ticksUntilUpdate = this.ticksUntilUpdate - 1;

        if (this.ticksUntilUpdate <= 0) {
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

        return [ paintTask ];
    }
}
