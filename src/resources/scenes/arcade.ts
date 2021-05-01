import { createMaskHotspot, GuyPosition, HotspotId } from "@/hotspots";
import { PaintTask, getPaintTask } from "@/paintTask";
import { SceneLoader, SceneId, SceneData } from "@/scene";
import { Triggers } from "@/triggers";
import { ZIndex } from "@/zIndex";
import { ANIM_LAMP } from "../animations/lamp";
import { SPR_ARCADE_CABINET } from "../generated/images/SPR_ARCADE_CABINET";

const game1: PaintTask = getPaintTask(SPR_ARCADE_CABINET, 0, 10, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_ARCADE_CABINET, HotspotId.ARCADE_GAME1));
const game2: PaintTask = getPaintTask(SPR_ARCADE_CABINET, 11, 10, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_ARCADE_CABINET, HotspotId.ARCADE_GAME2));
const game3: PaintTask = getPaintTask(SPR_ARCADE_CABINET, 22, 10, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_ARCADE_CABINET, HotspotId.ARCADE_GAME3));


const initialGuyPosition: GuyPosition = {
    left: 5,
    top: 12,
    lookToTheRight: true,
};

export const ARCADE_LOADER: SceneLoader = {
    sceneId: SceneId.ARCADE,
    load(triggers: Triggers): SceneData {
        triggers.add('ARCADE_VISITED');
        return {
            showActionBar: true,
            guyPosition: initialGuyPosition,
            images: [game1, game2, game3],
            animations: [ANIM_LAMP],
            hotspots: [],
        };
    }
}
