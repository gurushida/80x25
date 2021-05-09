import { ImageAnimation, Animation, NO_LEFT_MOVEMENT } from "@/animations";
import { createMaskHotspot, HotspotId } from "@/hotspots";
import { ZIndex } from "@/zIndex";
import { CanTalkAnimation } from "./talkingCharacter";
import { TalkingCharacter } from "@/characters";
import { SPR_CINEMA_CASHIER0 } from "../generated/images/SPR_CINEMA_CASHIER0";
import { SPR_CINEMA_CASHIER_TALKING0 } from "../generated/images/SPR_CINEMA_CASHIER_TALKING0";
import { SPR_CINEMA_CASHIER_TALKING1 } from "../generated/images/SPR_CINEMA_CASHIER_TALKING1";
import { SPR_CINEMA_CASHIER_TALKING2 } from "../generated/images/SPR_CINEMA_CASHIER_TALKING2";
import { SPR_CINEMA_CASHIER1 } from "../generated/images/SPR_CINEMA_CASHIER1";
import { SPR_CINEMA_CASHIER2 } from "../generated/images/SPR_CINEMA_CASHIER2";

const CASHIER_HOTSPOT = createMaskHotspot(SPR_CINEMA_CASHIER0, HotspotId.CINEMA_CASHIER);

const ANIM_CASHIER = new ImageAnimation(10, 12, ZIndex.BEHIND_GUY, true, CASHIER_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_CINEMA_CASHIER0,
            durationInTicks: 200,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_CINEMA_CASHIER1,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_CINEMA_CASHIER2,
            durationInTicks: 30,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_CINEMA_CASHIER1,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

const ANIM_CASHIER_TALKING = new ImageAnimation(10, 12, ZIndex.BEHIND_GUY, true, CASHIER_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_CINEMA_CASHIER_TALKING0,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_CINEMA_CASHIER_TALKING1,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_CINEMA_CASHIER_TALKING2,
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
        return { talkAnchorLeft: 55, talkAnchorBottom: 15 };
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
