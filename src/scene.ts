import { SceneEngine, SceneListener } from "./sceneEngine";
import { HotspotMap, GuyPosition } from "./hotspots";
import { GuyAnimation } from "./resources/animations/guy";
import { Action } from "./actions";
import { Cue, Dialog } from "./dialog";
import { Animation, isCanTalkAnimation, ICanTalkAnimation } from "./animations";
import { PaintTask } from "./paintTask";
import { Runnable } from "./runnable";
import { Trigger } from "./triggers";
import { TalkingCharacter } from "./characters";
import { DialogEngine } from "./dialogEngine";

export class Scene {

    private guyAnimation: GuyAnimation | undefined = undefined;
    private sceneListener: SceneListener | undefined;
    private sceneEngine: SceneEngine | undefined;
    private dialogEngine: DialogEngine | undefined;

    constructor(private images: PaintTask[],
                private animations: Animation[], private hotspotMap: HotspotMap | undefined,
                private showActionBar: boolean, private guyPosition: GuyPosition | undefined) {
    }


    setSceneListener(l: SceneListener) {
        this.sceneListener = l;
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
                if (e.guyPosition) {
                    // If the user has clicked on a hotspot with
                    // a specified position for the guy, let's use it
                    this.walkTo(e.guyPosition, undefined);
                } else {
                    this.walkToPoint(e.x, e.y);
                }
            }

            if (this.sceneListener) {
                this.sceneListener(e);
            }
        });
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
