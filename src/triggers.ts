/**
 * This enum identifies milestones that can be reached during the game,
 * like for instance learning about a new location that will
 * appear on the map or obtaining an object that unlocks new possibilities.
 */
export enum Trigger {
    DOG_0 = 'DOG_0',
    DOG_1 = 'DOG_1',
    HAS_TEQUILA = 'HAS_TEQUILA',
    KNOW_ABOUT_TEQUILA = 'KNOW_ABOUT_TEQUILA',
}


/**
 * This array contains all the triggers activated during the game.
 * It represents the progression in the game.
 */
export const TRIGGERS: Trigger[] = [];


/**
 * This represents a condition based on the TRIGGERS array.
 * It mustHave is true, the condition will be verified if the global
 * state contains the trigger. Otherwise it will be true if the
 * TRIGGERS array does not contain the trigger.
 */
export interface Condition {
    mustHave: boolean;
    trigger: Trigger;
}


export function isValidTrigger(t: any): t is Trigger {
    return Object.values(Trigger).includes(t);
}


export function isVerified(condition: Condition, triggers: Trigger[]) {
    if (condition.mustHave) {
        return triggers.includes(condition.trigger);
    }

    return !triggers.includes(condition.trigger);
}