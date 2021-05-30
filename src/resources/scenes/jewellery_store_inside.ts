import { GuyPosition, Hotspot, HotspotId } from "@/hotspots";
import { SceneId, SceneLoader, SceneData } from "@/scene";
import { ActionBarButton } from "@/screenBuffer";
import { Triggers } from "@/triggers";
import { JewellerAnimation } from "../animations/jeweller";
import { DIALOG_JEWELLER } from "../generated/dialogs/DIALOG_JEWELLER";




const initialGuyPosition: GuyPosition = {
    left: 60,
    top: 12,
    lookToTheRight: false
};

const hotspots: Hotspot[] = [
    {
        hotspotId: HotspotId.JEWELLER,
        description: 'jeweller',
        rightClickAction: ActionBarButton.TALK,
        dialog: DIALOG_JEWELLER,
        guyPositionForAction: {
            left: 29,
            top: 12,
            lookToTheRight: false
        },
        lookAt: [['This jeweller looks very aristocratic.']],
    },

];

export const JEWELLERY_STORE_INSIDE_LOADER: SceneLoader = {
    sceneId: SceneId.JEWELLERY_STORE_INSIDE,
    load(triggers: Triggers): SceneData {
        return {
            showActionBar: true,
            guyPosition: initialGuyPosition,
            images: [ ],
            animations: [ new JewellerAnimation() ],
            hotspots,
        };
    }
}