/**
 * This enum identifies each character that can be involved
 * in a dialog.
 */
const talkingCharacters = [
    'GUY',
    'DOG',
    'LITTLE_GIRL',
    'HIGHLANDER',
] as const;
export type TalkingCharacter = typeof talkingCharacters[number];


export function isValidTalkingCharacter(name: any): name is TalkingCharacter {
    return talkingCharacters.includes(name);
}

