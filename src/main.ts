import * as blessed from 'blessed';
import { MSG } from './messages';

// Create a screen object.
const screen = blessed.screen({
  smartCSR: true
});

screen.title = 'my window title';

// Create a box perfectly centered horizontally and vertically.
var box = blessed.box({
  top: 'center',
  left: 'center',
  width: 82,
  height: 27,
  content: 'Hello {bold}world{/bold}! Welcome to {underline}80x25{/underline}',
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'black',
    border: {
      fg: '#f0f0f0'
    },
  },
  cursor: {
    artificial: true,
    shape: {
      bg: 'black',
      fg: 'white',
      bold: true,
      ch: '+'
    },
    blink: true
  }
});

// Append our box to the screen.
screen.append(box);

// If our box is clicked, change the content.
box.on('click', function(data) {
  box.setContent(`{center}Some {orange-fg}${MSG}{/orange-fg}.{/center}`);
  screen.render();
});

box.on('mousemove', function(data) {
  box.setContent('MOUSE MOVE');
  box.setLine(1, `x=${data.x} y=${data.y}`);
  screen.render();
});


// If box is focused, handle `enter`/`return` and give us some more content.
box.key('enter', function(ch, key) {
  box.setContent('{right}Even different {black-fg}content{/black-fg}.{/right}\n');
  box.setLine(0, '01234567890123456789012345678901234567890123456789012345678901234567890123456789');
  for (let i = 1 ; i < 25 ; i++) {
    box.setLine(i, `# ${i}`);
  }
  screen.render();
});

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

// Focus our element.
box.focus();

// Render the screen.
screen.render();
