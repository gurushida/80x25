import { AsciiImage, OPAQUE } from "./imagesUtils";
import { WIDTH, HEIGHT } from "./screenbuffer";
import { Action } from "./actions";


/**
 * Defines all the possible hotspots to interact with.
 */
export enum Hotspots {
    NONE,
    BANK,
    BOOM_BLASTER,
    ICE_CREAM_SHOP,
    ICE_CREAM_SHOP_DOOR,
    DOG,
}

export class HotspotMap {
    private map = new Map<Hotspots, HotspotInfo>();

    get(h: Hotspots): HotspotInfo {
        return this.map.get(h);
    }

    set(h: Hotspots, info: HotspotInfo) {
        return this.map.set(h, info);
    }

}

/**
 * Given a position in an image relative to its top-left corner, returns
 * the corresponding hotspot or undefined if the location is not a hotspot.
 */
export type HotspotFilter = (x: number, y: number) => Hotspots;

/**
 * All the area is a hotspot.
 */
export function createFullHotspot(hotspot: Hotspots): HotspotFilter {
    return (x: number, y: number) => hotspot;
}


/**
 * Creates a filter that, given a position (x,y), will look for the
 * first filter in the given array to return a match other than NONE.
 */
export function combine(...filters: HotspotFilter[]): HotspotFilter {
    return (x: number, y: number) => {
        for (const filter of filters) {
            const hotspot: Hotspots = filter(x, y);
            if (hotspot !== undefined && hotspot !== Hotspots.NONE) {
                return hotspot;
            }
        }
        return Hotspots.NONE;
    };
}


/**
 * Returns the given hotspot for all the opaque pixels of the given image.
 */
export function createMaskHotspot(image: AsciiImage, hotspot: Hotspots): HotspotFilter {
  return (x: number, y: number) => {
    return (image.mask[y][x] === OPAQUE) ? hotspot : Hotspots.NONE;
  };
}


export class HotspotScreenBuffer {

    private pixels: Hotspots[];

    constructor() {
        this.pixels = [];
        for (let i = 0 ; i < WIDTH * HEIGHT ; i++) {
            this.pixels.push(Hotspots.NONE);
        }
    }

    public clear() {
        for (let i = 0 ; i < WIDTH * HEIGHT ; i++) {
            this.pixels[i] = Hotspots.NONE;
        }
    }

    public set(x: number, y: number, hotspot: Hotspots) {
        this.pixels[x + y * WIDTH] = hotspot;
    }

    public get(x: number, y: number): Hotspots {
        return this.pixels[x + y * WIDTH];
    }

    public copyFrom(other: HotspotScreenBuffer) {
        for (let i = 0 ; i < WIDTH * HEIGHT ; i++) {
            this.pixels[i] = other.pixels[i];
        }
    }

}


export interface HotspotInfo {
    description: string;

    // The default action to execute on this hotspot, if any
    rightClickAction?: Action;

    // If defined and true, this indicates that this hotspot is a
    // location that, when clicked on, trigger a game screen change.
    // Such hotspots cannot be combined with action and their description
    // is supposed to be fully descriptive like 'Enter bank'
    isMovementHotspot?: boolean;
}
