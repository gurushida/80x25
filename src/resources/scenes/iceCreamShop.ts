import { createFullHotspot, Hotspot, HotspotMap, combine, GuyPosition, HotspotInfo, isHotspotInfo } from "../../hotspots";
import { DogAnimation } from "../animations/dog";
import { Action } from "../../actions";
import { Scene, SceneId, DefaultSceneActionListener } from "../../scene";
import { BG_ICE_CREAM_SHOP } from "../background";
import { ZIndex } from "../../zIndex";
import { PaintTask, getPaintTask } from "../../paintTask";
import { loadDialogGrf } from "../../dialog";
import { TRIGGERS } from "../../triggers";
import { InventoryObject } from "src/inventory";

const fullFilter = createFullHotspot(Hotspot.ICE_CREAM_SHOP);
const doorFilter = (x: number, y: number) => {
    if (x >= 32 && x <= 41 && y >= 8 && y <= 14) {
        return Hotspot.ICE_CREAM_SHOP_DOOR;
    }
    return Hotspot.NONE;
};
const iceCreamShopBackground: PaintTask = getPaintTask(BG_ICE_CREAM_SHOP, 0, 0, ZIndex.BACKGROUND, combine(doorFilter, fullFilter));
const iceCreamShopHotspotMap = new HotspotMap();
iceCreamShopHotspotMap.set(Hotspot.ICE_CREAM_SHOP, {
    hotspotId: Hotspot.ICE_CREAM_SHOP,
    description: 'ice cream shop',
    rightClickAction: Action.LOOK
});
iceCreamShopHotspotMap.set(Hotspot.ICE_CREAM_SHOP_DOOR, {
    hotspotId: Hotspot.ICE_CREAM_SHOP_DOOR,
    description: 'Enter ice cream shop',
    movementHotspot: SceneId.INSIDE_ICE_CREAM_SHOP });
iceCreamShopHotspotMap.set(Hotspot.DOG, {
    hotspotId: Hotspot.DOG,
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

    look(what: InventoryObject | HotspotInfo) {
        if (isHotspotInfo(what) && what.hotspotId === Hotspot.DOG) {
            this.scene.walkTo(what.guyPositionForAction, () => {
                this.scene.say([['It\'s a good dog']]);
            });
        } else {
            super.look(what);
        }
    }

    take(what: InventoryObject | HotspotInfo) {
        if (isHotspotInfo(what) && what.hotspotId === Hotspot.DOG) {
            this.scene.say([['I\'m not sure he would agree']]);
        } else {
            super.take(what);
        }
    }

    use(what: InventoryObject | HotspotInfo) {
        if (isHotspotInfo(what) && what.hotspotId === Hotspot.DOG) {
            this.scene.say([[ 'Huh ? What ?' ]]);
        } else {
            super.use(what);
        }
    }

    talk(who: InventoryObject | HotspotInfo) {
        if (isHotspotInfo(who) && who.hotspotId === Hotspot.DOG) {
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

