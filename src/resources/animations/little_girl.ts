import { ImageAnimation, Animation, NO_LEFT_MOVEMENT } from "@/animations";
import { createMaskHotspot, HotspotId } from "@/hotspots";
import { ZIndex } from "@/zIndex";
import { CanTalkAnimation } from "./talkingCharacter";
import { TalkingCharacter } from "@/characters";
import { SPR_GIRL_JUMPING_ROPE_0 } from "../generated/images/SPR_GIRL_JUMPING_ROPE_0";
import { SPR_GIRL_JUMPING_ROPE_1 } from "../generated/images/SPR_GIRL_JUMPING_ROPE_1";
import { SPR_GIRL_JUMPING_ROPE_2 } from "../generated/images/SPR_GIRL_JUMPING_ROPE_2";
import { SPR_GIRL_JUMPING_ROPE_3 } from "../generated/images/SPR_GIRL_JUMPING_ROPE_3";
import { SPR_GIRL_STILL_0 } from "../generated/images/SPR_GIRL_STILL_0";
import { SPR_GIRL_TALKING_0 } from "../generated/images/SPR_GIRL_TALKING_0";
import { SPR_GIRL_TALKING_1 } from "../generated/images/SPR_GIRL_TALKING_1";

const GIRL_JUMPING_ROPE_HOTSPOT = createMaskHotspot(SPR_GIRL_JUMPING_ROPE_2, HotspotId.LITTLE_GIRL);

const little_girl_X = 48;
const little_girl_Y = 14;

export const LITTLE_GIRL_POSITION_FOR_ACTION = {
    left: little_girl_X + 22,
    lookToTheRight: false
};

const ANIM_GIRL_JUMPING_ROPE = new ImageAnimation(little_girl_X, little_girl_Y, ZIndex.FRONT, true, GIRL_JUMPING_ROPE_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_GIRL_JUMPING_ROPE_0,
            durationInTicks: 6,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_GIRL_JUMPING_ROPE_1,
            durationInTicks: 6,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_GIRL_JUMPING_ROPE_2,
            durationInTicks: 6,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_GIRL_JUMPING_ROPE_3,
            durationInTicks: 6,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

const GIRL_STILL_HOTSPOT = createMaskHotspot(SPR_GIRL_STILL_0, HotspotId.LITTLE_GIRL);

const ANIM_GIRL_TALKING = new ImageAnimation(little_girl_X, little_girl_Y + 2, ZIndex.FRONT, true, GIRL_STILL_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_GIRL_STILL_0,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_GIRL_TALKING_0,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_GIRL_TALKING_1,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

const ANIM_GIRL_NOT_TALKING = new ImageAnimation(48, 16, ZIndex.FRONT, true, GIRL_STILL_HOTSPOT,
        NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_GIRL_STILL_0,
            durationInTicks: 50,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

export class LittleGirlAnimation extends CanTalkAnimation {

    getCharacter(): TalkingCharacter {
        return 'LITTLE_GIRL';
    }

    getTalkAnchor(): { talkAnchorLeft: number; talkAnchorBottom: number; } {
        return { talkAnchorLeft: little_girl_X + 7, talkAnchorBottom: little_girl_Y + 1 };
    }

    startTalkingAnimation(): Animation {
        return ANIM_GIRL_TALKING;
    }

    stopTalkingAnimation() {
        // Nothing special
    }

    tickNonTalking() {
        if (this.isDialogInProgress()) {
            return ANIM_GIRL_NOT_TALKING.tick();
        } else {
            return ANIM_GIRL_JUMPING_ROPE.tick();
        }
    }

}
