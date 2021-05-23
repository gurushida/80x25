import { ImageAnimation, Animation, NO_LEFT_MOVEMENT } from "@/animations";
import { createMaskHotspot, HotspotId } from "@/hotspots";
import { ZIndex } from "@/zIndex";
import { CanTalkAnimation } from "./talkingCharacter";
import { TalkingCharacter } from "@/characters";
import { SPR_CHINESE_MASTER_0 } from "../generated/images/SPR_CHINESE_MASTER_0";
import { SPR_CHINESE_MASTER_TALKING_1 } from "../generated/images/SPR_CHINESE_MASTER_TALKING_1";
import { SPR_CHINESE_MASTER_TALKING_2 } from "../generated/images/SPR_CHINESE_MASTER_TALKING_2";
import { SPR_CHINESE_MASTER_TALKING_0 } from "../generated/images/SPR_CHINESE_MASTER_TALKING_0";
import { SPR_CHINESE_MASTER_NOT_TALKING } from "../generated/images/SPR_CHINESE_MASTER_NOT_TALKING";
import { SPR_CHINESE_MASTER_1 } from "../generated/images/SPR_CHINESE_MASTER_1";

const chinese_master_X = 54;
const chinese_master_Y = 14;

const CHINESE_MASTER_HOTSPOT = createMaskHotspot(SPR_CHINESE_MASTER_0, HotspotId.CHINESE_MASTER);

const ANIM_CHINESE_MASTER = new ImageAnimation(chinese_master_X, chinese_master_Y, ZIndex.BEHIND_GUY, true, CHINESE_MASTER_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_CHINESE_MASTER_0,
            durationInTicks: 180,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_CHINESE_MASTER_1,
            durationInTicks: 5,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

const ANIM_CHINESE_MASTER_NOT_TALKING = new ImageAnimation(chinese_master_X, chinese_master_Y, ZIndex.BEHIND_GUY, true, CHINESE_MASTER_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_CHINESE_MASTER_NOT_TALKING,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

const ANIM_CHINESE_MASTER_TALKING = new ImageAnimation(chinese_master_X, chinese_master_Y, ZIndex.BEHIND_GUY, true, CHINESE_MASTER_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_CHINESE_MASTER_TALKING_0,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_CHINESE_MASTER_TALKING_1,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_CHINESE_MASTER_TALKING_2,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

export class ChineseMasterAnimation extends CanTalkAnimation {

    getCharacter(): TalkingCharacter {
        return 'CHINESE_MASTER';
    }

    getTalkAnchor(): { talkAnchorLeft: number; talkAnchorBottom: number; } {
        return { talkAnchorLeft: 60, talkAnchorBottom: 13 };
    }

    startTalkingAnimation(): Animation {
        return ANIM_CHINESE_MASTER_TALKING;
    }

    stopTalkingAnimation() {
        // Nothing special
    }

    tickNonTalking() {
        if (this.isDialogInProgress()) {
            return ANIM_CHINESE_MASTER_NOT_TALKING.tick();
        } else {
            return ANIM_CHINESE_MASTER.tick();
        }
    }

}
