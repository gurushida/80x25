import { ImageAnimation, Animation, NO_LEFT_MOVEMENT } from "@/animations";
import { createMaskHotspot, HotspotId } from "@/hotspots";
import { ZIndex } from "@/zIndex";
import { CanTalkAnimation } from "./talkingCharacter";
import { TalkingCharacter } from "@/characters";
import { SPR_PHARMACIST0 } from "../generated/images/SPR_PHARMACIST0";
import { SPR_PHARMACIST_TALKING0 } from "../generated/images/SPR_PHARMACIST_TALKING0";
import { SPR_PHARMACIST_TALKING1 } from "../generated/images/SPR_PHARMACIST_TALKING1";
import { SPR_PHARMACIST_TALKING2 } from "../generated/images/SPR_PHARMACIST_TALKING2";

const PHARMACIST_HOTSPOT = createMaskHotspot(SPR_PHARMACIST0, HotspotId.PHARMACIST);

const ANIM_PHARMACIST = new ImageAnimation(50, 9, ZIndex.BEHIND_GUY, true, PHARMACIST_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_PHARMACIST0,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

const ANIM_PHARMACIST_TALKING = new ImageAnimation(50, 9, ZIndex.BEHIND_GUY, true, PHARMACIST_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_PHARMACIST_TALKING0,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACIST_TALKING1,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACIST_TALKING2,
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
        return { talkAnchorLeft: 55, talkAnchorBottom: 9 };
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
