import { HotspotId, GuyPosition, Hotspot, createMaskHotspot } from "@/hotspots";
import { SceneLoader, SceneId, SceneData } from "@/scene";
import { Triggers } from "@/triggers";
import { ActionBarButton } from "@/screenBuffer";
import { ANIM_FOUNTAIN } from "../animations/fountain";
import { LittleGirlAnimation } from "../animations/little_girl";
import { DIALOG_LITTLE_GIRL } from "../generated/dialogs/DIALOG_LITTLE_GIRL";
import { DIALOG_ROBOT } from "../generated/dialogs/DIALOG_ROBOT";
import { RobotAnimation } from "../animations/robot";
import { PaintTask, getPaintTask } from "@/paintTask";
import { ZIndex } from "@/zIndex";
import { BG_FORGE } from "../generated/images/BG_FORGE";
import { ANIM_FIRE } from "../animations/fire";


const background: PaintTask = getPaintTask(BG_FORGE, 0, 0, ZIndex.BACKGROUND, undefined);

const hotspots: Hotspot[] = [
];

const initialGuyPosition: GuyPosition = {
    left: 73,
    top: 15,
    lookToTheRight: false
};



export const FORGE_LOADER: SceneLoader = {
    sceneId: SceneId.FORGE,
    load(triggers: Triggers): SceneData {
        triggers.add('FORGE_VISITED');
        return {
            showActionBar: true,
            guyPosition: initialGuyPosition,
            images: [background],
            animations: [ANIM_FIRE],
            hotspots: hotspots
        };
    }
}
