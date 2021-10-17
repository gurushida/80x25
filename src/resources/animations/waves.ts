import { ImageAnimation, NO_LEFT_MOVEMENT } from "@/animations";
import { createMaskHotspot, HotspotId } from "@/hotspots";
import { ZIndex } from "@/zIndex";
import { SPR_WAVES_0 } from "../generated/images/SPR_WAVES_0";
import { SPR_WAVES_1 } from "../generated/images/SPR_WAVES_1";
import { SPR_WAVES_2 } from "../generated/images/SPR_WAVES_2";
import { SPR_WAVES_3 } from "../generated/images/SPR_WAVES_3";
import { SPR_WAVES_4 } from "../generated/images/SPR_WAVES_4";

const WAVES_HOTSPOT = createMaskHotspot(SPR_WAVES_0, HotspotId.WAVES);

export const ANIM_WAVES = new ImageAnimation(0, 6, ZIndex.BACKGROUND, true, WAVES_HOTSPOT, NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_WAVES_0,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_WAVES_1,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_WAVES_0,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_WAVES_1,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_WAVES_2,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_WAVES_3,
            durationInTicks: 15,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_WAVES_4,
            durationInTicks: 30,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_WAVES_3,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_WAVES_2,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_WAVES_1,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
    ]);
