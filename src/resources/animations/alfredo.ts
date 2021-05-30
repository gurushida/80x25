import { ImageAnimation, Animation, NO_LEFT_MOVEMENT } from "@/animations";
import { createMaskHotspot, HotspotId } from "@/hotspots";
import { ZIndex } from "@/zIndex";
import { CanTalkAnimation } from "./talkingCharacter";
import { TalkingCharacter } from "@/characters";
import { SPR_ALFREDO_0 } from "../generated/images/SPR_ALFREDO_0";
import { SPR_ALFREDO_1 } from "../generated/images/SPR_ALFREDO_1";
import { SPR_ALFREDO_2 } from "../generated/images/SPR_ALFREDO_2";
import { SPR_ALFREDO_3 } from "../generated/images/SPR_ALFREDO_3";
import { SPR_ALFREDO_TALKING_0 } from "../generated/images/SPR_ALFREDO_TALKING_0";
import { SPR_ALFREDO_TALKING_1 } from "../generated/images/SPR_ALFREDO_TALKING_1";
import { SPR_ALFREDO_TALKING_2 } from "../generated/images/SPR_ALFREDO_TALKING_2";

const ALFREDO_HOTSPOT = createMaskHotspot(SPR_ALFREDO_0, HotspotId.ALFREDO);

const alfredo_X = 35;
const alfredo_Y = 12;


const ANIM_ALFREDO = new ImageAnimation(alfredo_X, alfredo_Y, ZIndex.BEHIND_GUY, true, ALFREDO_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_ALFREDO_0,
            durationInTicks: 4,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_ALFREDO_1,
            durationInTicks: 4,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_ALFREDO_2,
            durationInTicks: 4,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_ALFREDO_3,
            durationInTicks: 4,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

const ANIM_ALFREDO_TALKING = new ImageAnimation(alfredo_X, alfredo_Y, ZIndex.BEHIND_GUY, true, ALFREDO_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_ALFREDO_TALKING_0,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_ALFREDO_TALKING_1,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_ALFREDO_TALKING_2,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

export class AlfredoAnimation extends CanTalkAnimation {

    getCharacter(): TalkingCharacter {
        return 'ALFREDO';
    }

    getTalkAnchor(): { talkAnchorLeft: number; talkAnchorBottom: number; } {
        return { talkAnchorLeft: alfredo_X + 5, talkAnchorBottom: alfredo_Y + 1 };
    }

    startTalkingAnimation(): Animation {
        return ANIM_ALFREDO_TALKING;
    }

    stopTalkingAnimation() {
        // Nothing special
    }

    tickNonTalking() {
        return ANIM_ALFREDO.tick();
    }

}
