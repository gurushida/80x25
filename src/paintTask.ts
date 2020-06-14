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

    // If specified, this runnable will be scheduled for execution on the
    // next clock tick
    runnable?: () => void;
}


export function getPaintTask(image: AsciiImage, left: number, top: number, zIndex: number,
                             hotspotFilter: HotspotFilter | undefined): PaintTask {
    return {
        left, top, zIndex,image, hotspotFilter
    };
}
