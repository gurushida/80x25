import { ImageAnimation, Animation, NO_LEFT_MOVEMENT } from "@/animations";
import { createMaskHotspot, HotspotId } from "@/hotspots";
import { ZIndex } from "@/zIndex";
import { CanTalkAnimation } from "./talkingCharacter";
import { TalkingCharacter } from "@/characters";
import { SPR_JEWELLER_0 } from "../generated/images/SPR_JEWELLER_0";
import { SPR_JEWELLER_1 } from "../generated/images/SPR_JEWELLER_1";
import { SPR_JEWELLER_2 } from "../generated/images/SPR_JEWELLER_2";
import { SPR_JEWELLER_3 } from "../generated/images/SPR_JEWELLER_3";
import { SPR_JEWELLER_TALKING_0 } from "../generated/images/SPR_JEWELLER_TALKING_0";
import { SPR_JEWELLER_TALKING_1 } from "../generated/images/SPR_JEWELLER_TALKING_1";
import { SPR_JEWELLER_TALKING_2 } from "../generated/images/SPR_JEWELLER_TALKING_2";
import { SPR_JEWELLER_4 } from "../generated/images/SPR_JEWELLER_4";
import { SPR_JEWELLER_5 } from "../generated/images/SPR_JEWELLER_5";
import { SPR_JEWELLER_6 } from "../generated/images/SPR_JEWELLER_6";
import { SPR_JEWELLER_7 } from "../generated/images/SPR_JEWELLER_7";

const JEWELLER_HOTSPOT = createMaskHotspot(SPR_JEWELLER_0, HotspotId.JEWELLER);

const jeweller_X = 10;
const jeweller_Y = 8;

const ANIM_JEWELLER = new ImageAnimation(jeweller_X, jeweller_Y, ZIndex.BEHIND_GUY, true, JEWELLER_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_JEWELLER_0,
            durationInTicks: 300,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_JEWELLER_1,
            durationInTicks: 4,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_JEWELLER_2,
            durationInTicks: 4,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_JEWELLER_3,
            durationInTicks: 4,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_JEWELLER_4,
            durationInTicks: 4,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_JEWELLER_5,
            durationInTicks: 4,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_JEWELLER_6,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_JEWELLER_7,
            durationInTicks: 4,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_JEWELLER_6,
            durationInTicks: 4,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_JEWELLER_7,
            durationInTicks: 4,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_JEWELLER_6,
            durationInTicks: 50,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_JEWELLER_5,
            durationInTicks: 4,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_JEWELLER_4,
            durationInTicks: 4,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_JEWELLER_3,
            durationInTicks: 4,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_JEWELLER_2,
            durationInTicks: 4,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_JEWELLER_1,
            durationInTicks: 4,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

const ANIM_JEWELLER_TALKING = new ImageAnimation(jeweller_X, jeweller_Y, ZIndex.BEHIND_GUY, true, JEWELLER_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_JEWELLER_TALKING_0,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_JEWELLER_TALKING_1,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_JEWELLER_TALKING_2,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

export class JewellerAnimation extends CanTalkAnimation {

    getCharacter(): TalkingCharacter {
        return 'JEWELLER';
    }

    getTalkAnchor(): { talkAnchorLeft: number; talkAnchorBottom: number; } {
        return { talkAnchorLeft: jeweller_X + 7, talkAnchorBottom: jeweller_Y - 1 };
    }

    startTalkingAnimation(): Animation {
        return ANIM_JEWELLER_TALKING;
    }

    stopTalkingAnimation() {
        // Nothing special
    }

    tickNonTalking() {
        return ANIM_JEWELLER.tick();
    }

}
