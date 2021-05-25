import { createMaskHotspot, GuyPosition, Hotspot, HotspotId } from "@/hotspots";
import { PaintTask, getPaintTask } from "@/paintTask";
import { SceneId, SceneLoader, SceneData } from "@/scene";
import { ActionBarButton } from "@/screenBuffer";
import { Triggers } from "@/triggers";
import { ZIndex } from "@/zIndex";
import { BartenderAnimation } from "../animations/bartender";
import { BrianAnimation } from "../animations/brian";
import { EvilQueenAnimation } from "../animations/evil_queen";
import { DIALOG_BARTENDER } from "../generated/dialogs/DIALOG_BARTENDER";
import { DIALOG_BRIAN } from "../generated/dialogs/DIALOG_BRIAN";
import { DIALOG_EVIL_QUEEN } from "../generated/dialogs/DIALOG_EVIL_QUEEN";
import { BG_PUB_INSIDE } from "../generated/images/BG_PUB_INSIDE";
import { SPR_POOL_TABLE } from "../generated/images/SPR_POOL_TABLE";


const background: PaintTask = getPaintTask(BG_PUB_INSIDE, 0, 0, ZIndex.BEHIND_GUY, undefined);
const pool_table1: PaintTask = getPaintTask(SPR_POOL_TABLE, 11, 7, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_POOL_TABLE, HotspotId.POOL_TABLE));
const pool_table2: PaintTask = getPaintTask(SPR_POOL_TABLE, 50, 7, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_POOL_TABLE, HotspotId.POOL_TABLE));

const initialGuyPosition: GuyPosition = {
    left: 29,
    top: 13,
    lookToTheRight: true
};

const hotspots: Hotspot[] = [
    {
        hotspotId: HotspotId.POOL_TABLE,
        description: 'pool table',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['Bad memories.'], ['I shouldn\'t have played', 'with this Fast Eddie guy.']]
    },
    {
        hotspotId: HotspotId.BARTENDER,
        description: 'bartender',
        rightClickAction: ActionBarButton.TALK,
        lookAt: [['I\'m pretty sure the Dubliners', 'made a song about her.']],
        dialog: DIALOG_BARTENDER,
        guyPositionForAction: {
            left: 26,
            top: 13,
            lookToTheRight: false
        },
    },
    {
        hotspotId: HotspotId.BRIAN,
        description: 'guy in PhD costume',
        rightClickAction: ActionBarButton.TALK,
        lookAt: [['This guy is cosplaying the', 'famous astrophysicist author of'], ['"A survey of radial velocities', 'in the zodiacal dust cloud"'], ['who also happens to be', 'a decent musician.']],
        dialog: DIALOG_BRIAN,
        guyPositionForAction: {
            left: 56,
            top: 13,
            lookToTheRight: true
        },
    },
    {
        hotspotId: HotspotId.EVIL_QUEEN,
        description: 'angry woman',
        rightClickAction: ActionBarButton.TALK,
        lookAt: [['This woman cosplays a', 'very convincing evil queen.'], ['I\'m sure she talks', 'to her mirror.']],
        dialog: DIALOG_EVIL_QUEEN,
        guyPositionForAction: {
            left: 46,
            top: 13,
            lookToTheRight: true
        },
    },
];

export const INSIDE_PUB_LOADER: SceneLoader = {
    sceneId: SceneId.INSIDE_PUB,
    load(triggers: Triggers): SceneData {
        return {
            showActionBar: true,
            guyPosition: initialGuyPosition,
            images: [background, pool_table1, pool_table2],
            animations: [new BartenderAnimation(), new BrianAnimation(), new EvilQueenAnimation()],
            hotspots,
        };
    }
}