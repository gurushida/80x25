import { ImageAnimation, Animation, NO_LEFT_MOVEMENT } from "@/animations";
import { createMaskHotspot, HotspotId } from "@/hotspots";
import { ZIndex } from "@/zIndex";
import { CanTalkAnimation } from "./talkingCharacter";
import { TalkingCharacter } from "@/characters";
import { SPR_BLACKSMITH_LEFT_0 } from "../generated/images/SPR_BLACKSMITH_LEFT_0";
import { SPR_BLACKSMITH_LEFT_1 } from "../generated/images/SPR_BLACKSMITH_LEFT_1";
import { SPR_BLACKSMITH_RIGHT_0 } from "../generated/images/SPR_BLACKSMITH_RIGHT_0";
import { SPR_BLACKSMITH_TALKING_0 } from "../generated/images/SPR_BLACKSMITH_TALKING_0";
import { SPR_BLACKSMITH_TALKING_1 } from "../generated/images/SPR_BLACKSMITH_TALKING_1";
import { SPR_BLACKSMITH_TALKING_2 } from "../generated/images/SPR_BLACKSMITH_TALKING_2";

const BLACKSMITH_HOTSPOT = createMaskHotspot(SPR_BLACKSMITH_LEFT_0, HotspotId.BLACKSMITH);

const ANIM_BLACKSMITH_LEFT = new ImageAnimation(21, 16, ZIndex.FRONT, true, BLACKSMITH_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_BLACKSMITH_LEFT_0,
            durationInTicks: 17,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BLACKSMITH_LEFT_1,
            durationInTicks: 17,
            offsetX: 0,
            offsetY: 0,
        },
    ]);


const ANIM_BLACKSMITH_RIGHT = new ImageAnimation(21, 16, ZIndex.BEHIND_GUY, true, undefined,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_BLACKSMITH_RIGHT_0,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

const ANIM_BLACKSMITH_TALKING = new ImageAnimation(21, 16, ZIndex.BEHIND_GUY, true, undefined,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_BLACKSMITH_TALKING_0,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BLACKSMITH_TALKING_1,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BLACKSMITH_TALKING_2,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

export class BlacksmithAnimation extends CanTalkAnimation {

    getCharacter(): TalkingCharacter {
        return 'BLACKSMITH';
    }

    getTalkAnchor(): { talkAnchorLeft: number; talkAnchorBottom: number; } {
        return { talkAnchorLeft: 33, talkAnchorBottom: 14 };
    }

    startTalkingAnimation(): Animation {
        return ANIM_BLACKSMITH_TALKING;
    }

    stopTalkingAnimation() {
        // Nothing special
    }

    tickNonTalking() {
        if (this.isDialogInProgress()) {
            return ANIM_BLACKSMITH_RIGHT.tick();
        } else {
            return ANIM_BLACKSMITH_LEFT.tick();
        }
    }

    startDialog() {
        super.startDialog();
        this.characterAnimation = ANIM_BLACKSMITH_RIGHT;
    }

    endDialog() {
        super.endDialog();
        this.characterAnimation = ANIM_BLACKSMITH_LEFT;
    }

}
