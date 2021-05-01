import fs from "fs";
import { loadDialogGrf } from "./loadDialogs";
import { loadOpaqueImage, loadSprite } from "./loadImages";

export const IMAGES_DIR = 'src/resources/generated/images';
fs.mkdirSync(IMAGES_DIR, { recursive: true });

export const DIALOGS_DIR = 'src/resources/generated/dialogs';
fs.mkdirSync(DIALOGS_DIR, { recursive: true });

//--------------------------------------------------------------------------

compileOpaqueImage('asciiart/backgrounds/bank.txt', 'BG_BANK');
compileOpaqueImage('asciiart/backgrounds/ice_cream_shop.txt', 'BG_ICE_CREAM_SHOP');
compileOpaqueImage('asciiart/backgrounds/pub.txt', 'BG_PUB');

//--------------------------------------------------------------------------

compileSprite('asciiart/sprites/boom_blaster0.txt', 'SPR_BOOM_BLASTER_0');
compileSprite('asciiart/sprites/boom_blaster1.txt', 'SPR_BOOM_BLASTER_1');

compileSprite('asciiart/sprites/guy_right_still0.txt', 'SPR_GUY_RIGHT_STILL_0');
compileSprite('asciiart/sprites/guy_right_still1.txt', 'SPR_GUY_RIGHT_STILL_1');
compileSprite('asciiart/sprites/guy_left_still0.txt', 'SPR_GUY_LEFT_STILL_0');
compileSprite('asciiart/sprites/guy_left_still1.txt', 'SPR_GUY_LEFT_STILL_1');

compileSprite('asciiart/sprites/guy_right_talking0.txt', 'SPR_GUY_RIGHT_TALKING_0');
compileSprite('asciiart/sprites/guy_right_talking1.txt', 'SPR_GUY_RIGHT_TALKING_1');
compileSprite('asciiart/sprites/guy_left_talking0.txt', 'SPR_GUY_LEFT_TALKING_0');
compileSprite('asciiart/sprites/guy_left_talking1.txt', 'SPR_GUY_LEFT_TALKING_1');

compileSprite('asciiart/sprites/guy_right_walking0.txt', 'SPR_GUY_RIGHT_WALKING_0');
compileSprite('asciiart/sprites/guy_right_walking1.txt', 'SPR_GUY_RIGHT_WALKING_1');
compileSprite('asciiart/sprites/guy_right_walking2.txt', 'SPR_GUY_RIGHT_WALKING_2');
compileSprite('asciiart/sprites/guy_right_walking3.txt', 'SPR_GUY_RIGHT_WALKING_3');
compileSprite('asciiart/sprites/guy_left_walking0.txt', 'SPR_GUY_LEFT_WALKING_0');
compileSprite('asciiart/sprites/guy_left_walking1.txt', 'SPR_GUY_LEFT_WALKING_1');
compileSprite('asciiart/sprites/guy_left_walking2.txt', 'SPR_GUY_LEFT_WALKING_2');
compileSprite('asciiart/sprites/guy_left_walking3.txt', 'SPR_GUY_LEFT_WALKING_3');

compileSprite('asciiart/sprites/dog0.txt', 'SPR_DOG_0');
compileSprite('asciiart/sprites/dog1.txt', 'SPR_DOG_1');

compileSprite('asciiart/sprites/sea0.txt', 'SPR_SEA_0');
compileSprite('asciiart/sprites/sea1.txt', 'SPR_SEA_1');
compileSprite('asciiart/sprites/sea2.txt', 'SPR_SEA_2');
compileSprite('asciiart/sprites/sea3.txt', 'SPR_SEA_3');

compileSprite('asciiart/sprites/dock0.txt', 'SPR_DOCK_0');

compileSprite('asciiart/sprites/cloud0.txt', 'SPR_CLOUD_0');
compileSprite('asciiart/sprites/cloud1.txt', 'SPR_CLOUD_1');
compileSprite('asciiart/sprites/cloud2.txt', 'SPR_CLOUD_2');

compileSprite('asciiart/sprites/bird0.txt', 'SPR_BIRD_0');
compileSprite('asciiart/sprites/bird1.txt', 'SPR_BIRD_1');
compileSprite('asciiart/sprites/bird2.txt', 'SPR_BIRD_2');

compileSprite('asciiart/sprites/highlander_left0.txt', 'SPR_HIGHLANDER_LEFT_0');
compileSprite('asciiart/sprites/highlander_left1.txt', 'SPR_HIGHLANDER_LEFT_1');
compileSprite('asciiart/sprites/highlander_left2.txt', 'SPR_HIGHLANDER_LEFT_2');
compileSprite('asciiart/sprites/highlander_right0.txt', 'SPR_HIGHLANDER_RIGHT_0');
compileSprite('asciiart/sprites/highlander_right1.txt', 'SPR_HIGHLANDER_RIGHT_1');
compileSprite('asciiart/sprites/highlander_right2.txt', 'SPR_HIGHLANDER_RIGHT_2');
compileSprite('asciiart/sprites/highlander_talking0.txt', 'SPR_HIGHLANDER_TALKING_0');
compileSprite('asciiart/sprites/highlander_talking1.txt', 'SPR_HIGHLANDER_TALKING_1');
compileSprite('asciiart/sprites/highlander_talking2.txt', 'SPR_HIGHLANDER_TALKING_2');

compileSprite('asciiart/sprites/fishing_net.txt', 'SPR_FISHING_NET');

//--------------------------------------------------------------------------

compileDialog('dialogs/dog.grf', 'DIALOG_DOG');
compileDialog('dialogs/highlander.grf', 'DIALOG_HIGHLANDER');
compileDialog('dialogs/trying_to_take_net.grf', 'DIALOG_TRYING_TO_TAKE_NET');

//--------------------------------------------------------------------------

function compileOpaqueImage(imagePath: string, symbol: string) {
    compileImage(imagePath, symbol, false);
}


function compileSprite(imagePath: string, symbol: string) {
    compileImage(imagePath, symbol, true);
}


function compileImage(imagePath: string, symbol: string, sprite: boolean) {
    const img = sprite ? loadSprite(imagePath) : loadOpaqueImage(imagePath);
    const outputPath = `${IMAGES_DIR}/${symbol}.ts`;

    let buffer = 'import { AsciiImage} from \'@/images\';\n\n';
    buffer += `export const ${symbol}: AsciiImage = ${JSON.stringify(img, null, 2)};\n`;
    fs.writeFileSync(outputPath, buffer);
}


function compileDialog(dialogPath: string, symbol: string) {
    const dialog = loadDialogGrf(dialogPath);
    const outputPath = `${DIALOGS_DIR}/${symbol}.ts`;

    let buffer = 'import { Dialog} from \'@/dialog\';\n\n';
    buffer += `export const ${symbol}: Dialog = ${JSON.stringify(dialog, null, 2)};\n`;
    fs.writeFileSync(outputPath, buffer);
}
