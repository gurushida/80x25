import { PaintTask, getPaintTask } from "@/paintTask";
import { ZIndex } from "@/zIndex";
import { createFullHotspot, createMaskHotspot, GuyPosition, Hotspot, HotspotId } from "@/hotspots";
import { SceneLoader, SceneId, SceneData } from "@/scene";
import { Triggers } from "@/triggers";
import { BG_JEWELLERY_STORE_OUTSIDE } from "../generated/images/BG_JEWELLERY_STORE_OUTSIDE";
import { SPR_JEWELLERY_RING_SIGN } from "../generated/images/SPR_JEWELLERY_RING_SIGN";
import { SPR_JEWELLERY_SIGN } from "../generated/images/SPR_JEWELLERY_SIGN";
import { ActionBarButton } from "@/screenBuffer";
import { SPR_SUV_0 } from "../generated/images/SPR_SUV_0";
import { SPR_FIRE_HYDRANT_0 } from "../generated/images/SPR_FIRE_HYDRANT_0";

const background: PaintTask = getPaintTask(BG_JEWELLERY_STORE_OUTSIDE, 0, 0, ZIndex.BEHIND_GUY, createFullHotspot(HotspotId.JEWELLERY_STORE));

const ring_sign = getPaintTask(SPR_JEWELLERY_RING_SIGN, 33, 4, ZIndex.BEHIND_GUY, undefined);
const sign = getPaintTask(SPR_JEWELLERY_SIGN, 56, 6, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_JEWELLERY_SIGN, HotspotId.JEWELLERY_SIGN));
const suv = getPaintTask(SPR_SUV_0, 20, 12, ZIndex.FRONT, createMaskHotspot(SPR_SUV_0, HotspotId.SUV));
const fire_hydrant = getPaintTask(SPR_FIRE_HYDRANT_0, 15, 15, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_FIRE_HYDRANT_0, HotspotId.FIRE_HYDRANT));

const hotspots: Hotspot[] = [
    {
        hotspotId: HotspotId.JEWELLERY_SIGN,
        description: 'sign',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['Bling & Bling']]
    },
    {
        hotspotId: HotspotId.SUV,
        description: 'big car',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['I don\'t know what is worse with this vehicle,', 'clearly not designed for cities:'], ['the embarrassing display of how much', 'the owner has to compensate for,'], ['or the fact that it manages to be', 'parked illegally in three different ways,'], ['blocking the sidewalk, a fire hydrant', 'and the entrance to this shop.']]
    },
    {
        hotspotId: HotspotId.FIRE_HYDRANT,
        description: 'fire hydrant',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['Let\'s hope there is no fire today,'], ['because access to this fire hydrant', 'is blocked by this big car.']]
    },
];

const initialGuyPosition: GuyPosition = {
    left: 5,
    top: 12,
    lookToTheRight: true,
};

export const JEWELLERY_STORE_OUTSIDE_LOADER: SceneLoader = {
    sceneId: SceneId.JEWELLERY_STORE_OUTSIDE,
    load(triggers: Triggers): SceneData {
        triggers.add('JEWELLERY_STORE_OUTSIDE_VISITED');
        return {
            showActionBar: true,
            guyPosition: initialGuyPosition,
            images: [ background, ring_sign, sign, suv, fire_hydrant ],
            animations: [],
            hotspots,
        };
    }
}

