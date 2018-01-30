"use strict";

class Chunk{
    constructor(texture,collision){
        this.texture = texture;
        this.collison = collision;
    }
}

class EliotEngine {

    constructor(canvas_wight, canvas_height, chunk_size, texture_pack_size, texture_format) {
        this.CANVAS_WIGTH = canvas_wight;
        this.CANVAS_HEIGHT = canvas_height;
        this.CHUNK_SIZE = chunk_size;
        this.TEXTURE_PACK_SIZE = texture_pack_size;
        this.TEXTURE_FORMAT = texture_format;

        this.texture_pack = new Array(this.TEXTURE_PACK_SIZE);

        let chunks_in_y = this.CANVAS_HEIGHT/chunk_size;
        this.board = new Array(chunks_in_y);

        const canv = document.getElementById("my_canvas");
        this.canvas = canv.getContext("2d");
    }

    start_engine(){
        this.load_textures();
        this.generate_board();
        this.draw_board()

    }

    load_textures()
    {
        for(let i =0; i<this.TEXTURE_PACK_SIZE; i++)
        {
            let img= new Image();   // Create new img elemen
            console.log(img.src);
            this.texture_pack[i] = img;
            console.log("loaded :" + i);
            img.src = 'img/' + i + this.TEXTURE_FORMAT;
        }
    }

    generate_board(){
        const chunk_in_y = this.CANVAS_HEIGHT/this.CHUNK_SIZE;
        const chunk_in_x = this.CANVAS_WIGTH/this.CHUNK_SIZE;

        for(let i =0; i<chunk_in_y; i++) {

            let one_level = new Array(chunk_in_x);

            for(let j=0; j<chunk_in_x; j++)
            {
                let x = (i+j)%2===0?this.texture_pack[0]:this.texture_pack[1];
                one_level[j] = new Chunk(x);
            }

            this.board[i] = one_level;
        }
    }


    draw_board()
    {
        const chunk_in_y = this.CANVAS_HEIGHT/this.CHUNK_SIZE;
        const chunk_in_x = this.CANVAS_WIGTH/this.CHUNK_SIZE;

        let  y = 0;
        for(let i=0; i<chunk_in_y; i++)
        {
            let x =0;
            for(let j=0; j<chunk_in_x; j++)
            {
                let chunk= this.board[i][j];
                this.canvas.drawImage(chunk.texture,x,y);
                //this.canvas.drawImage(chunk.texture,0,0,8,16,x,y,8,16);
                // canvas.fillStyle = chunk.color;
                // canvas.fillRect(x,y,16,16);

                x+=16;
            }
            y+=16;
        }

    }


}