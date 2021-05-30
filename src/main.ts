import { UI } from './ui';
import { SceneEngine } from './sceneEngine';
import { Clock } from './clock';
import { Trigger, Triggers } from './triggers';
import { InventoryId, Inventory } from './inventory';
import { SceneId } from './scene';


const ui = new UI();

export function debug(str: string) {
  ui.debug(str);
}

const triggerList: Trigger[] = [
  'BANK_VISITED',
  'DOCK_VISITED',
  'HEARD_ABOUT_PUB',
  'ARCADE_VISITED',
  'PUB_VISITED',
  'PARK_VISITED',
  'CINEMA_VISITED',
  'PHARMACY_VISITED',
  'FORGE_VISITED',
  'FARM_VISITED',
  'PIZZERIA_VISITED',
  'WATERFALL_VISITED',
  'JEWELLERY_STORE_OUTSIDE_VISITED',
];
const triggers = new Triggers(triggerList);

const itemList: InventoryId[] = [ InventoryId.COIN, InventoryId.JUMPING_ROPE, InventoryId.MOVIE_REVIEW, ];
const inventory = new Inventory(itemList);

const sceneEngine = new SceneEngine(ui, triggers, inventory);

Clock.clock.repeat(0, () => {
  sceneEngine.tick();
  ui.render();
});

Clock.clock.play();
//ui.showMap(triggers);
sceneEngine.loadScene(SceneId.PHARMACY);
