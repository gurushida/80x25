import { createFullHotspot, HotspotId, combine, GuyPosition, Hotspot } from "../../hotspots";
import { DogAnimation } from "../animations/dog";
import { Action } from "../../actions";
import { SceneId, SceneLoader, SceneData } from "../../scene";
import { BG_ICE_CREAM_SHOP } from "../background";
import { ZIndex } from "../../zIndex";
import { PaintTask, getPaintTask } from "../../paintTask";
import { loadDialogGrf } from "../../dialog";
import { Trigger } from "src/triggers";

const fullFilter = createFullHotspot(HotspotId.ICE_CREAM_SHOP);
const doorFilter = (x: number, y: number) => {
    if (x >= 32 && x <= 41 && y >= 8 && y <= 14) {
        return HotspotId.ICE_CREAM_SHOP_DOOR;
    }
    return undefined;
};
const iceCreamShopBackground: PaintTask = getPaintTask(BG_ICE_CREAM_SHOP, 0, 0, ZIndex.BACKGROUND, combine(doorFilter, fullFilter));
const iceCreamShopHotspots: Hotspot[] = [
    {
        hotspotId: HotspotId.ICE_CREAM_SHOP,
        description: 'ice cream shop',
        rightClickAction: Action.LOOK,
        lookAt: [[ 'This is an ice cream shop known', 'for its avant-garde flavors.' ]]
    },
    {
        hotspotId: HotspotId.ICE_CREAM_SHOP_DOOR,
        description: 'Enter ice cream shop',
        movementHotspot: SceneId.INSIDE_ICE_CREAM_SHOP,
        lookAt: [[]]
    },
    {
        hotspotId: HotspotId.DOG,
        description: 'dog',
        rightClickAction: Action.LOOK,
        guyPositionForAction: {
            left: 41,
            top: 14,
            lookToTheRight: true
        },
        dialog: loadDialogGrf('src/resources/dialogs/dog.grf'),
        lookAt: [['It\'s a good dog.']],
        take: { comment: [['I\'m not sure he would agree.']] },
        useDirectly: { comment: [['Huh ? What ?']] }
    }
];
const initialGuyPosition: GuyPosition = {
    left: 28,
    top: 14,
    lookToTheRight: true
};

export const OUTSIDE_ICE_CREAM_SHOP_LOADER: SceneLoader = {
    sceneId: SceneId.OUTSIDE_ICE_CREAM_SHOP,
    load(triggers: Trigger[]): SceneData {
        return {
            showActionBar: true,
            guyPosition: initialGuyPosition,
            images: [ iceCreamShopBackground ],
            animations: [ new DogAnimation() ],
            hotspots: iceCreamShopHotspots
        };
    }
}