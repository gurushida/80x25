import { ImageAnimation } from "../../animations";
import { SPR_DOG_0, SPR_DOG_1 } from "../sprites";
import { createMaskHotspot, Hotspot } from "../../hotspots";

const DOG_HOTSPOT = createMaskHotspot(SPR_DOG_0, Hotspot.DOG);

export const ANIM_DOG = new ImageAnimation(50, 17, true, DOG_HOTSPOT,
    [
        {
            image: SPR_DOG_0,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_DOG_1,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        }
    ]);
