import { loadSprite, mirror } from "./imagesUtils";

export const boom_blaster0 = loadSprite('asciiart/sprites/boom_blaster0.txt');
export const boom_blaster1 = loadSprite('asciiart/sprites/boom_blaster1.txt');

export const guy_right_still = loadSprite('asciiart/sprites/guy_still.txt');
export const guy_left_still = mirror(guy_right_still);

export const guy_right_talking0 = loadSprite('asciiart/sprites/guy_talking0.txt');
export const guy_right_talking1 = loadSprite('asciiart/sprites/guy_talking1.txt');
export const guy_left_talking0 = mirror(guy_right_talking0);
export const guy_left_talking1 = mirror(guy_right_talking1);

export const guy_right_walking0 = loadSprite('asciiart/sprites/guy_walking0.txt');
export const guy_right_walking1 = loadSprite('asciiart/sprites/guy_walking1.txt');
export const guy_right_walking2 = loadSprite('asciiart/sprites/guy_walking2.txt');
export const guy_right_walking3 = loadSprite('asciiart/sprites/guy_walking3.txt');
export const guy_left_walking0 = mirror(guy_right_walking0);
export const guy_left_walking1 = mirror(guy_right_walking1);
export const guy_left_walking2 = mirror(guy_right_walking2);
export const guy_left_walking3 = mirror(guy_right_walking3);
