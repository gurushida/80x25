import { SceneEngine } from "./sceneEngine";
import { HotspotMap, GuyPosition, HotspotInfo } from "./hotspots";
import { GuyAnimation } from "./resources/animations/guy";
import { Cue, Dialog } from "./dialog";
import { Animation, isCanTalkAnimation, ICanTalkAnimation } from "./animations";
import { PaintTask } from "./paintTask";
import { Runnable } from "./runnable";
import { Trigger } from "./triggers";
import { TalkingCharacter } from "./characters";
import { DialogEngine } from "./dialogEngine";
import { SceneActionListener } from "./actionManager";
import { InventoryObject, isInventoryObject } from "./inventory";

export class Scene {

    private guyAnimation: GuyAnimation | undefined = undefined;
    private sceneEngine: SceneEngine | undefined;
    private dialogEngine: DialogEngine | undefined;
    private sceneListener: SceneActionListener | undefined;

    constructor(private images: PaintTask[],
                private animations: Animation[], private hotspotMap: HotspotMap | undefined,
                private showActionBar: boolean, private guyPosition: GuyPosition | undefined) {
    }

    setSceneListener(listener: SceneActionListener) {
        this.sceneListener = listener;
    }


    /**
     * Sets this game screen as the one currently rendered.
     */
    show(sceneEngine: SceneEngine) {
        this.sceneEngine = sceneEngine;
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
            sceneEngine.addAnimation(this.guyAnimation);
        } else {
            this.guyAnimation = undefined;
        }
        sceneEngine.addSceneActionListener(this.sceneListener);
    }

    skip() {
        if (this.dialogEngine) {
            this.dialogEngine.skipToNextCue();
            return;
        }

        if (this.guyAnimation) {
            this.guyAnimation.skipToNextCue();
        }
    }

    say(textSegments: Cue[], then?: Runnable) {
        if (this.guyAnimation) {
            this.guyAnimation.say(textSegments, then);
        }
    }

    walkTo(pos: GuyPosition, then?: Runnable) {
        if (this.guyAnimation) {
            if (pos) {
                this.guyAnimation.walkTo({ pos, then });
            } else {
                if (then) {
                    then();
                }
            }
        }
    }

    walkToPoint(x: number, y: number) {
        const moveToRight = x > this.guyPosition.left;
        const dst: GuyPosition = {
            left: x,
            top: y,
            lookToTheRight: moveToRight
        };
        this.walkTo(dst, undefined);
    }

    runDialog(dialog: Dialog, triggers: Trigger[]) {
        const characterMap = new Map<TalkingCharacter, ICanTalkAnimation>();
        for (const animation of this.animations) {
            if (isCanTalkAnimation(animation)) {
                characterMap.set(animation.getCharacter(), animation);
            }
        }
        if (this.guyAnimation) {
            characterMap.set(this.guyAnimation.getCharacter(), this.guyAnimation);
        }

        for (const ch of dialog.characters) {
            if (!characterMap.get(ch)) {
                throw new Error(`No animation for character ${ch}`);
            }
        }
        this.dialogEngine = new DialogEngine(this.sceneEngine, dialog, triggers, characterMap);
        this.dialogEngine.run(() => this.dialogEngine = undefined);
    }
}

export enum SceneId {
    OUTSIDE_ICE_CREAM_SHOP,
    INSIDE_ICE_CREAM_SHOP,
}

export class DefaultSceneActionListener implements SceneActionListener {

    public constructor(protected scene: Scene) {}

    walk(x: number, y: number) {
        this.scene.walkToPoint(x, y);
    }

    give(what: InventoryObject, to: HotspotInfo) {
        this.scene.say([[ 'I cannot do that.' ]]);
    }

    use(what: InventoryObject | HotspotInfo) {
        this.scene.say([[ 'I cannot use this.' ]]);
    }

    useObjectOn(what: InventoryObject, on: InventoryObject | HotspotInfo) {
        this.scene.say([[ 'I cannot use this with that.' ]]);
    }

    talk(who: InventoryObject | HotspotInfo) {
        this.scene.say([[ 'I cannot talk to that.' ]]);
    }

    take(what: InventoryObject | HotspotInfo) {
        if (isInventoryObject(what)) {
            this.scene.say([[ 'I already have it.' ]]);
        } else {
            this.scene.say([[ 'I cannot take that.' ]]);
        }
    }

    look(what: InventoryObject | HotspotInfo) {
        if (isInventoryObject(what)) {
            this.scene.say([[ `This is a ${what}` ]]);
        } else {
            this.scene.say([[ `This is a ${what.description}` ]]);
        }
    }

    changeScene(sceneId: SceneId, pos: GuyPosition | undefined) {
        this.scene.say([[ `Change scene to ${sceneId}` ]]);
    }

    quit() {
        process.exit(0);
    }

    skip() {
        this.scene.skip();
    }

}
