import { PaintTask, getPaintTask } from "@/paintTask";
import { ZIndex } from "@/zIndex";
import { combine, createFullHotspot, HotspotId, GuyPosition, Hotspot } from "@/hotspots";
import { SceneLoader, SceneId, SceneData } from "@/scene";
import { Triggers } from "@/triggers";
import { ActionBarButton } from "@/screenBuffer";
import { BG_PUB_OUTSIDE } from "../generated/images/BG_PUB_OUTSIDE";
import { ANIM_PUB_LAMP1, ANIM_PUB_LAMP2 } from "../animations/pub_lamp";


const fullFilter = createFullHotspot(HotspotId.PUB);
const pubBackground: PaintTask = getPaintTask(BG_PUB_OUTSIDE, 0, 0, ZIndex.BACKGROUND, combine(fullFilter));

const pubHotspots: Hotspot[] = [
    {
        hotspotId: HotspotId.PUB,
        description: 'pub',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [[ 'The best place in town'], ['for responsible consumption'], ['of organic plant-based beverages.']]
    },
];

const initialGuyPosition: GuyPosition = {
    left: 75,
    top: 14,
    lookToTheRight: false
};



export const OUTSIDE_PUB_LOADER: SceneLoader = {
    sceneId: SceneId.OUTSIDE_PUB,
    load(triggers: Triggers): SceneData {
        triggers.add('PUB_VISITED');
        return {
            showActionBar: true,
            guyPosition: initialGuyPosition,
            images: [ pubBackground ],
            animations: [ANIM_PUB_LAMP1, ANIM_PUB_LAMP2],
            hotspots: pubHotspots
        };
    }
}
