import { Cue } from "./dialog";

export enum InventoryId {
    COIN = 'coin',
    TEQUILA= 'tequila',
    SUSPICIOUS_PACKET = 'suspicious packet',
    SAUSAGE = 'sausage',
    MOVIE_REVIEW = 'movie review',
    ICE_CREAM = 'ice cream',
    JUMPING_ROPE = 'jumping rope',
}

export interface InventoryObject {
    objectId: InventoryId;
    lookAt: Cue[];
}


export const COIN: InventoryObject = {
    objectId: InventoryId.COIN,
    lookAt: [[ 'This is a piece of legacy', 'transactional hardware' ], [ 'colloquially known as a coin.' ]]
};

export const ICE_CREAM: InventoryObject = {
    objectId: InventoryId.ICE_CREAM,
    lookAt: [[ 'This is a vanilla and', 'lemon ice cream.' ]]
};

export const JUMPING_ROPE: InventoryObject = {
    objectId: InventoryId.JUMPING_ROPE,
    lookAt: [[ 'This is a jumping rope.' ]]
};

export const MOVIE_REVIEW: InventoryObject = {
    objectId: InventoryId.MOVIE_REVIEW,
    lookAt: [[ 'This is a very enthusiastic', 'review of a movie:' ],
             [ '"One of the best experiences', 'I ever had.' ],
             [ 'If this cannot get emotion', 'tears out of you,' ],
             [ 'you need to start questionning', 'your ability to feel."' ]]
};


// This is the global inventory
export const INVENTORY: InventoryObject[] = [
    COIN,
    ICE_CREAM,
    JUMPING_ROPE,
    MOVIE_REVIEW,
];

export function isInventoryId(obj: any): obj is InventoryObject {
    return Object.values(InventoryId).includes(obj);
}

export function isInventoryObject(obj: any): obj is InventoryObject {
    return typeof obj === 'object' && 'objectId' in obj && 'lookAt' in obj;
}
