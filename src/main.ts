import { UI } from './ui';
import { SceneEngine } from './sceneEngine';
import { Clock } from './clock';
import { Trigger, Triggers } from './triggers';


const ui = new UI();

export function debug(str: string) {
  ui.debug(str);
}

const triggerList: Trigger[] = [];
const triggers = new Triggers(triggerList);
const sceneEngine = new SceneEngine(ui, triggers);

Clock.clock.repeat(0, () => {
  sceneEngine.tick();
  ui.render();
});

Clock.clock.play();
ui.showMap(triggers);