import { createFullHotspot, HotspotId, combine, GuyPosition, Hotspot, createRectangleHotspot } from "@/hotspots";
import { SceneId, SceneLoader, SceneData } from "@/scene";
import { ZIndex } from "@/zIndex";
import { PaintTask, getPaintTask } from "@/paintTask";
import { Triggers } from "@/triggers";
import { ActionBarButton } from "@/screenBuffer";
import { BG_CINEMA } from "../generated/images/BG_CINEMA";
import { ImageAnimation, NO_LEFT_MOVEMENT } from "@/animations";
import { SPR_CINEMA_SIGN0 } from "../generated/images/SPR_CINEMA_SIGN0";
import { SPR_CINEMA_SIGN1 } from "../generated/images/SPR_CINEMA_SIGN1";
import { SPR_CINEMA_SIGN2 } from "../generated/images/SPR_CINEMA_SIGN2";

const fullFilter = createFullHotspot(HotspotId.CINEMA);
const doorFilter = createRectangleHotspot(HotspotId.CINEMA_DOOR, 31, 8, 25, 15);
const programFilter = createRectangleHotspot(HotspotId.CINEMA_PROGRAM, 63, 10, 11, 6);


const ANIM_SIGN = new ImageAnimation (30, 3, ZIndex.BEHIND_GUY, true, undefined, NO_LEFT_MOVEMENT,
    [
        {
            image: SPR_CINEMA_SIGN0,
            durationInTicks: 15,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_CINEMA_SIGN1,
            durationInTicks: 15,
            offsetX: 0,
            offsetY: 0,
        },
        {
            image: SPR_CINEMA_SIGN2,
            durationInTicks: 15,
            offsetX: 0,
            offsetY: 0,
        },
    ]);


const cinemaBackground: PaintTask = getPaintTask(BG_CINEMA, 0, 0, ZIndex.BACKGROUND, combine(doorFilter, programFilter, fullFilter));
const cinemaHotspots: Hotspot[] = [
    {
        hotspotId: HotspotId.CINEMA,
        description: 'cinema',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['A dark place where you can buy'], ['the right to peek into'], ['director fantasies.']]
    },
    {
        hotspotId: HotspotId.CINEMA_DOOR,
        description: 'Enter cinema',
        movementHotspot: SceneId.INSIDE_CINEMA,
        guyPositionForAction: {
            left: 33,
            top: 14,
            lookToTheRight: true
        },
        lookAt: [[]]
    },
    {
        hotspotId: HotspotId.CINEMA_PROGRAM,
        description: 'program',
        rightClickAction: ActionBarButton.LOOK,
        guyPositionForAction: {
            left: 53,
            top: 14,
            lookToTheRight: true
        },
        lookAt: [['This is the cinema program', 'for this week.']]
    },
];
const initialGuyPosition: GuyPosition = {
    left: 24,
    top: 14,
    lookToTheRight: true
};

export const OUTSIDE_CINEMA_LOADER: SceneLoader = {
    sceneId: SceneId.OUTSIDE_CINEMA,
    load(triggers: Triggers): SceneData {
        triggers.add('CINEMA_VISITED');
        return {
            showActionBar: true,
            guyPosition: initialGuyPosition,
            images: [ cinemaBackground ],
            animations: [ANIM_SIGN],
            hotspots: cinemaHotspots
        };
    }
}