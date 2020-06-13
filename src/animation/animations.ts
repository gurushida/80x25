import { ImageAnimation } from "./animationsUtils";
import { boom_blaster0, boom_blaster1 } from "../sprite";
import { createMaskHotspot, Hotspots } from "../hotspots";

const BOOM_BLASTER_HOTSPOT = createMaskHotspot(boom_blaster0, Hotspots.BOOM_BLASTER);

export const boom_blaster = new ImageAnimation(30, 17, true, BOOM_BLASTER_HOTSPOT,
    [
        {
            image: boom_blaster0,
            durationInTicks: 4,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: boom_blaster1,
            durationInTicks: 4,
            offsetX: 0,
            offsetY: 0,
        }
    ]);
