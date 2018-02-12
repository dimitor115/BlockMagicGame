import EliotEngine from './EliotEngine.js';
// import which_key_pressed from './global.js'
import { handleKeyDown, handleKeyUp, handleKeyPress } from './events.js';

const engine = new EliotEngine(800, 480, 32);
engine.load_board(3, ".png");
engine.load_hero("hero.png", 40, 40, 8);
engine.load_spirit("spirit.png", 32, 40, 4);
engine.start_engine();

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
document.addEventListener('keypress', handleKeyPress);