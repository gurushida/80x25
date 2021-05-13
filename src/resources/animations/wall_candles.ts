import { ImageAnimation, NO_LEFT_MOVEMENT } from "@/animations";
import { createMaskHotspot, HotspotId } from "@/hotspots";
import { ZIndex } from "@/zIndex";
import { SPR_WALL_CANDLES_0 } from "../generated/images/SPR_WALL_CANDLES_0";
import { SPR_WALL_CANDLES_1 } from "../generated/images/SPR_WALL_CANDLES_1";

const WALL_CANDLES_HOTSPOT = createMaskHotspot(SPR_WALL_CANDLES_0, HotspotId.PUB);

function createWallCandles(left: number, top: number) {
    return new ImageAnimation(left, top, ZIndex.BEHIND_GUY, true, WALL_CANDLES_HOTSPOT, NO_LEFT_MOVEMENT,
        [
            {
                image: SPR_WALL_CANDLES_0,
                durationInTicks: 5,
                offsetX: 0,
                offsetY: 0,
            },
            {
                image: SPR_WALL_CANDLES_1,
                durationInTicks: 7,
                offsetX: 0,
                offsetY: 0,
            }
        ]);
}

export const ANIM_WALL_CANDLES_1 = createWallCandles(22, 5);
export const ANIM_WALL_CANDLES_2 = createWallCandles(66, 5);
