import { PaintTask, getPaintTask } from "@/paintTask";
import { ZIndex } from "@/zIndex";
import { createFullHotspot, createMaskHotspot, GuyPosition, Hotspot, HotspotId } from "@/hotspots";
import { SceneLoader, SceneId, SceneData } from "@/scene";
import { Triggers } from "@/triggers";
import { ImageAnimation, NO_LEFT_MOVEMENT } from "@/animations";
import { ActionBarButton } from "@/screenBuffer";
import { SPR_WATERFALL_0 } from "../generated/images/SPR_WATERFALL_0";
import { BG_WATERFALL } from "../generated/images/BG_WATERFALL";
import { SPR_WATERFALL_1 } from "../generated/images/SPR_WATERFALL_1";
import { SPR_WATERFALL_2 } from "../generated/images/SPR_WATERFALL_2";
import { SPR_LAKE_0 } from "../generated/images/SPR_LAKE_0";
import { SPR_LAKE_1 } from "../generated/images/SPR_LAKE_1";
import { SPR_LAKE_2 } from "../generated/images/SPR_LAKE_2";
import { SPR_LAKE_3 } from "../generated/images/SPR_LAKE_3";
import { SPR_LAKE_4 } from "../generated/images/SPR_LAKE_4";
import { SPR_LAKE_5 } from "../generated/images/SPR_LAKE_5";
import { SPR_LAKE_10 } from "../generated/images/SPR_LAKE_10";
import { SPR_LAKE_6 } from "../generated/images/SPR_LAKE_6";
import { SPR_LAKE_7 } from "../generated/images/SPR_LAKE_7";
import { SPR_LAKE_8 } from "../generated/images/SPR_LAKE_8";
import { SPR_LAKE_9 } from "../generated/images/SPR_LAKE_9";
import { SPR_FLY_0 } from "../generated/images/SPR_FLY_0";
import { SPR_FLY_1 } from "../generated/images/SPR_FLY_1";
import { SPR_FLY_2 } from "../generated/images/SPR_FLY_2";
import { SPR_FLY_3 } from "../generated/images/SPR_FLY_3";

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

const ANIM_LAKE = new ImageAnimation(0, 17, ZIndex.BEHIND_GUY, true, createMaskHotspot(SPR_LAKE_0, HotspotId.LAKE),
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_LAKE_0,
            durationInTicks: 200,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_LAKE_1,
            durationInTicks: 5,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_LAKE_2,
            durationInTicks: 5,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_LAKE_3,
            durationInTicks: 5,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_LAKE_4,
            durationInTicks: 5,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_LAKE_5,
            durationInTicks: 5,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_LAKE_0,
            durationInTicks: 200,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_LAKE_6,
            durationInTicks: 5,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_LAKE_7,
            durationInTicks: 5,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_LAKE_8,
            durationInTicks: 5,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_LAKE_9,
            durationInTicks: 5,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_LAKE_10,
            durationInTicks: 5,
            offsetX: 0,
            offsetY: 0,
        },
    ]);


const ANIM_FLY = new ImageAnimation(50, 17, ZIndex.BEHIND_GUY, true, createFullHotspot(HotspotId.FLY),
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_FLY_0,
            durationInTicks: 5,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_FLY_1,
            durationInTicks: 5,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_FLY_2,
            durationInTicks: 5,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_FLY_3,
            durationInTicks: 5,
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
    {
        hotspotId: HotspotId.LAKE,
        description: 'lake',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['This is a beautiful lake,'], ['a peaceful place for fishes to wait'], ['for the discovery of mouth piercing.']]
    },
    {
        hotspotId: HotspotId.FLY,
        description: 'fly',
        rightClickAction: ActionBarButton.LOOK,
        take: {
            comment: [['It is too fast.']],
        },
        lookAt: [['A common specimen of diptera.'], ['Its annoyance power is only', 'surpassed in the insect kingdom'], ['by barbecue wasps'], ['and silent nightly mosquitoes.']]
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
            animations: [ ANIM_WATERFALL, ANIM_LAKE, ANIM_FLY ],
            hotspots,
        };
    }
}

