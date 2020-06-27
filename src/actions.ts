import { GuyPosition } from "./hotspots";
import { Runnable } from "./runnable";
import { ActionBarButton } from "./screenbuffer";

export enum Action {
  TALK = 'Talk to',
  USE = 'Use',
  GIVE = 'Give',
  TAKE = 'Take',
  LOOK = 'Look at',

  WALK = 'Walk',
  CHANGE_SCREEN = 'Change screen',
}

export interface WalkingDestination {
  pos: GuyPosition;
  then: Runnable | undefined;
}


export function getActionButton(action: Action | undefined): ActionBarButton | undefined {
  if (!action) {
    return undefined;
  }
  switch (action) {
    case Action.TALK: return ActionBarButton.TALK;
    case Action.USE: return ActionBarButton.USE;
    case Action.GIVE: return ActionBarButton.GIVE;
    case Action.TAKE: return ActionBarButton.TAKE;
    case Action.LOOK: return ActionBarButton.LOOK;
    default: throw new Error(`Illegal right click action: ${action}`);
  }
}

export function getAction(button: ActionBarButton | undefined): Action | undefined {
  if (!button) {
    return undefined;
  }
  switch (button) {
    case ActionBarButton.TALK: return Action.TALK;
    case ActionBarButton.USE: return Action.USE;
    case ActionBarButton.GIVE: return Action.GIVE;
    case ActionBarButton.TAKE: return Action.TAKE;
    case ActionBarButton.LOOK: return Action.LOOK;
  }
}
