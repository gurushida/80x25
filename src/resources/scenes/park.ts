import { HotspotId, GuyPosition, Hotspot } from "@/hotspots";
import { SceneLoader, SceneId, SceneData } from "@/scene";
import { Triggers } from "@/triggers";
import { ActionBarButton } from "@/screenBuffer";
import { ANIM_FOUNTAIN } from "../animations/fountain";



const pubHotspots: Hotspot[] = [
    {
        hotspotId: HotspotId.FOUNTAIN,
        description: 'fountain',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['It is a wish fountain', 'full of coins.']]
    },
];

const initialGuyPosition: GuyPosition = {
    left: 74,
    top: 13,
    lookToTheRight: false
};



export const PARK_LOADER: SceneLoader = {
    sceneId: SceneId.PARK,
    load(triggers: Triggers): SceneData {
        triggers.add('PARK_VISITED');
        return {
            showActionBar: true,
            guyPosition: initialGuyPosition,
            images: [],
            animations: [ANIM_FOUNTAIN],
            hotspots: pubHotspots
        };
    }
}
