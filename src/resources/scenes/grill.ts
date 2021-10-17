import { ImageAnimation, NO_LEFT_MOVEMENT } from "@/animations";
import { createMaskHotspot, GuyPosition, Hotspot, HotspotId } from "@/hotspots";
import { getPaintTask, PaintTask } from "@/paintTask";
import { SceneLoader, SceneId, SceneData } from "@/scene";
import { ActionBarButton } from "@/screenBuffer";
import { Triggers } from "@/triggers";
import { ZIndex } from "@/zIndex";
import { CookAnimation } from "../animations/cook";
import { SumoAnimation } from "../animations/sumo";
import { ANIM_WAVES } from "../animations/waves";
import { DIALOG_COOK } from "../generated/dialogs/DIALOG_COOK";
import { DIALOG_SUMO } from "../generated/dialogs/DIALOG_SUMO";
import { BG_GRILL } from "../generated/images/BG_GRILL";
import { SPR_BARBECUE_0 } from "../generated/images/SPR_BARBECUE_0";
import { SPR_BARBECUE_1 } from "../generated/images/SPR_BARBECUE_1";

const grillBackground: PaintTask = getPaintTask(BG_GRILL, 0, 0, ZIndex.BACKGROUND, undefined);

const BARBECUE_HOTSPOT = createMaskHotspot(SPR_BARBECUE_0, HotspotId.BARBECUE);

export const ANIM_BARBECUE = new ImageAnimation(4, 16, ZIndex.BEHIND_GUY, true, BARBECUE_HOTSPOT,
    NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_BARBECUE_0,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_BARBECUE_1,
            durationInTicks: 10,
            offsetX: 0,
            offsetY: 0,
        }
    ]);


const grillHotspots: Hotspot[] = [
    {
        hotspotId: HotspotId.BARBECUE,
        description: 'barbecue',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [
            [ 'The art of finding', 'the perfect balance' ],
            [ 'of burning the', 'outside of things' ],
            [ 'while keeping the', 'inside raw.' ],
            [ 'True masters maximize', 'inedibility' ],
            [ 'with secret homemade', 'marinade recipes' ],
            [ 'that would put tar', 'makers to shame.' ]
        ],
    },
    {
        hotspotId: HotspotId.COOK,
        description: 'cook',
        rightClickAction: ActionBarButton.TALK,
        dialog: DIALOG_COOK,
        guyPositionForAction: {
            left: 27,
            lookToTheRight: false
        },
        lookAt: [['This hip hop fan cook', 'looks pretty angry.']],
    },
    {
        hotspotId: HotspotId.SUMO,
        description: 'sumotori',
        rightClickAction: ActionBarButton.TALK,
        dialog: DIALOG_SUMO,
        guyPositionForAction: {
            left: 27,
            lookToTheRight: true
        },
        lookAt: [
            ['Scholars have theorized that', 'this ancestral discipline'],
            ['is the result of an ancient drinking', 'game about making up Venn diagrams'],
            ['and that obesity,', 'martial arts and wearing thongs'],
            ['was the best hand ever played.']
        ],
    },
    {
        hotspotId: HotspotId.WAVES,
        description: 'waves',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['When it comes to explaining', 'the existence of waves,'], ['Occam\'s razor clearly favors', 'krakens partying on the sea floor'], ['over the influence of a giant', 'rock hanging magically in the sky.']],
    },
];

const initialGuyPosition: GuyPosition = {
    left: 65,
    top: 14,
    lookToTheRight: false,
};

export const GRILL_LOADER: SceneLoader = {
    sceneId: SceneId.GRILL,
    load(triggers: Triggers): SceneData {
        triggers.add('GRILL_VISITED');
        return {
            showActionBar: true,
            guyPosition: initialGuyPosition,
            images: [grillBackground],
            animations: [ANIM_BARBECUE, new CookAnimation(), new SumoAnimation(), ANIM_WAVES],
            hotspots: grillHotspots,
        };
    }
}

