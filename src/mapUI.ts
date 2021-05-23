import * as blessed from 'blessed';
import { SceneId } from './scene';
import { Triggers } from './triggers';
import { Matrix } from './matrix';
import { invariant } from './utils';

const WIDTH = 78;
const HEIGHT = 23;

export type MapListener = (sceneId: SceneId) => void;

enum MapCommand {
    EXIT = '__exit_map__'
};

export class GameMap {

    private box: blessed.Widgets.BoxElement;
    private listeners: MapListener[] = [];

    private clickMap = new Matrix<SceneId | MapCommand>(WIDTH, HEIGHT);
    private locations: MapLocation[] = [];

    constructor(private parent: blessed.Widgets.BoxElement) {
        this.box = blessed.box({
            top: 0,
            left: 'center',
            width: WIDTH + 2,
            height: HEIGHT + 2,
            content: '',
            tags: true,
            border: {
                type: 'line'
            },
        });
        this.box.on('mousemove', (data) => {
            this.render(this.getClickTarget(data.x, data.y));
        });
        this.box.on('mouseout', (data) => {
            this.render(undefined);
        });
        this.box.on('click', (data) => {
            const hovered = this.getClickTarget(data.x, data.y);
            this.render(hovered);
            if (hovered !== undefined) {
                this.hide();
                if (hovered !== MapCommand.EXIT) {
                    this.fireSceneSelected(hovered);
                }
            }
        });
        this.box.hide();
        parent.append(this.box);
    }

    private getClickTarget(mouseX: number, mouseY: number): SceneId | MapCommand | undefined {
        let X = mouseX - (this.parent.left as number) - 2;
        let Y = mouseY - (this.parent.top as number) - 2;
        return this.clickMap.get(X, Y);
    }

    public show(triggers: Triggers) {
        this.locations = getLocationsToShow(triggers);
        this.buildClickMap();
        this.render(undefined);
        this.box.show();
    }

    private render(hovered: SceneId | MapCommand | undefined) {
        let content = '';
        for (let y = 0 ; y < HEIGHT ; y++) {
            const locations = this.locations.filter(l => l.centerY === y).sort((a,b)=> a.centerX - b.centerX);
            content = content + this.drawMapLine(hovered, locations) + '\n';
        }
        this.box.setContent(content);
    }

    private drawMapLine(hovered: SceneId | MapCommand | undefined, locations: MapLocation[]): string {
        let line = '';
        let x = 0;
        for (const loc of locations) {
            if (!loc.label) {
                continue;
            }
            const start = this.getLabelStart(loc);
            let paddingBefore = ' '.repeat(start - x);
            line += paddingBefore;
            if (hovered === loc.sceneId) {
                line += '{bold}';
            }
            if (loc.sceneId === MapCommand.EXIT) {
                line += '{underline}';
            }
            line += loc.label;
            if (loc.sceneId === MapCommand.EXIT) {
                line += '{/underline}';
            }
            if (hovered === loc.sceneId) {
                line += '{/bold}';
            }
            x = start + loc.label.length;
        }
        const n = WIDTH - 1 - x;
        if (n > 0) {
            const paddingAfter = ' '.repeat(n);
            line += paddingAfter;
        }
        return line;
    }

    addMapListener(listener: MapListener) {
        this.listeners.push(listener);
    }

    removeMapListener(listener: MapListener) {
        const pos = this.listeners.indexOf(listener);
        if (pos !== - 1) {
            this.listeners.splice(pos, 1);
        }
    }

    private fireSceneSelected(sceneId: SceneId) {
        for (const listener of this.listeners) {
            listener(sceneId);
        }
    }

    hide() {
        this.box.hide();
    }

    isVisible() {
        return this.box.visible;
    }

    private buildClickMap() {
        this.clickMap.clear();
        for (const location of this.locations) {
            if (!location.label) {
                continue;
            }
            const left = this.getLabelStart(location);
            const y = location.centerY;
            for (let x = left ; x < (left + location.label.length) ; x++) {
                this.clickMap.set(x, y, location.sceneId);
            }
        }
    }

    /**
     * Returns the x position where we should start writing
     * the label so that it is centerend on the centered position
     * given by the map location.
     */
    private getLabelStart(location: MapLocation) {
        invariant(location.label, 'label should be defined');
        let x = location.centerX - Math.round((location.label.length / 2));
        if (x < 0) {
            x = 0;
        }
        if (x + location.label.length >= WIDTH) {
            x = WIDTH - 1 - location.label.length;
        }
        return x;
    }
}


function getExit(): MapLocation {
    return {
        label: 'Back',
        centerX: 0,
        centerY: HEIGHT - 1,
        sceneId: MapCommand.EXIT
    };
}

function getIceCreamShop(): MapLocation {
    return {
        label: 'Ice cream paradise',
        centerX: 20,
        centerY: 4,
        sceneId: SceneId.ICE_CREAM_SHOP
    };
}

function getBank(triggers: Triggers): MapLocation {
    return {
        label: triggers.isSet('BANK_VISITED') ? 'Bank' : '???',
        centerX: 23,
        centerY: 18,
        sceneId: SceneId.OUTSIDE_BANK
    };
}

function getDock(triggers: Triggers): MapLocation {
    return {
        label: triggers.isSet('DOCK_VISITED') ? 'Dock' : '???',
        centerX: 47,
        centerY: 5,
        sceneId: SceneId.DOCK
    };
}

function getPharmacy(triggers: Triggers): MapLocation {
    return {
        label: triggers.isSet('PHARMACY_VISITED') ? 'Pharmacy' : '???',
        centerX: 5,
        centerY: 1,
        sceneId: SceneId.PHARMACY
    };
}

function getArcade(triggers: Triggers): MapLocation {
    return {
        label: triggers.isSet('ARCADE_VISITED') ? 'Arcade' : '???',
        centerX: 18,
        centerY: 15,
        sceneId: SceneId.ARCADE,
    };
}

function getPub(triggers: Triggers): MapLocation {
    return {
        label: triggers.isSet('PUB_VISITED') ? 'Ales & Bells' : '???',
        centerX: 62,
        centerY: 11,
        sceneId: SceneId.OUTSIDE_PUB
    };
}

function getPark(triggers: Triggers): MapLocation {
    return {
        label: triggers.isSet('PARK_VISITED') ? 'Park' : '???',
        centerX: 50,
        centerY: 18,
        sceneId: SceneId.PARK
    };
}

function getCinema(triggers: Triggers): MapLocation {
    return {
        label: triggers.isSet('CINEMA_VISITED') ? 'Cinema' : '???',
        centerX: 71,
        centerY: 2,
        sceneId: SceneId.OUTSIDE_CINEMA
    };
}

function getForge(triggers: Triggers): MapLocation {
    return {
        label: triggers.isSet('FORGE_VISITED') ? 'Forge' : '???',
        centerX: 63,
        centerY: 21,
        sceneId: SceneId.FORGE
    };
}

function getFarm(triggers: Triggers): MapLocation {
    return {
        label: triggers.isSet('FARM_VISITED') ? 'Farm' : '???',
        centerX: 3,
        centerY: 10,
        sceneId: SceneId.FARM
    };
}

function getPizzeria(triggers: Triggers): MapLocation {
    return {
        label: triggers.isSet('PIZZERIA_VISITED') ? 'Pizzeria' : '???',
        centerX: 25,
        centerY: 11,
        sceneId: SceneId.PIZZERIA
    };
}

function getCascade(triggers: Triggers): MapLocation {
    return {
        label: triggers.isSet('CASCADE_VISITED') ? 'Cascade' : '???',
        centerX: 30,
        centerY: 0,
        sceneId: SceneId.CASCADE
    };
}

function getLocationsToShow(triggers: Triggers): MapLocation[] {
    const locations: MapLocation[] = [];
    locations.push(getExit());
    locations.push(getIceCreamShop());
    locations.push(getBank(triggers));
    locations.push(getPub(triggers));
    locations.push(getDock(triggers));
    locations.push(getArcade(triggers));
    locations.push(getPark(triggers));
    locations.push(getCinema(triggers));
    locations.push(getPharmacy(triggers));
    locations.push(getForge(triggers));
    locations.push(getFarm(triggers));
    locations.push(getPizzeria(triggers));
    locations.push(getCascade(triggers));
    return locations.filter(l => l.label);
}


/**
 * Represents a location on the map that the player can click on
 * to go to the corresponding scene.
 */
interface MapLocation {
    // The label to show on the map. If not defined,
    // it means that the location should not be visible yet
    // and that it will be unlocked later in the game
    label?: string;

    // Coordinates of the label's center
    centerX: number;
    centerY: number;

    // The scene to load on click or a command if
    // this is a special location
    sceneId: SceneId | MapCommand;
}