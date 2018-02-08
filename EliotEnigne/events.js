
document.addEventListener('keydown', (event) => {

    for(let i=0; i<wsad.length; i++)
    {
        if(wsad[i]===event.key)
            which_key_pressed = event.key;
    }

     console.log('down : ' + which_key_pressed);
});

document.addEventListener('keyup', (event) => {
    if(event.key===which_key_pressed){
        which_key_pressed = NULL_STRING;
        //console.log('up ' + event.key);

    }
});

document.addEventListener('keypress', (event)=>{

    if(event.key===" ")
        space_pressed = true;

});