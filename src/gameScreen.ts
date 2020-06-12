import { Scene, PaintTaskZ, AnimationZ } from "./scene";
import { HotspotMap } from "./hotspots";

export class GameScreen {

    // Current oordinates of guy or -1,-1 if should not be displayed
    //private guy_left = -1;
    //private guy_top = -1;

    // Orientation of the guy sprite
    //private guy_look_to_the_right = true;

    constructor(private scene:Scene, private images: PaintTaskZ[],
                private animations: AnimationZ[], private hotspotMap: HotspotMap | undefined,
                private showActionBar: boolean) {
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

        this.scene.hotspotMap = this.hotspotMap;
        this.scene.setShowActionBar(this.showActionBar);
    }

}