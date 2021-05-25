import { GuyPosition, Hotspot } from "@/hotspots";
import { SceneId, SceneLoader, SceneData } from "@/scene";
import { Triggers } from "@/triggers";


const initialGuyPosition: GuyPosition = {
    left: 5,
    top: 13,
    lookToTheRight: true
};

const hotspots: Hotspot[] = [
];

export const JEWELLERY_STORE_INSIDE_LOADER: SceneLoader = {
    sceneId: SceneId.JEWELLERY_STORE_INSIDE,
    load(triggers: Triggers): SceneData {
        return {
            showActionBar: true,
            guyPosition: initialGuyPosition,
            images: [ ],
            animations: [ ],
            hotspots,
        };
    }
}