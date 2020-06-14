import fs from 'fs';
import { isValidTrigger, Trigger, Condition } from './triggers';
import { TalkingCharacter, isValidTalkingCharacter } from './characters';



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
    const duration = Math.round(totalLength * 2.5);
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
    cue: Cue;
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


/**
 * Loads a Unitex .grf file representing a dialog and
 * parses it to generate a GrfDialog object.
 */
export function loadDialogGrf(filename: string): Dialog {
    const content = fs.readFileSync(filename, 'utf8');
    const lines = content.split('\r\n').filter(line => line !== '');
    const pos = lines.indexOf('#');
    lines.splice(0, pos + 2);

    const characters: TalkingCharacter[] = [];
    const states: DialogState[] = lines.map((line, index) => parseGrfState(line, index, characters));
    const dialog: Dialog = {
        characters,
        states
    };

    return dialog;
}


interface GrfBox {
    lines: string[];
    output?: string;
}


function parseGrfState(line: string, index: number, characters: TalkingCharacter[]): DialogState | undefined{
    if (index === 1) {
        return {
            destinations: []
        };
    }
    const endOfText = line.lastIndexOf('"');
    const boxContent = line.substring(1, endOfText);
    const destinations: number[] = line.trim().substring(endOfText + 2).split(' ').map(n => parseInt(n, 10));
    destinations.splice(0, 3);

    const grfBox = parseBoxContent(boxContent);

    if (index === 0) {
        // The initial state is only meant to describe the characters involved in the dialog
        if (grfBox.lines.length !== 1 || grfBox.lines[0] !== '<E>'
            || !grfBox.output || grfBox.output === '') {
            throw new Error(`Invalid initial state content: ${line}`);
        }
        const names = grfBox.output.split(',');
        for (const name of names) {
            if (isValidTalkingCharacter(name)) {
                characters.push(name);
            } else {
                throw new Error(`Invalid character name: '${name}'`);
            }
        }
        return { destinations };
    }

    // We have a regular state. The first line is supposed
    // to be a character name + ':'. The next lines are the cue.
    // The output, if any, describes conditions and triggers.
    if (grfBox.lines.length <= 1 || !grfBox.lines[0].endsWith(':')) {
        throw new Error(`Invalid state: ${line}`);
    }
    const character = grfBox.lines[0].substring(0, grfBox.lines[0].length - 1);
    if (!isValidTalkingCharacter(character)) {
        throw new Error(`Invalid character name: ${line}`);
    }

    const cue: Cue = grfBox.lines.slice(1);
    const { triggers, conditions } = parseOutput(grfBox.output);

    return {
        destinations,
        step: {
            character,
            cue,
            triggers,
            conditions
        }
    };
}


/**
 * The output of a box contains a comma-separated list of
 * conditions and/or triggers.
 */
function parseOutput(output: string | undefined): { triggers: Trigger[], conditions: Condition[] } {
    const triggers: Trigger[] = [];
    const conditions: Condition[] = [];

    if (!output) {
        return { triggers, conditions };
    }

    const chunks = output.split(',').map(c => c.trim());
    for (const chunk of chunks) {
        const parts = chunk.split(':');
        if (parts.length !== 2) {
            throw new Error(`Invalid output: '${output}'`);
        }

        const trigger = parts[1];
        if (!isValidTrigger(trigger)) {
            throw new Error(`Invalid trigger: '${trigger}'`);
        }

        if (parts[0] === 'IF') {
            conditions.push({ mustHave: false, trigger });
        } else if (parts[0] === 'IF!') {
            conditions.push({ mustHave: true, trigger });
        } else if (parts[0] === 'TRIGGER') {
            triggers.push(trigger);
        } else {
            throw new Error(`Invalid command: '${parts[0]}'`);
        }
    }

    return { triggers, conditions };
}


function parseBoxContent(content: string): GrfBox {
    const box: GrfBox = {
        lines: [],
        output: undefined
    }

    let current = '';
    let pos = 0;
    while (pos < content.length) {
        const ch = content.charAt(pos);
        if (ch === '\\') {
            current = current + content.charAt(pos + 1);
            pos = pos + 2
            continue;
        }
        if (ch === '+') {
            box.lines.push(current);
            current = '';
            pos = pos + 1;
            continue;
        }
        if (ch === '/') {
            box.lines.push(current);
            box.output = content.substring(pos + 1);
            current = '';
            break;
        }

        current = current + ch;
        pos = pos + 1;
    }
    if (current !== '') {
        box.lines.push(current);
    }

    return box;
}