import { Animation, ImageAnimation } from "../../animations";
import { SPR_GUY_RIGHT_STILL_0, SPR_GUY_LEFT_STILL_0, SPR_GUY_LEFT_WALKING_0, SPR_GUY_LEFT_WALKING_1, SPR_GUY_LEFT_WALKING_2,
  SPR_GUY_LEFT_WALKING_3, SPR_GUY_RIGHT_WALKING_0, SPR_GUY_RIGHT_WALKING_1, SPR_GUY_RIGHT_WALKING_2, SPR_GUY_RIGHT_WALKING_3,
  SPR_GUY_LEFT_TALKING_0, SPR_GUY_LEFT_TALKING_1, SPR_GUY_RIGHT_TALKING_0, SPR_GUY_RIGHT_TALKING_1, SPR_GUY_RIGHT_STILL_1,
  SPR_GUY_LEFT_STILL_1 } from "../sprites";
import { WIDTH } from "../../screenbuffer";
import { GuyPosition } from "src/hotspots";
import { ZIndex } from "../../zIndex";
import { PaintTask } from "../../paintTask";
import { WalkingDestination } from "../../actions";
import { CanTalkAnimation } from "./talkingCharacter";
import { Clock } from "../../clock";
import { TalkingCharacter } from "../../characters";

export enum GUY_STATE {
    STILL,
    WALKING_TO_THE_LEFT,
    WALKING_TO_THE_RIGHT,
    TALKING,
}


export class GuyAnimation extends CanTalkAnimation {
    
    private state: GUY_STATE = GUY_STATE.STILL;
    private currentAnimation: Animation;
    private walkingDestination: WalkingDestination | undefined = undefined;
    private minLeft: number;
    private maxLeft: number;

    constructor(private guyPosition: GuyPosition) {
        super();
        this.minLeft = guyPosition.minLeft !== undefined ? guyPosition.minLeft : 0;
        this.maxLeft = guyPosition.maxLeft !== undefined ? guyPosition.maxLeft : WIDTH - SPR_GUY_LEFT_STILL_0.width;
        this.standStill();
    }

    public getCharacter(): TalkingCharacter {
        return TalkingCharacter.GUY;
    }


    private getStillAnimation(): Animation {
        return new ImageAnimation(this.guyPosition.left, this.guyPosition.top, ZIndex.GUY, true, undefined,
            [
                {
                    image: this.guyPosition.lookToTheRight ? SPR_GUY_RIGHT_STILL_0 : SPR_GUY_LEFT_STILL_0,
                    durationInTicks: 200,
                    offsetX: 0,
                    offsetY: 0,
                },
                {
                    image: this.guyPosition.lookToTheRight ? SPR_GUY_RIGHT_STILL_1 : SPR_GUY_LEFT_STILL_1,
                    durationInTicks: 5,
                    offsetX: 0,
                    offsetY: 0,
                },
            ]);
    }

    private standStill() {
        this.state = GUY_STATE.STILL;
        this.currentAnimation = this.getStillAnimation();
        this.shutUp();
    }


    getTalkAnchor() {
        const talkAnchorLeft = Math.round(this.guyPosition.left + SPR_GUY_LEFT_STILL_0.width / 2);
        const talkAnchorBottom = this.guyPosition.top - 1;
        return { talkAnchorLeft, talkAnchorBottom };
    }

    startTalkingAnimation(): Animation {
        this.state = GUY_STATE.TALKING;
        this.currentAnimation = this.guyPosition.lookToTheRight
          ? this.getTalkingRightAnimation()
          : this.getTalkingLeftAnimation();
        return this.currentAnimation;
    }

    stopTalkingAnimation() {
        this.standStill();
    }

    tickNonTalking(): PaintTask[] | undefined {
        if (this.state === GUY_STATE.STILL) {
            return this.currentAnimation.tick();
        }

        if (this.state === GUY_STATE.WALKING_TO_THE_LEFT || this.state === GUY_STATE.WALKING_TO_THE_RIGHT) {
            if (this.guyPosition.left === this.walkingDestination.pos.left) {
                // If we have reach our destination, adjust the guy's orientation and stop
                this.guyPosition.lookToTheRight = this.walkingDestination.pos.lookToTheRight;
                this.standStill();
                if (this.walkingDestination.then) {
                    Clock.clock.defer(this.walkingDestination.then);
                }
                return this.currentAnimation.tick();
            }

            // Keep walking
            const paintTasks = this.currentAnimation.tick();
            this.guyPosition.left = paintTasks[0].left;
            this.guyPosition.top = paintTasks[0].top;
            return paintTasks;
        }

        return undefined;
    }

    walkTo(dst: WalkingDestination | undefined) {
        if (!dst) {
            // Stop walking
            this.walkingDestination = undefined;
            this.standStill();
            return;
        }

        this.shutUp();
        let x = dst.pos.left;
        if (x < this.minLeft) {
            x = this.minLeft;
        }

        if (x > this.maxLeft) {
            x = this.maxLeft;
        }

        this.walkingDestination = {
            pos: {
                left: x,
                top: dst.pos.top,
                lookToTheRight: dst.pos.lookToTheRight
            },
            then: dst.then
        };
        const walkToLeft = x < this.guyPosition.left;
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
        return new ImageAnimation(this.guyPosition.left, this.guyPosition.top, ZIndex.GUY, true, undefined,
            [
                {
                    image: SPR_GUY_LEFT_STILL_0,
                    durationInTicks: 3,
                    offsetX: -1,
                    offsetY: 0,
                },
                {
                    image: SPR_GUY_LEFT_WALKING_0,
                    durationInTicks: 3,
                    offsetX: -1,
                    offsetY: 0,
                },
                {
                    image: SPR_GUY_LEFT_WALKING_1,
                    durationInTicks: 3,
                    offsetX: -1,
                    offsetY: 0,
                },
                {
                    image: SPR_GUY_LEFT_WALKING_2,
                    durationInTicks: 3,
                    offsetX: -1,
                    offsetY: 0,
                },
                {
                    image: SPR_GUY_LEFT_WALKING_3,
                    durationInTicks: 3,
                    offsetX: -1,
                    offsetY: 0,
                },
            ]);
    }


    walkToLeft() {
        this.state = GUY_STATE.WALKING_TO_THE_LEFT;
        this.guyPosition.lookToTheRight = false;
        this.currentAnimation = this.getWalkLeftAnimation();
    }


    private getWalkRightAnimation(): Animation {
        return new ImageAnimation(this.guyPosition.left, this.guyPosition.top, ZIndex.GUY, true, undefined,
            [
                {
                    image: SPR_GUY_RIGHT_STILL_0,
                    durationInTicks: 3,
                    offsetX: 1,
                    offsetY: 0,
                },
                {
                    image: SPR_GUY_RIGHT_WALKING_0,
                    durationInTicks: 3,
                    offsetX: 1,
                    offsetY: 0,
                },
                {
                    image: SPR_GUY_RIGHT_WALKING_1,
                    durationInTicks: 3,
                    offsetX: 1,
                    offsetY: 0,
                },
                {
                    image: SPR_GUY_RIGHT_WALKING_2,
                    durationInTicks: 3,
                    offsetX: 1,
                    offsetY: 0,
                },
                {
                    image: SPR_GUY_RIGHT_WALKING_3,
                    durationInTicks: 3,
                    offsetX: 1,
                    offsetY: 0,
                },
            ]);
    }


    walkToRight() {
        this.state = GUY_STATE.WALKING_TO_THE_RIGHT;
        this.guyPosition.lookToTheRight = true;
        this.currentAnimation = this.getWalkRightAnimation();
    }


    private getTalkingLeftAnimation(): Animation {
        return new ImageAnimation(this.guyPosition.left, this.guyPosition.top, ZIndex.GUY, true, undefined,
            [
                {
                    image: SPR_GUY_LEFT_TALKING_0,
                    durationInTicks: 7,
                    offsetX: 0,
                    offsetY: 0,
                },
                {
                    image: SPR_GUY_LEFT_TALKING_1,
                    durationInTicks: 7,
                    offsetX: 0,
                    offsetY: 0,
                },
                {
                    image: SPR_GUY_LEFT_STILL_0,
                    durationInTicks: 7,
                    offsetX: 0,
                    offsetY: 0,
                },
            ]);
    }


    private getTalkingRightAnimation(): Animation {
        return new ImageAnimation(this.guyPosition.left, this.guyPosition.top, ZIndex.GUY, true, undefined,
            [
                {
                    image: SPR_GUY_RIGHT_TALKING_0,
                    durationInTicks: 7,
                    offsetX: 0,
                    offsetY: 0,
                },
                {
                    image: SPR_GUY_RIGHT_TALKING_1,
                    durationInTicks: 7,
                    offsetX: 0,
                    offsetY: 0,
                },
                {
                    image: SPR_GUY_RIGHT_STILL_0,
                    durationInTicks: 7,
                    offsetX: 0,
                    offsetY: 0,
                },
            ]);
    }

}
