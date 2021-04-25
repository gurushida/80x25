import { ImageAnimation } from "@/animations";
import { createMaskHotspot, HotspotId } from "@/hotspots";
import { ZIndex } from "@/zIndex";
import { SPR_BOOM_BLASTER_0 } from "../generated/images/SPR_BOOM_BLASTER_0";
import { SPR_BOOM_BLASTER_1 } from "../generated/images/SPR_BOOM_BLASTER_1";

const BOOM_BLASTER_HOTSPOT = createMaskHotspot(SPR_BOOM_BLASTER_0, HotspotId.BOOM_BLASTER);

export const ANIM_BOOM_BLASTER = new ImageAnimation(30, 17, ZIndex.BEHIND_GUY, true, BOOM_BLASTER_HOTSPOT,
    [
        {
            image: SPR_BOOM_BLASTER_0,
            durationInTicks: 4,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BOOM_BLASTER_1,
            durationInTicks: 4,
            offsetX: 0,
            offsetY: 0,
        }
    ]);
