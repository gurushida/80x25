import { ImageAnimation, NO_LEFT_MOVEMENT } from "@/animations";
import { createMaskHotspot, HotspotId } from "@/hotspots";
import { ZIndex } from "@/zIndex";
import { SPR_FIRE_0 } from "../generated/images/SPR_FIRE_0";
import { SPR_FIRE_1 } from "../generated/images/SPR_FIRE_1";
import { SPR_FIRE_2 } from "../generated/images/SPR_FIRE_2";
import { SPR_FIRE_3 } from "../generated/images/SPR_FIRE_3";
import { SPR_FIRE_4 } from "../generated/images/SPR_FIRE_4";
import { SPR_FIRE_5 } from "../generated/images/SPR_FIRE_5";
import { SPR_FIRE_6 } from "../generated/images/SPR_FIRE_6";

const FIRE_HOTSPOT = createMaskHotspot(SPR_FIRE_0, HotspotId.FIRE);

const ticks = 15;

export const ANIM_FIRE = new ImageAnimation(42, 13, ZIndex.BACKGROUND, true, FIRE_HOTSPOT, NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_FIRE_0,
            durationInTicks: ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_FIRE_1,
            durationInTicks: ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_FIRE_2,
            durationInTicks: ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_FIRE_3,
            durationInTicks: ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_FIRE_4,
            durationInTicks: ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_FIRE_5,
            durationInTicks: ticks,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_FIRE_6,
            durationInTicks: ticks,
            offsetX: 0,
            offsetY: 0,
        },
    ]);
