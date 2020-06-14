import { ImageAnimation } from "../../animations";
import { boom_blaster0, boom_blaster1, dog0, dog1 } from "../sprites";
import { createMaskHotspot, Hotspot } from "../../hotspots";

const BOOM_BLASTER_HOTSPOT = createMaskHotspot(boom_blaster0, Hotspot.BOOM_BLASTER);

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

const DOG_HOTSPOT = createMaskHotspot(dog0, Hotspot.DOG);

export const dog = new ImageAnimation(50, 17, true, DOG_HOTSPOT,
        [
            {
                image: dog0,
                durationInTicks: 10,
                offsetX: 0,
                offsetY: 0,
            },
            {
                image: dog1,
                durationInTicks: 10,
                offsetX: 0,
                offsetY: 0,
            }
        ]);
