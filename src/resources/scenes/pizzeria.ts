import { GuyPosition, Hotspot, HotspotId } from "@/hotspots";
import { PaintTask, getPaintTask } from "@/paintTask";
import { SceneLoader, SceneId, SceneData } from "@/scene";
import { ActionBarButton } from "@/screenBuffer";
import { Triggers } from "@/triggers";
import { ZIndex } from "@/zIndex";
import { ANIM_PIZZAIOLO } from "../animations/pizzaiolo";
import { BG_PIZZERIA } from "../generated/images/BG_PIZZERIA";

const background: PaintTask = getPaintTask(BG_PIZZERIA, 0, 0, ZIndex.BACKGROUND, undefined);

const hotspots: Hotspot[] = [
    {
        hotspotId: HotspotId.PIZZAIOLO,
        description: 'pizzaiolo',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['Forget Roman catapults.'], ['Pizza tossing is probably'], ['the biggest Italian contribution'], ['to the field of ballistics.']]
    },
];

const initialGuyPosition: GuyPosition = {
    left: 73,
    top: 13,
    lookToTheRight: false
};



export const PIZZERIA_LOADER: SceneLoader = {
    sceneId: SceneId.PIZZERIA,
    load(triggers: Triggers): SceneData {
        triggers.add('PIZZERIA_VISITED');
        return {
            showActionBar: true,
            guyPosition: initialGuyPosition,
            images: [ background ],
            animations: [ ANIM_PIZZAIOLO ],
            hotspots: hotspots
        };
    }
}
