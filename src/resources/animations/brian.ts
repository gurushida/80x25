import { ImageAnimation, Animation, NO_LEFT_MOVEMENT } from "@/animations";
import { createMaskHotspot, HotspotId } from "@/hotspots";
import { ZIndex } from "@/zIndex";
import { CanTalkAnimation } from "./talkingCharacter";
import { TalkingCharacter } from "@/characters";
import { SPR_BRIAN_0 } from "../generated/images/SPR_BRIAN_0";
import { SPR_BRIAN_1 } from "../generated/images/SPR_BRIAN_1";
import { SPR_BRIAN_TALKING_0 } from "../generated/images/SPR_BRIAN_TALKING_0";
import { SPR_BRIAN_TALKING_1 } from "../generated/images/SPR_BRIAN_TALKING_1";
import { SPR_BRIAN_TALKING_2 } from "../generated/images/SPR_BRIAN_TALKING_2";

const BRIAN_HOTSPOT = createMaskHotspot(SPR_BRIAN_0, HotspotId.BRIAN);

const brian_X = 66;
const brian_Y = 12;

const ANIM_BRIAN = new ImageAnimation(brian_X, brian_Y, ZIndex.BEHIND_GUY, true, BRIAN_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_BRIAN_0,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BRIAN_1,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

const ANIM_BRIAN_TALKING = new ImageAnimation(brian_X + 3, brian_Y, ZIndex.BEHIND_GUY, true, BRIAN_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_BRIAN_TALKING_0,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BRIAN_TALKING_1,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BRIAN_TALKING_2,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

export class BrianAnimation extends CanTalkAnimation {

    getCharacter(): TalkingCharacter {
        return 'BRIAN';
    }

    getTalkAnchor(): { talkAnchorLeft: number; talkAnchorBottom: number; } {
        return { talkAnchorLeft: brian_X + 7, talkAnchorBottom: brian_Y };
    }

    startTalkingAnimation(): Animation {
        return ANIM_BRIAN_TALKING;
    }

    stopTalkingAnimation() {
        // Nothing special
    }

    tickNonTalking() {
        return ANIM_BRIAN.tick();
    }

}
