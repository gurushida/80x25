import { ImageAnimation, NO_LEFT_MOVEMENT } from "@/animations";
import { createFullHotspot, createMaskHotspot, GuyPosition, Hotspot, HotspotId } from "@/hotspots";
import { PaintTask, getPaintTask } from "@/paintTask";
import { SceneLoader, SceneId, SceneData } from "@/scene";
import { ActionBarButton } from "@/screenBuffer";
import { Triggers } from "@/triggers";
import { ZIndex } from "@/zIndex";
import { DonAldoAnimation } from "../animations/don_aldo";
import { ANIM_PIZZAIOLO } from "../animations/pizzaiolo";
import { createPizzeriaTable } from "../animations/pizzeria_table";
import { DIALOG_DON_ALDO } from "../generated/dialogs/DIALOG_DON_ALDO";
import { BG_PIZZERIA } from "../generated/images/BG_PIZZERIA";
import { SPR_GONDOLA } from "../generated/images/SPR_GONDOLA";
import { SPR_OVEN_PEEL } from "../generated/images/SPR_OVEN_PEEL";
import { SPR_PIZZA_OVEN_0 } from "../generated/images/SPR_PIZZA_OVEN_0";
import { SPR_PIZZA_OVEN_1 } from "../generated/images/SPR_PIZZA_OVEN_1";

const background: PaintTask = getPaintTask(BG_PIZZERIA, 0, 0, ZIndex.BACKGROUND, undefined);

const ovel_peel: PaintTask = getPaintTask(SPR_OVEN_PEEL, 17, 2, ZIndex.BACKGROUND, undefined);
const gondola: PaintTask = getPaintTask(SPR_GONDOLA, 48, 0, ZIndex.BACKGROUND, createFullHotspot(HotspotId.GONDOLA));

const ANIM_TABLE1 = createPizzeriaTable(5, 17, ZIndex.FRONT);
const ANIM_TABLE2 = createPizzeriaTable(26, 11, ZIndex.BEHIND_GUY);
const ANIM_TABLE3 = createPizzeriaTable(47, 18, ZIndex.FRONT);
const ANIM_TABLE4 = createPizzeriaTable(55, 8, ZIndex.BEHIND_GUY);

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
        lookAt: [['A traditional oven,', 'for baking pizzas'], ['and old ladies owning', 'gingerbread real estate.']]
    },
    {
        hotspotId: HotspotId.GONDOLA,
        description: 'gondola painting',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['Ah, Venice.'], ['What\'s more romantic', 'than a boat tour'], ['on a tide-driven', 'sewer system ?']]
    },
    {
        hotspotId: HotspotId.PIZZERIA_TABLE,
        description: 'table',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['A table for two,'], ['with the mandatory candle', 'in a Chianti bottle.']]
    },
    {
        hotspotId: HotspotId.DON_ALDO,
        description: 'Don Aldo',
        rightClickAction: ActionBarButton.TALK,
        dialog: DIALOG_DON_ALDO,
        guyPositionForAction: {
            left: 58,
            top: 12,
            lookToTheRight: true
        },
        lookAt: [['This is Don Aldo,'], ['the patriach of', 'this family business.']],
    },
];

const initialGuyPosition: GuyPosition = {
    left: 4,
    top: 12,
    lookToTheRight: true
};



export const PIZZERIA_LOADER: SceneLoader = {
    sceneId: SceneId.PIZZERIA,
    load(triggers: Triggers): SceneData {
        triggers.add('PIZZERIA_VISITED');
        return {
            showActionBar: true,
            guyPosition: initialGuyPosition,
            images: [ background, ovel_peel, gondola ],
            animations: [ ANIM_PIZZAIOLO, ANIM_OVEN, ANIM_TABLE1, ANIM_TABLE2, ANIM_TABLE3, ANIM_TABLE4, new DonAldoAnimation() ],
            hotspots: hotspots
        };
    }
}
