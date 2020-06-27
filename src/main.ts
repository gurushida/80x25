import { UI } from './ui';
import { SceneEngine } from './sceneEngine';
import { Clock } from './clock';
import { iceCreamShop } from './resources/scenes/iceCreamShop';


const ui = new UI();

export function debug(str: string) {
  ui.debug(str);
}

const sceneEngine = new SceneEngine(ui);

/*const bankBackground = getPaintTaskZ(background.bank, 0, 0, 0, createFullHotspot(Hotspots.BANK));
const boomBlasterAnimation: AnimationZ = { animation: boom_blaster, zIndex: 0};
const bankHotspotMap = new HotspotMap();
bankHotspotMap.set(Hotspots.BOOM_BLASTER, {
  description: 'boom blaster',
  rightClickAction: Action.LOOK,
});
bankHotspotMap.set(Hotspots.BANK, {
  description: 'bank',
  rightClickAction: Action.TAKE,
});

const bank = new GameScreen(scene, [ bankBackground ], [ boomBlasterAnimation ], bankHotspotMap, true);
*/

iceCreamShop.show(sceneEngine);

Clock.clock.repeat(0, () => {
  sceneEngine.tick();
  ui.render();
});

Clock.clock.play();
