import { SceneEvent } from "../../sceneEngine";
import { createFullHotspot, Hotspot, HotspotMap, combine, GuyPosition } from "../../hotspots";
import { DogAnimation } from "../animations/dog";
import { Action } from "../../actions";
import { Scene } from "../../scene";
import { BG_ICE_CREAM_SHOP } from "../background";
import { ZIndex } from "../../zIndex";
import { PaintTask, getPaintTask } from "../../paintTask";
import { loadDialogGrf } from "../../dialog";
import { TRIGGERS } from "../../triggers";

const fullFilter = createFullHotspot(Hotspot.ICE_CREAM_SHOP);
const doorFilter = (x: number, y: number) => {
    if (x >= 32 && x <= 41 && y >= 8 && y <= 14) {
        return Hotspot.ICE_CREAM_SHOP_DOOR;
    }
    return Hotspot.NONE;
};
const iceCreamShopBackground: PaintTask = getPaintTask(BG_ICE_CREAM_SHOP, 0, 0, ZIndex.BACKGROUND, combine(doorFilter, fullFilter));
const iceCreamShopHotspotMap = new HotspotMap();
iceCreamShopHotspotMap.set(Hotspot.ICE_CREAM_SHOP, { description: 'ice cream shop', rightClickAction: Action.LOOK })
iceCreamShopHotspotMap.set(Hotspot.ICE_CREAM_SHOP_DOOR, { description: 'Enter ice cream shop', isMovementHotspot: true })
iceCreamShopHotspotMap.set(Hotspot.DOG, {
    description: 'dog',
    rightClickAction: Action.LOOK,
    guyPositionForAction: {
        left: 41,
        top: 14,
        lookToTheRight: true
    }
});
const initialGuyPosition: GuyPosition = {
    left: 28,
    top: 14,
    lookToTheRight: true
};
export const iceCreamShop = new Scene([ iceCreamShopBackground ], [ new DogAnimation() ], iceCreamShopHotspotMap,
    true, initialGuyPosition);

export const dialogWithDog = loadDialogGrf('src/resources/dialogs/dog.grf');

const sceneListener = (sceneEvent: SceneEvent) => {
    if (sceneEvent.action === Action.CHANGE_SCREEN) {
        iceCreamShop.say([["I'm going to enter this shop"]]);
        return;
    }
    if (sceneEvent.hotspot === Hotspot.DOG) {
        if (sceneEvent.action === Action.LOOK) {
            iceCreamShop.walkTo(sceneEvent.guyPosition, () => {
                iceCreamShop.say([['It\'s a good dog']]);
            });
        } else if (sceneEvent.action === Action.TAKE) {
            iceCreamShop.say([['I\'m not sure he would agree']]);
        } else if (sceneEvent.action === Action.USE) {
            iceCreamShop.say([['Huh ? What ?']]);
        } else if (sceneEvent.action === Action.TALK) {
            iceCreamShop.walkTo(sceneEvent.guyPosition, () => {
                iceCreamShop.runDialog(dialogWithDog, TRIGGERS);
            });
        }
    }
};

iceCreamShop.setSceneListener(sceneListener);

