import { ImageAnimation, NO_LEFT_MOVEMENT } from "@/animations";
import { createMaskHotspot, HotspotId } from "@/hotspots";
import { ZIndex } from "@/zIndex";
import { SPR_PHARMACY_SIGN0 } from "../generated/images/SPR_PHARMACY_SIGN0";
import { SPR_PHARMACY_SIGN1 } from "../generated/images/SPR_PHARMACY_SIGN1";
import { SPR_PHARMACY_SIGN2 } from "../generated/images/SPR_PHARMACY_SIGN2";
import { SPR_PHARMACY_SIGN3 } from "../generated/images/SPR_PHARMACY_SIGN3";
import { SPR_PHARMACY_SIGN4 } from "../generated/images/SPR_PHARMACY_SIGN4";
import { SPR_PHARMACY_SIGN5 } from "../generated/images/SPR_PHARMACY_SIGN5";
import { SPR_PHARMACY_SIGN6 } from "../generated/images/SPR_PHARMACY_SIGN6";
import { SPR_PHARMACY_SIGN7 } from "../generated/images/SPR_PHARMACY_SIGN7";

const PHARMACY_HOTSPOT = createMaskHotspot(SPR_PHARMACY_SIGN0, HotspotId.PHARMACY_SIGN);

export const ANIM_PHARMACY_SIGN = new ImageAnimation(5, 3, ZIndex.FRONT, true, PHARMACY_HOTSPOT, NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_PHARMACY_SIGN0,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN1,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN2,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN3,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN4,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN3,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN2,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN1,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },

        {
            image: SPR_PHARMACY_SIGN0,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN1,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN2,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN3,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN4,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN3,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN2,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN1,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },

        {
            image: SPR_PHARMACY_SIGN0,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN5,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN6,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN7,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN4,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN7,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN6,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN5,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },

        {
            image: SPR_PHARMACY_SIGN0,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN4,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN0,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN4,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN0,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN4,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
    ]);
