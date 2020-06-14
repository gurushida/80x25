import { AsciiImage, OPAQUE } from "./images";
import { WIDTH, HEIGHT } from "./screenbuffer";
import { Action } from "./actions";


/**
 * Defines all the possible hotspots to interact with.
 */
export enum Hotspot {
    NONE,
    BANK,
    BOOM_BLASTER,
    ICE_CREAM_SHOP,
    ICE_CREAM_SHOP_DOOR,
    DOG,
}

export class HotspotMap {
    private map = new Map<Hotspot, HotspotInfo>();

    get(h: Hotspot): HotspotInfo {
        return this.map.get(h);
    }

    set(h: Hotspot, info: HotspotInfo) {
        return this.map.set(h, info);
    }

}

/**
 * Given a position in an image relative to its top-left corner, returns
 * the corresponding hotspot or NONE if the location is not a hotspot.
 */
export type HotspotFilter = (x: number, y: number) => Hotspot;

/**
 * All the area is a hotspot.
 */
export function createFullHotspot(hotspot: Hotspot): HotspotFilter {
    return (x: number, y: number) => hotspot;
}


/**
 * Creates a filter that, given a position (x,y), will look for the
 * first filter in the given array to return a match other than NONE.
 */
export function combine(...filters: HotspotFilter[]): HotspotFilter {
    return (x: number, y: number) => {
        for (const filter of filters) {
            const hotspot: Hotspot = filter(x, y);
            if (hotspot !== Hotspot.NONE) {
                return hotspot;
            }
        }
        return Hotspot.NONE;
    };
}


/**
 * Returns the given hotspot for all the opaque pixels of the given image.
 */
export function createMaskHotspot(image: AsciiImage, hotspot: Hotspot): HotspotFilter {
  return (x: number, y: number) => {
    return (image.mask[y][x] === OPAQUE) ? hotspot : Hotspot.NONE;
  };
}


export class HotspotScreenBuffer {

    private pixels: Hotspot[];

    constructor() {
        this.pixels = [];
        for (let i = 0 ; i < WIDTH * HEIGHT ; i++) {
            this.pixels.push(Hotspot.NONE);
        }
    }

    public clear() {
        for (let i = 0 ; i < WIDTH * HEIGHT ; i++) {
            this.pixels[i] = Hotspot.NONE;
        }
    }

    public set(x: number, y: number, hotspot: Hotspot) {
        this.pixels[x + y * WIDTH] = hotspot;
    }

    public get(x: number, y: number): Hotspot {
        return this.pixels[x + y * WIDTH];
    }

    public copyFrom(other: HotspotScreenBuffer) {
        for (let i = 0 ; i < WIDTH * HEIGHT ; i++) {
            this.pixels[i] = other.pixels[i];
        }
    }

}


export interface GuyPosition {
    left: number;
    top: number;
    lookToTheRight: boolean
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

    // When a hotspot is an object or character that the guy needs to come
    // close to to interact with, this represents where the guy should be
    guyPositionForAction?: GuyPosition;
}
