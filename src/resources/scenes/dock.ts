import { PaintTask, getPaintTask } from "@/paintTask";
import { ZIndex } from "@/zIndex";
import { combine, createFullHotspot, GuyPosition, HotspotId } from "@/hotspots";
import { SceneLoader, SceneId, SceneData } from "@/scene";
import { Triggers } from "@/triggers";
import { ANIM_SEA } from "../animations/sea";
import { SPR_DOCK_0 } from "../generated/images/SPR_DOCK_0";
import { HighlanderAnimation } from "../animations/highlander";
import { SPR_CLOUD_0 } from "../generated/images/SPR_CLOUD_0";
import { SPR_CLOUD_1 } from "../generated/images/SPR_CLOUD_1";
import { SPR_CLOUD_2 } from "../generated/images/SPR_CLOUD_2";
import { ANIM_BIRD, ANIM_BIRD2 } from "../animations/bird";

const dockFilter = createFullHotspot(HotspotId.DOCK);
const dockBackground: PaintTask = getPaintTask(SPR_DOCK_0, 0, 18, ZIndex.BEHIND_GUY, combine(dockFilter));
const cloud0: PaintTask = getPaintTask(SPR_CLOUD_0, 9, 2, ZIndex.BEHIND_GUY, undefined);
const cloud1: PaintTask = getPaintTask(SPR_CLOUD_1, 23, 0, ZIndex.BEHIND_GUY, undefined);
const cloud2: PaintTask = getPaintTask(SPR_CLOUD_2, 48, 0, ZIndex.BEHIND_GUY, undefined);

const initialGuyPosition: GuyPosition = {
    left: 5,
    top: 12,
    lookToTheRight: true,
    maxLeft: 35,
};

export const DOCK_LOADER: SceneLoader = {
    sceneId: SceneId.DOCK,
    load(triggers: Triggers): SceneData {
        triggers.add('DOCK_VISITED');
        return {
            showActionBar: true,
            guyPosition: initialGuyPosition,
            images: [dockBackground, cloud0, cloud1, cloud2],
            animations: [ ANIM_SEA, ANIM_BIRD, ANIM_BIRD2, new HighlanderAnimation() ],
            hotspots: []
        };
    }
}
