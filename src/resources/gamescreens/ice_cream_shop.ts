import { getPaintTaskZ, AnimationZ, SceneEvent } from "../../sceneEngine";
import { createFullHotspot, Hotspot, HotspotMap, combine, GuyPosition } from "../../hotspots";
import { ANIM_DOG } from "../animations/dog";
import { Action } from "../../actions";
import { Scene } from "../../scene";
import { BG_ICE_CREAM_SHOP } from "../background";

const fullFilter = createFullHotspot(Hotspot.ICE_CREAM_SHOP);
const doorFilter = (x: number, y: number) => {
    if (x >= 32 && x <= 41 && y >= 8 && y <= 14) {
        return Hotspot.ICE_CREAM_SHOP_DOOR;
    }
    return Hotspot.NONE;
};
const iceCreamShopBackground = getPaintTaskZ(BG_ICE_CREAM_SHOP, 0, 0, -1, combine(doorFilter, fullFilter));
const dogAnimation: AnimationZ = { animation: ANIM_DOG, zIndex: 0 };
const iceCreamShopHotspotMap = new HotspotMap();
iceCreamShopHotspotMap.set(Hotspot.ICE_CREAM_SHOP, { description: 'ice cream shop', rightClickAction: Action.LOOK })
iceCreamShopHotspotMap.set(Hotspot.ICE_CREAM_SHOP_DOOR, { description: 'Enter ice cream shop', isMovementHotspot: true })
iceCreamShopHotspotMap.set(Hotspot.DOG, { description: 'dog', rightClickAction: Action.LOOK})
const initialGuyPosition: GuyPosition = {
    left: 8,
    top: 14,
    lookToTheRight: true
};
export const iceCreamShop = new Scene([ iceCreamShopBackground ], [ dogAnimation ], iceCreamShopHotspotMap,
    true, initialGuyPosition, 0);

const sceneListener = (sceneEvent: SceneEvent) => {
    if (sceneEvent.action === Action.CHANGE_SCREEN) {
        iceCreamShop.say([["I'm going to enter this shop"]]);
        return;
    }
    if (sceneEvent.hotspot === Hotspot.DOG) {
        if (sceneEvent.action === Action.LOOK) {
            iceCreamShop.say([['It\'s a good dog']]);
        } else if (sceneEvent.action === Action.TAKE) {
            iceCreamShop.say([['I\'m not sure he would agree']]);
        } else if (sceneEvent.action === Action.USE) {
            iceCreamShop.say([['Huh ? What ?']]);
        } else if (sceneEvent.action === Action.TALK) {
            iceCreamShop.say([['Waf waf, waf waf waf ?']]);
        }
    }
};

iceCreamShop.setSceneListener(sceneListener);
