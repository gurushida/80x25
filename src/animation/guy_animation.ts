import { Animation, PaintTask, ImageAnimation } from "./animationsUtils";
import { guy_right_still, guy_left_still, guy_left_walking0, guy_left_walking1, guy_left_walking2,
  guy_left_walking3, guy_right_walking0, guy_right_walking1, guy_right_walking2, guy_right_walking3, guy_left_talking0, guy_left_talking1, guy_right_talking0, guy_right_talking1 } from "../sprite";
import { WIDTH } from "../screenbuffer";
import { TextSegment } from "../dialog";
import { TextAnimation } from "./text_animation";

export enum GUY_STATE {
    STILL,
    WALKING_TO_THE_LEFT,
    WALKING_TO_THE_RIGHT,
    TALKING,
}


export class GuyAnimation implements Animation {
    
    private state: GUY_STATE = GUY_STATE.STILL;
    private currentAnimation: Animation;
    private textAnimation: TextAnimation | undefined = undefined;

    private walkingXDestination = -1;

    constructor(private guy_left: number, private guy_top: number,
                private guy_look_to_the_right: boolean,
                private minLeft = 0, private maxLeft = WIDTH - guy_left_still.width) {
        this.standStill();
   }


    private getStillAnimation(): Animation {
        return new ImageAnimation(this.guy_left, this.guy_top, true, undefined,
            [
                {
                    image: this.guy_look_to_the_right ? guy_right_still : guy_left_still,
                    durationInTicks: 4,
                    offsetX: 0,
                    offsetY: 0,
                },
            ]);
    }

    private standStill() {
        this.state = GUY_STATE.STILL;
        this.currentAnimation = this.getStillAnimation();
        this.textAnimation = undefined;
    }


    say(segments: TextSegment[]) {
        this.currentAnimation = this.guy_look_to_the_right
          ? this.getTalkingRightAnimation()
          : this.getTalkingLeftAnimation();
        this.state = GUY_STATE.TALKING;
        this.textAnimation = new TextAnimation(segments, this.guy_left + guy_left_still.width / 2, this.guy_top - 1);
    }

    tick(): PaintTask[] | undefined {
        if (this.state === GUY_STATE.TALKING) {
            const tasks = this.textAnimation.tick();
            if (tasks) {
                // Still talking
                return [...tasks, ...this.currentAnimation.tick()];
            }
            // If the guy is done talking, go back to standing still
            this.standStill();
            return this.currentAnimation.tick();
        }

        if (this.state === GUY_STATE.STILL) {
            return this.currentAnimation.tick();
        }

        if (this.state === GUY_STATE.WALKING_TO_THE_LEFT || this.state === GUY_STATE.WALKING_TO_THE_RIGHT) {
            if ((this.currentAnimation as ImageAnimation).left === this.walkingXDestination) {
                // If we have reach our destination, stop walking
                this.standStill();
                return this.currentAnimation.tick();
            }

            // Keep walking
            const paintTasks = this.currentAnimation.tick();
            this.guy_left = paintTasks[0].left;
            this.guy_top = paintTasks[0].top;
            return paintTasks;
        }

        return undefined;
    }

    walkTo(x: number) {
        if (x === -1) {
            // Stop walking
            this.standStill();
            return;
        }

        this.textAnimation = undefined;
        if (x < this.minLeft) {
            x = this.minLeft;
        }

        if (x > this.maxLeft) {
            x = this.maxLeft;
        }

        this.walkingXDestination = x;
        const walkToLeft = x < this.guy_left;
        if (walkToLeft && this.state !== GUY_STATE.WALKING_TO_THE_LEFT) {
            this.walkToLeft();
            return;
        }

        if (!walkToLeft && this.state !== GUY_STATE.WALKING_TO_THE_RIGHT) {
            this.walkToRight();
            return;
        }
    }

    private getWalkLeftAnimation(): Animation {
        return new ImageAnimation(this.guy_left, this.guy_top, true, undefined,
            [
                {
                    image: guy_left_still,
                    durationInTicks: 3,
                    offsetX: -1,
                    offsetY: 0,
                },
                {
                    image: guy_left_walking0,
                    durationInTicks: 3,
                    offsetX: -1,
                    offsetY: 0,
                },
                {
                    image: guy_left_walking1,
                    durationInTicks: 3,
                    offsetX: -1,
                    offsetY: 0,
                },
                {
                    image: guy_left_walking2,
                    durationInTicks: 3,
                    offsetX: -1,
                    offsetY: 0,
                },
                {
                    image: guy_left_walking3,
                    durationInTicks: 3,
                    offsetX: -1,
                    offsetY: 0,
                },
            ]);
    }


    walkToLeft() {
        this.state = GUY_STATE.WALKING_TO_THE_LEFT;
        this.guy_look_to_the_right = false;
        this.currentAnimation = this.getWalkLeftAnimation();
    }


    private getWalkRightAnimation(): Animation {
        return new ImageAnimation(this.guy_left, this.guy_top, true, undefined,
            [
                {
                    image: guy_right_still,
                    durationInTicks: 3,
                    offsetX: 1,
                    offsetY: 0,
                },
                {
                    image: guy_right_walking0,
                    durationInTicks: 3,
                    offsetX: 1,
                    offsetY: 0,
                },
                {
                    image: guy_right_walking1,
                    durationInTicks: 3,
                    offsetX: 1,
                    offsetY: 0,
                },
                {
                    image: guy_right_walking2,
                    durationInTicks: 3,
                    offsetX: 1,
                    offsetY: 0,
                },
                {
                    image: guy_right_walking3,
                    durationInTicks: 3,
                    offsetX: 1,
                    offsetY: 0,
                },
            ]);
    }


    walkToRight() {
        this.state = GUY_STATE.WALKING_TO_THE_RIGHT;
        this.guy_look_to_the_right = true;
        this.currentAnimation = this.getWalkRightAnimation();
    }


    private getTalkingLeftAnimation(): Animation {
        return new ImageAnimation(this.guy_left, this.guy_top, true, undefined,
            [
                {
                    image: guy_left_talking0,
                    durationInTicks: 7,
                    offsetX: 0,
                    offsetY: 0,
                },
                {
                    image: guy_left_talking1,
                    durationInTicks: 7,
                    offsetX: 0,
                    offsetY: 0,
                },
                {
                    image: guy_left_still,
                    durationInTicks: 7,
                    offsetX: 0,
                    offsetY: 0,
                },
            ]);
    }


    private getTalkingRightAnimation(): Animation {
        return new ImageAnimation(this.guy_left, this.guy_top, true, undefined,
            [
                {
                    image: guy_right_talking0,
                    durationInTicks: 7,
                    offsetX: 0,
                    offsetY: 0,
                },
                {
                    image: guy_right_talking1,
                    durationInTicks: 7,
                    offsetX: 0,
                    offsetY: 0,
                },
                {
                    image: guy_right_still,
                    durationInTicks: 7,
                    offsetX: 0,
                    offsetY: 0,
                },
            ]);
    }


    skipToNextTextSegment() {
        if (this.textAnimation) {
            this.textAnimation.skipToNextTextSegment();
        }
    }
}
