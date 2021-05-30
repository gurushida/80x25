import { ImageAnimation, Animation, NO_LEFT_MOVEMENT } from "@/animations";
import { createMaskHotspot, HotspotId } from "@/hotspots";
import { ZIndex } from "@/zIndex";
import { CanTalkAnimation } from "./talkingCharacter";
import { TalkingCharacter } from "@/characters";
import { SPR_HIGHLANDER_RIGHT_0 } from "../generated/images/SPR_HIGHLANDER_RIGHT_0";
import { SPR_HIGHLANDER_RIGHT_1 } from "../generated/images/SPR_HIGHLANDER_RIGHT_1";
import { SPR_HIGHLANDER_RIGHT_2 } from "../generated/images/SPR_HIGHLANDER_RIGHT_2";
import { SPR_HIGHLANDER_LEFT_0 } from "../generated/images/SPR_HIGHLANDER_LEFT_0";
import { SPR_HIGHLANDER_LEFT_1 } from "../generated/images/SPR_HIGHLANDER_LEFT_1";
import { SPR_HIGHLANDER_LEFT_2 } from "../generated/images/SPR_HIGHLANDER_LEFT_2";
import { SPR_HIGHLANDER_TALKING_0 } from "../generated/images/SPR_HIGHLANDER_TALKING_0";
import { SPR_HIGHLANDER_TALKING_1 } from "../generated/images/SPR_HIGHLANDER_TALKING_1";
import { SPR_HIGHLANDER_TALKING_2 } from "../generated/images/SPR_HIGHLANDER_TALKING_2";

const HIGHLANDER_HOTSPOT = createMaskHotspot(SPR_HIGHLANDER_RIGHT_0, HotspotId.HIGHLANDER);

const highlander_X = 48;
const highlander_Y = 12;


const ANIM_HIGHLANDER_RIGHT = new ImageAnimation(highlander_X, highlander_Y, ZIndex.BEHIND_GUY, true, HIGHLANDER_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_HIGHLANDER_RIGHT_0,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_HIGHLANDER_RIGHT_1,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_HIGHLANDER_RIGHT_0,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_HIGHLANDER_RIGHT_1,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_HIGHLANDER_RIGHT_2,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_HIGHLANDER_RIGHT_1,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_HIGHLANDER_RIGHT_2,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_HIGHLANDER_RIGHT_1,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_HIGHLANDER_RIGHT_2,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_HIGHLANDER_RIGHT_1,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_HIGHLANDER_RIGHT_2,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
    ]);


const ANIM_HIGHLANDER_LEFT = new ImageAnimation(highlander_X, highlander_Y, ZIndex.BEHIND_GUY, true, HIGHLANDER_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_HIGHLANDER_LEFT_0,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_HIGHLANDER_LEFT_1,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_HIGHLANDER_LEFT_0,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_HIGHLANDER_LEFT_1,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_HIGHLANDER_LEFT_2,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_HIGHLANDER_LEFT_1,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_HIGHLANDER_LEFT_2,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_HIGHLANDER_LEFT_1,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_HIGHLANDER_LEFT_2,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_HIGHLANDER_LEFT_1,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_HIGHLANDER_LEFT_2,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

const ANIM_HIGHLANDER_TALKING = new ImageAnimation(highlander_X - 1, highlander_Y, ZIndex.BEHIND_GUY, true, HIGHLANDER_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_HIGHLANDER_TALKING_0,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_HIGHLANDER_TALKING_1,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_HIGHLANDER_TALKING_2,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

export class HighlanderAnimation extends CanTalkAnimation {

    getCharacter(): TalkingCharacter {
        return 'HIGHLANDER';
    }

    getTalkAnchor(): { talkAnchorLeft: number; talkAnchorBottom: number; } {
        return { talkAnchorLeft: highlander_X + 4, talkAnchorBottom: highlander_Y - 1 };
    }

    startTalkingAnimation(): Animation {
        return ANIM_HIGHLANDER_TALKING;
    }

    stopTalkingAnimation() {
        // Nothing special
    }

    tickNonTalking() {
        if (this.isDialogInProgress()) {
            return ANIM_HIGHLANDER_LEFT.tick();
        } else {
            return ANIM_HIGHLANDER_RIGHT.tick();
        }
    }

    startDialog() {
        super.startDialog();
        this.characterAnimation = ANIM_HIGHLANDER_LEFT;
    }

    endDialog() {
        super.endDialog();
        this.characterAnimation = ANIM_HIGHLANDER_RIGHT;
    }

}
