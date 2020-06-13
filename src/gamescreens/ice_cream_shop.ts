import { getPaintTaskZ, AnimationZ } from "../scene";
import { createFullHotspot, Hotspots, HotspotMap } from "../hotspots";
import { dog } from "../animation/animations";
import { Action } from "../actions";
import { GameScreen } from "./gameScreen";
import { ice_cream_shop } from "../background";

const iceCreamShopBackground = getPaintTaskZ(ice_cream_shop, 0, 0, -1, createFullHotspot(Hotspots.ICE_CREAM_SHOP));
const dogAnimation: AnimationZ = { animation: dog, zIndex: 0 };
const iceCreamShopHotspotMap = new HotspotMap();
iceCreamShopHotspotMap.set(Hotspots.ICE_CREAM_SHOP, { description: 'ice cream shop', rightClickAction: Action.LOOK})
iceCreamShopHotspotMap.set(Hotspots.DOG, { description: 'dog', rightClickAction: Action.LOOK})
export const iceCreamShop = new GameScreen([ iceCreamShopBackground ], [ dogAnimation ], iceCreamShopHotspotMap, true,
  8, 14, true, 0);

