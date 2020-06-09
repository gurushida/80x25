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
        this.pixels[x + y * HEIGHT] = hotspot;
    }

    public get(x: number, y: number): Hotspots {
        return this.pixels[x + y * HEIGHT];
    }

    public copyFrom(other: HotspotScreenBuffer) {
        for (let i = 0 ; i < WIDTH * HEIGHT ; i++) {
            this.pixels[i] = other.pixels[i];
        }
    }

}


export interface HotspotInfo {
    description: string;
    rightClickAction?: Action;
}
