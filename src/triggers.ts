/**
 * This enum identifies milestones that can be reached during the game,
 * like for instance learning about a new location that will
 * appear on the map or obtaining an object that unlocks new possibilities.
 */
const triggers = [
    'DOG_0',
    'DOG_1',
    'HAS_TEQUILA',
    'KNOW_ABOUT_TEQUILA',
    'BANK_VISITED',
    'DOCK_VISITED',
    'HEARD_ABOUT_PUB',
    'ARCADE_VISITED',
    'PUB_VISITED',
    'PARK_VISITED',
] as const;
export type Trigger = typeof triggers[number];



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
    return triggers.includes(t);
}


export class Triggers {

    public constructor(private triggers: Trigger[]) {}

    add(t: Trigger) {
        if (!this.isSet(t)) {
            this.triggers.push(t);
        }
    }

    isSet(t: Trigger): boolean {
        return this.triggers.includes(t);
    }

    isVerified(condition: Condition) {
        if (condition.mustHave) {
            return this.isSet(condition.trigger);
        }

        return !this.isSet(condition.trigger);
    }
}
