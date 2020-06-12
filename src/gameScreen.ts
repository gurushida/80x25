import { Scene, PaintTaskZ, AnimationZ, getPaintTaskZ } from "./scene";
import { HotspotMap } from "./hotspots";
import { guy_right_still, guy_left_still } from "./sprite";
import { debug } from "./main";

export class GameScreen {

    private current_guy_sprite: PaintTaskZ | undefined;

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

        this.scene.hotspotMap = this.hotspotMap;
        this.scene.setShowActionBar(this.showActionBar);

        if (this.guy_left !== -1 && this.guy_top !== 1) {
            const img = this.guy_look_to_the_right ? guy_right_still : guy_left_still;
            debug(`right = ${this.guy_look_to_the_right}`);
            this.current_guy_sprite = getPaintTaskZ(img, this.guy_left, this.guy_top, this.guy_z_index, undefined);
            this.scene.addImage(this.current_guy_sprite);
        } else {
            this.current_guy_sprite = undefined;
        }
    }

}