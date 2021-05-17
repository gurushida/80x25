import { ImageAnimation, NO_LEFT_MOVEMENT } from "@/animations";
import { createMaskHotspot, HotspotId } from "@/hotspots";
import { ZIndex } from "@/zIndex";
import { SPR_PIZZERIA_TABLE_0 } from "../generated/images/SPR_PIZZERIA_TABLE_0";
import { SPR_PIZZERIA_TABLE_1 } from "../generated/images/SPR_PIZZERIA_TABLE_1";

const PIZZERIA_TABLE_HOTSPOT = createMaskHotspot(SPR_PIZZERIA_TABLE_0, HotspotId.PIZZERIA_TABLE);

export function createPizzeriaTable(left: number, top: number, zIndex: ZIndex) {
    return new ImageAnimation(left, top, zIndex, true, PIZZERIA_TABLE_HOTSPOT, NO_LEFT_MOVEMENT,
        [
            {
                image: SPR_PIZZERIA_TABLE_0,
                durationInTicks: 5,
                offsetX: 0,
                offsetY: 0,
            },
            {
                image: SPR_PIZZERIA_TABLE_1,
                durationInTicks: 7,
                offsetX: 0,
                offsetY: 0,
            }
        ]);
}

