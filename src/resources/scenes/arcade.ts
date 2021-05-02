import { createMaskHotspot, GuyPosition, Hotspot, HotspotId } from "@/hotspots";
import { PaintTask, getPaintTask } from "@/paintTask";
import { SceneLoader, SceneId, SceneData } from "@/scene";
import { ActionBarButton } from "@/screenBuffer";
import { Triggers } from "@/triggers";
import { ZIndex } from "@/zIndex";
import { ArcadeGuyAnimation } from "../animations/arcade_guy";
import { ANIM_ARCADE_SIGN } from "../animations/arcade_sign";
import { ANIM_LAMP } from "../animations/lamp";
import { BG_ARCADE } from "../generated/images/BG_ARCADE";
import { SPR_ARCADE_CABINET } from "../generated/images/SPR_ARCADE_CABINET";
import { SPR_ARCADE_TABLE } from "../generated/images/SPR_ARCADE_TABLE";

const game1: PaintTask = getPaintTask(SPR_ARCADE_CABINET, 0, 11, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_ARCADE_CABINET, HotspotId.ARCADE_GAME1));
const game2: PaintTask = getPaintTask(SPR_ARCADE_CABINET, 11, 11, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_ARCADE_CABINET, HotspotId.ARCADE_GAME2));
const game3: PaintTask = getPaintTask(SPR_ARCADE_CABINET, 22, 11, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_ARCADE_CABINET, HotspotId.ARCADE_GAME3));

const game4: PaintTask = getPaintTask(SPR_ARCADE_CABINET, 48, 11, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_ARCADE_CABINET, HotspotId.ARCADE_GAME4));
const game5: PaintTask = getPaintTask(SPR_ARCADE_CABINET, 59, 11, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_ARCADE_CABINET, HotspotId.ARCADE_GAME5));
const game6: PaintTask = getPaintTask(SPR_ARCADE_CABINET, 70, 11, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_ARCADE_CABINET, HotspotId.ARCADE_GAME6));

const table: PaintTask = getPaintTask(SPR_ARCADE_TABLE, 62, 21, ZIndex.FRONT, undefined);

const arcadeBackground: PaintTask = getPaintTask(BG_ARCADE, 0, 0, ZIndex.BACKGROUND, undefined);


const initialGuyPosition: GuyPosition = {
    left: 5,
    top: 12,
    lookToTheRight: true,
};

const arcadeHotspots: Hotspot[] = [
    {
        hotspotId: HotspotId.ARCADE_SIGN,
        description: 'sign',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['Apology of gluttony', 'and supernatural'], ['in an inescapable', 'maze prison,'], ['I\'m not sure this game sent', 'the right moral messages']]
    },
    {
        hotspotId: HotspotId.ARCADE_GAME1,
        description: 'game',
        rightClickAction: ActionBarButton.LOOK,
        guyPositionForAction: {
            left: 5,
            top: 12,
            lookToTheRight: false,
        },
        lookAt: [['Tetris'], ['The art of filling holes']]
    },
    {
        hotspotId: HotspotId.ARCADE_GAME2,
        description: 'game',
        rightClickAction: ActionBarButton.LOOK,
        guyPositionForAction: {
            left: 6,
            top: 12,
            lookToTheRight: true,
        },
        lookAt: [['Space invaders'], ['Promoting warfare instead', 'of galactic diplomacy']]
    },
    {
        hotspotId: HotspotId.ARCADE_GAME3,
        description: 'game',
        rightClickAction: ActionBarButton.LOOK,
        guyPositionForAction: {
            left: 16,
            top: 12,
            lookToTheRight: true,
        },
        lookAt: [['Nibbles'], ['Growing super snakes'], ['What could go wrong ?']]
    },
    {
        hotspotId: HotspotId.ARCADE_GAME4,
        description: 'game',
        rightClickAction: ActionBarButton.LOOK,
        guyPositionForAction: {
            left: 46,
            top: 12,
            lookToTheRight: true,
        },
        lookAt: [['An arcade version of minesweeper'], ['Why ?']]
    },
    {
        hotspotId: HotspotId.ARCADE_GAME5,
        description: 'game',
        rightClickAction: ActionBarButton.LOOK,
        guyPositionForAction: {
            left: 56,
            top: 12,
            lookToTheRight: true,
        },
        lookAt: [['This machine is broken']]
    },
    {
        hotspotId: HotspotId.ARCADE_GAME6,
        description: 'game',
        rightClickAction: ActionBarButton.LOOK,
        guyPositionForAction: {
            left: 66,
            top: 12,
            lookToTheRight: true,
        },
        lookAt: [['Evil Spell'], ['I don\'t know this game']]
    },
    {
        hotspotId: HotspotId.LAMP,
        description: 'lamp',
        rightClickAction: ActionBarButton.LOOK,
        guyPositionForAction: {
            left: 56,
            top: 12,
            lookToTheRight: true,
        },
        lookAt: [['Weird'], ['This lamp is not plugged'], ['and blinks by itself'], ['Looks like some', 'kind of code']]
    },
];

export const ARCADE_LOADER: SceneLoader = {
    sceneId: SceneId.ARCADE,
    load(triggers: Triggers): SceneData {
        triggers.add('ARCADE_VISITED');
        return {
            showActionBar: true,
            guyPosition: initialGuyPosition,
            images: [arcadeBackground, game1, game2, game3, game4, game5, game6, table,],
            animations: [ANIM_LAMP, ANIM_ARCADE_SIGN, new ArcadeGuyAnimation()],
            hotspots: arcadeHotspots,
        };
    }
}
