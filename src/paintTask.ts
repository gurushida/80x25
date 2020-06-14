import { ZIndex } from "./zIndex";
import { AsciiImage } from "./images";
import { HotspotFilter } from "./hotspots";

/**
 * Defines something to paint and where to paint it.
 */
export interface PaintTask {
    top: number;
    left: number;
    zIndex: ZIndex;
    image: AsciiImage;
    hotspotFilter?: HotspotFilter;
}


export function getPaintTask(image: AsciiImage, left: number, top: number, zIndex: number,
                             hotspotFilter: HotspotFilter | undefined): PaintTask {
    return {
        left, top, zIndex,image, hotspotFilter
    };
}
