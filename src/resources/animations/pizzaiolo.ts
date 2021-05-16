import { ImageAnimation, NO_LEFT_MOVEMENT } from "@/animations";
import { createMaskHotspot, HotspotId } from "@/hotspots";
import { ZIndex } from "@/zIndex";
import { SPR_PIZZAIOLO_0 } from "../generated/images/SPR_PIZZAIOLO_0";
import { SPR_PIZZAIOLO_1 } from "../generated/images/SPR_PIZZAIOLO_1";
import { SPR_PIZZAIOLO_10 } from "../generated/images/SPR_PIZZAIOLO_10";
import { SPR_PIZZAIOLO_11 } from "../generated/images/SPR_PIZZAIOLO_11";
import { SPR_PIZZAIOLO_12 } from "../generated/images/SPR_PIZZAIOLO_12";
import { SPR_PIZZAIOLO_13 } from "../generated/images/SPR_PIZZAIOLO_13";
import { SPR_PIZZAIOLO_2 } from "../generated/images/SPR_PIZZAIOLO_2";
import { SPR_PIZZAIOLO_3 } from "../generated/images/SPR_PIZZAIOLO_3";
import { SPR_PIZZAIOLO_4 } from "../generated/images/SPR_PIZZAIOLO_4";
import { SPR_PIZZAIOLO_5 } from "../generated/images/SPR_PIZZAIOLO_5";
import { SPR_PIZZAIOLO_6 } from "../generated/images/SPR_PIZZAIOLO_6";
import { SPR_PIZZAIOLO_7 } from "../generated/images/SPR_PIZZAIOLO_7";
import { SPR_PIZZAIOLO_8 } from "../generated/images/SPR_PIZZAIOLO_8";
import { SPR_PIZZAIOLO_9 } from "../generated/images/SPR_PIZZAIOLO_9";

const PIZZAIOLO_HOTSPOT = createMaskHotspot(SPR_PIZZAIOLO_0, HotspotId.PIZZAIOLO);

const rolling_ticks = 7;
const throwing_ticks = 4;

export const ANIM_PIZZAIOLO = new ImageAnimation(0, 7, ZIndex.BACKGROUND, true, PIZZAIOLO_HOTSPOT, NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_PIZZAIOLO_0,
            durationInTicks: rolling_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PIZZAIOLO_1,
            durationInTicks: rolling_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PIZZAIOLO_2,
            durationInTicks: rolling_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PIZZAIOLO_3,
            durationInTicks: rolling_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PIZZAIOLO_2,
            durationInTicks: rolling_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PIZZAIOLO_1,
            durationInTicks: rolling_ticks,
            offsetX: 0,
            offsetY: 0,
        },

        {
            image: SPR_PIZZAIOLO_0,
            durationInTicks: rolling_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PIZZAIOLO_1,
            durationInTicks: rolling_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PIZZAIOLO_2,
            durationInTicks: rolling_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PIZZAIOLO_3,
            durationInTicks: rolling_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PIZZAIOLO_2,
            durationInTicks: rolling_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PIZZAIOLO_1,
            durationInTicks: rolling_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PIZZAIOLO_0,
            durationInTicks: rolling_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PIZZAIOLO_1,
            durationInTicks: rolling_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PIZZAIOLO_2,
            durationInTicks: rolling_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PIZZAIOLO_3,
            durationInTicks: rolling_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PIZZAIOLO_2,
            durationInTicks: rolling_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PIZZAIOLO_1,
            durationInTicks: rolling_ticks,
            offsetX: 0,
            offsetY: 0,
        },

        {
            image: SPR_PIZZAIOLO_0,
            durationInTicks: rolling_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PIZZAIOLO_1,
            durationInTicks: rolling_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PIZZAIOLO_2,
            durationInTicks: rolling_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PIZZAIOLO_3,
            durationInTicks: rolling_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PIZZAIOLO_2,
            durationInTicks: rolling_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PIZZAIOLO_1,
            durationInTicks: rolling_ticks,
            offsetX: 0,
            offsetY: 0,
        },

        {
            image: SPR_PIZZAIOLO_4,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PIZZAIOLO_5,
            durationInTicks: 2,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PIZZAIOLO_6,
            durationInTicks: throwing_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PIZZAIOLO_7,
            durationInTicks: throwing_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PIZZAIOLO_8,
            durationInTicks: throwing_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PIZZAIOLO_9,
            durationInTicks: throwing_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PIZZAIOLO_10,
            durationInTicks: throwing_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PIZZAIOLO_9,
            durationInTicks: throwing_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PIZZAIOLO_10,
            durationInTicks: throwing_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PIZZAIOLO_9,
            durationInTicks: throwing_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PIZZAIOLO_10,
            durationInTicks: throwing_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PIZZAIOLO_11,
            durationInTicks: throwing_ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PIZZAIOLO_12,
            durationInTicks: 2,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PIZZAIOLO_13,
            durationInTicks: 2,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PIZZAIOLO_4,
            durationInTicks: 30,
            offsetX: 0,
            offsetY: 0,
        },
    ]);
