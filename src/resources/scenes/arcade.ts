import { createMaskHotspot, GuyPosition, HotspotId } from "@/hotspots";
import { PaintTask, getPaintTask } from "@/paintTask";
import { SceneLoader, SceneId, SceneData } from "@/scene";
import { Triggers } from "@/triggers";
import { ZIndex } from "@/zIndex";
import { ANIM_ARCADE_SIGN } from "../animations/arcade_sign";
import { ANIM_LAMP } from "../animations/lamp";
import { BG_ARCADE } from "../generated/images/BG_ARCADE";
import { SPR_ARCADE_CABINET } from "../generated/images/SPR_ARCADE_CABINET";
import { SPR_ARCADE_TABLE } from "../generated/images/SPR_ARCADE_TABLE";

const game1: PaintTask = getPaintTask(SPR_ARCADE_CABINET, 0, 11, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_ARCADE_CABINET, HotspotId.ARCADE_GAME1));
const game2: PaintTask = getPaintTask(SPR_ARCADE_CABINET, 11, 11, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_ARCADE_CABINET, HotspotId.ARCADE_GAME2));
const game3: PaintTask = getPaintTask(SPR_ARCADE_CABINET, 22, 11, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_ARCADE_CABINET, HotspotId.ARCADE_GAME3));

const game4: PaintTask = getPaintTask(SPR_ARCADE_CABINET, 48, 11, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_ARCADE_CABINET, HotspotId.ARCADE_GAME4));
const game5: PaintTask = getPaintTask(SPR_ARCADE_CABINET, 59, 11, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_ARCADE_CABINET, HotspotId.ARCADE_GAME5));
const game6: PaintTask = getPaintTask(SPR_ARCADE_CABINET, 70, 11, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_ARCADE_CABINET, HotspotId.ARCADE_GAME6));

const table: PaintTask = getPaintTask(SPR_ARCADE_TABLE, 62, 21, ZIndex.FRONT, undefined);

const arcadeBackground: PaintTask = getPaintTask(BG_ARCADE, 0, 0, ZIndex.BACKGROUND, undefined);


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
            images: [arcadeBackground, game1, game2, game3, game4, game5, game6, table,],
            animations: [ANIM_LAMP, ANIM_ARCADE_SIGN],
            hotspots: [],
        };
    }
}
