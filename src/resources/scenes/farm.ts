import { PaintTask, getPaintTask } from "@/paintTask";
import { ZIndex } from "@/zIndex";
import { createMaskHotspot, GuyPosition, Hotspot, HotspotId } from "@/hotspots";
import { SceneLoader, SceneId, SceneData } from "@/scene";
import { Triggers } from "@/triggers";
import { ActionBarButton } from "@/screenBuffer";
import { SPR_FARM_BARRIER } from "../generated/images/SPR_FARM_BARRIER";
import { SPR_WELL } from "../generated/images/SPR_WELL";
import { SPR_VEGETABLE_GARDEN } from "../generated/images/SPR_VEGETABLE_GARDEN";
import { SPR_WORM0 } from "../generated/images/SPR_WORM0";
import { ImageAnimation, NO_LEFT_MOVEMENT } from "@/animations";
import { SPR_WORM1 } from "../generated/images/SPR_WORM1";
import { SPR_GOAT } from "../generated/images/SPR_GOAT";
import { SPR_PIG1 } from "../generated/images/SPR_PIG1";
import { SPR_PIG0 } from "../generated/images/SPR_PIG0";

const barrier: PaintTask = getPaintTask(SPR_FARM_BARRIER, 0, 21, ZIndex.FRONT, undefined);
const well: PaintTask = getPaintTask(SPR_WELL, 0, 12, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_WELL, HotspotId.WELL));
const garden: PaintTask = getPaintTask(SPR_VEGETABLE_GARDEN, 16, 14, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_VEGETABLE_GARDEN, HotspotId.VEGETABLE_GARDEN));
const goat: PaintTask = getPaintTask(SPR_GOAT, 60, 9, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_GOAT, HotspotId.GOAT));

const ANIM_PIG = new ImageAnimation(42, 11, ZIndex.BEHIND_GUY, true, createMaskHotspot(SPR_PIG0, HotspotId.PIG),
    NO_LEFT_MOVEMENT, [
        {
            image: SPR_PIG0,
            durationInTicks: 70,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PIG1,
            durationInTicks: 6,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

const ANIM_WORM = new ImageAnimation(22, 17, ZIndex.BEHIND_GUY, true, createMaskHotspot(SPR_WORM0, HotspotId.WORM),
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_WORM0,
            durationInTicks: 6,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_WORM1,
            durationInTicks: 6,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

const hotspots: Hotspot[] = [
    {
        hotspotId: HotspotId.WELL,
        description: 'well',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['A stone well.']]
    },
    {
        hotspotId: HotspotId.VEGETABLE_GARDEN,
        description: 'vegetable garden',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['Growing vegetables is', 'like growing kids:'], ['love,'], ['patience,'], ['fighting off predators.']]
    },
    {
        hotspotId: HotspotId.WORM,
        description: 'worm',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['A worm.']]
    },
    {
        hotspotId: HotspotId.PIG,
        description: 'pig',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['A cute little pig,'], ['in its pre-bacon state.']]
    },
    {
        hotspotId: HotspotId.GOAT,
        description: 'goat',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['A goat.']]
    },
];

const initialGuyPosition: GuyPosition = {
    left: 70,
    top: 11,
    lookToTheRight: true,
};

export const FARM_LOADER: SceneLoader = {
    sceneId: SceneId.FARM,
    load(triggers: Triggers): SceneData {
        triggers.add('FARM_VISITED');
        return {
            showActionBar: true,
            guyPosition: initialGuyPosition,
            images: [ barrier, well, garden, /*pig,*/ goat ],
            animations: [ ANIM_WORM, ANIM_PIG ],
            hotspots,
        };
    }
}

