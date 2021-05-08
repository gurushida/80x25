import { ImageAnimation, Animation, NO_LEFT_MOVEMENT } from "@/animations";
import { createMaskHotspot, HotspotId } from "@/hotspots";
import { ZIndex } from "@/zIndex";
import { CanTalkAnimation } from "./talkingCharacter";
import { TalkingCharacter } from "@/characters";
import { SPR_GIRL_JUMPING_ROPE2 } from "../generated/images/SPR_GIRL_JUMPING_ROPE2";
import { SPR_GIRL_JUMPING_ROPE0 } from "../generated/images/SPR_GIRL_JUMPING_ROPE0";
import { SPR_GIRL_JUMPING_ROPE1 } from "../generated/images/SPR_GIRL_JUMPING_ROPE1";
import { SPR_GIRL_JUMPING_ROPE3 } from "../generated/images/SPR_GIRL_JUMPING_ROPE3";
import { SPR_GIRL_STILL0 } from "../generated/images/SPR_GIRL_STILL0";
import { SPR_GIRL_TALKING0 } from "../generated/images/SPR_GIRL_TALKING0";
import { SPR_GIRL_TALKING1 } from "../generated/images/SPR_GIRL_TALKING1";

const GIRL_JUMPING_ROPE_HOTSPOT = createMaskHotspot(SPR_GIRL_JUMPING_ROPE2, HotspotId.LITTLE_GIRL);

const ANIM_GIRL_JUMPING_ROPE = new ImageAnimation(46, 14, ZIndex.BEHIND_GUY, true, GIRL_JUMPING_ROPE_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_GIRL_JUMPING_ROPE0,
            durationInTicks: 6,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_GIRL_JUMPING_ROPE1,
            durationInTicks: 6,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_GIRL_JUMPING_ROPE2,
            durationInTicks: 6,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_GIRL_JUMPING_ROPE3,
            durationInTicks: 6,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

const GIRL_STILL_HOTSPOT = createMaskHotspot(SPR_GIRL_STILL0, HotspotId.LITTLE_GIRL);

const ANIM_GIRL_TALKING = new ImageAnimation(46, 16, ZIndex.BEHIND_GUY, true, GIRL_STILL_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_GIRL_STILL0,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_GIRL_TALKING0,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_GIRL_TALKING1,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

const ANIM_GIRL_NOT_TALKING = new ImageAnimation(46, 16, ZIndex.BEHIND_GUY, true, GIRL_STILL_HOTSPOT,
        NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_GIRL_STILL0,
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
        return { talkAnchorLeft: 53, talkAnchorBottom: 15 };
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
