import { AsciiImage, OPAQUE } from "./images";
import { WIDTH, HEIGHT } from "./screenbuffer";
import { Action } from "./actions";
import { SceneId } from "./scene";


/**
 * Defines all the possible hotspots to interact with.
 */
export enum HotspotId {
    BANK = 'BANK',
    BOOM_BLASTER = 'BOOM_BLASTER',
    ICE_CREAM_SHOP = 'ICE_CREAM_SHOP',
    ICE_CREAM_SHOP_DOOR = 'ICE_CREAM_SHOP_DOOR',
    DOG = 'DOG',
}

export class HotspotMap {
    private map = new Map<HotspotId, Hotspot>();

    get(h: HotspotId | undefined): Hotspot {
        return !h ? undefined : this.map.get(h);
    }

    set(h: HotspotId, info: Hotspot) {
        return this.map.set(h, info);
    }

}

/**
 * Given a position in an image relative to its top-left corner, returns
 * the corresponding hotspot or NONE if the location is not a hotspot.
 */
export type HotspotFilter = (x: number, y: number) => HotspotId | undefined;

/**
 * All the area is a hotspot.
 */
export function createFullHotspot(hotspot: HotspotId): HotspotFilter {
    return (x: number, y: number) => hotspot;
}


/**
 * Creates a filter that, given a position (x,y), will look for the
 * first filter in the given array to return a match other than NONE.
 */
export function combine(...filters: HotspotFilter[]): HotspotFilter {
    return (x: number, y: number) => {
        for (const filter of filters) {
            const hotspot: HotspotId | undefined = filter(x, y);
            if (hotspot) {
                return hotspot;
            }
        }
        return undefined;
    };
}


/**
 * Returns the given hotspot for all the opaque pixels of the given image.
 */
export function createMaskHotspot(image: AsciiImage, hotspot: HotspotId): HotspotFilter {
  return (x: number, y: number) => {
    return (image.mask[y][x] === OPAQUE) ? hotspot : undefined;
  };
}


export class HotspotScreenBuffer {

    private pixels: (HotspotId | undefined)[];

    constructor() {
        this.pixels = [];
        for (let i = 0 ; i < WIDTH * HEIGHT ; i++) {
            this.pixels.push(undefined);
        }
    }

    public clear() {
        for (let i = 0 ; i < WIDTH * HEIGHT ; i++) {
            this.pixels[i] = undefined;
        }
    }

    public set(x: number, y: number, hotspot: HotspotId) {
        this.pixels[x + y * WIDTH] = hotspot;
    }

    public get(x: number, y: number): HotspotId {
        if (x < 0 || x >= WIDTH || y < 0 || y >= HEIGHT) {
            return undefined;
        }
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


export interface Hotspot {
    hotspotId: HotspotId;

    description: string;

    // The default action to execute on this hotspot, if any
    rightClickAction?: Action;

    // If defined, this indicates that this hotspot is a
    // location that, when clicked on, trigger a game screen change.
    // Such hotspots cannot be combined with action and their description
    // is supposed to be fully descriptive like 'Enter bank'
    movementHotspot?: SceneId;

    // When a hotspot is an object or character that the guy needs to come
    // close to to interact with, this represents where the guy should be
    guyPositionForAction?: GuyPosition;
}


export function isHotspotId(obj: any): obj is HotspotId {
    return Object.values(HotspotId).includes(obj);
}

export function isHotspot(obj: any): obj is Hotspot {
    return typeof obj === 'object' && 'hotspotId' in obj && 'description' in obj;
}
