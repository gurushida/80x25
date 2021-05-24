import { AnimationStep, ImageAnimation } from "@/animations";
import { EMPTY_IMAGE } from "@/images";
import { ZIndex } from "@/zIndex";
import { SPR_BOAT_0 } from "../generated/images/SPR_BOAT_0";


const steps: AnimationStep[] = [
    {
        image: EMPTY_IMAGE,
        durationInTicks: 1000,
        offsetX: 0,
        offsetY: 0,
    },
];

for (let i = 0 ; i < 72 ; i++) {
    steps.push({
        image: SPR_BOAT_0,
        durationInTicks: 5,
        offsetX: 1,
        offsetY: 0,
    });
}

export const ANIM_BOAT = new ImageAnimation(0, 23, ZIndex.FRONT, true, undefined, left => left % 72, steps);
