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
compileOpaqueImage('asciiart/backgrounds/pub_outside.txt', 'BG_PUB_OUTSIDE');
compileOpaqueImage('asciiart/backgrounds/pub_inside.txt', 'BG_PUB_INSIDE');
compileOpaqueImage('asciiart/backgrounds/arcade.txt', 'BG_ARCADE');
compileOpaqueImage('asciiart/backgrounds/park.txt', 'BG_PARK');
compileOpaqueImage('asciiart/backgrounds/cinema.txt', 'BG_CINEMA');
compileOpaqueImage('asciiart/backgrounds/cinema_inside.txt', 'BG_CINEMA_INSIDE');
compileOpaqueImage('asciiart/backgrounds/pharmacy_background.txt', 'BG_PHARMACY');
compileSprite('asciiart/backgrounds/forge.txt', 'BG_FORGE');
compileOpaqueImage('asciiart/backgrounds/forge_wall.txt', 'BG_FORGE_WALL');
compileOpaqueImage('asciiart/backgrounds/farm_barn.txt', 'BG_FARM');
compileOpaqueImage('asciiart/backgrounds/pizzeria.txt', 'BG_PIZZERIA');
compileOpaqueImage('asciiart/backgrounds/waterfall.txt', 'BG_WATERFALL');
compileOpaqueImage('asciiart/backgrounds/jewellery_store_outside.txt', 'BG_JEWELLERY_STORE_OUTSIDE');
compileOpaqueImage('asciiart/backgrounds/jewellery_store_inside.txt', 'BG_JEWELLERY_STORE_INSIDE');
compileOpaqueImage('asciiart/backgrounds/grill.txt', 'BG_GRILL');


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

compileSprite('asciiart/sprites/lamp_off.txt', 'SPR_LAMP_OFF');
compileSprite('asciiart/sprites/lamp_on.txt', 'SPR_LAMP_ON');
compileSprite('asciiart/sprites/arcade_cabinet.txt', 'SPR_ARCADE_CABINET');
compileSprite('asciiart/sprites/arcade_sign0.txt', 'SPR_ARCADE_SIGN_0');
compileSprite('asciiart/sprites/arcade_sign1.txt', 'SPR_ARCADE_SIGN_1');
compileSprite('asciiart/sprites/arcade_table.txt', 'SPR_ARCADE_TABLE');
compileSprite('asciiart/sprites/arcade_guy0.txt', 'SPR_ARCADE_GUY_0');
compileSprite('asciiart/sprites/arcade_guy1.txt', 'SPR_ARCADE_GUY_1');
compileSprite('asciiart/sprites/arcade_guy2.txt', 'SPR_ARCADE_GUY_2');
compileSprite('asciiart/sprites/arcade_guy3.txt', 'SPR_ARCADE_GUY_3');
compileSprite('asciiart/sprites/arcade_guy4.txt', 'SPR_ARCADE_GUY_4');
compileSprite('asciiart/sprites/arcade_guy_talking.txt', 'SPR_ARCADE_GUY_TALKING');
compileSprite('asciiart/sprites/tetris_hero.txt', 'SPR_TETRIS_HERO');
compileSprite('asciiart/sprites/tetris_smashboy.txt', 'SPR_TETRIS_SMASHBOY');
compileSprite('asciiart/sprites/tetris_teewee.txt', 'SPR_TETRIS_TEEWEE');
compileSprite('asciiart/sprites/tetris_blue_ricky.txt', 'SPR_TETRIS_BLUE_RICKY');
compileSprite('asciiart/sprites/tetris_orange_ricky.txt', 'SPR_TETRIS_ORANGE_RICKY');
compileSprite('asciiart/sprites/tetris_cleveland_z.txt', 'SPR_TETRIS_CLEVELAND_Z');
compileSprite('asciiart/sprites/tetris_rhode_island_z.txt', 'SPR_TETRIS_RHODE_ISLAND_Z');

compileSprite('asciiart/sprites/pub_lamp0.txt', 'SPR_PUB_LAMP_0');
compileSprite('asciiart/sprites/pub_lamp1.txt', 'SPR_PUB_LAMP_1');
compileSprite('asciiart/sprites/pub_window_devil.txt', 'SPR_PUB_WINDOW_DEVIL');
compileSprite('asciiart/sprites/pub_window_bell.txt', 'SPR_PUB_WINDOW_BELL');
compileSprite('asciiart/sprites/biker0.txt', 'SPR_BIKER_0');
compileSprite('asciiart/sprites/biker1.txt', 'SPR_BIKER_1');
compileSprite('asciiart/sprites/biker2.txt', 'SPR_BIKER_2');
compileSprite('asciiart/sprites/biker3.txt', 'SPR_BIKER_3');
compileSprite('asciiart/sprites/biker4.txt', 'SPR_BIKER_4');
compileSprite('asciiart/sprites/biker5.txt', 'SPR_BIKER_5');
compileSprite('asciiart/sprites/biker6.txt', 'SPR_BIKER_6');
compileSprite('asciiart/sprites/biker7.txt', 'SPR_BIKER_7');
compileSprite('asciiart/sprites/biker_talking0.txt', 'SPR_BIKER_TALKING_0');
compileSprite('asciiart/sprites/biker_talking1.txt', 'SPR_BIKER_TALKING_1');
compileSprite('asciiart/sprites/biker_talking2.txt', 'SPR_BIKER_TALKING_2');

compileSprite('asciiart/sprites/fountain0.txt', 'SPR_FOUNTAIN_0');
compileSprite('asciiart/sprites/fountain1.txt', 'SPR_FOUNTAIN_1');
compileSprite('asciiart/sprites/girl_jumping_rope0.txt', 'SPR_GIRL_JUMPING_ROPE_0');
compileSprite('asciiart/sprites/girl_jumping_rope1.txt', 'SPR_GIRL_JUMPING_ROPE_1');
compileSprite('asciiart/sprites/girl_jumping_rope2.txt', 'SPR_GIRL_JUMPING_ROPE_2');
compileSprite('asciiart/sprites/girl_jumping_rope3.txt', 'SPR_GIRL_JUMPING_ROPE_3');
compileSprite('asciiart/sprites/girl_still0.txt', 'SPR_GIRL_STILL_0');
compileSprite('asciiart/sprites/girl_talking0.txt', 'SPR_GIRL_TALKING_0');
compileSprite('asciiart/sprites/girl_talking1.txt', 'SPR_GIRL_TALKING_1');
compileSprite('asciiart/sprites/robot0.txt', 'SPR_ROBOT_0');
compileSprite('asciiart/sprites/robot1.txt', 'SPR_ROBOT_1');
compileSprite('asciiart/sprites/robot_talking0.txt', 'SPR_ROBOT_TALKING_0');
compileSprite('asciiart/sprites/robot_talking1.txt', 'SPR_ROBOT_TALKING_1');
compileSprite('asciiart/sprites/tree.txt', 'SPR_TREE');
compileSprite('asciiart/sprites/seesaw.txt', 'SPR_SEESAW');

compileSprite('asciiart/sprites/cinema_sign0.txt', 'SPR_CINEMA_SIGN_0');
compileSprite('asciiart/sprites/cinema_sign1.txt', 'SPR_CINEMA_SIGN_1');
compileSprite('asciiart/sprites/cinema_sign2.txt', 'SPR_CINEMA_SIGN_2');
compileSprite('asciiart/sprites/cinema_cashier0.txt', 'SPR_CINEMA_CASHIER_0');
compileSprite('asciiart/sprites/cinema_cashier1.txt', 'SPR_CINEMA_CASHIER_1');
compileSprite('asciiart/sprites/cinema_cashier2.txt', 'SPR_CINEMA_CASHIER_2');
compileSprite('asciiart/sprites/cinema_cashier_talking0.txt', 'SPR_CINEMA_CASHIER_TALKING_0');
compileSprite('asciiart/sprites/cinema_cashier_talking1.txt', 'SPR_CINEMA_CASHIER_TALKING_1');
compileSprite('asciiart/sprites/cinema_cashier_talking2.txt', 'SPR_CINEMA_CASHIER_TALKING_2');

compileOpaqueImage('asciiart/sprites/poster_yoda.txt', 'SPR_POSTER_YODA');
compileOpaqueImage('asciiart/sprites/poster_freddie.txt', 'SPR_POSTER_FREDDIE');
compileOpaqueImage('asciiart/sprites/poster_robin_hood.txt', 'SPR_POSTER_ROBIN_HOOD');
compileOpaqueImage('asciiart/sprites/poster_jaws.txt', 'SPR_POSTER_JAWS');
compileSprite('asciiart/sprites/popcorn_0.txt', 'SPR_POPCORN_0');
compileSprite('asciiart/sprites/popcorn_1.txt', 'SPR_POPCORN_1');
compileSprite('asciiart/sprites/popcorn_2.txt', 'SPR_POPCORN_2');
compileSprite('asciiart/sprites/popcorn_3.txt', 'SPR_POPCORN_3');
compileSprite('asciiart/sprites/popcorn_4.txt', 'SPR_POPCORN_4');
compileSprite('asciiart/sprites/popcorn_5.txt', 'SPR_POPCORN_5');
compileSprite('asciiart/sprites/popcorn_6.txt', 'SPR_POPCORN_6');
compileSprite('asciiart/sprites/popcorn_7.txt', 'SPR_POPCORN_7');
compileSprite('asciiart/sprites/popcorn_8.txt', 'SPR_POPCORN_8');
compileSprite('asciiart/sprites/popcorn_9.txt', 'SPR_POPCORN_9');
compileSprite('asciiart/sprites/popcorn_10.txt', 'SPR_POPCORN_10');
compileSprite('asciiart/sprites/popcorn_11.txt', 'SPR_POPCORN_11');
compileSprite('asciiart/sprites/popcorn_12.txt', 'SPR_POPCORN_12');
compileSprite('asciiart/sprites/popcorn_13.txt', 'SPR_POPCORN_13');

compileSprite('asciiart/sprites/pool_table.txt', 'SPR_POOL_TABLE');
compileSprite('asciiart/sprites/bartender0.txt', 'SPR_BARTENDER_0');
compileSprite('asciiart/sprites/bartender1.txt', 'SPR_BARTENDER_1');
compileSprite('asciiart/sprites/bartender_wiping0.txt', 'SPR_BARTENDER_WIPING_0');
compileSprite('asciiart/sprites/bartender_wiping1.txt', 'SPR_BARTENDER_WIPING_1');
compileSprite('asciiart/sprites/bartender_wiping2.txt', 'SPR_BARTENDER_WIPING_2');
compileSprite('asciiart/sprites/bartender_wiping3.txt', 'SPR_BARTENDER_WIPING_3');
compileSprite('asciiart/sprites/bartender_wiping4.txt', 'SPR_BARTENDER_WIPING_4');
compileSprite('asciiart/sprites/bartender_wiping5.txt', 'SPR_BARTENDER_WIPING_5');
compileSprite('asciiart/sprites/bartender_wiping6.txt', 'SPR_BARTENDER_WIPING_6');
compileSprite('asciiart/sprites/bartender_talking0.txt', 'SPR_BARTENDER_TALKING_0');
compileSprite('asciiart/sprites/bartender_talking1.txt', 'SPR_BARTENDER_TALKING_1');
compileSprite('asciiart/sprites/bartender_talking2.txt', 'SPR_BARTENDER_TALKING_2');
compileSprite('asciiart/sprites/brian0.txt', 'SPR_BRIAN_0');
compileSprite('asciiart/sprites/brian1.txt', 'SPR_BRIAN_1');
compileSprite('asciiart/sprites/brian_talking0.txt', 'SPR_BRIAN_TALKING_0');
compileSprite('asciiart/sprites/brian_talking1.txt', 'SPR_BRIAN_TALKING_1');
compileSprite('asciiart/sprites/brian_talking2.txt', 'SPR_BRIAN_TALKING_2');
compileSprite('asciiart/sprites/evil_queen0.txt', 'SPR_EVIL_QUEEN_0');
compileSprite('asciiart/sprites/evil_queen1.txt', 'SPR_EVIL_QUEEN_1');
compileSprite('asciiart/sprites/evil_queen2.txt', 'SPR_EVIL_QUEEN_2');
compileSprite('asciiart/sprites/evil_queen3.txt', 'SPR_EVIL_QUEEN_3');

compileOpaqueImage('asciiart/sprites/ice_cream0.txt', 'SPR_ICE_CREAM_0');
compileOpaqueImage('asciiart/sprites/ice_cream1.txt', 'SPR_ICE_CREAM_1');
compileOpaqueImage('asciiart/sprites/ice_cream2.txt', 'SPR_ICE_CREAM_2');
compileOpaqueImage('asciiart/sprites/ice_cream3.txt', 'SPR_ICE_CREAM_3');
compileOpaqueImage('asciiart/sprites/ice_cream4.txt', 'SPR_ICE_CREAM_4');
compileOpaqueImage('asciiart/sprites/ice_cream5.txt', 'SPR_ICE_CREAM_5');
compileOpaqueImage('asciiart/sprites/ice_cream6.txt', 'SPR_ICE_CREAM_6');
compileOpaqueImage('asciiart/sprites/ice_cream7.txt', 'SPR_ICE_CREAM_7');
compileOpaqueImage('asciiart/sprites/ice_cream8.txt', 'SPR_ICE_CREAM_8');
compileOpaqueImage('asciiart/sprites/ice_cream9.txt', 'SPR_ICE_CREAM_9');
compileOpaqueImage('asciiart/sprites/ice_cream10.txt', 'SPR_ICE_CREAM_10');
compileSprite('asciiart/sprites/alfredo0.txt', 'SPR_ALFREDO_0');
compileSprite('asciiart/sprites/alfredo1.txt', 'SPR_ALFREDO_1');
compileSprite('asciiart/sprites/alfredo2.txt', 'SPR_ALFREDO_2');
compileSprite('asciiart/sprites/alfredo3.txt', 'SPR_ALFREDO_3');
compileSprite('asciiart/sprites/alfredo_talking0.txt', 'SPR_ALFREDO_TALKING_0');
compileSprite('asciiart/sprites/alfredo_talking1.txt', 'SPR_ALFREDO_TALKING_1');
compileSprite('asciiart/sprites/alfredo_talking2.txt', 'SPR_ALFREDO_TALKING_2');

compileSprite('asciiart/sprites/pharmacy_foreground.txt', 'SPR_PHARMACY_FOREGROUND');
compileSprite('asciiart/sprites/pharmacist0.txt', 'SPR_PHARMACIST_0');
compileSprite('asciiart/sprites/pharmacist1.txt', 'SPR_PHARMACIST_1');
compileSprite('asciiart/sprites/pharmacist_talking0.txt', 'SPR_PHARMACIST_TALKING_0');
compileSprite('asciiart/sprites/pharmacist_talking1.txt', 'SPR_PHARMACIST_TALKING_1');
compileSprite('asciiart/sprites/pharmacist_talking2.txt', 'SPR_PHARMACIST_TALKING_2');
compileSprite('asciiart/sprites/pharmacy_sign0.txt', 'SPR_PHARMACY_SIGN_0');
compileSprite('asciiart/sprites/pharmacy_sign1.txt', 'SPR_PHARMACY_SIGN_1');
compileSprite('asciiart/sprites/pharmacy_sign2.txt', 'SPR_PHARMACY_SIGN_2');
compileSprite('asciiart/sprites/pharmacy_sign3.txt', 'SPR_PHARMACY_SIGN_3');
compileSprite('asciiart/sprites/pharmacy_sign4.txt', 'SPR_PHARMACY_SIGN_4');
compileSprite('asciiart/sprites/pharmacy_sign5.txt', 'SPR_PHARMACY_SIGN_5');
compileSprite('asciiart/sprites/pharmacy_sign6.txt', 'SPR_PHARMACY_SIGN_6');
compileSprite('asciiart/sprites/pharmacy_sign7.txt', 'SPR_PHARMACY_SIGN_7');
compileSprite('asciiart/sprites/pharmacy_book_group0.txt', 'SPR_PHARMACY_BOOK_GROUP_0');
compileSprite('asciiart/sprites/pharmacy_book_group1.txt', 'SPR_PHARMACY_BOOK_GROUP_1');
compileSprite('asciiart/sprites/pharmacy_book0.txt', 'SPR_PHARMACY_BOOK_0');
compileSprite('asciiart/sprites/pharmacy_book1.txt', 'SPR_PHARMACY_BOOK_1');
compileSprite('asciiart/sprites/pharmacy_book2.txt', 'SPR_PHARMACY_BOOK_2');
compileSprite('asciiart/sprites/pharmacy_book3.txt', 'SPR_PHARMACY_BOOK_3');
compileSprite('asciiart/sprites/pharmacy_book4.txt', 'SPR_PHARMACY_BOOK_4');
compileSprite('asciiart/sprites/pharmacy_book5.txt', 'SPR_PHARMACY_BOOK_5');
compileSprite('asciiart/sprites/pharmacy_pot0.txt', 'SPR_PHARMACY_POT_0');
compileSprite('asciiart/sprites/pharmacy_pot1.txt', 'SPR_PHARMACY_POT_1');
compileSprite('asciiart/sprites/pharmacy_pot2.txt', 'SPR_PHARMACY_POT_2');
compileSprite('asciiart/sprites/pharmacy_pot3.txt', 'SPR_PHARMACY_POT_3');
compileSprite('asciiart/sprites/pharmacy_pot4.txt', 'SPR_PHARMACY_POT_4');
compileSprite('asciiart/sprites/pharmacy_pot5.txt', 'SPR_PHARMACY_POT_5');
compileSprite('asciiart/sprites/pharmacy_pot6.txt', 'SPR_PHARMACY_POT_6');
compileSprite('asciiart/sprites/pharmacy_pot7.txt', 'SPR_PHARMACY_POT_7');
compileSprite('asciiart/sprites/pharmacy_pot8.txt', 'SPR_PHARMACY_POT_8');
compileSprite('asciiart/sprites/pharmacy_pot9.txt', 'SPR_PHARMACY_POT_9');

compileSprite('asciiart/sprites/fire0.txt', 'SPR_FIRE_0');
compileSprite('asciiart/sprites/fire1.txt', 'SPR_FIRE_1');
compileSprite('asciiart/sprites/fire2.txt', 'SPR_FIRE_2');
compileSprite('asciiart/sprites/fire3.txt', 'SPR_FIRE_3');
compileSprite('asciiart/sprites/fire4.txt', 'SPR_FIRE_4');
compileSprite('asciiart/sprites/fire5.txt', 'SPR_FIRE_5');
compileSprite('asciiart/sprites/fire6.txt', 'SPR_FIRE_6');
compileSprite('asciiart/sprites/bellows0.txt', 'SPR_BELLOWS_0');
compileSprite('asciiart/sprites/bellows1.txt', 'SPR_BELLOWS_1');
compileSprite('asciiart/sprites/bellows2.txt', 'SPR_BELLOWS_2');
compileSprite('asciiart/sprites/wall_candles0.txt', 'SPR_WALL_CANDLES_0');
compileSprite('asciiart/sprites/wall_candles1.txt', 'SPR_WALL_CANDLES_1');
compileSprite('asciiart/sprites/barrel.txt', 'SPR_BARREL');
compileSprite('asciiart/sprites/blacksmith_left0.txt', 'SPR_BLACKSMITH_LEFT_0');
compileSprite('asciiart/sprites/blacksmith_left1.txt', 'SPR_BLACKSMITH_LEFT_1');
compileSprite('asciiart/sprites/blacksmith_right0.txt', 'SPR_BLACKSMITH_RIGHT_0');
compileSprite('asciiart/sprites/blacksmith_talking0.txt', 'SPR_BLACKSMITH_TALKING_0');
compileSprite('asciiart/sprites/blacksmith_talking1.txt', 'SPR_BLACKSMITH_TALKING_1');
compileSprite('asciiart/sprites/blacksmith_talking2.txt', 'SPR_BLACKSMITH_TALKING_2');
compileOpaqueImage('asciiart/sprites/forge_window.txt', 'SPR_FORGE_WINDOW');

compileSprite('asciiart/sprites/well.txt', 'SPR_WELL');
compileSprite('asciiart/sprites/farm_barrier.txt', 'SPR_FARM_BARRIER');
compileSprite('asciiart/sprites/vegetable_garden.txt', 'SPR_VEGETABLE_GARDEN');
compileSprite('asciiart/sprites/goat0.txt', 'SPR_GOAT_0');
compileSprite('asciiart/sprites/goat1.txt', 'SPR_GOAT_1');
compileSprite('asciiart/sprites/pig0.txt', 'SPR_PIG_0');
compileSprite('asciiart/sprites/pig1.txt', 'SPR_PIG_1');
compileSprite('asciiart/sprites/worm0.txt', 'SPR_WORM_0');
compileSprite('asciiart/sprites/worm1.txt', 'SPR_WORM_1');
compileSprite('asciiart/sprites/tractor.txt', 'SPR_TRACTOR');
compileSprite('asciiart/sprites/farmer0.txt', 'SPR_FARMER_0');
compileSprite('asciiart/sprites/farmer1.txt', 'SPR_FARMER_1');
compileSprite('asciiart/sprites/farmer2.txt', 'SPR_FARMER_2');
compileSprite('asciiart/sprites/farmer_talking0.txt', 'SPR_FARMER_TALKING_0');
compileSprite('asciiart/sprites/farmer_talking1.txt', 'SPR_FARMER_TALKING_1');
compileSprite('asciiart/sprites/farmer_talking2.txt', 'SPR_FARMER_TALKING_2');

compileSprite('asciiart/sprites/pizzaiolo0.txt', 'SPR_PIZZAIOLO_0');
compileSprite('asciiart/sprites/pizzaiolo1.txt', 'SPR_PIZZAIOLO_1');
compileSprite('asciiart/sprites/pizzaiolo2.txt', 'SPR_PIZZAIOLO_2');
compileSprite('asciiart/sprites/pizzaiolo3.txt', 'SPR_PIZZAIOLO_3');
compileSprite('asciiart/sprites/pizzaiolo4.txt', 'SPR_PIZZAIOLO_4');
compileSprite('asciiart/sprites/pizzaiolo5.txt', 'SPR_PIZZAIOLO_5');
compileSprite('asciiart/sprites/pizzaiolo6.txt', 'SPR_PIZZAIOLO_6');
compileSprite('asciiart/sprites/pizzaiolo7.txt', 'SPR_PIZZAIOLO_7');
compileSprite('asciiart/sprites/pizzaiolo8.txt', 'SPR_PIZZAIOLO_8');
compileSprite('asciiart/sprites/pizzaiolo9.txt', 'SPR_PIZZAIOLO_9');
compileSprite('asciiart/sprites/pizzaiolo10.txt', 'SPR_PIZZAIOLO_10');
compileSprite('asciiart/sprites/pizzaiolo11.txt', 'SPR_PIZZAIOLO_11');
compileSprite('asciiart/sprites/pizzaiolo12.txt', 'SPR_PIZZAIOLO_12');
compileSprite('asciiart/sprites/pizzaiolo13.txt', 'SPR_PIZZAIOLO_13');
compileSprite('asciiart/sprites/pizzaiolo14.txt', 'SPR_PIZZAIOLO_14');
compileSprite('asciiart/sprites/pizzaiolo15.txt', 'SPR_PIZZAIOLO_15');
compileSprite('asciiart/sprites/pizzaiolo16.txt', 'SPR_PIZZAIOLO_16');
compileSprite('asciiart/sprites/pizzaiolo17.txt', 'SPR_PIZZAIOLO_17');
compileSprite('asciiart/sprites/pizza_oven0.txt', 'SPR_PIZZA_OVEN_0');
compileSprite('asciiart/sprites/pizza_oven1.txt', 'SPR_PIZZA_OVEN_1');
compileSprite('asciiart/sprites/oven_peel.txt', 'SPR_OVEN_PEEL');
compileSprite('asciiart/sprites/gondola.txt', 'SPR_GONDOLA');
compileSprite('asciiart/sprites/pizzeria_table0.txt', 'SPR_PIZZERIA_TABLE_0');
compileSprite('asciiart/sprites/pizzeria_table1.txt', 'SPR_PIZZERIA_TABLE_1');
compileSprite('asciiart/sprites/don_aldo0.txt', 'SPR_DON_ALDO_0');
compileSprite('asciiart/sprites/don_aldo1.txt', 'SPR_DON_ALDO_1');
compileSprite('asciiart/sprites/don_aldo2.txt', 'SPR_DON_ALDO_2');
compileSprite('asciiart/sprites/don_aldo_talking0.txt', 'SPR_DON_ALDO_TALKING_0');
compileSprite('asciiart/sprites/don_aldo_talking1.txt', 'SPR_DON_ALDO_TALKING_1');
compileSprite('asciiart/sprites/don_aldo_talking2.txt', 'SPR_DON_ALDO_TALKING_2');

compileOpaqueImage('asciiart/sprites/waterfall0.txt', 'SPR_WATERFALL_0');
compileOpaqueImage('asciiart/sprites/waterfall1.txt', 'SPR_WATERFALL_1');
compileOpaqueImage('asciiart/sprites/waterfall2.txt', 'SPR_WATERFALL_2');
compileSprite('asciiart/sprites/lake0.txt', 'SPR_LAKE_0');
compileSprite('asciiart/sprites/lake1.txt', 'SPR_LAKE_1');
compileSprite('asciiart/sprites/lake2.txt', 'SPR_LAKE_2');
compileSprite('asciiart/sprites/lake3.txt', 'SPR_LAKE_3');
compileSprite('asciiart/sprites/lake4.txt', 'SPR_LAKE_4');
compileSprite('asciiart/sprites/lake5.txt', 'SPR_LAKE_5');
compileSprite('asciiart/sprites/lake6.txt', 'SPR_LAKE_6');
compileSprite('asciiart/sprites/lake7.txt', 'SPR_LAKE_7');
compileSprite('asciiart/sprites/lake8.txt', 'SPR_LAKE_8');
compileSprite('asciiart/sprites/lake9.txt', 'SPR_LAKE_9');
compileSprite('asciiart/sprites/lake10.txt', 'SPR_LAKE_10');
compileSprite('asciiart/sprites/fly0.txt', 'SPR_FLY_0');
compileSprite('asciiart/sprites/fly1.txt', 'SPR_FLY_1');
compileSprite('asciiart/sprites/fly2.txt', 'SPR_FLY_2');
compileSprite('asciiart/sprites/fly3.txt', 'SPR_FLY_3');
compileSprite('asciiart/sprites/chinese_master0.txt', 'SPR_CHINESE_MASTER_0');
compileSprite('asciiart/sprites/chinese_master1.txt', 'SPR_CHINESE_MASTER_1');
compileSprite('asciiart/sprites/chinese_master_talking0.txt', 'SPR_CHINESE_MASTER_TALKING_0');
compileSprite('asciiart/sprites/chinese_master_talking1.txt', 'SPR_CHINESE_MASTER_TALKING_1');
compileSprite('asciiart/sprites/chinese_master_talking2.txt', 'SPR_CHINESE_MASTER_TALKING_2');
compileSprite('asciiart/sprites/chinese_master_not_talking.txt', 'SPR_CHINESE_MASTER_NOT_TALKING');
compileSprite('asciiart/sprites/bonsai.txt', 'SPR_BONSAI');

compileOpaqueImage('asciiart/sprites/jewellery_ring_sign.txt', 'SPR_JEWELLERY_RING_SIGN');
compileSprite('asciiart/sprites/jewellery_sign.txt', 'SPR_JEWELLERY_SIGN');
compileSprite('asciiart/sprites/suv0.txt', 'SPR_SUV_0');
compileSprite('asciiart/sprites/fire_hydrant0.txt', 'SPR_FIRE_HYDRANT_0');
compileOpaqueImage('asciiart/sprites/sewer_hole.txt', 'SPR_SEWER_HOLE');
compileOpaqueImage('asciiart/sprites/street_water0.txt', 'SPR_STREET_WATER_0');
compileOpaqueImage('asciiart/sprites/street_water1.txt', 'SPR_STREET_WATER_1');
compileOpaqueImage('asciiart/sprites/street_water2.txt', 'SPR_STREET_WATER_2');
compileOpaqueImage('asciiart/sprites/boat0.txt', 'SPR_BOAT_0');

compileSprite('asciiart/sprites/jeweller0.txt', 'SPR_JEWELLER_0');
compileSprite('asciiart/sprites/jeweller1.txt', 'SPR_JEWELLER_1');
compileSprite('asciiart/sprites/jeweller2.txt', 'SPR_JEWELLER_2');
compileSprite('asciiart/sprites/jeweller3.txt', 'SPR_JEWELLER_3');
compileSprite('asciiart/sprites/jeweller4.txt', 'SPR_JEWELLER_4');
compileSprite('asciiart/sprites/jeweller5.txt', 'SPR_JEWELLER_5');
compileSprite('asciiart/sprites/jeweller6.txt', 'SPR_JEWELLER_6');
compileSprite('asciiart/sprites/jeweller7.txt', 'SPR_JEWELLER_7');
compileSprite('asciiart/sprites/jeweller_talking0.txt', 'SPR_JEWELLER_TALKING_0');
compileSprite('asciiart/sprites/jeweller_talking1.txt', 'SPR_JEWELLER_TALKING_1');
compileSprite('asciiart/sprites/jeweller_talking2.txt', 'SPR_JEWELLER_TALKING_2');
compileSprite('asciiart/sprites/jewellery_pillar.txt', 'SPR_JEWELLERY_PILLAR');
compileSprite('asciiart/sprites/necklace0.txt', 'SPR_NECKLACE_0');
compileSprite('asciiart/sprites/necklace1.txt', 'SPR_NECKLACE_1');
compileSprite('asciiart/sprites/necklace2.txt', 'SPR_NECKLACE_2');
compileSprite('asciiart/sprites/necklace3.txt', 'SPR_NECKLACE_3');
compileSprite('asciiart/sprites/necklace4.txt', 'SPR_NECKLACE_4');
compileSprite('asciiart/sprites/ring_vitrine.txt', 'SPR_RING_VITRINE');
compileOpaqueImage('asciiart/sprites/ring.txt', 'SPR_RING');

compileSprite('asciiart/sprites/barbecue0.txt', 'SPR_BARBECUE_0');
compileSprite('asciiart/sprites/barbecue1.txt', 'SPR_BARBECUE_1');
compileSprite('asciiart/sprites/cook0.txt', 'SPR_COOK_0');
compileSprite('asciiart/sprites/cook1.txt', 'SPR_COOK_1');
compileSprite('asciiart/sprites/cook_not_talking.txt', 'SPR_COOK_NOT_TALKING');
compileSprite('asciiart/sprites/cook_talking0.txt', 'SPR_COOK_TALKING_0');
compileSprite('asciiart/sprites/cook_talking1.txt', 'SPR_COOK_TALKING_1');
compileSprite('asciiart/sprites/cook_talking2.txt', 'SPR_COOK_TALKING_2');
compileSprite('asciiart/sprites/sumo0.txt', 'SPR_SUMO_0');
compileSprite('asciiart/sprites/sumo1.txt', 'SPR_SUMO_1');
compileSprite('asciiart/sprites/sumo_talking0.txt', 'SPR_SUMO_TALKING_0');
compileSprite('asciiart/sprites/sumo_talking1.txt', 'SPR_SUMO_TALKING_1');
compileSprite('asciiart/sprites/sumo_talking2.txt', 'SPR_SUMO_TALKING_2');
compileOpaqueImage('asciiart/sprites/waves0.txt', 'SPR_WAVES_0');
compileOpaqueImage('asciiart/sprites/waves1.txt', 'SPR_WAVES_1');
compileOpaqueImage('asciiart/sprites/waves2.txt', 'SPR_WAVES_2');
compileOpaqueImage('asciiart/sprites/waves3.txt', 'SPR_WAVES_3');
compileOpaqueImage('asciiart/sprites/waves4.txt', 'SPR_WAVES_4');

//--------------------------------------------------------------------------

compileDialog('dialogs/dog.grf', 'DIALOG_DOG');
compileDialog('dialogs/highlander.grf', 'DIALOG_HIGHLANDER');
compileDialog('dialogs/trying_to_take_net.grf', 'DIALOG_TRYING_TO_TAKE_NET');
compileDialog('dialogs/arcade_guy.grf', 'DIALOG_ARCADE_GUY');
compileDialog('dialogs/biker.grf', 'DIALOG_BIKER');
compileDialog('dialogs/little_girl.grf', 'DIALOG_LITTLE_GIRL');
compileDialog('dialogs/robot.grf', 'DIALOG_ROBOT');
compileDialog('dialogs/cinema_cashier.grf', 'DIALOG_CINEMA_CASHIER');
compileDialog('dialogs/bartender.grf', 'DIALOG_BARTENDER');
compileDialog('dialogs/brian.grf', 'DIALOG_BRIAN');
compileDialog('dialogs/evil_queen.grf', 'DIALOG_EVIL_QUEEN');
compileDialog('dialogs/alfredo.grf', 'DIALOG_ALFREDO');
compileDialog('dialogs/pharmacist.grf', 'DIALOG_PHARMACIST');
compileDialog('dialogs/blacksmith.grf', 'DIALOG_BLACKSMITH');
compileDialog('dialogs/farmer.grf', 'DIALOG_FARMER');
compileDialog('dialogs/don_aldo.grf', 'DIALOG_DON_ALDO');
compileDialog('dialogs/chinese_master.grf', 'DIALOG_CHINESE_MASTER');
compileDialog('dialogs/jeweller.grf', 'DIALOG_JEWELLER');
compileDialog('dialogs/cook.grf', 'DIALOG_COOK');
compileDialog('dialogs/sumo.grf', 'DIALOG_SUMO');


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
