import { ImageAnimation, Animation, NO_LEFT_MOVEMENT } from "@/animations";
import { createMaskHotspot, HotspotId } from "@/hotspots";
import { ZIndex } from "@/zIndex";
import { CanTalkAnimation } from "./talkingCharacter";
import { TalkingCharacter } from "@/characters";
import { SPR_COOK_0 } from "../generated/images/SPR_COOK_0";
import { SPR_COOK_1 } from "../generated/images/SPR_COOK_1";
import { SPR_COOK_NOT_TALKING } from "../generated/images/SPR_COOK_NOT_TALKING";
import { SPR_COOK_TALKING_0 } from "../generated/images/SPR_COOK_TALKING_0";
import { SPR_COOK_TALKING_1 } from "../generated/images/SPR_COOK_TALKING_1";
import { SPR_COOK_TALKING_2 } from "../generated/images/SPR_COOK_TALKING_2";

const cook_X = 12;
const cook_Y = 13;

const COOK_HOTSPOT = createMaskHotspot(SPR_COOK_0, HotspotId.COOK);

const ANIM_COOK = new ImageAnimation(cook_X, cook_Y, ZIndex.BEHIND_GUY, true, COOK_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_COOK_0,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_COOK_1,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

const ANIM_COOK_NOT_TALKING = new ImageAnimation(cook_X, cook_Y, ZIndex.BEHIND_GUY, true, COOK_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_COOK_NOT_TALKING,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

const ANIM_COOK_TALKING = new ImageAnimation(cook_X, cook_Y, ZIndex.BEHIND_GUY, true, COOK_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_COOK_TALKING_0,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_COOK_TALKING_1,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_COOK_TALKING_2,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

export class CookAnimation extends CanTalkAnimation {

    getCharacter(): TalkingCharacter {
        return 'COOK';
    }

    getTalkAnchor(): { talkAnchorLeft: number; talkAnchorBottom: number; } {
        return { talkAnchorLeft: cook_X + 6, talkAnchorBottom: cook_Y };
    }

    startTalkingAnimation(): Animation {
        return ANIM_COOK_TALKING;
    }

    stopTalkingAnimation() {
        // Nothing special
    }

    tickNonTalking() {
        if (this.isDialogInProgress()) {
            return ANIM_COOK_NOT_TALKING.tick();
        } else {
            return ANIM_COOK.tick();
        }
    }

}
