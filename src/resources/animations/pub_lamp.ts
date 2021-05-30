import { ImageAnimation, NO_LEFT_MOVEMENT } from "@/animations";
import { createMaskHotspot, HotspotId } from "@/hotspots";
import { ZIndex } from "@/zIndex";
import { SPR_PUB_LAMP_0 } from "../generated/images/SPR_PUB_LAMP_0";
import { SPR_PUB_LAMP_1 } from "../generated/images/SPR_PUB_LAMP_1";

const PUB_LAMP_HOTSPOT = createMaskHotspot(SPR_PUB_LAMP_0, HotspotId.PUB);

function createPubLamp(left: number, top: number) {
    return new ImageAnimation(left, top, ZIndex.BEHIND_GUY, true, PUB_LAMP_HOTSPOT, NO_LEFT_MOVEMENT,
        [
            {
                image: SPR_PUB_LAMP_0,
                durationInTicks: 5,
                offsetX: 0,
                offsetY: 0,
            },
            {
                image: SPR_PUB_LAMP_1,
                durationInTicks: 7,
                offsetX: 0,
                offsetY: 0,
            }
        ]);
}

export const ANIM_PUB_LAMP1 = createPubLamp(10, 2);
export const ANIM_PUB_LAMP2 = createPubLamp(59, 2);
