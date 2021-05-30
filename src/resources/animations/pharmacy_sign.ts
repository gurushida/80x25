import { ImageAnimation, NO_LEFT_MOVEMENT } from "@/animations";
import { createMaskHotspot, HotspotId } from "@/hotspots";
import { ZIndex } from "@/zIndex";
import { SPR_PHARMACY_SIGN_0 } from "../generated/images/SPR_PHARMACY_SIGN_0";
import { SPR_PHARMACY_SIGN_1 } from "../generated/images/SPR_PHARMACY_SIGN_1";
import { SPR_PHARMACY_SIGN_2 } from "../generated/images/SPR_PHARMACY_SIGN_2";
import { SPR_PHARMACY_SIGN_3 } from "../generated/images/SPR_PHARMACY_SIGN_3";
import { SPR_PHARMACY_SIGN_4 } from "../generated/images/SPR_PHARMACY_SIGN_4";
import { SPR_PHARMACY_SIGN_5 } from "../generated/images/SPR_PHARMACY_SIGN_5";
import { SPR_PHARMACY_SIGN_6 } from "../generated/images/SPR_PHARMACY_SIGN_6";
import { SPR_PHARMACY_SIGN_7 } from "../generated/images/SPR_PHARMACY_SIGN_7";

const PHARMACY_HOTSPOT = createMaskHotspot(SPR_PHARMACY_SIGN_0, HotspotId.PHARMACY_SIGN);

export const ANIM_PHARMACY_SIGN = new ImageAnimation(5, 3, ZIndex.FRONT, true, PHARMACY_HOTSPOT, NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_PHARMACY_SIGN_0,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN_1,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN_2,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN_3,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN_4,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN_3,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN_2,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN_1,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },

        {
            image: SPR_PHARMACY_SIGN_0,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN_1,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN_2,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN_3,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN_4,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN_3,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN_2,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN_1,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },

        {
            image: SPR_PHARMACY_SIGN_0,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN_5,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN_6,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN_7,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN_4,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN_7,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN_6,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN_5,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },

        {
            image: SPR_PHARMACY_SIGN_0,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN_4,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN_0,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN_4,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN_0,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PHARMACY_SIGN_4,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
    ]);
