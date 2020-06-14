import { Scene, PaintTaskZ, AnimationZ, SceneListener } from "../scene";
import { HotspotMap } from "../hotspots";
import { GuyAnimation } from "../animation/guy_animation";
import { Action } from "../actions";
import { TextSegment } from "src/dialog";

export class GameScreen {

    private guyAnimation: GuyAnimation | undefined = undefined;
    private sceneListener: SceneListener | undefined;

    constructor(private images: PaintTaskZ[],
                private animations: AnimationZ[], private hotspotMap: HotspotMap | undefined,
                private showActionBar: boolean, private guy_left = -1,
                private guy_top = -1, private guy_look_to_the_right = true,
                private guyZIndex = 0) {
    }


    setSceneListener(l: SceneListener) {
        this.sceneListener = l;
    }


    /**
     * Sets this game screen as the one currently rendered.
     */
    show(scene: Scene) {
        scene.reset();

        for (const image of this.images) {
            scene.addImage(image);
        }

        for (const animation of this.animations) {
            scene.addAnimation(animation);
        }

        scene.setHotspotMap(this.hotspotMap);
        scene.setShowActionBar(this.showActionBar);

        if (this.guy_left !== -1 && this.guy_top !== 1) {
            this.guyAnimation = new GuyAnimation(this.guy_left, this.guy_top, this.guy_look_to_the_right);
            scene.addAnimation({ animation: this.guyAnimation, zIndex: this.guyZIndex});
        } else {
            this.guyAnimation = undefined;
        }

        // We handle here system events like quitting the game
        // or generic events like walking. The handling of
        // game screen specific events is delegated to the scene
        // listener field
        scene.addSceneListener(e => {
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