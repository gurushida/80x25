import { HotspotId, GuyPosition, Hotspot, createMaskHotspot, createFullHotspot } from "@/hotspots";
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
import { BG_FORGE_WALL } from "../generated/images/BG_FORGE_WALL";
import { ANIM_WALL_CANDLES_1, ANIM_WALL_CANDLES_2 } from "../animations/wall_candles";
import { SPR_BARREL } from "../generated/images/SPR_BARREL";

const wall: PaintTask = getPaintTask(BG_FORGE_WALL, 0, 0, ZIndex.FAR_BACKGROUND, createFullHotspot(HotspotId.FORGE));
const background: PaintTask = getPaintTask(BG_FORGE, 0, 0, ZIndex.BACKGROUND, undefined);
const barrel: PaintTask = getPaintTask(SPR_BARREL, 15, 18, ZIndex.BEHIND_GUY, createFullHotspot(HotspotId.BARREL));

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
    {
        hotspotId: HotspotId.FORGE,
        description: 'forge',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['This is an old-fashioned', 'blacksmith workshop.']]
    },
    {
        hotspotId: HotspotId.BARREL,
        description: 'barrel',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['It is a barrel', 'full of water.'], ['The blacksmith uses it', 'to cool down metal.']]
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
            images: [ wall, background, barrel ],
            animations: [ ANIM_FIRE, ANIM_BELLOWS, ANIM_WALL_CANDLES_1, ANIM_WALL_CANDLES_2 ],
            hotspots,
        };
    }
}
