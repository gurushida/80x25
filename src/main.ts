import { UI } from './ui';
import { SceneEngine } from './sceneEngine';
import { Clock } from './clock';


const ui = new UI();

export function debug(str: string) {
  ui.debug(str);
}

const sceneEngine = new SceneEngine(ui);

Clock.clock.repeat(0, () => {
  sceneEngine.tick();
  ui.render();
});

Clock.clock.play();
ui.showMap([]);