import { ImageAnimation, Animation, NO_LEFT_MOVEMENT } from "@/animations";
import { createMaskHotspot, HotspotId } from "@/hotspots";
import { ZIndex } from "@/zIndex";
import { CanTalkAnimation } from "./talkingCharacter";
import { TalkingCharacter } from "@/characters";
import { SPR_DOG_0 } from "../generated/images/SPR_DOG_0";
import { SPR_DOG_1 } from "../generated/images/SPR_DOG_1";

const DOG_HOTSPOT = createMaskHotspot(SPR_DOG_0, HotspotId.DOG);

const dog_X = 50;
const dog_Y = 17;


const ANIM_DOG = new ImageAnimation(dog_X, dog_Y, ZIndex.BEHIND_GUY, true, DOG_HOTSPOT, NO_LEFT_MOVEMENT,
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
        return 'DOG';
    }

    getTalkAnchor(): { talkAnchorLeft: number; talkAnchorBottom: number; } {
        return { talkAnchorLeft: dog_X + 10, talkAnchorBottom: dog_Y - 1 };
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
