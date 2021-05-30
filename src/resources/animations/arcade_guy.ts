import { ImageAnimation, Animation, NO_LEFT_MOVEMENT } from "@/animations";
import { createMaskHotspot, HotspotId } from "@/hotspots";
import { ZIndex } from "@/zIndex";
import { CanTalkAnimation } from "./talkingCharacter";
import { TalkingCharacter } from "@/characters";
import { SPR_ARCADE_GUY_0 } from "../generated/images/SPR_ARCADE_GUY_0";
import { SPR_ARCADE_GUY_1 } from "../generated/images/SPR_ARCADE_GUY_1";
import { SPR_ARCADE_GUY_2 } from "../generated/images/SPR_ARCADE_GUY_2";
import { SPR_ARCADE_GUY_3 } from "../generated/images/SPR_ARCADE_GUY_3";
import { SPR_ARCADE_GUY_4 } from "../generated/images/SPR_ARCADE_GUY_4";
import { SPR_ARCADE_GUY_TALKING } from "../generated/images/SPR_ARCADE_GUY_TALKING";

const ARCADE_GUY_HOTSPOT = createMaskHotspot(SPR_ARCADE_GUY_0, HotspotId.ARCADE_GUY);

const CHEWING = 16;
const arcade_guy_X = 35;
const arcade_guy_Y = 10;

export const ARCADE_GUY_POSITION_FOR_ACTION = {
    left: arcade_guy_X - 7,
    lookToTheRight: true,
};


const ANIM_ARCADE_GUY = new ImageAnimation(arcade_guy_X, arcade_guy_Y, ZIndex.BEHIND_GUY, true, ARCADE_GUY_HOTSPOT, NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_ARCADE_GUY_0,
            durationInTicks: CHEWING,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_ARCADE_GUY_1,
            durationInTicks: CHEWING,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_ARCADE_GUY_0,
            durationInTicks: CHEWING,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_ARCADE_GUY_1,
            durationInTicks: CHEWING,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_ARCADE_GUY_0,
            durationInTicks: CHEWING,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_ARCADE_GUY_1,
            durationInTicks: CHEWING,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_ARCADE_GUY_2,
            durationInTicks: 5,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_ARCADE_GUY_3,
            durationInTicks: 5,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_ARCADE_GUY_4,
            durationInTicks: 25,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_ARCADE_GUY_2,
            durationInTicks: 5,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

const ANIM_ARCADE_GUY_TALKING = new ImageAnimation(arcade_guy_X, arcade_guy_Y, ZIndex.BEHIND_GUY, true, ARCADE_GUY_HOTSPOT, NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_ARCADE_GUY_2,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_ARCADE_GUY_0,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_ARCADE_GUY_TALKING,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

export class ArcadeGuyAnimation extends CanTalkAnimation {

    getCharacter(): TalkingCharacter {
        return 'ARCADE_GUY';
    }

    getTalkAnchor(): { talkAnchorLeft: number; talkAnchorBottom: number; } {
        return { talkAnchorLeft: arcade_guy_X + 5, talkAnchorBottom: arcade_guy_Y };
    }

    startTalkingAnimation(): Animation {
        return ANIM_ARCADE_GUY_TALKING;
    }

    stopTalkingAnimation() {
        // Nothing special
    }

    tickNonTalking() {
        return ANIM_ARCADE_GUY.tick();
    }

}
