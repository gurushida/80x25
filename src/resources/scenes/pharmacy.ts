import { PaintTask, getPaintTask } from "@/paintTask";
import { ZIndex } from "@/zIndex";
import { GuyPosition, Hotspot, HotspotId } from "@/hotspots";
import { SceneLoader, SceneId, SceneData } from "@/scene";
import { Triggers } from "@/triggers";
import { BG_PHARMACY } from "../generated/images/BG_PHARMACY";
import { SPR_PHARMACY_FOREGROUND } from "../generated/images/SPR_PHARMACY_FOREGROUND";
import { ActionBarButton } from "@/screenBuffer";
import { DIALOG_PHARMACIST } from "../generated/dialogs/DIALOG_PHARMACIST";
import { PharmacistAnimation } from "../animations/pharmacist";

const background: PaintTask = getPaintTask(BG_PHARMACY, 0, 0, ZIndex.BACKGROUND, undefined);
const foreground: PaintTask = getPaintTask(SPR_PHARMACY_FOREGROUND, 0, 0, ZIndex.FRONT, undefined);

const hotspots: Hotspot[] = [
    {
        hotspotId: HotspotId.PHARMACIST,
        description: 'pharmacist',
        rightClickAction: ActionBarButton.TALK,
        guyPositionForAction: {
            left: 39,
            top: 12,
            lookToTheRight: true
        },
        lookAt: [['A pharmacist in his traditional', 'lab coat costume.']],
        dialog: DIALOG_PHARMACIST,
    },
];

const initialGuyPosition: GuyPosition = {
    left: 2,
    top: 12,
    lookToTheRight: true,
};

export const PHARMACY_LOADER: SceneLoader = {
    sceneId: SceneId.PHARMACY,
    load(triggers: Triggers): SceneData {
        triggers.add('PHARMACY_VISITED');
        return {
            showActionBar: true,
            guyPosition: initialGuyPosition,
            images: [background, foreground],
            animations: [ new PharmacistAnimation() ],
            hotspots,
        };
    }
}

