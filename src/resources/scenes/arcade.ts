import { createMaskHotspot, GuyPosition, Hotspot, HotspotId } from "@/hotspots";
import { PaintTask, getPaintTask } from "@/paintTask";
import { SceneLoader, SceneId, SceneData } from "@/scene";
import { ActionBarButton } from "@/screenBuffer";
import { Triggers } from "@/triggers";
import { ZIndex } from "@/zIndex";
import { ArcadeGuyAnimation, ARCADE_GUY_POSITION_FOR_ACTION } from "../animations/arcade_guy";
import { ANIM_ARCADE_SIGN } from "../animations/arcade_sign";
import { ANIM_LAMP } from "../animations/lamp";
import { DIALOG_ARCADE_GUY } from "../generated/dialogs/DIALOG_ARCADE_GUY";
import { BG_ARCADE } from "../generated/images/BG_ARCADE";
import { SPR_ARCADE_CABINET } from "../generated/images/SPR_ARCADE_CABINET";
import { SPR_ARCADE_TABLE } from "../generated/images/SPR_ARCADE_TABLE";
import { SPR_TETRIS_BLUE_RICKY } from "../generated/images/SPR_TETRIS_BLUE_RICKY";
import { SPR_TETRIS_CLEVELAND_Z } from "../generated/images/SPR_TETRIS_CLEVELAND_Z";
import { SPR_TETRIS_HERO } from "../generated/images/SPR_TETRIS_HERO";
import { SPR_TETRIS_ORANGE_RICKY } from "../generated/images/SPR_TETRIS_ORANGE_RICKY";
import { SPR_TETRIS_RHODE_ISLAND_Z } from "../generated/images/SPR_TETRIS_RHODE_ISLAND_Z";
import { SPR_TETRIS_SMASHBOY } from "../generated/images/SPR_TETRIS_SMASHBOY";
import { SPR_TETRIS_TEEWEE } from "../generated/images/SPR_TETRIS_TEEWEE";

const game0: PaintTask = getPaintTask(SPR_ARCADE_CABINET, 0, 11, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_ARCADE_CABINET, HotspotId.ARCADE_GAME_0));
const game1: PaintTask = getPaintTask(SPR_ARCADE_CABINET, 11, 11, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_ARCADE_CABINET, HotspotId.ARCADE_GAME_1));
const game2: PaintTask = getPaintTask(SPR_ARCADE_CABINET, 22, 11, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_ARCADE_CABINET, HotspotId.ARCADE_GAME_2));

const game3: PaintTask = getPaintTask(SPR_ARCADE_CABINET, 48, 11, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_ARCADE_CABINET, HotspotId.ARCADE_GAME_3));
const game4: PaintTask = getPaintTask(SPR_ARCADE_CABINET, 59, 11, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_ARCADE_CABINET, HotspotId.ARCADE_GAME_4));
const game5: PaintTask = getPaintTask(SPR_ARCADE_CABINET, 70, 11, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_ARCADE_CABINET, HotspotId.ARCADE_GAME_5));

const table: PaintTask = getPaintTask(SPR_ARCADE_TABLE, 62, 21, ZIndex.FRONT, undefined);

const teewee: PaintTask = getPaintTask(SPR_TETRIS_TEEWEE, 9, 1, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_TETRIS_TEEWEE, HotspotId.TETRIS_TEEWEE));
const orange_ricky: PaintTask = getPaintTask(SPR_TETRIS_ORANGE_RICKY, 3, 6, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_TETRIS_ORANGE_RICKY, HotspotId.TETRIS_ORANGE_RICKY));
const rhode_island_z: PaintTask = getPaintTask(SPR_TETRIS_RHODE_ISLAND_Z, 14, 7, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_TETRIS_RHODE_ISLAND_Z, HotspotId.TETRIS_RHODE_ISLAND_Z));
const hero: PaintTask = getPaintTask(SPR_TETRIS_HERO, 66, 1, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_TETRIS_HERO, HotspotId.TETRIS_HERO));
const smashboy: PaintTask = getPaintTask(SPR_TETRIS_SMASHBOY, 54, 7, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_TETRIS_SMASHBOY, HotspotId.TETRIS_SMASHBOY));
const blue_ricky: PaintTask = getPaintTask(SPR_TETRIS_BLUE_RICKY, 67, 6, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_TETRIS_BLUE_RICKY, HotspotId.TETRIS_BLUE_RICKY));
const cleveland_z: PaintTask = getPaintTask(SPR_TETRIS_CLEVELAND_Z, 74, 4, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_TETRIS_CLEVELAND_Z, HotspotId.TETRIS_CLEVELAND_Z));


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
        lookAt: [['Apology of gluttony', 'and supernatural'], ['in an inescapable', 'maze prison,'], ['I\'m not sure this game sends', 'the right moral messages.']]
    },
    {
        hotspotId: HotspotId.ARCADE_GAME_0,
        description: 'game',
        rightClickAction: ActionBarButton.LOOK,
        guyPositionForAction: {
            left: 5,
            lookToTheRight: false,
        },
        lookAt: [['Tetris.'], ['The art of filling holes.']]
    },
    {
        hotspotId: HotspotId.ARCADE_GAME_1,
        description: 'game',
        rightClickAction: ActionBarButton.LOOK,
        guyPositionForAction: {
            left: 6,
            lookToTheRight: true,
        },
        lookAt: [['Space invaders.'], ['Promoting warfare instead', 'of galactic diplomacy.']]
    },
    {
        hotspotId: HotspotId.ARCADE_GAME_2,
        description: 'game',
        rightClickAction: ActionBarButton.LOOK,
        guyPositionForAction: {
            left: 16,
            lookToTheRight: true,
        },
        lookAt: [['Nibbles.'], ['Growing super snakes,'], ['what could go wrong ?']]
    },
    {
        hotspotId: HotspotId.ARCADE_GAME_3,
        description: 'game',
        rightClickAction: ActionBarButton.LOOK,
        guyPositionForAction: {
            left: 46,
            lookToTheRight: true,
        },
        lookAt: [['An arcade version of minesweeper.'], ['Why ?']]
    },
    {
        hotspotId: HotspotId.ARCADE_GAME_4,
        description: 'game',
        rightClickAction: ActionBarButton.LOOK,
        guyPositionForAction: {
            left: 56,
            lookToTheRight: true,
        },
        lookAt: [['This machine is broken.']]
    },
    {
        hotspotId: HotspotId.ARCADE_GAME_5,
        description: 'game',
        rightClickAction: ActionBarButton.LOOK,
        guyPositionForAction: {
            left: 66,
            lookToTheRight: true,
        },
        lookAt: [['Evil Spell.'], ['I don\'t know this game.']]
    },
    {
        hotspotId: HotspotId.LAMP,
        description: 'lamp',
        rightClickAction: ActionBarButton.LOOK,
        guyPositionForAction: {
            left: 56,
            lookToTheRight: true,
        },
        lookAt: [['Weird.'], ['This lamp is not plugged'], ['and blinks by itself.'], ['Looks like some', 'kind of code.']]
    },
    {
        hotspotId: HotspotId.TETRIS_TEEWEE,
        description: 'piece',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['This one is called Teewee.']]
    },
    {
        hotspotId: HotspotId.TETRIS_ORANGE_RICKY,
        description: 'piece',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['This one is called Orange Ricky.']]
    },
    {
        hotspotId: HotspotId.TETRIS_RHODE_ISLAND_Z,
        description: 'piece',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['This one is called Rhode Island Z.']]
    },
    {
        hotspotId: HotspotId.TETRIS_HERO,
        description: 'piece',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['This one is called Hero.']]
    },
    {
        hotspotId: HotspotId.TETRIS_SMASHBOY,
        description: 'piece',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['This one is called Smashboy.']]
    },
    {
        hotspotId: HotspotId.TETRIS_BLUE_RICKY,
        description: 'piece',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['This one is called Blue Ricky.']]
    },
    {
        hotspotId: HotspotId.TETRIS_CLEVELAND_Z,
        description: 'piece',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['This one is called Cleveland Z.']]
    },
    {
        hotspotId: HotspotId.ARCADE_GUY,
        description: 'owner',
        rightClickAction: ActionBarButton.TALK,
        guyPositionForAction: ARCADE_GUY_POSITION_FOR_ACTION,
        lookAt: [['This is the place owner.'], ['Looks more like a cowboy'], ['than the gaming type.']],
        dialog: DIALOG_ARCADE_GUY,
    },
];

export const ARCADE_LOADER: SceneLoader = {
    sceneId: SceneId.ARCADE,
    load(triggers: Triggers): SceneData {
        triggers.add('ARCADE_VISITED');
        return {
            showActionBar: true,
            guyPosition: initialGuyPosition,
            images: [arcadeBackground, game0, game1, game2, game3, game4, game5, table,
                     teewee, orange_ricky, rhode_island_z, hero, smashboy, blue_ricky, cleveland_z],
            animations: [ANIM_LAMP, ANIM_ARCADE_SIGN, new ArcadeGuyAnimation()],
            hotspots: arcadeHotspots,
        };
    }
}
