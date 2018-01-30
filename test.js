"use strict";

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 420;
const CHUNKS_IN_X = 30;
const CHUNKS_IN_Y = 2;

const TEXTURE_PACK_SIZE =  2;
const TEXTURE_FORMAT = '.png';
const TEXTURE_PACK = new Array(TEXTURE_PACK_SIZE);

class Chunk {
    constructor(texture)
    {
        this.texture = texture;
    }
}

$(document).ready(function(){

    document.getElementById("k").innerText = "d";

    //test();

    load_textures();

    let temp = generate_background();
    //test2(temp);
    main(temp);


});


function load_textures()
{

    for(let i =0; i<TEXTURE_PACK_SIZE; i++)
    {
        let img= new Image();   // Create new img elemen
        console.log(img.src);
        TEXTURE_PACK[i] = img;
        console.log("loaded :" + i);
        img.src = 'img/' + i + TEXTURE_FORMAT;
    }
}


function generate_background(){

    let background = new Array(CHUNKS_IN_Y);

    for(let i =0; i<CHUNKS_IN_Y; i++) {

        let one_level = new Array(CHUNKS_IN_X);

        for(let j=0; j<CHUNKS_IN_X; j++)
        {
            let x = (i+1)%2===0?TEXTURE_PACK[0]:TEXTURE_PACK[1];
             one_level[j] = new Chunk(x);
        }

        background[i] = one_level;
    }

    return background;
}

function main(background){
    let canvasElement = $("<canvas width='" + CANVAS_WIDTH +
        "' height='" + CANVAS_HEIGHT + "'></canvas>");
    let canvas = canvasElement.get(0).getContext("2d");
    canvasElement.appendTo('body');

    draw();

    function draw() {

        let  y = 0;
        for(let i=0; i<CHUNKS_IN_Y; i++)
        {
            let x =0;
            for(let j=0; j<CHUNKS_IN_X; j++)
            {
                let chunk= background[i][j];
                //canvas.drawImage(chunk.texture,x,y);
                canvas.drawImage(chunk.texture,0,0,8,16,x,y,8,16);
                // canvas.fillStyle = chunk.color;
                // canvas.fillRect(x,y,16,16);

                x+=16;
            }
            y+=16;
        }

    }


}



