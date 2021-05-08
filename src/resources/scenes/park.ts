import { HotspotId, GuyPosition, Hotspot } from "@/hotspots";
import { SceneLoader, SceneId, SceneData } from "@/scene";
import { Triggers } from "@/triggers";
import { ActionBarButton } from "@/screenBuffer";
import { ANIM_FOUNTAIN } from "../animations/fountain";
import { LittleGirlAnimation } from "../animations/little_girl";
import { DIALOG_LITTLE_GIRL } from "../generated/dialogs/DIALOG_LITTLE_GIRL";



const pubHotspots: Hotspot[] = [
    {
        hotspotId: HotspotId.FOUNTAIN,
        description: 'fountain',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['It is a wish fountain', 'full of coins.']]
    },
    {
        hotspotId: HotspotId.LITTLE_GIRL,
        description: 'little girl',
        rightClickAction: ActionBarButton.TALK,
        dialog: DIALOG_LITTLE_GIRL,
        guyPositionForAction: {
            left: 68,
            top: 13,
            lookToTheRight: false
        },
        lookAt: [['A little girl hopelessly', 'battling gravity.']],
        take: {
            comment: [['I do admit having some', 'questionable hobbies'], ['but kidnapping is', 'not one of them.']],
        },
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
            images: [],
            animations: [ANIM_FOUNTAIN, new LittleGirlAnimation()],
            hotspots: pubHotspots
        };
    }
}
