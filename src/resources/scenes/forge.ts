import { HotspotId, GuyPosition, Hotspot, createMaskHotspot } from "@/hotspots";
import { SceneLoader, SceneId, SceneData } from "@/scene";
import { Triggers } from "@/triggers";
import { PaintTask, getPaintTask } from "@/paintTask";
import { ZIndex } from "@/zIndex";
import { BG_FORGE } from "../generated/images/BG_FORGE";
import { ANIM_FIRE } from "../animations/fire";
import { ImageAnimation, NO_LEFT_MOVEMENT } from "@/animations";
import { SPR_BELLOWS_0 } from "../generated/images/SPR_BELLOWS_0";
import { SPR_BELLOWS_1 } from "../generated/images/SPR_BELLOWS_1";
import { ActionBarButton } from "@/screenBuffer";
import { SPR_BELLOWS_2 } from "../generated/images/SPR_BELLOWS_2";


const background: PaintTask = getPaintTask(BG_FORGE, 0, 0, ZIndex.BACKGROUND, undefined);

const BELLOWS_TICKS = 8;
const ANIM_BELLOWS = new ImageAnimation(54, 13, ZIndex.BACKGROUND, true, createMaskHotspot(SPR_BELLOWS_0, HotspotId.BELLOWS),
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_BELLOWS_0,
            durationInTicks: BELLOWS_TICKS * 8,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BELLOWS_1,
            durationInTicks: BELLOWS_TICKS,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BELLOWS_2,
            durationInTicks: BELLOWS_TICKS * 4,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BELLOWS_1,
            durationInTicks: BELLOWS_TICKS,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

const hotspots: Hotspot[] = [
    {
        hotspotId: HotspotId.FIRE,
        description: 'fire',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['Fire.']]
    },
    {
        hotspotId: HotspotId.BELLOWS,
        description: 'bellows',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['Bellows.']]
    },
];

const initialGuyPosition: GuyPosition = {
    left: 73,
    top: 15,
    lookToTheRight: false
};



export const FORGE_LOADER: SceneLoader = {
    sceneId: SceneId.FORGE,
    load(triggers: Triggers): SceneData {
        triggers.add('FORGE_VISITED');
        return {
            showActionBar: true,
            guyPosition: initialGuyPosition,
            images: [ background ],
            animations: [ ANIM_FIRE, ANIM_BELLOWS ],
            hotspots,
        };
    }
}
