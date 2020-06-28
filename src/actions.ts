import { GuyPosition } from "./hotspots";
import { Runnable } from "./runnable";


export interface WalkingDestination {
  pos: GuyPosition;
  then: Runnable | undefined;
}

