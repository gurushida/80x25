import { ICanTalkAnimation, Animation } from "../../animations";
import { Cue } from "../../dialog";
import { PaintTask } from "../../paintTask";
import { TextAnimation } from "./text";
import { Runnable } from "../../runnable";
import { Clock } from "../../clock";

export abstract class CanTalkAnimation implements ICanTalkAnimation {

    private characterAnimation: Animation | undefined;
    private textAnimation: TextAnimation | undefined = undefined;
    private postTalkAction: Runnable | undefined = undefined;


    say(cues: Cue[], then: Runnable | undefined) {
        this.postTalkAction = then;
        this.characterAnimation = this.startTalkingAnimation();
        const { talkAnchorLeft, talkAnchorBottom } = this.getTalkAnchor();
        this.textAnimation = new TextAnimation(cues, talkAnchorLeft, talkAnchorBottom);
    }


    shutUp() {
        if (this.isTalking()) {
            this.postTalkAction = undefined;
            this.textAnimation = undefined;
            this.characterAnimation = undefined;
            this.stopTalkingAnimation();
        }
    }


    skipToNextCue() {
        if (this.textAnimation) {
            this.textAnimation.skipToNextCue();
        }
    }


    tick(): PaintTask[] | undefined {
        if (!this.isTalking()) {
            return this.tickNonTalking();
        }

        const tasks = this.textAnimation.tick();
        if (tasks) {
            // Still talking
            return [...tasks, ...this.characterAnimation.tick()];
        }
        // If the character is done talking, let's stop the animation
        // and go back to normal
        if (this.postTalkAction) {
            Clock.clock.defer(this.postTalkAction);
        }
        this.shutUp();
        return this.tickNonTalking();
    }

    isTalking() {
        return this.textAnimation !== undefined;
    }

    abstract getTalkAnchor(): { talkAnchorLeft: number, talkAnchorBottom: number };
    abstract startTalkingAnimation(): Animation;
    abstract stopTalkingAnimation();
    abstract tickNonTalking();
}