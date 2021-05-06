import { Trigger, Condition } from './triggers';
import { TalkingCharacter } from './characters';



// A cue corresponds to lines meant to be displayed
// at the same, stacked above each other like this:
//
//            Oh my goodness.
//     This is utterly ridiculous !
//
export type Cue = string[];


const MINIMUM_SEGMENT_DURATION_IN_TICKS = 80;


export function getDurationInTicks(cue: Cue): number {
    const totalLength = cue.join(',').length;
    const duration = Math.round(totalLength * 3);
    return duration < MINIMUM_SEGMENT_DURATION_IN_TICKS ? MINIMUM_SEGMENT_DURATION_IN_TICKS : duration;
}


/**
 * This represents a dialog step, i.e. a line to be said
 * by a given character.
 *
 * If at least one of the conditions is not met,
 * this step is considered disabled and will be ignored
 * in the dialog graph.
 *
 * If the step is not disabled because of its conditions,
 * its triggers, if any, will be added to the TRIGGERS array.
 */
export interface DialogStep {
    character: TalkingCharacter,
    cues: Cue[];
    triggers: Trigger[];
    conditions: Condition[];
}


export interface DialogState {
    // The initial state #0 and the final state #1
    // do not to have a dialog step
    step?: DialogStep;

    // The states that can be reached after this step
    // is played
    destinations: number[];
}

/**
 * This represents a dialog between characters.
 * State handling is done via global triggers which
 * allows to:
 * - add/remove dialog paths
 * - unlock possibilities in the game
 */
export interface Dialog {
    characters: TalkingCharacter[];
    states: DialogState[];
}


