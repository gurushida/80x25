import { GuyPosition } from "@/hotspots";
import { SceneId, SceneLoader, SceneData } from "@/scene";
import { Triggers } from "@/triggers";

const initialGuyPosition: GuyPosition = {
    left: 28,
    top: 14,
    lookToTheRight: true
};

export const INSIDE_PUB_LOADER: SceneLoader = {
    sceneId: SceneId.INSIDE_PUB,
    load(triggers: Triggers): SceneData {
        return {
            showActionBar: true,
            guyPosition: initialGuyPosition,
            images: [],
            animations: [],
            hotspots: []
        };
    }
}