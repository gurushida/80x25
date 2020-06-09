import { UI } from './ui';
import * as background from './background';
import { Scene, getPaintTaskZ } from './scene';
import { boom_blaster } from './animations';
import { Clock } from './clock';
import { Hotspots, createFullHotspot } from './hotspots';
import { Action } from './actions';

const ui = new UI();

const scene = new Scene(ui.buffer, ui);
const bankBackground = getPaintTaskZ(background.bank, 0, 0, 0, createFullHotspot(Hotspots.BANK));
const iceCreamShopBackground = getPaintTaskZ(background.ice_cream_shop, 0, 0, 0, createFullHotspot(Hotspots.ICE_CREAM_SHOP));

scene.addImage(bankBackground);
const boomBlasterAnimation = { animation: boom_blaster, zIndex: 0};
scene.addAnimation(boomBlasterAnimation);
scene.setShowActionBar(true);
scene.hotspotMap.set(Hotspots.BOOM_BLASTER, {
  description: 'boom blaster',
  rightClickAction: Action.LOOK,
});
scene.hotspotMap.set(Hotspots.BANK, {
  description: 'bank',
  rightClickAction: Action.TAKE,
});
scene.hotspotMap.set(Hotspots.ICE_CREAM_SHOP, {
  description: 'ice cream shop',
  rightClickAction: Action.TALK,
});

ui.render();

ui.addMoveListener(e => {
  scene.setCurrentHotspot(e.X, e.Y, undefined, e.hotspot);
});

ui.addClickListener(e => {
  ui.setTitle(`${e.X},${e.Y}=>${e.hotspot} ${e.button}`);
  scene.setCurrentHotspot(e.X, e.Y, e.button, e.hotspot);
});

const clock = new Clock(ui);
clock.repeat(0, () => {
  scene.tick();
  ui.render();
});

clock.play();
clock.scheduleOnce(150, () => {
  ui.debug('ice cream'),
  scene.removeImage(bankBackground);
  scene.addImage(iceCreamShopBackground);
});

clock.scheduleOnce(300, () => {
  ui.debug('remove boom blaster'),
  scene.removeAnimation(boomBlasterAnimation);
});

clock.scheduleOnce(500, () => {
  ui.debug('re-add boom blaster'),
  scene.addAnimation(boomBlasterAnimation);
});
