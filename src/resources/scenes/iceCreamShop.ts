import { createFullHotspot, HotspotId, HotspotMap, combine, GuyPosition, Hotspot, isHotspot } from "../../hotspots";
import { DogAnimation } from "../animations/dog";
import { Action } from "../../actions";
import { Scene, SceneId, DefaultSceneActionListener } from "../../scene";
import { BG_ICE_CREAM_SHOP } from "../background";
import { ZIndex } from "../../zIndex";
import { PaintTask, getPaintTask } from "../../paintTask";
import { loadDialogGrf } from "../../dialog";
import { TRIGGERS } from "../../triggers";
import { InventoryObject } from "src/inventory";

const fullFilter = createFullHotspot(HotspotId.ICE_CREAM_SHOP);
const doorFilter = (x: number, y: number) => {
    if (x >= 32 && x <= 41 && y >= 8 && y <= 14) {
        return HotspotId.ICE_CREAM_SHOP_DOOR;
    }
    return undefined;
};
const iceCreamShopBackground: PaintTask = getPaintTask(BG_ICE_CREAM_SHOP, 0, 0, ZIndex.BACKGROUND, combine(doorFilter, fullFilter));
const iceCreamShopHotspotMap = new HotspotMap();
iceCreamShopHotspotMap.set(HotspotId.ICE_CREAM_SHOP, {
    hotspotId: HotspotId.ICE_CREAM_SHOP,
    description: 'ice cream shop',
    rightClickAction: Action.LOOK
});
iceCreamShopHotspotMap.set(HotspotId.ICE_CREAM_SHOP_DOOR, {
    hotspotId: HotspotId.ICE_CREAM_SHOP_DOOR,
    description: 'Enter ice cream shop',
    movementHotspot: SceneId.INSIDE_ICE_CREAM_SHOP });
iceCreamShopHotspotMap.set(HotspotId.DOG, {
    hotspotId: HotspotId.DOG,
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

let IceCreamShopSceneListener = class extends DefaultSceneActionListener {

    look(what: InventoryObject | Hotspot) {
        if (isHotspot(what) && what.hotspotId === HotspotId.DOG) {
            this.scene.walkTo(what.guyPositionForAction, () => {
                this.scene.say([['It\'s a good dog']]);
            });
        } else {
            super.look(what);
        }
    }

    take(what: InventoryObject | Hotspot) {
        if (isHotspot(what) && what.hotspotId === HotspotId.DOG) {
            this.scene.say([['I\'m not sure he would agree']]);
        } else {
            super.take(what);
        }
    }

    use(what: InventoryObject | Hotspot) {
        if (isHotspot(what) && what.hotspotId === HotspotId.DOG) {
            this.scene.say([[ 'Huh ? What ?' ]]);
        } else {
            super.use(what);
        }
    }

    talk(who: InventoryObject | Hotspot) {
        if (isHotspot(who) && who.hotspotId === HotspotId.DOG) {
            this.scene.walkTo(who.guyPositionForAction, () => {
                this.scene.runDialog(dialogWithDog, TRIGGERS);
            });
        } else {
            super.talk(who);
        }
    }

};

const sceneListener = new IceCreamShopSceneListener(iceCreamShop);

iceCreamShop.setSceneListener(sceneListener);

