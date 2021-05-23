import { PaintTask, getPaintTask } from "@/paintTask";
import { ZIndex } from "@/zIndex";
import { createMaskHotspot, GuyPosition, Hotspot, HotspotId } from "@/hotspots";
import { SceneLoader, SceneId, SceneData } from "@/scene";
import { Triggers } from "@/triggers";
import { BG_CASCADE } from "../generated/images/BG_CASCADE";
import { SPR_CASCADE_0 } from "../generated/images/SPR_CASCADE_0";
import { ImageAnimation, NO_LEFT_MOVEMENT } from "@/animations";
import { SPR_CASCADE_1 } from "../generated/images/SPR_CASCADE_1";
import { SPR_CASCADE_2 } from "../generated/images/SPR_CASCADE_2";

const background: PaintTask = getPaintTask(BG_CASCADE, 0, 0, ZIndex.BACKGROUND, undefined);

const ANIM_CASCADE = new ImageAnimation(37, 9, ZIndex.BEHIND_GUY, true, createMaskHotspot(SPR_CASCADE_0, HotspotId.CASCADE),
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_CASCADE_0,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_CASCADE_1,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_CASCADE_2,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

const initialGuyPosition: GuyPosition = {
    left: 6,
    top: 13,
    lookToTheRight: true,
};


const hotspots: Hotspot[] =[];

export const CASCADE_LOADER: SceneLoader = {
    sceneId: SceneId.CASCADE,
    load(triggers: Triggers): SceneData {
        triggers.add('CASCADE_VISITED');
        return {
            showActionBar: true,
            guyPosition: initialGuyPosition,
            images: [ background ],
            animations: [ ANIM_CASCADE ],
            hotspots,
        };
    }
}

