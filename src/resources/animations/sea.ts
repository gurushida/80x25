import { ImageAnimation, NO_LEFT_MOVEMENT } from "@/animations";
import { createMaskHotspot, HotspotId } from "@/hotspots";
import { ZIndex } from "@/zIndex";
import { SPR_SEA_0 } from "../generated/images/SPR_SEA_0";
import { SPR_SEA_1 } from "../generated/images/SPR_SEA_1";
import { SPR_SEA_2 } from "../generated/images/SPR_SEA_2";
import { SPR_SEA_3 } from "../generated/images/SPR_SEA_3";

const SEA_HOTSPOT = createMaskHotspot(SPR_SEA_0, HotspotId.SEA);

export const ANIM_SEA = new ImageAnimation(0, 21, ZIndex.BACKGROUND, true, SEA_HOTSPOT, NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_SEA_0,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_SEA_1,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_SEA_2,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_SEA_3,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
    ]);
