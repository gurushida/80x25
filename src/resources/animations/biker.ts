import { ImageAnimation, Animation, NO_LEFT_MOVEMENT } from "@/animations";
import { createMaskHotspot, HotspotId } from "@/hotspots";
import { ZIndex } from "@/zIndex";
import { CanTalkAnimation } from "./talkingCharacter";
import { TalkingCharacter } from "@/characters";
import { SPR_BIKER0 } from "../generated/images/SPR_BIKER0";
import { SPR_BIKER_TALKING0 } from "../generated/images/SPR_BIKER_TALKING0";
import { SPR_BIKER_TALKING1 } from "../generated/images/SPR_BIKER_TALKING1";
import { SPR_BIKER_TALKING2 } from "../generated/images/SPR_BIKER_TALKING2";
import { SPR_BIKER1 } from "../generated/images/SPR_BIKER1";
import { SPR_BIKER2 } from "../generated/images/SPR_BIKER2";
import { SPR_BIKER3 } from "../generated/images/SPR_BIKER3";
import { SPR_BIKER4 } from "../generated/images/SPR_BIKER4";
import { SPR_BIKER5 } from "../generated/images/SPR_BIKER5";
import { SPR_BIKER6 } from "../generated/images/SPR_BIKER6";
import { SPR_BIKER7 } from "../generated/images/SPR_BIKER7";

const BIKER_HOTSPOT = createMaskHotspot(SPR_BIKER0, HotspotId.BIKER);

const ANIM_BIKER = new ImageAnimation(36, 10, ZIndex.BEHIND_GUY, true, BIKER_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_BIKER0,
            durationInTicks: 200,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BIKER1,
            durationInTicks: 5,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BIKER2,
            durationInTicks: 5,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BIKER3,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BIKER4,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BIKER3,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BIKER4,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BIKER3,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BIKER4,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BIKER2,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BIKER1,
            durationInTicks: 5,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BIKER5,
            durationInTicks: 5,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BIKER6,
            durationInTicks: 5,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BIKER7,
            durationInTicks: 5,
            offsetX: 0,
            offsetY: 0,
        },
    ]);


const ANIM_BIKER_TALKING = new ImageAnimation(47, 12, ZIndex.BEHIND_GUY, true, BIKER_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_BIKER_TALKING0,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BIKER_TALKING1,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BIKER_TALKING2,
            durationInTicks: 7,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

export class BikerAnimation extends CanTalkAnimation {

    getCharacter(): TalkingCharacter {
        return 'BIKER';
    }

    getTalkAnchor(): { talkAnchorLeft: number; talkAnchorBottom: number; } {
        return { talkAnchorLeft: 52, talkAnchorBottom: 11 };
    }

    startTalkingAnimation(): Animation {
        return ANIM_BIKER_TALKING;
    }

    stopTalkingAnimation() {
        // Nothing special
    }

    tickNonTalking() {
        return ANIM_BIKER.tick();
    }

}
