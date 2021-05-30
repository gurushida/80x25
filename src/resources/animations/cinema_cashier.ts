import { ImageAnimation, Animation, NO_LEFT_MOVEMENT } from "@/animations";
import { createMaskHotspot, HotspotId } from "@/hotspots";
import { ZIndex } from "@/zIndex";
import { CanTalkAnimation } from "./talkingCharacter";
import { TalkingCharacter } from "@/characters";
import { SPR_CINEMA_CASHIER_0 } from "../generated/images/SPR_CINEMA_CASHIER_0";
import { SPR_CINEMA_CASHIER_1 } from "../generated/images/SPR_CINEMA_CASHIER_1";
import { SPR_CINEMA_CASHIER_2 } from "../generated/images/SPR_CINEMA_CASHIER_2";
import { SPR_CINEMA_CASHIER_TALKING_0 } from "../generated/images/SPR_CINEMA_CASHIER_TALKING_0";
import { SPR_CINEMA_CASHIER_TALKING_1 } from "../generated/images/SPR_CINEMA_CASHIER_TALKING_1";
import { SPR_CINEMA_CASHIER_TALKING_2 } from "../generated/images/SPR_CINEMA_CASHIER_TALKING_2";

const CASHIER_HOTSPOT = createMaskHotspot(SPR_CINEMA_CASHIER_0, HotspotId.CINEMA_CASHIER);

const cashier_X = 10;
const cashier_Y = 12;


const ANIM_CASHIER = new ImageAnimation(cashier_X, cashier_Y, ZIndex.BEHIND_GUY, true, CASHIER_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_CINEMA_CASHIER_0,
            durationInTicks: 200,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_CINEMA_CASHIER_1,
            durationInTicks: 4,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_CINEMA_CASHIER_2,
            durationInTicks: 30,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_CINEMA_CASHIER_1,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

const ANIM_CASHIER_TALKING = new ImageAnimation(cashier_X, cashier_Y, ZIndex.BEHIND_GUY, true, CASHIER_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_CINEMA_CASHIER_TALKING_0,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_CINEMA_CASHIER_TALKING_1,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_CINEMA_CASHIER_TALKING_2,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

export class CinemaCashierAnimation extends CanTalkAnimation {

    getCharacter(): TalkingCharacter {
        return 'CINEMA_CASHIER';
    }

    getTalkAnchor(): { talkAnchorLeft: number; talkAnchorBottom: number; } {
        return { talkAnchorLeft: cashier_X + 2, talkAnchorBottom: cashier_Y - 2 };
    }

    startTalkingAnimation(): Animation {
        return ANIM_CASHIER_TALKING;
    }

    stopTalkingAnimation() {
        // Nothing special
    }

    tickNonTalking() {
        return ANIM_CASHIER.tick();
    }

}
