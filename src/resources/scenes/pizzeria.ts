import { ImageAnimation, NO_LEFT_MOVEMENT } from "@/animations";
import { createMaskHotspot, GuyPosition, Hotspot, HotspotId } from "@/hotspots";
import { PaintTask, getPaintTask } from "@/paintTask";
import { SceneLoader, SceneId, SceneData } from "@/scene";
import { ActionBarButton } from "@/screenBuffer";
import { Triggers } from "@/triggers";
import { ZIndex } from "@/zIndex";
import { ANIM_PIZZAIOLO } from "../animations/pizzaiolo";
import { BG_PIZZERIA } from "../generated/images/BG_PIZZERIA";
import { SPR_OVEN_PEEL } from "../generated/images/SPR_OVEN_PEEL";
import { SPR_PIZZA_OVEN_0 } from "../generated/images/SPR_PIZZA_OVEN_0";
import { SPR_PIZZA_OVEN_1 } from "../generated/images/SPR_PIZZA_OVEN_1";

const background: PaintTask = getPaintTask(BG_PIZZERIA, 0, 0, ZIndex.BACKGROUND, undefined);

const ovel_peel: PaintTask = getPaintTask(SPR_OVEN_PEEL, 17, 2, ZIndex.BACKGROUND, undefined);

const ANIM_OVEN = new ImageAnimation(25, 3, ZIndex.BEHIND_GUY, true, createMaskHotspot(SPR_PIZZA_OVEN_0, HotspotId.OVEN),
    NO_LEFT_MOVEMENT, [
        {
            image: SPR_PIZZA_OVEN_0,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_PIZZA_OVEN_1,
            durationInTicks: 20,
            offsetX: 0,
            offsetY: 0,
        },
    ]);


const hotspots: Hotspot[] = [
    {
        hotspotId: HotspotId.PIZZAIOLO,
        description: 'pizzaiolo',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['Forget Roman catapults.'], ['Pizza tossing is probably'], ['the biggest Italian contribution'], ['to the field of ballistics.']]
    },
    {
        hotspotId: HotspotId.OVEN,
        description: 'oven',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['A traditional oven,', 'for cooking pizzas'], ['and old ladies owning', 'gingerbread real estate.']]
    },
];

const initialGuyPosition: GuyPosition = {
    left: 73,
    top: 13,
    lookToTheRight: false
};



export const PIZZERIA_LOADER: SceneLoader = {
    sceneId: SceneId.PIZZERIA,
    load(triggers: Triggers): SceneData {
        triggers.add('PIZZERIA_VISITED');
        return {
            showActionBar: true,
            guyPosition: initialGuyPosition,
            images: [ background, ovel_peel ],
            animations: [ ANIM_PIZZAIOLO, ANIM_OVEN ],
            hotspots: hotspots
        };
    }
}
