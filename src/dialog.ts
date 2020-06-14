import { CanTalkAnimation } from "./animations";

// A cue corresponds to lines meant to be displayed
// at the same, stacked above each other like this:
//
//            Oh my goodness.
//     This is utterly ridiculous !
//
export type Cue = string[];


// A dialog part is a piece of text pronounced by the same character
export interface DialogPart {
    character: CanTalkAnimation;
    content: Cue[];
}


export interface DialogOption {
    // The option to be selected and then said by the guy.
    // It is a single cue on purpose, as this cue will be used
    // to generate the option presented to the user by concatenating
    // the lines of the cue with spaces between them
    guyCue: Cue;

    // The dialog parts that ensue. They may include multiple
    // characters, even the guy himself
    dialogParts: DialogPart[];
}


export interface DialogTransition {
    option: DialogOption;

    // If not enabled, this dialog transition will not
    // be available to the player
    enabled: boolean;

    // If true, this transition will disappear from the source state
    isOneShot: boolean;

    // The dialog state to reach when this dialog option
    // has been played through, or undefined if the dialog is over.
    stateId: number | undefined;
}

/**
 * A dialog state is defined by the options the player can
 * choose from. If there are no enabled transition to choose, the
 * dialog is over. If there is a single enabled transition, it will
 * be automatically selected.
 */
export interface DialogState {
    transitions: DialogTransition[];
}


/**
 * The representation of a dialog between the guy and one or many
 * characters. The guy is always the one starting and the initial
 * state is always state 0.
 */
export interface Dialog {
    states: DialogState[];
}


const MINIMUM_SEGMENT_DURATION_IN_TICKS = 80;

export function getDurationInTicks(cue: Cue): number {
    const totalLength = cue.join(',').length;
    const duration = Math.round(totalLength * 2.5);
    return duration < MINIMUM_SEGMENT_DURATION_IN_TICKS ? MINIMUM_SEGMENT_DURATION_IN_TICKS : duration;
}
