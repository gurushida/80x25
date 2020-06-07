import { UI } from './ui';
import * as background from './background';
import * as sprites from './sprite';
import { Scene, getPaintTaskZ } from './scene';
import { boom_blaster } from './animations';
import { Clock } from './clock';

const ui = new UI();

ui.buffer.paint(background.bank, 0, 0);
ui.buffer.paint(sprites.boom_blaster1, 30, 18);
ui.buffer.paint(background.ice_cream_shop, 0, 0);

ui.buffer.clear();
ui.buffer.paint(background.pub, 0, 0);
ui.render();

const scene = new Scene(ui.buffer);
const bankBackground = getPaintTaskZ(background.bank, 0, 0, 0);
const iceCreanShopBackground = getPaintTaskZ(background.ice_cream_shop, 0, 0, 0);

scene.addImage(bankBackground);
const boomBlasterAnimation = { animation: boom_blaster, zIndex: 0};
scene.addAnimation(boomBlasterAnimation);
ui.render();

const clock = new Clock(ui);
clock.repeat(0, () => {
  scene.tick();
  ui.render();
});

clock.play();
clock.scheduleOnce(150, () => {
  ui.debug('ice cream'),
  scene.removeImage(bankBackground);
  scene.addImage(iceCreanShopBackground);
});

clock.scheduleOnce(300, () => {
  ui.debug('remove boom blaster'),
  scene.removeAnimation(boomBlasterAnimation);
});

clock.scheduleOnce(500, () => {
  ui.debug('re-add boom blaster'),
  scene.addAnimation(boomBlasterAnimation);
});
