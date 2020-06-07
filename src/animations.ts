import { ImageAnimation } from "./animationsUtils";
import { boom_blaster0, boom_blaster1 } from "./sprite";

export const boom_blaster = new ImageAnimation(30, 18, true,
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
