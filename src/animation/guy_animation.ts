import { Animation, PaintTask, ImageAnimation } from "./animationsUtils";
import { guy_right_still, guy_left_still, guy_left_walking0, guy_left_walking1, guy_left_walking2,
  guy_left_walking3, guy_right_walking0, guy_right_walking1, guy_right_walking2, guy_right_walking3 } from "../sprite";
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
    private current_animation: Animation;
    private text_animation: Animation | undefined = undefined;

    private walkingXDestination = -1;

    constructor(private guy_left: number, private guy_top: number,
                private guy_look_to_the_right: boolean,
                private min_left = 0, private max_left = WIDTH - guy_left_still.width) {
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
        this.current_animation = this.getStillAnimation();
        this.text_animation = undefined;
    }


    say(segments: TextSegment[]) {
        this.current_animation = this.getStillAnimation();
        this.state = GUY_STATE.TALKING;
        this.text_animation = new TextAnimation(segments, this.guy_left + guy_left_still.width / 2, this.guy_top - 1);
    }

    tick(): PaintTask[] | undefined {
        if (this.state === GUY_STATE.TALKING) {
            const tasks = this.text_animation.tick();
            if (tasks) {
                // Still talking
                return tasks;
            }
            // If the guy is done talking, go back to standing still
            this.standStill();
            return this.current_animation.tick();
        }

        if (this.state === GUY_STATE.STILL) {
            return this.current_animation.tick();
        }

        if (this.state === GUY_STATE.WALKING_TO_THE_LEFT || this.state === GUY_STATE.WALKING_TO_THE_RIGHT) {
            if ((this.current_animation as ImageAnimation).left === this.walkingXDestination) {
                // If we have reach our destination, stop walking
                this.standStill();
                return this.current_animation.tick();
            }

            // Keep walking
            const paintTasks = this.current_animation.tick();
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

        this.text_animation = undefined;
        if (x < this.min_left) {
            x = this.min_left;
        }

        if (x > this.max_left) {
            x = this.max_left;
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
        this.current_animation = this.getWalkLeftAnimation();
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
        this.current_animation = this.getWalkRightAnimation();
    }
}
