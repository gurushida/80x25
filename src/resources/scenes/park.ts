import { HotspotId, GuyPosition, Hotspot, createMaskHotspot } from "@/hotspots";
import { SceneLoader, SceneId, SceneData } from "@/scene";
import { Triggers } from "@/triggers";
import { ActionBarButton } from "@/screenBuffer";
import { ANIM_FOUNTAIN } from "../animations/fountain";
import { LittleGirlAnimation } from "../animations/little_girl";
import { DIALOG_LITTLE_GIRL } from "../generated/dialogs/DIALOG_LITTLE_GIRL";
import { DIALOG_ROBOT } from "../generated/dialogs/DIALOG_ROBOT";
import { RobotAnimation } from "../animations/robot";
import { BG_PARK } from "../generated/images/BG_PARK";
import { PaintTask, getPaintTask } from "@/paintTask";
import { ZIndex } from "@/zIndex";
import { SPR_TREE } from "../generated/images/SPR_TREE";
import { SPR_SEESAW } from "../generated/images/SPR_SEESAW";


const parkBackground: PaintTask = getPaintTask(BG_PARK, 0, 0, ZIndex.BACKGROUND, undefined);
const tree: PaintTask = getPaintTask(SPR_TREE, 10, 0, ZIndex.BACKGROUND, createMaskHotspot(SPR_TREE, HotspotId.TREE));
const seesaw: PaintTask = getPaintTask(SPR_SEESAW, 44, 11, ZIndex.BACKGROUND, createMaskHotspot(SPR_SEESAW, HotspotId.SEESAW));

const pubHotspots: Hotspot[] = [
    {
        hotspotId: HotspotId.FOUNTAIN,
        description: 'fountain',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['It is a wish fountain', 'full of coins.']]
    },
    {
        hotspotId: HotspotId.TREE,
        description: 'tree',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['The larva form of', 'Swedish furnitures.']]
    },
    {
        hotspotId: HotspotId.SEESAW,
        description: 'seesaw',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['A device designed to unleash'], ['the creativity of'], ['sadistic older brothers.']],
        useDirectly: {
            comment: [['Not without my little sister.']],
        },
    },
    {
        hotspotId: HotspotId.LITTLE_GIRL,
        description: 'little girl',
        rightClickAction: ActionBarButton.TALK,
        dialog: DIALOG_LITTLE_GIRL,
        guyPositionForAction: {
            left: 70,
            top: 13,
            lookToTheRight: false
        },
        lookAt: [['A little girl hopelessly', 'battling gravity.']],
        take: {
            comment: [['I do admit having some', 'questionable hobbies'], ['but kidnapping is', 'not one of them.']],
        },
    },
    {
        hotspotId: HotspotId.ROBOT,
        description: 'robot',
        rightClickAction: ActionBarButton.TALK,
        dialog: DIALOG_ROBOT,
        guyPositionForAction: {
            left: 35,
            top: 13,
            lookToTheRight: false
        },
        lookAt: [['A robot cop.']],
    },
];

const initialGuyPosition: GuyPosition = {
    left: 73,
    top: 13,
    lookToTheRight: false
};



export const PARK_LOADER: SceneLoader = {
    sceneId: SceneId.PARK,
    load(triggers: Triggers): SceneData {
        triggers.add('PARK_VISITED');
        return {
            showActionBar: true,
            guyPosition: initialGuyPosition,
            images: [parkBackground, tree, seesaw],
            animations: [ANIM_FOUNTAIN, new LittleGirlAnimation(), new RobotAnimation()],
            hotspots: pubHotspots
        };
    }
}
