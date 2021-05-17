import { ImageAnimation, Animation, NO_LEFT_MOVEMENT } from "@/animations";
import { createMaskHotspot, HotspotId } from "@/hotspots";
import { ZIndex } from "@/zIndex";
import { CanTalkAnimation } from "./talkingCharacter";
import { TalkingCharacter } from "@/characters";
import { SPR_DON_ALDO_0 } from "../generated/images/SPR_DON_ALDO_0";
import { SPR_DON_ALDO_TALKING_0 } from "../generated/images/SPR_DON_ALDO_TALKING_0";
import { SPR_DON_ALDO_TALKING_2 } from "../generated/images/SPR_DON_ALDO_TALKING_2";
import { SPR_DON_ALDO_TALKING_1 } from "../generated/images/SPR_DON_ALDO_TALKING_1";
import { SPR_DON_ALDO_1 } from "../generated/images/SPR_DON_ALDO_1";
import { SPR_DON_ALDO_2 } from "../generated/images/SPR_DON_ALDO_2";

const don_aldo_X = 71;
const don_aldo_Y = 14;

const fart_ticks = 3;

const DON_ALDO_HOTSPOT = createMaskHotspot(SPR_DON_ALDO_0, HotspotId.DON_ALDO);

const ANIM_DON_ALDO = new ImageAnimation(don_aldo_X, don_aldo_Y, ZIndex.BEHIND_GUY, true, DON_ALDO_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_DON_ALDO_0,
            durationInTicks: 300,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_DON_ALDO_2,
            durationInTicks: 70,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_DON_ALDO_1,
            durationInTicks: fart_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_DON_ALDO_2,
            durationInTicks: fart_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_DON_ALDO_1,
            durationInTicks: fart_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_DON_ALDO_2,
            durationInTicks: fart_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_DON_ALDO_1,
            durationInTicks: fart_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_DON_ALDO_2,
            durationInTicks: fart_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_DON_ALDO_1,
            durationInTicks: fart_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_DON_ALDO_2,
            durationInTicks: fart_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_DON_ALDO_1,
            durationInTicks: fart_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_DON_ALDO_2,
            durationInTicks: fart_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_DON_ALDO_1,
            durationInTicks: fart_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_DON_ALDO_2,
            durationInTicks: fart_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_DON_ALDO_1,
            durationInTicks: fart_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_DON_ALDO_2,
            durationInTicks: fart_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_DON_ALDO_1,
            durationInTicks: fart_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_DON_ALDO_2,
            durationInTicks: 30,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

const ANIM_DON_ALDO_NOT_TALKING = new ImageAnimation(don_aldo_X, don_aldo_Y, ZIndex.BEHIND_GUY, true, DON_ALDO_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_DON_ALDO_0,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
            },
    ]);

const ANIM_DON_ALDO_TALKING = new ImageAnimation(don_aldo_X, don_aldo_Y, ZIndex.BEHIND_GUY, true, DON_ALDO_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_DON_ALDO_TALKING_0,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_DON_ALDO_TALKING_1,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_DON_ALDO_TALKING_2,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

export class DonAldoAnimation extends CanTalkAnimation {

    getCharacter(): TalkingCharacter {
        return 'DON_ALDO';
    }

    getTalkAnchor(): { talkAnchorLeft: number; talkAnchorBottom: number; } {
        return { talkAnchorLeft: 73, talkAnchorBottom: 13 };
    }

    startTalkingAnimation(): Animation {
        return ANIM_DON_ALDO_TALKING;
    }

    stopTalkingAnimation() {
        // Nothing special
    }

    tickNonTalking() {
        if (this.isDialogInProgress()) {
            return ANIM_DON_ALDO_NOT_TALKING.tick();
        } else {
            return ANIM_DON_ALDO.tick();
        }
    }

}
