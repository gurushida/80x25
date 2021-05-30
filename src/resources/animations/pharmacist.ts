import { ImageAnimation, Animation, NO_LEFT_MOVEMENT } from "@/animations";
import { createMaskHotspot, HotspotId } from "@/hotspots";
import { ZIndex } from "@/zIndex";
import { CanTalkAnimation } from "./talkingCharacter";
import { TalkingCharacter } from "@/characters";
import { SPR_PHARMACIST_0 } from "../generated/images/SPR_PHARMACIST_0";
import { SPR_PHARMACIST_1 } from "../generated/images/SPR_PHARMACIST_1";
import { SPR_PHARMACIST_TALKING_0 } from "../generated/images/SPR_PHARMACIST_TALKING_0";
import { SPR_PHARMACIST_TALKING_1 } from "../generated/images/SPR_PHARMACIST_TALKING_1";
import { SPR_PHARMACIST_TALKING_2 } from "../generated/images/SPR_PHARMACIST_TALKING_2";

const PHARMACIST_HOTSPOT = createMaskHotspot(SPR_PHARMACIST_0, HotspotId.PHARMACIST);

const pharmacist_X = 50;
const pharmacist_Y = 9;

const ANIM_PHARMACIST = new ImageAnimation(pharmacist_X, pharmacist_Y, ZIndex.BEHIND_GUY, true, PHARMACIST_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_PHARMACIST_0,
            durationInTicks: 200,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACIST_1,
            durationInTicks: 15,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

const ANIM_PHARMACIST_TALKING = new ImageAnimation(pharmacist_X, pharmacist_Y, ZIndex.BEHIND_GUY, true, PHARMACIST_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_PHARMACIST_TALKING_0,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACIST_TALKING_1,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACIST_TALKING_2,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
    ]);


export class PharmacistAnimation extends CanTalkAnimation {

    getCharacter(): TalkingCharacter {
        return 'PHARMACIST';
    }

    getTalkAnchor(): { talkAnchorLeft: number; talkAnchorBottom: number; } {
        return { talkAnchorLeft: pharmacist_X + 5, talkAnchorBottom: pharmacist_Y };
    }

    startTalkingAnimation(): Animation {
        return ANIM_PHARMACIST_TALKING;
    }

    stopTalkingAnimation() {
        // Nothing special
    }

    tickNonTalking() {
        return ANIM_PHARMACIST.tick();
    }

}
