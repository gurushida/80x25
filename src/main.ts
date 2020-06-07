import { UI } from './ui';
import * as background from './background';
import * as sprites from './sprite';
import { Scene, getPaintTaskZ } from './scene';
import { boom_blaster } from './animations';

const ui = new UI();
ui.addClickListener(e => ui.screen.title = `click at ${e.X}x${e.Y}`);
ui.addMoveListener(e => ui.screen.title = `move at ${e.X}x${e.Y}`);

ui.buffer.paint(background.bank, 0, 0);
ui.buffer.paint(sprites.boom_blaster1, 30, 18);
ui.buffer.paint(background.ice_cream_shop, 0, 0);

ui.buffer.clear();
ui.buffer.paint(background.pub, 0, 0);
ui.render();


const scene = new Scene(ui.buffer);
const bankBackground = getPaintTaskZ(background.bank, 0, 0, 0);
scene.addImage(bankBackground);
scene.addAnimation({ animation: boom_blaster, zIndex: 0});

setInterval(function(){
  scene.tick();
  ui.render();
}, 20);
