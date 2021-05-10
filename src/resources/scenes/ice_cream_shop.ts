import { createFullHotspot, HotspotId, combine, GuyPosition, Hotspot } from "@/hotspots";
import { SceneId, SceneLoader, SceneData } from "@/scene";
import { ZIndex } from "@/zIndex";
import { PaintTask, getPaintTask } from "@/paintTask";
import { Triggers } from "@/triggers";
import { ActionBarButton } from "@/screenBuffer";
import { BG_ICE_CREAM_SHOP } from "../generated/images/BG_ICE_CREAM_SHOP";

const fullFilter = createFullHotspot(HotspotId.ICE_CREAM_SHOP);

const iceCreamShopBackground: PaintTask = getPaintTask(BG_ICE_CREAM_SHOP, 0, 0, ZIndex.BACKGROUND, combine(fullFilter));
const iceCreamShopHotspots: Hotspot[] = [
    {
        hotspotId: HotspotId.ICE_CREAM_SHOP,
        description: 'ice cream shop',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [[ 'This is an ice cream shop known', 'for its avant-garde flavors.' ]]
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
            images: [ iceCreamShopBackground ],
            animations: [ ],
            hotspots: iceCreamShopHotspots
        };
    }
}