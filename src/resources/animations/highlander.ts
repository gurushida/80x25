import { ImageAnimation, Animation, NO_LEFT_MOVEMENT } from "@/animations";
import { createMaskHotspot, HotspotId } from "@/hotspots";
import { ZIndex } from "@/zIndex";
import { CanTalkAnimation } from "./talkingCharacter";
import { TalkingCharacter } from "@/characters";
import { SPR_HIGHLANDER_RIGHT_0 } from "../generated/images/SPR_HIGHLANDER_RIGHT_0";
import { SPR_HIGHLANDER_RIGHT_1 } from "../generated/images/SPR_HIGHLANDER_RIGHT_1";
import { SPR_HIGHLANDER_RIGHT_2 } from "../generated/images/SPR_HIGHLANDER_RIGHT_2";

const HIGHLANDER_HOTSPOT = createMaskHotspot(SPR_HIGHLANDER_RIGHT_0, HotspotId.HIGHLANDER);

const ANIM_HIGHLANDER = new ImageAnimation(48, 12, ZIndex.BEHIND_GUY, true, HIGHLANDER_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_HIGHLANDER_RIGHT_0,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_HIGHLANDER_RIGHT_1,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_HIGHLANDER_RIGHT_0,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_HIGHLANDER_RIGHT_1,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_HIGHLANDER_RIGHT_2,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_HIGHLANDER_RIGHT_1,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_HIGHLANDER_RIGHT_2,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_HIGHLANDER_RIGHT_1,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_HIGHLANDER_RIGHT_2,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_HIGHLANDER_RIGHT_1,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_HIGHLANDER_RIGHT_2,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

export class HighlanderAnimation extends CanTalkAnimation {

    getCharacter(): TalkingCharacter {
        return 'HIGHLANDER';
    }

    getTalkAnchor(): { talkAnchorLeft: number; talkAnchorBottom: number; } {
        return { talkAnchorLeft: 60, talkAnchorBottom: 16 };
    }

    startTalkingAnimation(): Animation {
        return ANIM_HIGHLANDER;
    }

    stopTalkingAnimation() {
        // Nothing special
    }

    tickNonTalking() {
        return ANIM_HIGHLANDER.tick();
    }

}
