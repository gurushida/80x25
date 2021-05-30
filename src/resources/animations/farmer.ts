import { ImageAnimation, Animation, NO_LEFT_MOVEMENT } from "@/animations";
import { createMaskHotspot, HotspotId } from "@/hotspots";
import { ZIndex } from "@/zIndex";
import { CanTalkAnimation } from "./talkingCharacter";
import { TalkingCharacter } from "@/characters";
import { SPR_FARMER_0 } from "../generated/images/SPR_FARMER_0";
import { SPR_FARMER_1 } from "../generated/images/SPR_FARMER_1";
import { SPR_FARMER_2 } from "../generated/images/SPR_FARMER_2";
import { SPR_FARMER_TALKING_0 } from "../generated/images/SPR_FARMER_TALKING_0";
import { SPR_FARMER_TALKING_1 } from "../generated/images/SPR_FARMER_TALKING_1";
import { SPR_FARMER_TALKING_2 } from "../generated/images/SPR_FARMER_TALKING_2";

const FARMER_HOTSPOT = createMaskHotspot(SPR_FARMER_0, HotspotId.FARMER);

const farmer_X = 38;
const farmer_Y = 9;

const scratch_ticks = 10;

const ANIM_FARMER = new ImageAnimation(farmer_X, farmer_Y, ZIndex.BEHIND_GUY, true, FARMER_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_FARMER_0,
            durationInTicks: 200,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_FARMER_1,
            durationInTicks: scratch_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_FARMER_2,
            durationInTicks: scratch_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_FARMER_1,
            durationInTicks: scratch_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_FARMER_2,
            durationInTicks: scratch_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_FARMER_1,
            durationInTicks: scratch_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_FARMER_2,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

const ANIM_FARMER_TALKING = new ImageAnimation(farmer_X, farmer_Y, ZIndex.BEHIND_GUY, true, FARMER_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_FARMER_TALKING_0,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_FARMER_TALKING_1,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_FARMER_TALKING_2,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

export class FarmerAnimation extends CanTalkAnimation {

    getCharacter(): TalkingCharacter {
        return 'FARMER';
    }

    getTalkAnchor(): { talkAnchorLeft: number; talkAnchorBottom: number; } {
        return { talkAnchorLeft: farmer_X + 6, talkAnchorBottom: farmer_Y + 1 };
    }

    startTalkingAnimation(): Animation {
        return ANIM_FARMER_TALKING;
    }

    stopTalkingAnimation() {
        // Nothing special
    }

    tickNonTalking() {
        return ANIM_FARMER.tick();
    }

}
