import { ImageAnimation } from "@/animations";
import { ZIndex } from "@/zIndex";
import { SPR_BIRD_0 } from "../generated/images/SPR_BIRD_0";
import { SPR_BIRD_1 } from "../generated/images/SPR_BIRD_1";
import { SPR_BIRD_2 } from "../generated/images/SPR_BIRD_2";

export const ANIM_BIRD = new ImageAnimation(3, 1, ZIndex.BEHIND_GUY, true, undefined,
    left => left % 85,
    [
        {
            image: SPR_BIRD_0,
            durationInTicks: 5,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BIRD_1,
            durationInTicks: 5,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BIRD_2,
            durationInTicks: 5,
            offsetX: 1,
            offsetY: 0,
        },
        {
            image: SPR_BIRD_1,
            durationInTicks: 5,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

    export const ANIM_BIRD2 = new ImageAnimation(0, 2, ZIndex.BEHIND_GUY, true, undefined,
        left => left % 85,
        [
            {
                image: SPR_BIRD_0,
                durationInTicks: 5,
                offsetX: 0,
                offsetY: 0,
            },
            {
                image: SPR_BIRD_1,
                durationInTicks: 5,
                offsetX: 0,
                offsetY: 0,
            },
            {
                image: SPR_BIRD_2,
                durationInTicks: 5,
                offsetX: 1,
                offsetY: 0,
            },
            {
                image: SPR_BIRD_1,
                durationInTicks: 5,
                offsetX: 0,
                offsetY: 0,
            },
        ]);
    