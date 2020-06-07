import { UI } from './ui';
import * as background from './background';
import * as sprites from './sprites';

const ui = new UI();
ui.addClickListener(e => ui.screen.title = `click at ${e.X}x${e.Y}`);
ui.addMoveListener(e => ui.screen.title = `move at ${e.X}x${e.Y}`);

ui.buffer.paint(background.bank, 0, 0);
ui.buffer.paint(sprites.boom_blaster1, 30, 18);
ui.buffer.paint(background.ice_cream_shop, 0, 0);

ui.buffer.clear();
ui.buffer.paint(background.pub, 0, 0);
ui.render();

