import { GuyPosition } from "./hotspots";
import { Runnable } from "./runnable";

export enum Action {
  TALK = 'Talk to',
  USE = 'Use',
  GIVE = 'Give',
  TAKE = 'Take',
  LOOK = 'Look at',

  WALK = 'Walk',
  SHOW_MAP = 'Show map',
  CHANGE_SCREEN = 'Change screen',

  QUIT = 'Quit',
  SKIP = 'Skip',
}

export interface WalkingDestination {
  pos: GuyPosition;
  then: Runnable | undefined;
}
