import { SceneEngine, PaintTaskZ, AnimationZ, SceneListener } from "./sceneEngine";
import { HotspotMap, GuyPosition } from "./hotspots";
import { GuyAnimation } from "./resources/animations/guy_animation";
import { Action } from "./actions";
import { TextSegment } from "./dialog";

export class GameScreen {

    private guyAnimation: GuyAnimation | undefined = undefined;
    private sceneListener: SceneListener | undefined;

    constructor(private images: PaintTaskZ[],
                private animations: AnimationZ[], private hotspotMap: HotspotMap | undefined,
                private showActionBar: boolean, private guyPosition: GuyPosition | undefined,
                private guyZIndex = 0) {
    }


    setSceneListener(l: SceneListener) {
        this.sceneListener = l;
    }


    /**
     * Sets this game screen as the one currently rendered.
     */
    show(sceneEngine: SceneEngine) {
        sceneEngine.reset();

        for (const image of this.images) {
            sceneEngine.addImage(image);
        }

        for (const animation of this.animations) {
            sceneEngine.addAnimation(animation);
        }

        sceneEngine.setHotspotMap(this.hotspotMap);
        sceneEngine.setShowActionBar(this.showActionBar);

        if (this.guyPosition) {
            this.guyAnimation = new GuyAnimation(this.guyPosition);
            sceneEngine.addAnimation({ animation: this.guyAnimation, zIndex: this.guyZIndex});
        } else {
            this.guyAnimation = undefined;
        }

        // We handle here system events like quitting the game
        // or generic events like walking. The handling of
        // game screen specific events is delegated to the scene
        // listener field
        sceneEngine.addSceneListener(e => {
            if (e.action === Action.QUIT) {
                process.exit(0);
            }

            if (e.action === Action.SKIP) {
                this.skip();
            }

            if (e.action === Action.SHOW_INVENTORY) {
                this.say([
                    ['My god.'],
                    ['It looks like things are messed', 'up big time in my pockets.'],
                    ['I should probably clean up', 'before my mom hear about it', 'and roast me.']
                ]);
            }

            if (e.action === Action.SHOW_MAP) {
                this.say([
                    ['Well, time to go somewhere else.'],
                ]);
            }

            if (e.action === Action.WALK) {
                if (this.guyAnimation) {
                    this.guyAnimation.walkTo(e.x);
                }
            }

            if (this.sceneListener) {
                this.sceneListener(e);
            }
        });
    }

    skip() {
        if (this.guyAnimation) {
            this.guyAnimation.skipToNextTextSegment();
        }
    }

    say(textSegments: TextSegment[]) {
        if (this.guyAnimation) {
            this.guyAnimation.say(textSegments);
        }
    }
}