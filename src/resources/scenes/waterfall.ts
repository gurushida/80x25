import { PaintTask, getPaintTask } from "@/paintTask";
import { ZIndex } from "@/zIndex";
import { createMaskHotspot, GuyPosition, Hotspot, HotspotId } from "@/hotspots";
import { SceneLoader, SceneId, SceneData } from "@/scene";
import { Triggers } from "@/triggers";
import { ImageAnimation, NO_LEFT_MOVEMENT } from "@/animations";
import { ActionBarButton } from "@/screenBuffer";
import { SPR_WATERFALL_0 } from "../generated/images/SPR_WATERFALL_0";
import { BG_WATERFALL } from "../generated/images/BG_WATERFALL";
import { SPR_WATERFALL_1 } from "../generated/images/SPR_WATERFALL_1";
import { SPR_WATERFALL_2 } from "../generated/images/SPR_WATERFALL_2";

const background: PaintTask = getPaintTask(BG_WATERFALL, 0, 0, ZIndex.BACKGROUND, undefined);

const ANIM_WATERFALL = new ImageAnimation(37, 9, ZIndex.BEHIND_GUY, true, createMaskHotspot(SPR_WATERFALL_0, HotspotId.WATERFALL),
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_WATERFALL_0,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_WATERFALL_1,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_WATERFALL_2,
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


const hotspots: Hotspot[] = [
    {
        hotspotId: HotspotId.WATERFALL,
        description: 'waterfall',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['I love waterfalls.'], ['They are exciting promises', 'of secret passages behind them,'], ['and tragic fate for','IQ-challenged people'], ['that neglect to read maps', 'before canoeing on rivers.']]
    },
];

export const WATERFALL_LOADER: SceneLoader = {
    sceneId: SceneId.WATERFALL,
    load(triggers: Triggers): SceneData {
        triggers.add('WATERFALL_VISITED');
        return {
            showActionBar: true,
            guyPosition: initialGuyPosition,
            images: [ background ],
            animations: [ ANIM_WATERFALL ],
            hotspots,
        };
    }
}

