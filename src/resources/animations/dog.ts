import { ImageAnimation, Animation } from "../../animations";
import { SPR_DOG_0, SPR_DOG_1 } from "../sprites";
import { createMaskHotspot, Hotspot } from "../../hotspots";
import { ZIndex } from "../../zIndex";
import { CanTalkAnimation } from "./talkingCharacter";
import { TalkingCharacter } from "../../characters";

const DOG_HOTSPOT = createMaskHotspot(SPR_DOG_0, Hotspot.DOG);

const ANIM_DOG = new ImageAnimation(50, 17, ZIndex.BEHIND_GUY, true, DOG_HOTSPOT,
    [
        {
            image: SPR_DOG_0,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_DOG_1,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        }
    ]);

export class DogAnimation extends CanTalkAnimation {

    getCharacter(): TalkingCharacter {
        return TalkingCharacter.DOG;
    }

    getTalkAnchor(): { talkAnchorLeft: number; talkAnchorBottom: number; } {
        return { talkAnchorLeft: 60, talkAnchorBottom: 16 };
    }

    startTalkingAnimation(): Animation {
        return ANIM_DOG;
    }

    stopTalkingAnimation() {
        // Nothing special
    }

    tickNonTalking() {
        return ANIM_DOG.tick();
    }

}
