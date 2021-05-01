import { TalkingCharacter, isValidTalkingCharacter } from "@/characters";
import { Cue, Dialog, DialogState } from "@/dialog";
import { Trigger, Condition, isValidTrigger } from "@/triggers";
import { invariant } from "@/utils";
import fs from 'fs';

/**
 * Loads a Unitex .grf file representing a dialog and
 * parses it to generate a Dialog object.
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

    sanityCheck(dialog);
    return dialog;
}


interface GrfBox {
    lines: string[];
    output?: string;
}


function parseGrfState(line: string, index: number, characters: TalkingCharacter[]): DialogState {
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
    // to be a character name + ':'. The next lines are the cues.
    // The output, if any, describes conditions and triggers.
    if (grfBox.lines.length <= 1 || !grfBox.lines[0].endsWith(':')) {
        throw new Error(`Invalid state: ${line}`);
    }
    const character = grfBox.lines[0].substring(0, grfBox.lines[0].length - 1);
    if (!isValidTalkingCharacter(character)) {
        throw new Error(`Invalid character name: ${line}`);
    }

    const cues: Cue[] = getCues(grfBox.lines.slice(1));
    const { triggers, conditions } = parseOutput(grfBox.output);

    return {
        destinations,
        step: {
            character,
            cues,
            triggers,
            conditions
        }
    };
}


/**
 * Given an array of lines like ['a', 'b', '<E>', 'c', 'd', '<E>', 'e'],
 * splits it on the special value '<E>' to create cues like [['a', 'b'], ['c', 'd'], ['e']]
 */
function getCues(grfLines: string[]): Cue[] {
    const cues: Cue[] = [];
    let currentCue: Cue = [];
    for (const line of grfLines) {
        if (line === '<E>') {
            invariant(currentCue.length !== 0, `Empty cue: ${JSON.stringify(grfLines)}`),
            cues.push(currentCue);
            currentCue = [];
        } else {
            invariant(!line.includes('<E') && !line.includes('E>'), `Buggy line: ${line}`);
            currentCue.push(line);
        }
    }
    invariant(currentCue.length !== 0, `Empty cue: ${JSON.stringify(grfLines)}`),
    cues.push(currentCue);
    return cues;
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
            conditions.push({ mustHave: true, trigger });
        } else if (parts[0] === 'IF!') {
            conditions.push({ mustHave: false, trigger });
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


/**
 * This function verifies that some conditions are met,
 * like for instance not having undeclared characters speaking
 * or making sure that when their are multiple branches to choose
 * from, they all corresponding to the guy.
 */
function sanityCheck(dialog: Dialog) {
    checkCharacters(dialog);
    checkChoices(dialog);
}


function checkCharacters(dialog: Dialog) {
    if (dialog.characters.length !== new Set(dialog.characters).size) {
        throw new Error(`Duplicate character: ${dialog.characters}`);
    }

    const used: TalkingCharacter[] = [];
    for (const state of dialog.states) {
        if (!state.step) continue;
        if (!dialog.characters.includes(state.step.character)) {
            throw new Error(`Undeclared character: '${state.step.character}'`);
        }
        if (!used.includes(state.step.character)) {
            used.push(state.step.character);
        }
    }

    if (used.length !== dialog.characters.length) {
        throw new Error(`Declared character: ${dialog.characters}, used: ${used}`);
    }
}

function checkChoices(dialog: Dialog) {
    for (let index = 0 ; index < dialog.states.length ; index++) {
        const state = dialog.states[index];
        if (state.destinations.length === 0 && index !== 1) {
            throw new Error(`Only the final state is allowed not to have transitions:\n${JSON.stringify(state)}`);
        }

        if (state.destinations.length > 1) {
            // If there are multiple branches, it means there is choice.
            // Since it is only for the guy that it makes sense, check that
            // this is the case
            for (const dst of state.destinations) {
                if (dst === 1) {
                    throw new Error(`Cannot have a choice between final state and something else:\n${JSON.stringify(state)}`);
                }
                if (dialog.states[dst].step?.character !== 'GUY') {
                    throw new Error(`Cannot have a choice not for the guy:\n${JSON.stringify(state)}`);
                }
            }
        }
    }
}
