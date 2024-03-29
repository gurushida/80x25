import { PaintTask, getPaintTask } from "@/paintTask";
import { ZIndex } from "@/zIndex";
import { createMaskHotspot, GuyPosition, Hotspot, HotspotId } from "@/hotspots";
import { SceneLoader, SceneId, SceneData } from "@/scene";
import { Triggers } from "@/triggers";
import { BG_PHARMACY } from "../generated/images/BG_PHARMACY";
import { SPR_PHARMACY_FOREGROUND } from "../generated/images/SPR_PHARMACY_FOREGROUND";
import { ActionBarButton } from "@/screenBuffer";
import { DIALOG_PHARMACIST } from "../generated/dialogs/DIALOG_PHARMACIST";
import { PharmacistAnimation } from "../animations/pharmacist";
import { ANIM_PHARMACY_SIGN } from "../animations/pharmacy_sign";
import { SPR_PHARMACY_BOOK_GROUP_0 } from "../generated/images/SPR_PHARMACY_BOOK_GROUP_0";
import { SPR_PHARMACY_BOOK_GROUP_1 } from "../generated/images/SPR_PHARMACY_BOOK_GROUP_1";
import { SPR_PHARMACY_BOOK_0 } from "../generated/images/SPR_PHARMACY_BOOK_0";
import { SPR_PHARMACY_BOOK_1 } from "../generated/images/SPR_PHARMACY_BOOK_1";
import { SPR_PHARMACY_BOOK_2 } from "../generated/images/SPR_PHARMACY_BOOK_2";
import { SPR_PHARMACY_BOOK_3 } from "../generated/images/SPR_PHARMACY_BOOK_3";
import { SPR_PHARMACY_BOOK_4 } from "../generated/images/SPR_PHARMACY_BOOK_4";
import { SPR_PHARMACY_BOOK_5 } from "../generated/images/SPR_PHARMACY_BOOK_5";
import { SPR_PHARMACY_POT_0 } from "../generated/images/SPR_PHARMACY_POT_0";
import { SPR_PHARMACY_POT_1 } from "../generated/images/SPR_PHARMACY_POT_1";
import { SPR_PHARMACY_POT_2 } from "../generated/images/SPR_PHARMACY_POT_2";
import { SPR_PHARMACY_POT_3 } from "../generated/images/SPR_PHARMACY_POT_3";
import { SPR_PHARMACY_POT_4 } from "../generated/images/SPR_PHARMACY_POT_4";
import { SPR_PHARMACY_POT_5 } from "../generated/images/SPR_PHARMACY_POT_5";
import { SPR_PHARMACY_POT_6 } from "../generated/images/SPR_PHARMACY_POT_6";
import { SPR_PHARMACY_POT_7 } from "../generated/images/SPR_PHARMACY_POT_7";
import { SPR_PHARMACY_POT_8 } from "../generated/images/SPR_PHARMACY_POT_8";
import { SPR_PHARMACY_POT_9 } from "../generated/images/SPR_PHARMACY_POT_9";

const background: PaintTask = getPaintTask(BG_PHARMACY, 0, 0, ZIndex.BACKGROUND, undefined);
const foreground: PaintTask = getPaintTask(SPR_PHARMACY_FOREGROUND, 0, 0, ZIndex.FRONT, undefined);

const book_group0: PaintTask = getPaintTask(SPR_PHARMACY_BOOK_GROUP_0, 25, 2, ZIndex.BACKGROUND, createMaskHotspot(SPR_PHARMACY_BOOK_GROUP_0, HotspotId.PHARMACY_BOOK_GROUP_0));
const book_group1: PaintTask = getPaintTask(SPR_PHARMACY_BOOK_GROUP_1, 61, 4, ZIndex.BACKGROUND, createMaskHotspot(SPR_PHARMACY_BOOK_GROUP_1, HotspotId.PHARMACY_BOOK_GROUP_1));
const book0: PaintTask = getPaintTask(SPR_PHARMACY_BOOK_0, 36, 2, ZIndex.BACKGROUND, createMaskHotspot(SPR_PHARMACY_BOOK_0, HotspotId.PHARMACY_BOOK_0));
const book1: PaintTask = getPaintTask(SPR_PHARMACY_BOOK_1, 46, 4, ZIndex.BACKGROUND, createMaskHotspot(SPR_PHARMACY_BOOK_1, HotspotId.PHARMACY_BOOK_1));
const book2: PaintTask = getPaintTask(SPR_PHARMACY_BOOK_2, 52, 3, ZIndex.BACKGROUND, createMaskHotspot(SPR_PHARMACY_BOOK_2, HotspotId.PHARMACY_BOOK_2));
const book3: PaintTask = getPaintTask(SPR_PHARMACY_BOOK_3, 58, 5, ZIndex.BACKGROUND, createMaskHotspot(SPR_PHARMACY_BOOK_3, HotspotId.PHARMACY_BOOK_3));
const book4: PaintTask = getPaintTask(SPR_PHARMACY_BOOK_4, 76, 4, ZIndex.BACKGROUND, createMaskHotspot(SPR_PHARMACY_BOOK_4, HotspotId.PHARMACY_BOOK_4));
const book5: PaintTask = getPaintTask(SPR_PHARMACY_BOOK_5, 65, 9, ZIndex.BACKGROUND, createMaskHotspot(SPR_PHARMACY_BOOK_5, HotspotId.PHARMACY_BOOK_5));
const pot0: PaintTask = getPaintTask(SPR_PHARMACY_POT_0, 41, 6, ZIndex.BACKGROUND, createMaskHotspot(SPR_PHARMACY_POT_0, HotspotId.PHARMACY_POT_0));
const pot1: PaintTask = getPaintTask(SPR_PHARMACY_POT_1, 25, 10, ZIndex.BACKGROUND, createMaskHotspot(SPR_PHARMACY_POT_1, HotspotId.PHARMACY_POT_1));
const pot2: PaintTask = getPaintTask(SPR_PHARMACY_POT_2, 31, 10, ZIndex.BACKGROUND, createMaskHotspot(SPR_PHARMACY_POT_2, HotspotId.PHARMACY_POT_2));
const pot3: PaintTask = getPaintTask(SPR_PHARMACY_POT_3, 36, 9, ZIndex.BACKGROUND, createMaskHotspot(SPR_PHARMACY_POT_3, HotspotId.PHARMACY_POT_3));
const pot4: PaintTask = getPaintTask(SPR_PHARMACY_POT_4, 41, 10, ZIndex.BACKGROUND, createMaskHotspot(SPR_PHARMACY_POT_4, HotspotId.PHARMACY_POT_4));
const pot5: PaintTask = getPaintTask(SPR_PHARMACY_POT_5, 46, 9, ZIndex.BACKGROUND, createMaskHotspot(SPR_PHARMACY_POT_5, HotspotId.PHARMACY_POT_5));
const pot6: PaintTask = getPaintTask(SPR_PHARMACY_POT_6, 57, 9, ZIndex.BACKGROUND, createMaskHotspot(SPR_PHARMACY_POT_6, HotspotId.PHARMACY_POT_6));
const pot7: PaintTask = getPaintTask(SPR_PHARMACY_POT_7, 61, 10, ZIndex.BACKGROUND, createMaskHotspot(SPR_PHARMACY_POT_7, HotspotId.PHARMACY_POT_7));
const pot8: PaintTask = getPaintTask(SPR_PHARMACY_POT_8, 69, 10, ZIndex.BACKGROUND, createMaskHotspot(SPR_PHARMACY_POT_8, HotspotId.PHARMACY_POT_8));
const pot9: PaintTask = getPaintTask(SPR_PHARMACY_POT_9, 72, 10, ZIndex.BACKGROUND, createMaskHotspot(SPR_PHARMACY_POT_9, HotspotId.PHARMACY_POT_9));

const hotspots: Hotspot[] = [
    {
        hotspotId: HotspotId.PHARMACIST,
        description: 'pharmacist',
        rightClickAction: ActionBarButton.TALK,
        guyPositionForAction: {
            left: 39,
            lookToTheRight: true
        },
        lookAt: [['A pharmacist in his traditional', 'lab coat costume.']],
        dialog: DIALOG_PHARMACIST,
    },
    {
        hotspotId: HotspotId.PHARMACY_SIGN,
        description: 'sign',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['I\'m pretty sure some', 'bureaucrats somewhere'], ['have codified the blinking', 'patterns of these signs.']]
    },
    {
        hotspotId: HotspotId.PHARMACY_BOOK_GROUP_0,
        description: 'books',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['Books about mushrooms,'], ['those funny shaped', 'edible organisms.'], ['Some of them only once.']]
    },
    {
        hotspotId: HotspotId.PHARMACY_BOOK_0,
        description: 'book',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['"Ticket for the witch burning stake",'], ['"An history of hobby botanics', 'gone horribly wrong."']]
    },
    {
        hotspotId: HotspotId.PHARMACY_POT_0,
        description: 'pixie dust',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['A magic powder that makes', ' you fly away to neverland.'], ['I wonder what condition', 'this is prescribed for.'], ['And by what kind of doctor.']]
    },
    {
        hotspotId: HotspotId.PHARMACY_BOOK_1,
        description: 'book',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['"Pthirus pubis"'], ['"An essay on a time old', 'symbiosis in our pants."']]
    },
    {
        hotspotId: HotspotId.PHARMACY_BOOK_2,
        description: 'book',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['"Venereal diseases at work"'], ['"Handling them gracefully', 'with your subordinates."']]
    },
    {
        hotspotId: HotspotId.PHARMACY_BOOK_3,
        description: 'book',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['"Forensic pathology for dummies"'], ['"How to practice at home', 'without getting caught."']]
    },
    {
        hotspotId: HotspotId.PHARMACY_BOOK_GROUP_1,
        description: 'books',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['"The Art of Poisoning"'], ['The most comprehensive', 'textbook with exercises.'], ['A classic.']]
    },
    {
        hotspotId: HotspotId.PHARMACY_BOOK_4,
        description: 'book',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['"The surprising healing', 'powers of bodily fluids"'], ['Sometimes, ignorance is the', 'best thing in the world.']]
    },
    {
        hotspotId: HotspotId.PHARMACY_POT_1,
        description: 'jar',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['It is full of dioxyphenylethanolisopropilamine.'], ['One should never run', 'out of this good stuff.']]
    },
    {
        hotspotId: HotspotId.PHARMACY_POT_2,
        description: 'jar',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['Truffle flavored rash cure.'], ['Gastronomic medicine', 'is trending these days.']]
    },
    {
        hotspotId: HotspotId.PHARMACY_POT_3,
        description: 'bottle',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['Vegan blood substitute,'], ['for eco-friendly surgical', 'procedures.']]
    },
    {
        hotspotId: HotspotId.PHARMACY_POT_4,
        description: 'jar',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['Shopping abort pills.'], ['An instant emetic to cut', 'painful mall expeditions short.']]
    },
    {
        hotspotId: HotspotId.PHARMACY_POT_5,
        description: 'bottle',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['Cannibal repellent', 'sun lotion.'], ['To get attractive to', 'the right people.']]
    },
    {
        hotspotId: HotspotId.PHARMACY_POT_6,
        description: 'bottle',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['Habanero eye drops.'], ['For zombie cosplayers that', 'want to go the extra mile.']]
    },
    {
        hotspotId: HotspotId.PHARMACY_POT_7,
        description: 'bottle',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['Yeast essence:'], ['bootstrap your auto-brewery', 'syndrome to save money on booze.']]
    },
    {
        hotspotId: HotspotId.PHARMACY_BOOK_5,
        description: 'book',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['"Hospital cookbook"'], ['"Recipes to prevent your', 'guests from coming back'], ['with plausible deniability."']]
    },
    {
        hotspotId: HotspotId.PHARMACY_POT_8,
        description: 'bottle',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['Skunk cologne:'], ['an underrated birth control.']]
    },
    {
        hotspotId: HotspotId.PHARMACY_POT_9,
        description: 'jar',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['Ginger-wasabi condoms.'], ['For the brave.']]
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
            images: [ background, foreground, book_group0, book0, pot0, book1, book2, book3, book_group1, book4,
              pot1, pot2, pot3, pot4, pot5, pot6, pot7, book5, pot8, pot9 ],
            animations: [ new PharmacistAnimation(), ANIM_PHARMACY_SIGN ],
            hotspots,
        };
    }
}

