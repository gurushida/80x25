import { Dialog, DialogState } from "./dialog";
import { Triggers } from "./triggers";
import { TalkingCharacter } from "./characters";
import { ICanTalkAnimation } from "./animations";
import { SceneEngine } from "./sceneEngine";
import { Runnable } from "./runnable";
import { Clock } from "./clock";
import { invariant } from "./utils";

export class DialogEngine {

    private currentOptionsToChooseFrom: string[] = [];
    private currentStatesToChooseFrom: DialogState[] = [];

    private currentTalkingCharacter: ICanTalkAnimation | undefined;
    private postDialogAction: Runnable | undefined;

    constructor(private sceneEngine: SceneEngine, private dialog: Dialog, private triggers: Triggers,
                private characterMap: Map<TalkingCharacter, ICanTalkAnimation>) {
    }

    run(then: Runnable | undefined) {
        this.currentTalkingCharacter = undefined;
        this.currentOptionsToChooseFrom = [];
        this.currentStatesToChooseFrom = [];
        for (const animation of this.characterMap.values()) {
            if (!this.dialog.characters.includes(animation.getCharacter())) {
                continue;
            }
            animation.startDialog();
        }
        this.sceneEngine.setCurrentDialog(this);
        this.postDialogAction = then;
        this.processCurrentOptions(this.dialog.states[0].destinations);
    }


    private endDialog() {
        for (const animation of this.characterMap.values()) {
            if (!this.dialog.characters.includes(animation.getCharacter())) {
                continue;
            }

            // Let's wait a tiny bit before returning to the normal
            // animations to avoid ugly effects like a character
            // immediately turning his back
            Clock.clock.scheduleOnce(50, () => animation.endDialog());
        }
        this.sceneEngine.setCurrentDialog(undefined);
        if (this.postDialogAction) {
            Clock.clock.defer(this.postDialogAction);
        }
    }


    /**
     * Given a list of states that we can reach, update the current state
     * of the dialog by doing one of the following things:
     * - terminate the dialog
     * - let the player choose if there are multiple options,
     * - play the next option if there is only one
     */
    private processCurrentOptions(indexes: number[]) {
        if (indexes.length === 1 && indexes[0] === 1) {
            // Reaching the final state means that the dialog is over

            this.endDialog();
            return;
        }

        // Let's collect all the states that can be reached, without duplicates
        const set = new Set<number>();
        for (const index of indexes) {
            if (index === 0) {
                // The initial state 0 has no content, so if we have it,
                // we replace it by its destinations
                this.dialog.states[0].destinations.map(n => set.add(n));
            } else {
                set.add(index);
            }
        }

        const reachableStates: DialogState[] = [];
        set.forEach(index => {
            const state = this.dialog.states[index];
            if (this.isEnabled(state)) {
                reachableStates.push(state);
            }
        });

        if (reachableStates.length === 0) {
            // No more options ? The dialog is over
            this.endDialog();
            return;
        }

        if (reachableStates.length === 1) {
            // If there is only one choice, let's roll with it
            this.playDialogStep(reachableStates[0], true);
            return;
        }

        // If we have multiple choices, it means that the player has a choice to make
        this.waitForPlayChoice(reachableStates);
    }


    private playDialogStep(state: DialogState, pause: boolean) {
        const step = state.step;
        invariant(step, 'step should be defined');
        this.currentTalkingCharacter = this.characterMap.get(step.character);
        const character = this.currentTalkingCharacter;
        invariant(character, 'character should be defined');

        // If this dialog states has triggers, let add them to the trigger list
        for (const t of step.triggers) {
            this.triggers.add(t);
        }

        Clock.clock.scheduleOnce(pause ? 5 : 0,
            () =>  character.say(step.cues, () => this.processCurrentOptions(state.destinations)));
    }


    private waitForPlayChoice(states: DialogState[]) {
        this.currentStatesToChooseFrom = [ ...states ];
        this.currentOptionsToChooseFrom = this.currentStatesToChooseFrom.map(state => state.step!.cues[0].join(' '));
    }


    public setPlayerChoice(index: number) {
        if (index < 0 || index >= this.currentOptionsToChooseFrom.length) {
            throw new Error(`Invalid choice ${index}, values = ${this.currentOptionsToChooseFrom}`);
        }

        const state = this.currentStatesToChooseFrom[index];
        this.currentOptionsToChooseFrom = [];
        this.currentStatesToChooseFrom = [];
        this.playDialogStep(state, false);
    }


    /**
     * Return the guy dialog options that we want the player to choose
     * from. If we want not waiting for player input, returns an empty array.
     */
    getOptionsToChooseFrom(): string[] {
        return this.currentOptionsToChooseFrom;
    }


    skipToNextCue() {
        if (this.currentTalkingCharacter) {
            this.currentTalkingCharacter.skipToNextCue();
        }
    }

    private isEnabled(state: DialogState): boolean {
        if (!state.step || !state.step.conditions) {
            return true;
        }
        for (const condition of state.step.conditions) {
            if (!this.triggers.isVerified(condition)) {
                return false;
            }
        }
        return true;
    }
}
