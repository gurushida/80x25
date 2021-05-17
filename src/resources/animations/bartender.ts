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
import { SPR_BARTENDER_WIPING_0 } from "../generated/images/SPR_BARTENDER_WIPING_0";
import { SPR_BARTENDER_WIPING_2 } from "../generated/images/SPR_BARTENDER_WIPING_2";
import { SPR_BARTENDER_WIPING_1 } from "../generated/images/SPR_BARTENDER_WIPING_1";
import { SPR_BARTENDER_WIPING_3 } from "../generated/images/SPR_BARTENDER_WIPING_3";
import { SPR_BARTENDER_WIPING_4 } from "../generated/images/SPR_BARTENDER_WIPING_4";
import { SPR_BARTENDER_WIPING_5 } from "../generated/images/SPR_BARTENDER_WIPING_5";
import { SPR_BARTENDER_WIPING_6 } from "../generated/images/SPR_BARTENDER_WIPING_6";

const BARTENDER_HOTSPOT = createMaskHotspot(SPR_BARTENDER0, HotspotId.BARTENDER);

const wiping_ticks = 4;

const ANIM_BARTENDER = new ImageAnimation(10, 12, ZIndex.BEHIND_GUY, true, BARTENDER_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_BARTENDER_WIPING_0,
            durationInTicks: wiping_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BARTENDER_WIPING_1,
            durationInTicks: wiping_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BARTENDER_WIPING_2,
            durationInTicks: wiping_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BARTENDER_WIPING_3,
            durationInTicks: wiping_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BARTENDER_WIPING_4,
            durationInTicks: wiping_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BARTENDER_WIPING_5,
            durationInTicks: wiping_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BARTENDER_WIPING_6,
            durationInTicks: wiping_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BARTENDER_WIPING_0,
            durationInTicks: wiping_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BARTENDER_WIPING_1,
            durationInTicks: wiping_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BARTENDER_WIPING_2,
            durationInTicks: wiping_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BARTENDER_WIPING_3,
            durationInTicks: wiping_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BARTENDER_WIPING_4,
            durationInTicks: wiping_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BARTENDER_WIPING_5,
            durationInTicks: wiping_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BARTENDER_WIPING_6,
            durationInTicks: wiping_ticks,
            offsetX: 0,
            offsetY: 0,
        },

        {
            image: SPR_BARTENDER0,
            durationInTicks: 100,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BARTENDER1,
            durationInTicks: 5,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BARTENDER0,
            durationInTicks: 100,
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
