import { UI } from './ui';
import { loadBackground } from './images';

const bank = loadBackground('asciiart/backgrounds/bank.txt');

const ui = new UI();
ui.addClickListener(e => ui.screen.title = `click at ${e.X}x${e.Y}`);
ui.addMoveListener(e => ui.screen.title = `move at ${e.X}x${e.Y}`);

ui.buffer.paint(bank, 0, 10);
ui.render();

