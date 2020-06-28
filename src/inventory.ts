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

const AllObjects: InventoryObject[] = [];

export interface InventoryObject {
    objectId: InventoryId;
    lookAt: Cue[];
}


AllObjects.push({
    objectId: InventoryId.COIN,
    lookAt: [[ 'This is a piece of legacy', 'transactional hardware' ], [ 'colloquially known as a coin.' ]]
});

AllObjects.push({
    objectId: InventoryId.ICE_CREAM,
    lookAt: [[ 'This is a vanilla and', 'lemon ice cream.' ]]
});

AllObjects.push({
    objectId: InventoryId.JUMPING_ROPE,
    lookAt: [[ 'This is a jumping rope.' ]]
});

AllObjects.push({
    objectId: InventoryId.MOVIE_REVIEW,
    lookAt: [[ 'This is a very enthusiastic', 'review of a movie:' ],
             [ '"One of the best experiences', 'I ever had.' ],
             [ 'If this cannot get emotion', 'tears out of you,' ],
             [ 'you need to start questionning', 'your ability to feel."' ]]
});


function getObject(id: InventoryId): InventoryObject {
    const item: InventoryObject | undefined = AllObjects.find(item => item.objectId === id);
    if (item === undefined) {
        throw new Error(`Missing object for id ${id}`);
    }
    return item;
}

export class Inventory {

    items: InventoryObject[] = [];

    constructor(ids: InventoryId[]) {
        for (const id of ids) {
            this.items.push(getObject(id));
        }
    }
}


export function isInventoryId(obj: any): obj is InventoryObject {
    return Object.values(InventoryId).includes(obj);
}

export function isInventoryObject(obj: any): obj is InventoryObject {
    return typeof obj === 'object' && 'objectId' in obj && 'lookAt' in obj;
}
