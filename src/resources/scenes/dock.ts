import { PaintTask, getPaintTask } from "../../paintTask";
import { ZIndex } from "../../zIndex";
import { combine, createFullHotspot, GuyPosition, HotspotId } from "../../hotspots";
import { SceneLoader, SceneId, SceneData } from "../../scene";
import { Triggers, Trigger } from "../../triggers";
import { ANIM_SEA } from "../animations/sea";
import { SPR_DOCK_0 } from "../sprites";

const dockFilter = createFullHotspot(HotspotId.DOCK);
const dockBackground: PaintTask = getPaintTask(SPR_DOCK_0, 0, 18, ZIndex.BEHIND_GUY, combine(dockFilter));

const initialGuyPosition: GuyPosition = {
    left: 5,
    top: 12,
    lookToTheRight: true
};

export const DOCK_LOADER: SceneLoader = {
    sceneId: SceneId.DOCK,
    load(triggers: Triggers): SceneData {
        triggers.add(Trigger.DOCK_VISITED);
        return {
            showActionBar: true,
            guyPosition: initialGuyPosition,
            images: [dockBackground],
            animations: [ ANIM_SEA ],
            hotspots: []
        };
    }
}
