import { ImageAnimation, Animation, NO_LEFT_MOVEMENT } from "@/animations";
import { createMaskHotspot, HotspotId } from "@/hotspots";
import { ZIndex } from "@/zIndex";
import { CanTalkAnimation } from "./talkingCharacter";
import { TalkingCharacter } from "@/characters";
import { SPR_BARTENDER_0 } from "../generated/images/SPR_BARTENDER_0";
import { SPR_BARTENDER_1 } from "../generated/images/SPR_BARTENDER_1";
import { SPR_BARTENDER_WIPING_0 } from "../generated/images/SPR_BARTENDER_WIPING_0";
import { SPR_BARTENDER_WIPING_2 } from "../generated/images/SPR_BARTENDER_WIPING_2";
import { SPR_BARTENDER_WIPING_1 } from "../generated/images/SPR_BARTENDER_WIPING_1";
import { SPR_BARTENDER_WIPING_3 } from "../generated/images/SPR_BARTENDER_WIPING_3";
import { SPR_BARTENDER_WIPING_4 } from "../generated/images/SPR_BARTENDER_WIPING_4";
import { SPR_BARTENDER_WIPING_5 } from "../generated/images/SPR_BARTENDER_WIPING_5";
import { SPR_BARTENDER_WIPING_6 } from "../generated/images/SPR_BARTENDER_WIPING_6";
import { SPR_BARTENDER_TALKING_0 } from "../generated/images/SPR_BARTENDER_TALKING_0";
import { SPR_BARTENDER_TALKING_1 } from "../generated/images/SPR_BARTENDER_TALKING_1";
import { SPR_BARTENDER_TALKING_2 } from "../generated/images/SPR_BARTENDER_TALKING_2";

const BARTENDER_HOTSPOT = createMaskHotspot(SPR_BARTENDER_0, HotspotId.BARTENDER);

const wiping_ticks = 4;
const bartender_X = 10;
const bartender_Y = 12;

const ANIM_BARTENDER = new ImageAnimation(bartender_X, bartender_Y, ZIndex.BEHIND_GUY, true, BARTENDER_HOTSPOT,
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
            image: SPR_BARTENDER_0,
            durationInTicks: 100,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BARTENDER_1,
            durationInTicks: 5,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BARTENDER_0,
            durationInTicks: 100,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

const ANIM_BARTENDER_TALKING = new ImageAnimation(bartender_X, bartender_Y, ZIndex.BEHIND_GUY, true, BARTENDER_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_BARTENDER_TALKING_0,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BARTENDER_TALKING_1,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BARTENDER_TALKING_2,
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
        return { talkAnchorLeft: bartender_X + 6, talkAnchorBottom: bartender_Y - 1 };
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
