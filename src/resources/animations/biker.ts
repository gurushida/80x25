import { ImageAnimation, Animation, NO_LEFT_MOVEMENT } from "@/animations";
import { createMaskHotspot, HotspotId } from "@/hotspots";
import { ZIndex } from "@/zIndex";
import { CanTalkAnimation } from "./talkingCharacter";
import { TalkingCharacter } from "@/characters";
import { SPR_BIKER_0 } from "../generated/images/SPR_BIKER_0";
import { SPR_BIKER_1 } from "../generated/images/SPR_BIKER_1";
import { SPR_BIKER_2 } from "../generated/images/SPR_BIKER_2";
import { SPR_BIKER_3 } from "../generated/images/SPR_BIKER_3";
import { SPR_BIKER_4 } from "../generated/images/SPR_BIKER_4";
import { SPR_BIKER_5 } from "../generated/images/SPR_BIKER_5";
import { SPR_BIKER_6 } from "../generated/images/SPR_BIKER_6";
import { SPR_BIKER_7 } from "../generated/images/SPR_BIKER_7";
import { SPR_BIKER_TALKING_0 } from "../generated/images/SPR_BIKER_TALKING_0";
import { SPR_BIKER_TALKING_1 } from "../generated/images/SPR_BIKER_TALKING_1";
import { SPR_BIKER_TALKING_2 } from "../generated/images/SPR_BIKER_TALKING_2";

const BIKER_HOTSPOT = createMaskHotspot(SPR_BIKER_0, HotspotId.BIKER);

const ANIM_BIKER = new ImageAnimation(36, 10, ZIndex.BEHIND_GUY, true, BIKER_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_BIKER_0,
            durationInTicks: 200,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BIKER_1,
            durationInTicks: 5,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BIKER_2,
            durationInTicks: 5,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BIKER_3,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BIKER_4,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BIKER_3,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BIKER_4,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BIKER_3,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BIKER_4,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BIKER_2,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BIKER_1,
            durationInTicks: 5,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BIKER_5,
            durationInTicks: 5,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BIKER_6,
            durationInTicks: 5,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BIKER_7,
            durationInTicks: 5,
            offsetX: 0,
            offsetY: 0,
        },
    ]);


const ANIM_BIKER_TALKING = new ImageAnimation(36, 10, ZIndex.BEHIND_GUY, true, BIKER_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_BIKER_TALKING_0,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BIKER_TALKING_1,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BIKER_TALKING_2,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

const ANIM_BIKER_NOT_TALKING = new ImageAnimation(36, 10, ZIndex.BEHIND_GUY, true, BIKER_HOTSPOT,
        NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_BIKER_0,
            durationInTicks: 50,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

export class BikerAnimation extends CanTalkAnimation {

    getCharacter(): TalkingCharacter {
        return 'BIKER';
    }

    getTalkAnchor(): { talkAnchorLeft: number; talkAnchorBottom: number; } {
        return { talkAnchorLeft: 47, talkAnchorBottom: 9 };
    }

    startTalkingAnimation(): Animation {
        return ANIM_BIKER_TALKING;
    }

    stopTalkingAnimation() {
        // Nothing special
    }

    tickNonTalking() {
        if (this.isDialogInProgress()) {
            return ANIM_BIKER_NOT_TALKING.tick();
        } else {
            return ANIM_BIKER.tick();
        }
    }

}
