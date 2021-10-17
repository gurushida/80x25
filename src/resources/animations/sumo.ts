import { ImageAnimation, Animation, NO_LEFT_MOVEMENT } from "@/animations";
import { createMaskHotspot, HotspotId } from "@/hotspots";
import { ZIndex } from "@/zIndex";
import { CanTalkAnimation } from "./talkingCharacter";
import { TalkingCharacter } from "@/characters";
import { SPR_SUMO_0 } from "../generated/images/SPR_SUMO_0";
import { SPR_SUMO_1 } from "../generated/images/SPR_SUMO_1";
import { SPR_SUMO_TALKING_2 } from "../generated/images/SPR_SUMO_TALKING_2";
import { SPR_SUMO_TALKING_0 } from "../generated/images/SPR_SUMO_TALKING_0";
import { SPR_SUMO_TALKING_1 } from "../generated/images/SPR_SUMO_TALKING_1";

const sumo_X = 30;
const sumo_Y = 12;

const SUMO_HOTSPOT = createMaskHotspot(SPR_SUMO_0, HotspotId.SUMO);

const ANIM_SUMO = new ImageAnimation(sumo_X, sumo_Y, ZIndex.BEHIND_GUY, true, SUMO_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_SUMO_0,
            durationInTicks: 6,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_SUMO_1,
            durationInTicks: 6,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

const ANIM_SUMO_NOT_TALKING = new ImageAnimation(sumo_X, sumo_Y, ZIndex.BEHIND_GUY, true, SUMO_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_SUMO_TALKING_2,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

const ANIM_SUMO_TALKING = new ImageAnimation(sumo_X, sumo_Y, ZIndex.BEHIND_GUY, true, SUMO_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_SUMO_TALKING_0,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_SUMO_TALKING_1,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_SUMO_TALKING_2,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

export class SumoAnimation extends CanTalkAnimation {

    getCharacter(): TalkingCharacter {
        return 'SUMO';
    }

    getTalkAnchor(): { talkAnchorLeft: number; talkAnchorBottom: number; } {
        return { talkAnchorLeft: sumo_X + 6, talkAnchorBottom: sumo_Y };
    }

    startTalkingAnimation(): Animation {
        return ANIM_SUMO_TALKING;
    }

    stopTalkingAnimation() {
        // Nothing special
    }

    tickNonTalking() {
        if (this.isDialogInProgress()) {
            return ANIM_SUMO_NOT_TALKING.tick();
        } else {
            return ANIM_SUMO.tick();
        }
    }

}
