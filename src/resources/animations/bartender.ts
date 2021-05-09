import { ImageAnimation, Animation, NO_LEFT_MOVEMENT } from "@/animations";
import { createMaskHotspot, HotspotId } from "@/hotspots";
import { ZIndex } from "@/zIndex";
import { CanTalkAnimation } from "./talkingCharacter";
import { TalkingCharacter } from "@/characters";
import { SPR_BARTENDER0 } from "../generated/images/SPR_BARTENDER0";
import { SPR_BARTENDER_TALKING0 } from "../generated/images/SPR_BARTENDER_TALKING0";
import { SPR_BARTENDER_TALKING1 } from "../generated/images/SPR_BARTENDER_TALKING1";
import { SPR_BARTENDER_TALKING2 } from "../generated/images/SPR_BARTENDER_TALKING2";
import { SPR_BARTENDER1 } from "../generated/images/SPR_BARTENDER1";

const BARTENDER_HOTSPOT = createMaskHotspot(SPR_BARTENDER0, HotspotId.BARTENDER);

const ANIM_BARTENDER = new ImageAnimation(10, 12, ZIndex.BEHIND_GUY, true, BARTENDER_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_BARTENDER0,
            durationInTicks: 200,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BARTENDER1,
            durationInTicks: 5,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

const ANIM_BARTENDER_TALKING = new ImageAnimation(10, 12, ZIndex.BEHIND_GUY, true, BARTENDER_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_BARTENDER_TALKING0,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BARTENDER_TALKING1,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BARTENDER_TALKING2,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

export class BartenderAnimation extends CanTalkAnimation {

    getCharacter(): TalkingCharacter {
        return 'BARTENDER';
    }

    getTalkAnchor(): { talkAnchorLeft: number; talkAnchorBottom: number; } {
        return { talkAnchorLeft: 16, talkAnchorBottom: 11 };
    }

    startTalkingAnimation(): Animation {
        return ANIM_BARTENDER_TALKING;
    }

    stopTalkingAnimation() {
        // Nothing special
    }

    tickNonTalking() {
        return ANIM_BARTENDER.tick();
    }

}
