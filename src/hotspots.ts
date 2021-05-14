import { AsciiImage, OPAQUE } from "./images";
import { SceneId } from "./scene";
import { Dialog, Cue } from "./dialog";
import { ActionBarButton } from "./screenBuffer";


/**
 * Defines all the possible hotspots to interact with.
 */
export enum HotspotId {
    BANK = 'BANK',
    BOOM_BLASTER = 'BOOM_BLASTER',
    ICE_CREAM_SHOP = 'ICE_CREAM_SHOP',
    ICE_CREAM0 = 'ICE_CREAM0',
    ICE_CREAM1 = 'ICE_CREAM1',
    ICE_CREAM2 = 'ICE_CREAM2',
    ICE_CREAM3 = 'ICE_CREAM3',
    ICE_CREAM4 = 'ICE_CREAM4',
    ICE_CREAM5 = 'ICE_CREAM5',
    ICE_CREAM6 = 'ICE_CREAM6',
    ICE_CREAM7 = 'ICE_CREAM7',
    ICE_CREAM8 = 'ICE_CREAM8',
    ICE_CREAM9 = 'ICE_CREAM9',
    ICE_CREAM10 = 'ICE_CREAM10',
    DOG = 'DOG',
    SEA = 'SEA',
    DOCK = 'DOCK',
    HIGHLANDER = 'HIGHLANDER',
    CLOUDS = 'CLOUDS',
    FISHING_NET = 'FISHING_NET',
    ARCADE_GAME1 = 'ARCADE_GAME1',
    ARCADE_GAME2 = 'ARCADE_GAME2',
    ARCADE_GAME3 = 'ARCADE_GAME3',
    ARCADE_GAME4 = 'ARCADE_GAME4',
    ARCADE_GAME5 = 'ARCADE_GAME5',
    ARCADE_GAME6 = 'ARCADE_GAME6',
    ARCADE_SIGN = 'ARCADE_SIGN',
    ARCADE_GUY = 'ARCADE_GUY',
    LAMP = 'LAMP',
    TETRIS_TEEWEE = 'TETRIS_TEEWEE',
    TETRIS_HERO = 'TETRIS_HERO',
    TETRIS_SMASHBOY = 'TETRIS_SMASHBOY',
    TETRIS_BLUE_RICKY = 'TETRIS_BLUE_RICKY',
    TETRIS_ORANGE_RICKY = 'TETRIS_ORANGE_RICKY',
    TETRIS_CLEVELAND_Z = 'TETRIS_CLEVELAND_Z',
    TETRIS_RHODE_ISLAND_Z = 'TETRIS_RHODE_ISLAND_Z',
    PUB = 'PUB',
    PUB_DOOR = 'PUB_DOOR',
    PUB_WINDOW_DEVIL = 'PUB_WINDOW_DEVIL',
    PUB_WINDOW_BELL = 'PUB_WINDOW_BELL',
    BIKER = 'BIKER',
    FOUNTAIN = 'FOUNTAIN',
    LITTLE_GIRL = 'LITTLE_GIRL',
    ROBOT = 'ROBOT',
    TREE = 'TREE',
    SEESAW = 'SEESAW',
    CINEMA = 'CINEMA',
    CINEMA_DOOR = 'CINEMA_DOOR',
    CINEMA_PROGRAM = 'CINEMA_PROGRAM',
    CINEMA_CASHIER = 'CINEMA_CASHIER',
    POSTER_YODA = 'POSTER_YODA',
    POSTER_FREDDIE = 'POSTER_FREDDIE',
    POSTER_ROBIN_HOOD = 'POSTER_ROBIN_HOOD',
    POSTER_JAWS = 'POSTER_JAWS',
    POPCORN_MACHINE = 'POPCORN_MACHINE',
    POOL_TABLE = 'POOL_TABLE',
    BARTENDER = 'BARTENDER',
    BRIAN = 'BRIAN',
    EVIL_QUEEN = 'EVIL_QUEEN',
    ALFREDO = 'ALFREDO',
    PHARMACIST = 'PHARMACIST',
    PHARMACY_SIGN = 'PHARMACY_SIGN',
    PHARMACY_BOOK_GROUP0 = 'PHARMACY_BOOK_GROUP0',
    PHARMACY_BOOK_GROUP1 = 'PHARMACY_BOOK_GROUP1',
    PHARMACY_BOOK0 = 'PHARMACY_BOOK0',
    PHARMACY_BOOK1 = 'PHARMACY_BOOK1',
    PHARMACY_BOOK2 = 'PHARMACY_BOOK2',
    PHARMACY_BOOK3 = 'PHARMACY_BOOK3',
    PHARMACY_BOOK4 = 'PHARMACY_BOOK4',
    PHARMACY_BOOK5 = 'PHARMACY_BOOK5',
    PHARMACY_POT0 = 'PHARMACY_POT0',
    PHARMACY_POT1 = 'PHARMACY_POT1',
    PHARMACY_POT2 = 'PHARMACY_POT2',
    PHARMACY_POT3 = 'PHARMACY_POT3',
    PHARMACY_POT4 = 'PHARMACY_POT4',
    PHARMACY_POT5 = 'PHARMACY_POT5',
    PHARMACY_POT6 = 'PHARMACY_POT6',
    PHARMACY_POT7 = 'PHARMACY_POT7',
    PHARMACY_POT8 = 'PHARMACY_POT8',
    PHARMACY_POT9 = 'PHARMACY_POT9',
    FORGE = 'FORGE',
    FIRE = 'FIRE',
    BELLOWS = 'BELLOWS',
    BARREL = 'BARREL',
    BLACKSMITH = 'BLACKSMITH',
    WELL = 'WELL',
    PIG = 'PIG',
    GOAT = 'GOAT',
    VEGETABLE_GARDEN = 'VEGETABLE_GARDEN',
    WORM = 'WORM',
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
 * All the given rectangle area is a hotspot.
 */
 export function createRectangleHotspot(hotspot: HotspotId,
                                        left: number, top: number, width: number, height: number): HotspotFilter {
    return (x: number, y: number) => {
        if (x >= left && x < left + width && y >= top && y < top + height) {
            return hotspot;
        }
        return undefined;
    };
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


export interface GuyPosition {
    left: number;
    top: number;
    lookToTheRight: boolean
    minLeft?: number;
    maxLeft?: number;
}


// Describes what happens when trying to take a hotspot
export interface TakeAction {
    comment: Cue[];

    // If defined, takes precedence over the comment property.
    dialog?: Dialog;
    guyPositionForAction?: GuyPosition;
}

// Describes what happens when trying to use directly a hotspot
export interface UseDirectlyAction {
    comment: Cue[];
}


export interface Hotspot {
    hotspotId: HotspotId;

    description: string;

    // The default action to execute on this hotspot, if any
    rightClickAction?: ActionBarButton;

    // If defined, this indicates that this hotspot is a
    // location that, when clicked on, trigger a game screen change.
    // Such hotspots cannot be combined with action and their description
    // is supposed to be fully descriptive like 'Enter bank'
    movementHotspot?: SceneId;

    // When a hotspot is an object or character that the guy needs to come
    // close to to interact with, this represents where the guy should be
    guyPositionForAction?: GuyPosition;

    // Defined if we can talk to this hotspot, with the dialog to use
    dialog?: Dialog;

    lookAt: Cue[];
    take?: TakeAction;
    useDirectly?: UseDirectlyAction;
}


export function isHotspotId(obj: any): obj is HotspotId {
    return Object.values(HotspotId).includes(obj);
}

export function isHotspot(obj: any): obj is Hotspot {
    return typeof obj === 'object' && 'hotspotId' in obj && 'description' in obj;
}
