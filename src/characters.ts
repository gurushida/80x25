/**
 * This enum identifies each character that can be involved
 * in a dialog.
 */
export enum TalkingCharacter {
    GUY = 'GUY',
    DOG = 'DOG',
}


export function isValidTalkingCharacter(name: any): name is TalkingCharacter {
    return Object.values(TalkingCharacter).includes(name);
}

