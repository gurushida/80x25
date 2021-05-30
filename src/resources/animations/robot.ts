import { ImageAnimation, Animation, NO_LEFT_MOVEMENT } from "@/animations";
import { createMaskHotspot, HotspotId } from "@/hotspots";
import { ZIndex } from "@/zIndex";
import { CanTalkAnimation } from "./talkingCharacter";
import { TalkingCharacter } from "@/characters";
import { SPR_ROBOT_0 } from "../generated/images/SPR_ROBOT_0";
import { SPR_ROBOT_1 } from "../generated/images/SPR_ROBOT_1";
import { SPR_ROBOT_TALKING_0 } from "../generated/images/SPR_ROBOT_TALKING_0";
import { SPR_ROBOT_TALKING_1 } from "../generated/images/SPR_ROBOT_TALKING_1";

const ROBOT_HOTSPOT = createMaskHotspot(SPR_ROBOT_0, HotspotId.ROBOT);

const robot_X = 22;
const robot_Y = 15;

export const ROBOT_POSITION_FOR_ACTION = {
    left: robot_X + 13,
    lookToTheRight: false
};

const ANIM_ROBOT = new ImageAnimation(robot_X, robot_Y, ZIndex.BEHIND_GUY, true, ROBOT_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_ROBOT_0,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_ROBOT_1,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

const ANIM_ROBOT_TALKING = new ImageAnimation(robot_X, robot_Y, ZIndex.BEHIND_GUY, true, ROBOT_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_ROBOT_TALKING_0,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_ROBOT_TALKING_1,
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
        return { talkAnchorLeft: robot_X + 5, talkAnchorBottom: robot_Y - 1 };
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
