
import consts from './consts.js';

export function handleKeyDown(event) {

    for(let i=0; i<consts.MOVE_KEYS.length; i++)
    {
        if(consts.MOVE_KEYS[i] === event.key)
            which_key_pressed = event.key;
    }

     console.log('down : ' + event.key);
}
export function handleKeyUp(event) {
    if(event.key===which_key_pressed){
        which_key_pressed = consts.NULL_STRING;
        //console.log('up ' + event.key);
    }
}
export function handleKeyPress(event) {
    if(event.key===" ")
        space_pressed = true;
    if(event.key==="Enter")
        enter_pressed = true;
}
