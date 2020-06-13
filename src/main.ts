import { UI } from './ui';
import * as background from './background';
import { Scene, getPaintTaskZ } from './scene';
import { Clock } from './clock';
import { Hotspots, createFullHotspot } from './hotspots';
import { GameScreen } from './gameScreen';
import { Action } from './actions';

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

const iceCreamShopBackground = getPaintTaskZ(background.ice_cream_shop, 0, 0, 0, createFullHotspot(Hotspots.ICE_CREAM_SHOP));
const iceCreamShop = new GameScreen(scene, [ iceCreamShopBackground ], [], undefined, true,
  8, 14, true, 0);



/*scene.addImage(bankBackground);
scene.addAnimation(boomBlasterAnimation);
scene.setShowActionBar(true);
scene.hotspotMap.set(Hotspots.ICE_CREAM_SHOP, {
  description: 'ice cream shop',
  rightClickAction: Action.TALK,
});
*/

iceCreamShop.show();

ui.render();

ui.addMoveListener(e => {
  scene.setCurrentHotspot(e.X, e.Y, undefined, e.hotspot);
});

ui.addClickListener(e => {
  ui.setTitle(`${e.X},${e.Y}=>${e.hotspot} ${e.button}`);
  scene.setCurrentHotspot(e.X, e.Y, e.button, e.hotspot);
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
/*clock.scheduleOnce(150, () => {
  ui.debug('ice cream'),
  scene.removeImage(bankBackground);
  scene.addImage(iceCreamShopBackground);
});*/

/*clock.scheduleOnce(300, () => {
  ui.debug('remove boom blaster'),
  scene.removeAnimation(boomBlasterAnimation);
});*/

/*clock.scheduleOnce(500, () => {
  ui.debug('re-add boom blaster'),
  scene.addAnimation(boomBlasterAnimation);
});*/
