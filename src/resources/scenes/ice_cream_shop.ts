import { createFullHotspot, HotspotId, combine, GuyPosition, Hotspot, createMaskHotspot } from "@/hotspots";
import { SceneId, SceneLoader, SceneData } from "@/scene";
import { ZIndex } from "@/zIndex";
import { PaintTask, getPaintTask } from "@/paintTask";
import { Triggers } from "@/triggers";
import { ActionBarButton } from "@/screenBuffer";
import { BG_ICE_CREAM_SHOP } from "../generated/images/BG_ICE_CREAM_SHOP";
import { SPR_ICE_CREAM0 } from "../generated/images/SPR_ICE_CREAM0";
import { SPR_ICE_CREAM1 } from "../generated/images/SPR_ICE_CREAM1";
import { SPR_ICE_CREAM10 } from "../generated/images/SPR_ICE_CREAM10";
import { SPR_ICE_CREAM2 } from "../generated/images/SPR_ICE_CREAM2";
import { SPR_ICE_CREAM3 } from "../generated/images/SPR_ICE_CREAM3";
import { SPR_ICE_CREAM4 } from "../generated/images/SPR_ICE_CREAM4";
import { SPR_ICE_CREAM5 } from "../generated/images/SPR_ICE_CREAM5";
import { SPR_ICE_CREAM6 } from "../generated/images/SPR_ICE_CREAM6";
import { SPR_ICE_CREAM7 } from "../generated/images/SPR_ICE_CREAM7";
import { SPR_ICE_CREAM8 } from "../generated/images/SPR_ICE_CREAM8";
import { SPR_ICE_CREAM9 } from "../generated/images/SPR_ICE_CREAM9";
import { AlfredoAnimation } from "../animations/alfredo";
import { DIALOG_ALFREDO } from "../generated/dialogs/DIALOG_ALFREDO";

const fullFilter = createFullHotspot(HotspotId.ICE_CREAM_SHOP);

const ice_cream0: PaintTask = getPaintTask(SPR_ICE_CREAM0, 7, 19, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_ICE_CREAM0, HotspotId.ICE_CREAM0));
const ice_cream1: PaintTask = getPaintTask(SPR_ICE_CREAM1, 13, 19, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_ICE_CREAM1, HotspotId.ICE_CREAM1));
const ice_cream2: PaintTask = getPaintTask(SPR_ICE_CREAM2, 19, 19, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_ICE_CREAM2, HotspotId.ICE_CREAM2));
const ice_cream3: PaintTask = getPaintTask(SPR_ICE_CREAM3, 25, 19, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_ICE_CREAM3, HotspotId.ICE_CREAM3));
const ice_cream4: PaintTask = getPaintTask(SPR_ICE_CREAM4, 31, 19, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_ICE_CREAM4, HotspotId.ICE_CREAM4));
const ice_cream5: PaintTask = getPaintTask(SPR_ICE_CREAM5, 37, 19, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_ICE_CREAM5, HotspotId.ICE_CREAM5));
const ice_cream6: PaintTask = getPaintTask(SPR_ICE_CREAM6, 43, 19, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_ICE_CREAM6, HotspotId.ICE_CREAM6));
const ice_cream7: PaintTask = getPaintTask(SPR_ICE_CREAM7, 49, 19, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_ICE_CREAM7, HotspotId.ICE_CREAM7));
const ice_cream8: PaintTask = getPaintTask(SPR_ICE_CREAM8, 55, 19, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_ICE_CREAM8, HotspotId.ICE_CREAM8));
const ice_cream9: PaintTask = getPaintTask(SPR_ICE_CREAM9, 61, 19, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_ICE_CREAM9, HotspotId.ICE_CREAM9));
const ice_cream10: PaintTask = getPaintTask(SPR_ICE_CREAM10, 67, 19, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_ICE_CREAM10, HotspotId.ICE_CREAM10));

const background: PaintTask = getPaintTask(BG_ICE_CREAM_SHOP, 0, 0, ZIndex.BACKGROUND, combine(fullFilter));
const hotspots: Hotspot[] = [
    {
        hotspotId: HotspotId.ICE_CREAM_SHOP,
        description: 'ice cream shop',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [[ 'This is an ice cream shop known', 'for its avant-garde flavors.' ]]
    },
    {
        hotspotId: HotspotId.ICE_CREAM0,
        description: 'ice cream',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['"Mussels sorbet with its', 'Peruvian strawberries coulis"']]
    },
    {
        hotspotId: HotspotId.ICE_CREAM1,
        description: 'ice cream',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['"Matured watermelon with gorgonzola crispy chunks']]
    },
    {
        hotspotId: HotspotId.ICE_CREAM2,
        description: 'ice cream',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [[ '"Smoked chocolate with leather merinque"' ]]
    },
    {
        hotspotId: HotspotId.ICE_CREAM3,
        description: 'ice cream',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [[ '"Emulsified coconut-clay delice"' ]]
    },
    {
        hotspotId: HotspotId.ICE_CREAM4,
        description: 'ice cream',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [[ '"Lemon tart flambée with crab-liquor"' ]]
    },
    {
        hotspotId: HotspotId.ICE_CREAM5,
        description: 'ice cream',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [[ '"Marshmallow gravlax in garlic wine"' ]]
    },
    {
        hotspotId: HotspotId.ICE_CREAM6,
        description: 'ice cream',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [[ '"Crunchy kidney with licorice syrup"' ]]
    },
    {
        hotspotId: HotspotId.ICE_CREAM7,
        description: 'ice cream',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [[ '"Pineapple-mackerel Chantilly"' ]]
    },
    {
        hotspotId: HotspotId.ICE_CREAM8,
        description: 'ice cream',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [[ '"Brussels sprouts caramel sorbet"' ]]
    },
    {
        hotspotId: HotspotId.ICE_CREAM9,
        description: 'ice cream',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [[ '"Mayonnaise glacée with snail confit"' ]]
    },
    {
        hotspotId: HotspotId.ICE_CREAM10,
        description: 'ice cream',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [[ '"Mango-apple-kiwi-pear-cherry-lime','& spider silk cotton candy"' ]]
    },
    {
        hotspotId: HotspotId.ALFREDO,
        description: 'Alfredo',
        rightClickAction: ActionBarButton.TALK,
        guyPositionForAction: {
            left: 26,
            top: 14,
            lookToTheRight: true,
        },
        lookAt: [['This Italian chef turned', 'ice cream into an art.'], ['Too bad it\'s crazy modern art.']],
        dialog: DIALOG_ALFREDO,
    },
];
const initialGuyPosition: GuyPosition = {
    left: 18,
    top: 14,
    lookToTheRight: true
};

export const ICE_CREAM_SHOP_LOADER: SceneLoader = {
    sceneId: SceneId.ICE_CREAM_SHOP,
    load(triggers: Triggers): SceneData {
        return {
            showActionBar: true,
            guyPosition: initialGuyPosition,
            images: [ background, ice_cream0, ice_cream1, ice_cream2, ice_cream3, ice_cream4, ice_cream5, ice_cream6,
                ice_cream7, ice_cream8, ice_cream9, ice_cream10 ],
            animations: [ new AlfredoAnimation() ],
            hotspots: hotspots
        };
    }
}
