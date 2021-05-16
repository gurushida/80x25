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
import { SPR_PIG1 } from "../generated/images/SPR_PIG1";
import { SPR_PIG0 } from "../generated/images/SPR_PIG0";
import { SPR_GOAT0 } from "../generated/images/SPR_GOAT0";
import { SPR_GOAT1 } from "../generated/images/SPR_GOAT1";
import { BG_FARM } from "../generated/images/BG_FARM";
import { SPR_TRACTOR } from "../generated/images/SPR_TRACTOR";
import { FarmerAnimation } from "../animations/farmer";
import { DIALOG_FARMER } from "../generated/dialogs/DIALOG_FARMER";

const background: PaintTask = getPaintTask(BG_FARM, 0, 0, ZIndex.BACKGROUND, undefined);
const tractor: PaintTask = getPaintTask(SPR_TRACTOR, 50, 2, ZIndex.BACKGROUND, createMaskHotspot(SPR_TRACTOR, HotspotId.TRACTOR));

const barrier: PaintTask = getPaintTask(SPR_FARM_BARRIER, 0, 21, ZIndex.FRONT, undefined);
const well: PaintTask = getPaintTask(SPR_WELL, 0, 12, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_WELL, HotspotId.WELL));
const garden: PaintTask = getPaintTask(SPR_VEGETABLE_GARDEN, 15, 14, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_VEGETABLE_GARDEN, HotspotId.VEGETABLE_GARDEN));

const ANIM_PIG = new ImageAnimation(49, 13, ZIndex.BEHIND_GUY, true, createMaskHotspot(SPR_PIG0, HotspotId.PIG),
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

const ANIM_GOAT = new ImageAnimation(65, 13, ZIndex.BEHIND_GUY, true, createMaskHotspot(SPR_GOAT0, HotspotId.GOAT),
    NO_LEFT_MOVEMENT, [
        {
            image: SPR_GOAT0,
            durationInTicks: 120,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_GOAT1,
            durationInTicks: 120,
            offsetX: 0,
            offsetY: 0,
        },
    ]);

const ANIM_WORM = new ImageAnimation(21, 17, ZIndex.BEHIND_GUY, true, createMaskHotspot(SPR_WORM0, HotspotId.WORM),
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
    {
        hotspotId: HotspotId.TRACTOR,
        description: 'tractor',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['This is a beautiful', 'piece of engineering'], ['with a very powerful engine.'], ['Perfect for field work'], ['and intimidating', 'highway protests.']]
    },
    {
        hotspotId: HotspotId.FARMER,
        description: 'farmer',
        rightClickAction: ActionBarButton.TALK,
        dialog: DIALOG_FARMER,
        guyPositionForAction: {
            left: 29,
            top: 11,
            lookToTheRight: true
        },
        lookAt: [['A farmer.']],
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
            images: [ background, barrier, well, garden, tractor ],
            animations: [ ANIM_WORM, ANIM_PIG, ANIM_GOAT, new FarmerAnimation() ],
            hotspots,
        };
    }
}

