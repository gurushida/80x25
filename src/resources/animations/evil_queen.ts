import { ImageAnimation, Animation, NO_LEFT_MOVEMENT } from "@/animations";
import { createMaskHotspot, HotspotId } from "@/hotspots";
import { ZIndex } from "@/zIndex";
import { CanTalkAnimation } from "./talkingCharacter";
import { TalkingCharacter } from "@/characters";
import { SPR_EVIL_QUEEN_0 } from "../generated/images/SPR_EVIL_QUEEN_0";
import { SPR_EVIL_QUEEN_1 } from "../generated/images/SPR_EVIL_QUEEN_1";
import { SPR_EVIL_QUEEN_2 } from "../generated/images/SPR_EVIL_QUEEN_2";
import { SPR_EVIL_QUEEN_3 } from "../generated/images/SPR_EVIL_QUEEN_3";

const EVIL_QUEEN_HOTSPOT = createMaskHotspot(SPR_EVIL_QUEEN_0, HotspotId.EVIL_QUEEN);

const evil_queen_X = 56;
const evil_queen_Y = 13;


const ANIM_EVIL_QUEEN = new ImageAnimation(evil_queen_X, evil_queen_Y, ZIndex.BEHIND_GUY, true, EVIL_QUEEN_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_EVIL_QUEEN_0,
            durationInTicks: 150,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_EVIL_QUEEN_1,
            durationInTicks: 5,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

const ANIM_EVIL_QUEEN_TALKING = new ImageAnimation(evil_queen_X, evil_queen_Y, ZIndex.BEHIND_GUY, true, EVIL_QUEEN_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_EVIL_QUEEN_3,
            durationInTicks: 4,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_EVIL_QUEEN_2,
            durationInTicks: 4,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_EVIL_QUEEN_3,
            durationInTicks: 4,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_EVIL_QUEEN_2,
            durationInTicks: 4,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_EVIL_QUEEN_3,
            durationInTicks: 4,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_EVIL_QUEEN_2,
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
        return { talkAnchorLeft: evil_queen_X + 6, talkAnchorBottom: evil_queen_Y - 1 };
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
