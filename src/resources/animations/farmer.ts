import { ImageAnimation, Animation, NO_LEFT_MOVEMENT } from "@/animations";
import { createMaskHotspot, HotspotId } from "@/hotspots";
import { ZIndex } from "@/zIndex";
import { CanTalkAnimation } from "./talkingCharacter";
import { TalkingCharacter } from "@/characters";
import { SPR_FARMER0 } from "../generated/images/SPR_FARMER0";
import { SPR_FARMER_TALKING0 } from "../generated/images/SPR_FARMER_TALKING0";
import { SPR_FARMER_TALKING1 } from "../generated/images/SPR_FARMER_TALKING1";
import { SPR_FARMER_TALKING2 } from "../generated/images/SPR_FARMER_TALKING2";
import { SPR_FARMER1 } from "../generated/images/SPR_FARMER1";
import { SPR_FARMER2 } from "../generated/images/SPR_FARMER2";

const FARMER_HOTSPOT = createMaskHotspot(SPR_FARMER0, HotspotId.FARMER);

const farmerX = 38;
const farmerY = 9;

const scratch_ticks = 12;

const ANIM_FARMER = new ImageAnimation(farmerX, farmerY, ZIndex.BEHIND_GUY, true, FARMER_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_FARMER0,
            durationInTicks: 200,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_FARMER1,
            durationInTicks: scratch_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_FARMER2,
            durationInTicks: scratch_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_FARMER1,
            durationInTicks: scratch_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_FARMER2,
            durationInTicks: scratch_ticks,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

const ANIM_FARMER_TALKING = new ImageAnimation(farmerX, farmerY, ZIndex.BEHIND_GUY, true, FARMER_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_FARMER_TALKING0,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_FARMER_TALKING1,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_FARMER_TALKING2,
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
        return { talkAnchorLeft: 44, talkAnchorBottom: 10 };
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
