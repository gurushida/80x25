import { GuyPosition, Hotspot } from "./hotspots";
import { Animation } from "./animations";
import { PaintTask } from "./paintTask";
import { Triggers } from "./triggers";


export interface SceneData {
    showActionBar: boolean;
    guyPosition: GuyPosition | undefined;
    images: PaintTask[];
    animations: Animation[];
    hotspots: Hotspot[],
}

/**
 * Depending on the current state of the game represented by
 * the triggers, a scene may need to load different things. The
 * role of the scene loader is to configure and return the data
 * for given scene in a given state.
 */
export interface SceneLoader {
    sceneId: SceneId;
    load(triggers: Triggers): SceneData;
}


export enum SceneId {
    ICE_CREAM_SHOP,
    OUTSIDE_BANK,
    OUTSIDE_PUB,
    INSIDE_PUB,
    DOCK,
    ARCADE,
    PARK,
    OUTSIDE_CINEMA,
    INSIDE_CINEMA,
    PHARMACY,
    FORGE,
    FARM,
    PIZZERIA,
    WATERFALL,
    JEWELLERY_STORE_OUTSIDE,
}

