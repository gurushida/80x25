import { ImageAnimation, Animation, NO_LEFT_MOVEMENT } from "@/animations";
import { createMaskHotspot, HotspotId } from "@/hotspots";
import { ZIndex } from "@/zIndex";
import { CanTalkAnimation } from "./talkingCharacter";
import { TalkingCharacter } from "@/characters";
import { SPR_EVIL_QUEEN0 } from "../generated/images/SPR_EVIL_QUEEN0";
import { SPR_EVIL_QUEEN1 } from "../generated/images/SPR_EVIL_QUEEN1";
import { SPR_EVIL_QUEEN2 } from "../generated/images/SPR_EVIL_QUEEN2";
import { SPR_EVIL_QUEEN3 } from "../generated/images/SPR_EVIL_QUEEN3";

const ANIM_EVIL_QUEEN = new ImageAnimation(56, 13, ZIndex.BEHIND_GUY, true, createMaskHotspot(SPR_EVIL_QUEEN0, HotspotId.EVIL_QUEEN),
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_EVIL_QUEEN0,
            durationInTicks: 150,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_EVIL_QUEEN1,
            durationInTicks: 5,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

const ANIM_EVIL_QUEEN_TALKING = new ImageAnimation(56, 13, ZIndex.BEHIND_GUY, true, createMaskHotspot(SPR_EVIL_QUEEN0, HotspotId.EVIL_QUEEN),
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_EVIL_QUEEN3,
            durationInTicks: 4,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_EVIL_QUEEN2,
            durationInTicks: 4,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_EVIL_QUEEN3,
            durationInTicks: 4,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_EVIL_QUEEN2,
            durationInTicks: 4,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_EVIL_QUEEN3,
            durationInTicks: 4,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_EVIL_QUEEN2,
            durationInTicks: 12,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

export class EvilQueenAnimation extends CanTalkAnimation {

    getCharacter(): TalkingCharacter {
        return 'EVIL_QUEEN';
    }

    getTalkAnchor(): { talkAnchorLeft: number; talkAnchorBottom: number; } {
        return { talkAnchorLeft: 62, talkAnchorBottom: 11 };
    }

    startTalkingAnimation(): Animation {
        return ANIM_EVIL_QUEEN_TALKING;
    }

    stopTalkingAnimation() {
        // Nothing special
    }

    tickNonTalking() {
        return ANIM_EVIL_QUEEN.tick();
    }

}
