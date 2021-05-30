import { ImageAnimation, NO_LEFT_MOVEMENT } from "@/animations";
import { createMaskHotspot, HotspotId } from "@/hotspots";
import { ZIndex } from "@/zIndex";
import { SPR_ARCADE_SIGN_0 } from "../generated/images/SPR_ARCADE_SIGN_0";
import { SPR_ARCADE_SIGN_1 } from "../generated/images/SPR_ARCADE_SIGN_1";

const ARCADE_SIGN_HOTSPOT = createMaskHotspot(SPR_ARCADE_SIGN_0, HotspotId.ARCADE_SIGN);

export const ANIM_ARCADE_SIGN = new ImageAnimation(21, 1, ZIndex.BEHIND_GUY, true, ARCADE_SIGN_HOTSPOT, NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_ARCADE_SIGN_0,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_ARCADE_SIGN_1,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        }
    ]);
