import { GuyPosition } from "../../hotspots";
import { SceneId, SceneLoader, SceneData } from "../../scene";
import { Trigger } from "../../triggers";

const initialGuyPosition: GuyPosition = {
    left: 28,
    top: 14,
    lookToTheRight: true
};

export const INSIDE_ICE_CREAM_SHOP_LOADER: SceneLoader = {
    sceneId: SceneId.INSIDE_ICE_CREAM_SHOP,
    load(triggers: Trigger[]): SceneData {
        return {
            showActionBar: true,
            guyPosition: initialGuyPosition,
            images: [],
            animations: [],
            hotspots: []
        };
    }
}