import { UI } from './ui';
import * as background from './background';

const ui = new UI();
ui.addClickListener(e => ui.screen.title = `click at ${e.X}x${e.Y}`);
ui.addMoveListener(e => ui.screen.title = `move at ${e.X}x${e.Y}`);

ui.buffer.paint(background.bank, 0, 0);
ui.render();

