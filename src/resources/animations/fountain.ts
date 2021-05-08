import { ImageAnimation, NO_LEFT_MOVEMENT } from "@/animations";
import { createMaskHotspot, HotspotId } from "@/hotspots";
import { ZIndex } from "@/zIndex";
import { SPR_FOUNTAIN0 } from "../generated/images/SPR_FOUNTAIN0";
import { SPR_FOUNTAIN1 } from "../generated/images/SPR_FOUNTAIN1";

const FOUNTAIN_HOTSPOT = createMaskHotspot(SPR_FOUNTAIN0, HotspotId.FOUNTAIN);

export const ANIM_FOUNTAIN = new ImageAnimation(5, 16, ZIndex.BACKGROUND, true, FOUNTAIN_HOTSPOT, NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_FOUNTAIN0,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_FOUNTAIN1,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
    ]);
