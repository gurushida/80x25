import { UI } from './ui';
import { Scene } from './scene';
import { Clock } from './clock';
import { Action } from './actions';
import { iceCreamShop } from './gamescreens/ice_cream_shop';

const ui = new UI();

export function debug(str: string) {
  ui.debug(str);
}

const scene = new Scene(ui.buffer);

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

iceCreamShop.show(scene);

ui.render();

ui.addMoveListener(e => {
  ui.setTitle(`${e.x},${e.y}`);
  scene.setCurrentHotspot(e.x, e.y, undefined, e.hotspot);
});

ui.addClickListener(e => {
  scene.setCurrentHotspot(e.x, e.y, e.button, e.hotspot);
});

ui.addKeyListener(['escape', 'q', 'C-c'], () => scene.fireSceneAction(Action.QUIT));
ui.addKeyListener(['space', 'enter'], () => scene.fireSceneAction(Action.SKIP));
ui.addKeyListener('m', () => scene.fireSceneAction(Action.SHOW_MAP));
ui.addKeyListener('i', () => scene.fireSceneAction(Action.SHOW_INVENTORY));

const clock = new Clock(ui);
clock.repeat(0, () => {
  scene.tick();
  ui.render();
});

clock.play();
