import { Scene, PaintTaskZ, AnimationZ } from "./scene";
import { HotspotMap } from "./hotspots";
import { GuyAnimation } from "./animation/guy_animation";
import { Action } from "./actions";

export class GameScreen {

    private guy_animation: GuyAnimation | undefined = undefined;

    constructor(private scene:Scene, private images: PaintTaskZ[],
                private animations: AnimationZ[], private hotspotMap: HotspotMap | undefined,
                private showActionBar: boolean, private guy_left = -1,
                private guy_top = -1, private guy_look_to_the_right = true,
                private guy_z_index = 0) {
    }


    /**
     * Sets this game screen as the one currently rendered.
     */
    show() {
        this.scene.reset();

        for (const image of this.images) {
            this.scene.addImage(image);
        }

        for (const animation of this.animations) {
            this.scene.addAnimation(animation);
        }

        this.scene.setHotspotMap(this.hotspotMap);
        this.scene.setShowActionBar(this.showActionBar);

        if (this.guy_left !== -1 && this.guy_top !== 1) {
            this.guy_animation = new GuyAnimation(this.guy_left, this.guy_top, this.guy_look_to_the_right);
            this.scene.addAnimation({ animation: this.guy_animation, zIndex: this.guy_z_index});
        } else {
            this.guy_animation = undefined;
        }

        this.scene.addSceneListener(e => {
            if (e.action === Action.QUIT) {
                process.exit(0);
            }

            if (e.action === Action.SKIP) {
                this.skip();
            }

            if (e.action === Action.WALK) {
                if (this.guy_animation) {
                    this.guy_animation.walkTo(e.X);
                }
            }
            if (e.action === Action.SHOW_INVENTORY) {
                if (this.guy_animation) {
                    this.guy_animation.say([
                        ['My god.'],
                        ['It looks like things are messed', 'up big time in my pockets.'],
                        ['I should probably clean up', 'before my mom hear about it', 'and roast me.']
                    ]);
                }
            }
        });
    }

    skip() {
        if (this.guy_animation) {
            this.guy_animation.skipToNextTextSegment();
        }
    }
}