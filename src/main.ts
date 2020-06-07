import { UI } from './ui';

const ui = new UI();
ui.addClickListener(e => ui.screen.title = `click at ${e.X}x${e.Y}`);
ui.addMoveListener(e => ui.screen.title = `move at ${e.X}x${e.Y}`);

