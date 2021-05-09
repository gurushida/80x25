import { PaintTask, getPaintTask } from "@/paintTask";
import { ZIndex } from "@/zIndex";
import { createMaskHotspot, GuyPosition, Hotspot, HotspotId } from "@/hotspots";
import { SceneLoader, SceneId, SceneData } from "@/scene";
import { Triggers } from "@/triggers";
import { ActionBarButton } from "@/screenBuffer";
import { SPR_POSTER_YODA } from "../generated/images/SPR_POSTER_YODA";
import { SPR_POSTER_ROBIN_HOOD } from "../generated/images/SPR_POSTER_ROBIN_HOOD";
import { SPR_POSTER_FREDDIE } from "../generated/images/SPR_POSTER_FREDDIE";
import { SPR_POSTER_JAWS } from "../generated/images/SPR_POSTER_JAWS";

const posterFreddie: PaintTask = getPaintTask(SPR_POSTER_FREDDIE, 1, 0, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_POSTER_FREDDIE, HotspotId.POSTER_FREDDIE));
const posterRobinHood: PaintTask = getPaintTask(SPR_POSTER_ROBIN_HOOD, 20, 0, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_POSTER_ROBIN_HOOD, HotspotId.POSTER_ROBIN_HOOD));
const posterYoda: PaintTask = getPaintTask(SPR_POSTER_YODA, 39, 0, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_POSTER_YODA, HotspotId.POSTER_YODA));
const posterJaws: PaintTask = getPaintTask(SPR_POSTER_JAWS, 57, 0, ZIndex.BEHIND_GUY, createMaskHotspot(SPR_POSTER_JAWS, HotspotId.POSTER_JAWS));

const cinemaHotspots: Hotspot[] = [
    {
        hotspotId: HotspotId.POSTER_FREDDIE,
        description: 'poster',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['This is a biopic', 'about a guy'], ['who managed to make yellow', 'military jackets a thing.']],
    },
    {
        hotspotId: HotspotId.POSTER_YODA,
        description: 'poster',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['If the Hulk had an', 'affair with a lady gremlin,'], ['it would probably look like'], ['this tiny dyslexic', 'laser-yielding creature.']],
    },
    {
        hotspotId: HotspotId.POSTER_ROBIN_HOOD,
        description: 'poster',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['The sad story of an', 'extremely skilled archer'], ['lapsing into crime out of despair'], ['as the olympics had not', 'been created yet.']],
    },
    {
        hotspotId: HotspotId.POSTER_JAWS,
        description: 'poster',
        rightClickAction: ActionBarButton.LOOK,
        lookAt: [['This is the story of a fish', 'that gets chastised by humans'], ['for wanting to try', 'some exotic food.']],
    },
];

const initialGuyPosition: GuyPosition = {
    left: 5,
    top: 14,
    lookToTheRight: true,
    maxLeft: 35,
};

export const INSIDE_CINEMA_LOADER: SceneLoader = {
    sceneId: SceneId.INSIDE_CINEMA,
    load(triggers: Triggers): SceneData {
        return {
            showActionBar: true,
            guyPosition: initialGuyPosition,
            images: [posterFreddie, posterYoda, posterRobinHood, posterJaws],
            animations: [  ],
            hotspots: cinemaHotspots,
        };
    }
}

