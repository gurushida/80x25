import { PaintTask, getPaintTask } from "../../paintTask";
import { BG_BANK } from "../background";
import { ZIndex } from "../../zIndex";
import { combine, createFullHotspot, HotspotId, GuyPosition, Hotspot } from "../../hotspots";
import { ANIM_BOOM_BLASTER } from "../animations/boomBlaster";
import { SceneLoader, SceneId, SceneData } from "../../scene";
import { Trigger, Triggers } from "../../triggers";
import { ActionBarButton } from "../../screenbuffer";


const fullFilter = createFullHotspot(HotspotId.BANK);
const bankBackground: PaintTask = getPaintTask(BG_BANK, 0, 0, ZIndex.BACKGROUND, combine(fullFilter));

const bankHotspots: Hotspot[] = [
    {
        hotspotId: HotspotId.BANK,
        description: 'bank',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [[ 'This is the town\'s bank.' ]]
    },
    {
        hotspotId: HotspotId.BOOM_BLASTER,
        description: 'boom blaster',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [[ 'I\'m not convinced the noise emitted', 'by this thing qualifies as music.' ]],
        take: { comment: [[ 'The owner may object.' ]] },
        useDirectly: { comment: [[ 'Let\'s turn it off.' ]] }
    }
];

const initialGuyPosition: GuyPosition = {
    left: 8,
    top: 14,
    lookToTheRight: true
};



export const OUTSIDE_BANK_LOADER: SceneLoader = {
    sceneId: SceneId.OUTSIDE_BANK,
    load(triggers: Triggers): SceneData {
        triggers.add(Trigger.BANK_VISITED);
        return {
            showActionBar: true,
            guyPosition: initialGuyPosition,
            images: [ bankBackground ],
            animations: [ ANIM_BOOM_BLASTER ],
            hotspots: bankHotspots
        };
    }
}