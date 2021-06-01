import { createMaskHotspot, GuyPosition, Hotspot, HotspotId } from "@/hotspots";
import { AsciiImage } from "@/images";
import { getPaintTask, PaintTask } from "@/paintTask";
import { SceneId, SceneLoader, SceneData } from "@/scene";
import { ActionBarButton } from "@/screenBuffer";
import { Triggers } from "@/triggers";
import { ZIndex } from "@/zIndex";
import { JewellerAnimation } from "../animations/jeweller";
import { DIALOG_JEWELLER } from "../generated/dialogs/DIALOG_JEWELLER";
import { BG_JEWELLERY_STORE_INSIDE } from "../generated/images/BG_JEWELLERY_STORE_INSIDE";
import { SPR_JEWELLERY_PILLAR } from "../generated/images/SPR_JEWELLERY_PILLAR";
import { SPR_NECKLACE_0 } from "../generated/images/SPR_NECKLACE_0";
import { SPR_NECKLACE_1 } from "../generated/images/SPR_NECKLACE_1";
import { SPR_NECKLACE_2 } from "../generated/images/SPR_NECKLACE_2";
import { SPR_NECKLACE_3 } from "../generated/images/SPR_NECKLACE_3";
import { SPR_NECKLACE_4 } from "../generated/images/SPR_NECKLACE_4";
import { SPR_RING } from "../generated/images/SPR_RING";
import { SPR_RING_VITRINE } from "../generated/images/SPR_RING_VITRINE";


const background: PaintTask = getPaintTask(BG_JEWELLERY_STORE_INSIDE, 0, 0, ZIndex.FAR_BACKGROUND, undefined);

function createNecklaceAndPillar(left: number, top: number, necklaceImg: AsciiImage, hotspotId: HotspotId): PaintTask[] {
    const necklace = getPaintTask(necklaceImg, left, top, ZIndex.BACKGROUND, createMaskHotspot(necklaceImg, hotspotId));
    const pillar = getPaintTask(SPR_JEWELLERY_PILLAR, left - 1, top + necklaceImg.height, ZIndex.BACKGROUND, undefined);
    return [necklace, pillar];
}

function createRingAndVitrine(left: number, top: number): PaintTask[] {
    const ring = getPaintTask(SPR_RING, left + 5, top + 1, ZIndex.FRONT, createMaskHotspot(SPR_RING, HotspotId.RING));
    const vitrine = getPaintTask(SPR_RING_VITRINE, left, top, ZIndex.FRONT, undefined);
    return [vitrine, ring];
}


const initialGuyPosition: GuyPosition = {
    left: 60,
    top: 13,
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
            lookToTheRight: false
        },
        lookAt: [['This jeweller looks very aristocratic.']],
    },
    {
        hotspotId: HotspotId.NECKLACE_0,
        description: 'necklace',
        rightClickAction: ActionBarButton.LOOK,
        take: {
            comment: [['No. My criminal career is', 'limited to speeding tickets.']],
        },
        lookAt: [['This necklace has a beautiful', 'emerald medallion.']]
    },
    {
        hotspotId: HotspotId.NECKLACE_1,
        description: 'necklace',
        rightClickAction: ActionBarButton.LOOK,
        take: {
            comment: [['No. My criminal career is', 'limited to speeding tickets.']],
        },
        lookAt: [['This lariat necklace is made of white gold.']]
    },
    {
        hotspotId: HotspotId.NECKLACE_2,
        description: 'necklace',
        rightClickAction: ActionBarButton.LOOK,
        take: {
            comment: [['No. My criminal career is', 'limited to speeding tickets.']],
        },
        lookAt: [['This is a collar necklace', 'made of sapphires.']]
    },
    {
        hotspotId: HotspotId.NECKLACE_3,
        description: 'necklace',
        rightClickAction: ActionBarButton.LOOK,
        take: {
            comment: [['No. My criminal career is', 'limited to speeding tickets.']],
        },
        lookAt: [['This looks like a feline tooth', 'mounted as a pendant.']]
    },
    {
        hotspotId: HotspotId.NECKLACE_4,
        description: 'necklace',
        rightClickAction: ActionBarButton.LOOK,
        take: {
            comment: [['No. My criminal career is', 'limited to speeding tickets.']],
        },
        lookAt: [['This is a pearl riviere.']]
    },
    {
        hotspotId: HotspotId.RING,
        description: 'proposal ring',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['This is a magnificient ring,'], ['perfect for kicking off the process'], ['of establishing a contract between humans'], ['that vow to try to tolerate each other'], ['until the sweet delivery of death.']]
    },

];

const images: PaintTask[] = [
    background,
    ...createNecklaceAndPillar(6, 10, SPR_NECKLACE_0, HotspotId.NECKLACE_0),
    ...createNecklaceAndPillar(22, 8, SPR_NECKLACE_1, HotspotId.NECKLACE_1),
    ...createNecklaceAndPillar(38, 6, SPR_NECKLACE_2, HotspotId.NECKLACE_2),
    ...createNecklaceAndPillar(54, 8, SPR_NECKLACE_3, HotspotId.NECKLACE_3),
    ...createNecklaceAndPillar(69, 10, SPR_NECKLACE_4, HotspotId.NECKLACE_4),
    ...createRingAndVitrine(35, 18),
];

export const JEWELLERY_STORE_INSIDE_LOADER: SceneLoader = {
    sceneId: SceneId.JEWELLERY_STORE_INSIDE,
    load(triggers: Triggers): SceneData {
        return {
            showActionBar: true,
            guyPosition: initialGuyPosition,
            images,
            animations: [ new JewellerAnimation() ],
            hotspots,
        };
    }
}