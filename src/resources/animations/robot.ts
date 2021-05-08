import { ImageAnimation, Animation, NO_LEFT_MOVEMENT } from "@/animations";
import { createMaskHotspot, HotspotId } from "@/hotspots";
import { ZIndex } from "@/zIndex";
import { CanTalkAnimation } from "./talkingCharacter";
import { TalkingCharacter } from "@/characters";
import { SPR_ROBOT0 } from "../generated/images/SPR_ROBOT0";
import { SPR_ROBOT_TALKING0 } from "../generated/images/SPR_ROBOT_TALKING0";
import { SPR_ROBOT1 } from "../generated/images/SPR_ROBOT1";
import { SPR_ROBOT_TALKING1 } from "../generated/images/SPR_ROBOT_TALKING1";

const ROBOT_HOTSPOT = createMaskHotspot(SPR_ROBOT0, HotspotId.ROBOT);

const ANIM_ROBOT = new ImageAnimation(22, 15, ZIndex.BEHIND_GUY, true, ROBOT_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_ROBOT0,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_ROBOT1,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

const ANIM_ROBOT_TALKING = new ImageAnimation(22, 15, ZIndex.BEHIND_GUY, true, ROBOT_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_ROBOT_TALKING0,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_ROBOT_TALKING1,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
    ]);


export class RobotAnimation extends CanTalkAnimation {

    getCharacter(): TalkingCharacter {
        return 'ROBOT';
    }

    getTalkAnchor(): { talkAnchorLeft: number; talkAnchorBottom: number; } {
        return { talkAnchorLeft: 27, talkAnchorBottom: 14 };
    }

    startTalkingAnimation(): Animation {
        return ANIM_ROBOT_TALKING;
    }

    stopTalkingAnimation() {
        // Nothing special
    }

    tickNonTalking() {
        return ANIM_ROBOT.tick();
    }

}
