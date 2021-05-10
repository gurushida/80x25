import { ImageAnimation, Animation, NO_LEFT_MOVEMENT } from "@/animations";
import { createMaskHotspot, HotspotId } from "@/hotspots";
import { ZIndex } from "@/zIndex";
import { CanTalkAnimation } from "./talkingCharacter";
import { TalkingCharacter } from "@/characters";
import { SPR_ALFREDO0 } from "../generated/images/SPR_ALFREDO0";
import { SPR_ALFREDO_TALKING0 } from "../generated/images/SPR_ALFREDO_TALKING0";
import { SPR_ALFREDO1 } from "../generated/images/SPR_ALFREDO1";
import { SPR_ALFREDO2 } from "../generated/images/SPR_ALFREDO2";
import { SPR_ALFREDO3 } from "../generated/images/SPR_ALFREDO3";
import { SPR_ALFREDO_TALKING1 } from "../generated/images/SPR_ALFREDO_TALKING1";
import { SPR_ALFREDO_TALKING2 } from "../generated/images/SPR_ALFREDO_TALKING2";

const ALFREDO_HOTSPOT = createMaskHotspot(SPR_ALFREDO0, HotspotId.ALFREDO);

const ANIM_ALFREDO = new ImageAnimation(35, 12, ZIndex.BEHIND_GUY, true, ALFREDO_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_ALFREDO0,
            durationInTicks: 4,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_ALFREDO1,
            durationInTicks: 4,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_ALFREDO2,
            durationInTicks: 4,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_ALFREDO3,
            durationInTicks: 4,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

const ANIM_ALFREDO_TALKING = new ImageAnimation(35, 12, ZIndex.BEHIND_GUY, true, ALFREDO_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_ALFREDO_TALKING0,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_ALFREDO_TALKING1,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_ALFREDO_TALKING2,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

export class AlfredoAnimation extends CanTalkAnimation {

    getCharacter(): TalkingCharacter {
        return 'ALFREDO';
    }

    getTalkAnchor(): { talkAnchorLeft: number; talkAnchorBottom: number; } {
        return { talkAnchorLeft: 40, talkAnchorBottom: 15 };
    }

    startTalkingAnimation(): Animation {
        return ANIM_ALFREDO_TALKING;
    }

    stopTalkingAnimation() {
        // Nothing special
    }

    tickNonTalking() {
        return ANIM_ALFREDO.tick();
    }

}
