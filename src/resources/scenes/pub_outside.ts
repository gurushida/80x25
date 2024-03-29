import { PaintTask, getPaintTask } from "@/paintTask";
import { ZIndex } from "@/zIndex";
import { combine, createFullHotspot, HotspotId, GuyPosition, Hotspot, createMaskHotspot, createRectangleHotspot } from "@/hotspots";
import { SceneLoader, SceneId, SceneData } from "@/scene";
import { Triggers } from "@/triggers";
import { ActionBarButton } from "@/screenBuffer";
import { BG_PUB_OUTSIDE } from "../generated/images/BG_PUB_OUTSIDE";
import { ANIM_PUB_LAMP1, ANIM_PUB_LAMP2 } from "../animations/pub_lamp";
import { SPR_PUB_WINDOW_DEVIL } from "../generated/images/SPR_PUB_WINDOW_DEVIL";
import { SPR_PUB_WINDOW_BELL } from "../generated/images/SPR_PUB_WINDOW_BELL";
import { BikerAnimation } from "../animations/biker";
import { DIALOG_BIKER } from "../generated/dialogs/DIALOG_BIKER";


const fullFilter = createFullHotspot(HotspotId.PUB);
const doorFilter = createRectangleHotspot(HotspotId.PUB_DOOR, 29, 9, 17, 15);

const pubBackground: PaintTask = getPaintTask(BG_PUB_OUTSIDE, 0, 0, ZIndex.BACKGROUND, combine(doorFilter, fullFilter));

const window_devil: PaintTask = getPaintTask(SPR_PUB_WINDOW_DEVIL, 2, 8, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_PUB_WINDOW_DEVIL, HotspotId.PUB_WINDOW_DEVIL));
const window_bell: PaintTask = getPaintTask(SPR_PUB_WINDOW_BELL, 51, 8, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_PUB_WINDOW_BELL, HotspotId.PUB_WINDOW_BELL));

const pubHotspots: Hotspot[] = [
    {
        hotspotId: HotspotId.PUB,
        description: 'pub',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [[ 'The best place in town'], ['for responsible consumption'], ['of organic plant-based beverages.']]
    },
    {
        hotspotId: HotspotId.PUB_DOOR,
        description: 'Enter pub',
        movementHotspot: SceneId.INSIDE_PUB,
        guyPositionForAction: {
            left: 28,
            lookToTheRight: true
        },
        lookAt: [[]]
    },
    {
        hotspotId: HotspotId.PUB_WINDOW_DEVIL,
        description: 'stained glass',
        rightClickAction: ActionBarButton.LOOK,
        guyPositionForAction: {
            left: 20,
            lookToTheRight: false
        },
        lookAt: [[ 'This represents the', 'dedicated demon'], ['that waits for Australian', 'heavy smoker schoolboys.']]
    },
    {
        hotspotId: HotspotId.PUB_WINDOW_BELL,
        description: 'stained glass',
        rightClickAction: ActionBarButton.LOOK,
        guyPositionForAction: {
            left: 70,
            lookToTheRight: false
        },
        lookAt: [[ 'The bell of doom,'], ['feared since ancient times'], ['for its terrible omen:'], ['the pub is going to close.']]
    },
    {
        hotspotId: HotspotId.BIKER,
        description: 'biker',
        rightClickAction: ActionBarButton.TALK,
        dialog: DIALOG_BIKER,
        guyPositionForAction: {
            left: 60,
            lookToTheRight: false
        },
        lookAt: [[ 'A muscular road knight', 'without his mount,'], ['guardian of this', 'temple of liquid sin.']]
    },
];

const initialGuyPosition: GuyPosition = {
    left: 74,
    top: 14,
    lookToTheRight: false
};



export const OUTSIDE_PUB_LOADER: SceneLoader = {
    sceneId: SceneId.OUTSIDE_PUB,
    load(triggers: Triggers): SceneData {
        triggers.add('PUB_VISITED');
        return {
            showActionBar: true,
            guyPosition: initialGuyPosition,
            images: [pubBackground, window_devil, window_bell],
            animations: [ANIM_PUB_LAMP1, ANIM_PUB_LAMP2, new BikerAnimation()],
            hotspots: pubHotspots
        };
    }
}
