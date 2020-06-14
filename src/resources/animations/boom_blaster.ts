import { ImageAnimation } from "../../animations";
import { SPR_BOOM_BLASTER_0, SPR_BOOM_BLASTER_1 } from "../sprites";
import { createMaskHotspot, Hotspot } from "../../hotspots";

const BOOM_BLASTER_HOTSPOT = createMaskHotspot(SPR_BOOM_BLASTER_0, Hotspot.BOOM_BLASTER);

export const ANIM_BOOM_BLASTER = new ImageAnimation(30, 17, true, BOOM_BLASTER_HOTSPOT,
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
