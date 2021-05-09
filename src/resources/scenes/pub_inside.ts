import { createMaskHotspot, GuyPosition, Hotspot, HotspotId } from "@/hotspots";
import { PaintTask, getPaintTask } from "@/paintTask";
import { SceneId, SceneLoader, SceneData } from "@/scene";
import { ActionBarButton } from "@/screenBuffer";
import { Triggers } from "@/triggers";
import { ZIndex } from "@/zIndex";
import { BG_PUB_INSIDE } from "../generated/images/BG_PUB_INSIDE";
import { SPR_POOL_TABLE } from "../generated/images/SPR_POOL_TABLE";


const background: PaintTask = getPaintTask(BG_PUB_INSIDE, 0, 0, ZIndex.BEHIND_GUY, undefined);
const pool_table1: PaintTask = getPaintTask(SPR_POOL_TABLE, 11, 7, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_POOL_TABLE, HotspotId.POOL_TABLE));
const pool_table2: PaintTask = getPaintTask(SPR_POOL_TABLE, 50, 7, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_POOL_TABLE, HotspotId.POOL_TABLE));

const initialGuyPosition: GuyPosition = {
    left: 29,
    top: 13,
    lookToTheRight: true
};

const hotspots: Hotspot[] = [
    {
        hotspotId: HotspotId.POOL_TABLE,
        description: 'pool table',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['Bad memories.'], ['I shouldn\'t have played', 'with this Fast Eddie guy.']]
    },
];

export const INSIDE_PUB_LOADER: SceneLoader = {
    sceneId: SceneId.INSIDE_PUB,
    load(triggers: Triggers): SceneData {
        return {
            showActionBar: true,
            guyPosition: initialGuyPosition,
            images: [background, pool_table1, pool_table2],
            animations: [],
            hotspots,
        };
    }
}