import { UI } from './ui';
import { SceneEngine } from './sceneEngine';
import { Clock } from './clock';
//import { SceneId } from './scene';


const ui = new UI();

export function debug(str: string) {
  ui.debug(str);
}

const sceneEngine = new SceneEngine(ui);

//sceneEngine.loadScene(SceneId.OUTSIDE_ICE_CREAM_SHOP);

Clock.clock.repeat(0, () => {
  sceneEngine.tick();
  ui.render();
});

Clock.clock.play();
ui.showMap([]);