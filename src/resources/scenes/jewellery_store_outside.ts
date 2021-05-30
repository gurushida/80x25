import { PaintTask, getPaintTask } from "@/paintTask";
import { ZIndex } from "@/zIndex";
import { combine, createFullHotspot, createMaskHotspot, createRectangleHotspot, GuyPosition, Hotspot, HotspotId } from "@/hotspots";
import { SceneLoader, SceneId, SceneData } from "@/scene";
import { Triggers } from "@/triggers";
import { BG_JEWELLERY_STORE_OUTSIDE } from "../generated/images/BG_JEWELLERY_STORE_OUTSIDE";
import { SPR_JEWELLERY_RING_SIGN } from "../generated/images/SPR_JEWELLERY_RING_SIGN";
import { SPR_JEWELLERY_SIGN } from "../generated/images/SPR_JEWELLERY_SIGN";
import { ActionBarButton } from "@/screenBuffer";
import { SPR_SUV_0 } from "../generated/images/SPR_SUV_0";
import { SPR_FIRE_HYDRANT_0 } from "../generated/images/SPR_FIRE_HYDRANT_0";
import { SPR_SEWER_HOLE } from "../generated/images/SPR_SEWER_HOLE";
import { SPR_STREET_WATER_0 } from "../generated/images/SPR_STREET_WATER_0";
import { SPR_STREET_WATER_2 } from "../generated/images/SPR_STREET_WATER_2";
import { ImageAnimation, NO_LEFT_MOVEMENT } from "@/animations";
import { SPR_STREET_WATER_1 } from "../generated/images/SPR_STREET_WATER_1";
import { ANIM_BOAT } from "../animations/boat";

const fullFilter = createFullHotspot(HotspotId.JEWELLERY_STORE);
const doorFilter = createRectangleHotspot(HotspotId.JEWELLERY_DOOR, 53, 10, 17, 10);

const background: PaintTask = getPaintTask(BG_JEWELLERY_STORE_OUTSIDE, 0, 0, ZIndex.BEHIND_GUY, combine(doorFilter, fullFilter));


const ring_sign = getPaintTask(SPR_JEWELLERY_RING_SIGN, 24, 4, ZIndex.BEHIND_GUY, undefined);
const sign = getPaintTask(SPR_JEWELLERY_SIGN, 56, 5, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_JEWELLERY_SIGN, HotspotId.JEWELLERY_SIGN));
const suv = getPaintTask(SPR_SUV_0, 20, 12, ZIndex.FRONT, createMaskHotspot(SPR_SUV_0, HotspotId.SUV));
const fire_hydrant = getPaintTask(SPR_FIRE_HYDRANT_0, 15, 15, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_FIRE_HYDRANT_0, HotspotId.FIRE_HYDRANT));
const sewer_hole = getPaintTask(SPR_SEWER_HOLE, 71, 22, ZIndex.FRONT, createMaskHotspot(SPR_SEWER_HOLE, HotspotId.SEWER_HOLE));

const ANIM_WATER = new ImageAnimation(0, 23, ZIndex.FRONT, true, createFullHotspot(HotspotId.STREET_WATER),
    NO_LEFT_MOVEMENT, [
        {
            image: SPR_STREET_WATER_0,
            durationInTicks: 5,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_STREET_WATER_1,
            durationInTicks: 5,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_STREET_WATER_2,
            durationInTicks: 5,
            offsetX: 0,
            offsetY: 0,
        },
    ]);


const hotspots: Hotspot[] = [
    {
        hotspotId: HotspotId.JEWELLERY_STORE,
        description: 'jewellery store',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['A place where you can find', 'plain normal jewellery,'], ['without any magical power', 'from some Norse dwarf'], ['or some curse from', 'a dude in a volcano.']]
    },
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
        lookAt: [['I don\'t know what is worse with this vehicle,', 'clearly not designed for cities:'], ['the embarrassing display of how much', 'the owner has to compensate for,'], ['or the fact that it manages to be parked', 'illegally in three different ways,'], ['blocking the sidewalk, a fire hydrant', 'and the entrance to this shop.']]
    },
    {
        hotspotId: HotspotId.FIRE_HYDRANT,
        description: 'fire hydrant',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['Let\'s hope there is no fire today,'], ['because access to this fire hydrant', 'is blocked by this big car.']],
        useDirectly: {
            comment: [['I\'m not saying I would be totally against', 'messing up with some public property,'], ['but without proper tooling'], ['it would take a considerable amount', 'of force to blow this thing open.']],
        }
    },
    {
        hotspotId: HotspotId.SEWER_HOLE,
        description: 'sewer hole',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['Drainage infrastructure'], ['or fuel for nightmares.'], ['Depends on which books', 'you have read.']],
        talkComment: [['No way.'], ['What if it anwsers ?']],
    },
    {
        hotspotId: HotspotId.STREET_WATER,
        description: 'water',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['Some water that ends its course', 'in the sewer hole over there.']]
    },
    {
        hotspotId: HotspotId.JEWELLERY_DOOR,
        description: 'Enter jewellery store',
        movementHotspot: SceneId.JEWELLERY_STORE_INSIDE,
        guyPositionForAction: {
            left: 55,
            lookToTheRight: true
        },
        lookAt: [[]]
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
            images: [ background, ring_sign, sign, suv, fire_hydrant, sewer_hole ],
            animations: [ ANIM_WATER, ANIM_BOAT ],
            hotspots,
        };
    }
}

