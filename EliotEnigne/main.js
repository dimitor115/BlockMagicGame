"use strict";

class Chunk{
    constructor(texture,collision,x_position,y_position,size){
        this.texture = texture;
        this.collison = collision;
        this.x_position = x_position;
        this.y_position = y_position;
        this.size = size;
    }

    check_collision(point)
    {
        return (point.x > this.x_position && point.x < this.x_position+this.size) && (point.y > this.y_position && point.y < this.y_position+this.size)
    }

    change_to_background(texture)
    {
        this.texture = texture;
        this.collison=0;
    }

    // get left_up_point(){return new Point(this.x_position,this.y_position);}
    // get left_down_point(){return new Point(this.x_position,this.y_position + this.size);}
    // get right_up_point(){return new Point(this.x_position + this.size,this.y_position);}
    // get right_down_point(){return new Point(this.x_position + this.size,this.y_position + this.size);}


}


class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    get_distance(other_point){
        const a = this.x - other_point.x;
        const b = this.y - other_point.y;
        const c = a*a + b*b;
        return Math.sqrt(c);
    }
}

class EliotEngine {


    constructor(canvas_wight, canvas_height, chunk_size, texture_pack_size, texture_format) {
        this.CANVAS_WIGTH = canvas_wight;
        this.CANVAS_HEIGHT = canvas_height;
        this.CHUNK_SIZE = chunk_size;
        this.TEXTURE_PACK_SIZE = texture_pack_size;
        this.TEXTURE_FORMAT = texture_format;

        this.CHUNK_IN_Y = this.CANVAS_HEIGHT/this.CHUNK_SIZE;
        this.CHUNK_IN_X = this.CANVAS_WIGTH/this.CHUNK_SIZE;


        this.texture_pack = new Array(this.TEXTURE_PACK_SIZE);
        this.block_to_destory = new Array(0);

        let chunks_in_y = this.CANVAS_HEIGHT/chunk_size;
        this.board = new Array(chunks_in_y);

        const bg = document.getElementById("background-layer");
        this.background = bg.getContext("2d");

        const board = document.getElementById("game-layer");
        this.game = board.getContext("2d");

        this.hero = null;
        this.hero_chunk = null;
    }

    static destory_block(chunk)
    {


    }

    start_engine(){

        this.block_to_destory = new Array(0);

        this.load_textures();
        this.generate_board();
        this.draw_board();
        this.find_hero_chunk();
        this.hero.render_hero(this.game);
        this.hero_neighbourhood;
        this.main_loop();

    }

    load_hero(img,wight,height,shift)
    {
        let fire_gun = new Fire_gun('red',24);

        let image = new Image();
        image.src = 'img/'+img;
        this.hero = new hero(image,wight,height,shift,fire_gun);

    }

    main_loop(){

        let FPS = 30;
        let hero_move = () => {
            let temp = this.hero_neighbourhood;
            this.hero.move(temp);
            this.hero.check_if_fire();
            this.update_hero_chunk(temp);
        };

        let hero_render = () => {
            this.game.clearRect(0,0,this.CANVAS_WIGTH,this.CANVAS_HEIGHT);
            this.hero.render_hero(this.game);
            this.hero.update_fire_gun(this.game,this.board);;
        };

        let board = () => {
          this.update_board()
        };



        setInterval(function() {
            hero_move();
            hero_render();
            board();
        }, 1000/FPS);


    }

    update_board()
    {
        for(let i=0; i<this.block_to_destory.length; i++)
        {
            let chunk = this.block_to_destory[i];
            chunk.change_to_background(this.texture_pack[0]);
            //chunk.change_to_background(this.texture_pack[0]);
            this.draw_chunk(chunk);
        }

        this.block_to_destory = new Array(0);
    }




    update_hero_chunk(neighbourhood)
    {
        for(let i=0; i< neighbourhood.length; i++)
        {
            let chunk = neighbourhood[i].chunk;
            if (chunk.check_collision(this.hero.center_point)) {
                this.hero_chunk = {i:neighbourhood[i].i,j:neighbourhood[i].j};
                break;
            }
        }
    }

    find_hero_chunk()
    {
        for(let i=0; i<this.CHUNK_IN_Y; i++) {
            for (let j = 0; j < this.CHUNK_IN_X; j++) {
                let chunk = this.board[i][j];

                if (chunk.check_collision(this.hero.center_point)) {
                    this.hero_chunk = {i:i,j:j};
                    break;
                }

            }
        }

        console.log(this.hero.center_point.x + ", " + this.hero.center_point.y);
    }

    get hero_neighbourhood()
    {
        let neighbourhood = new Array(0);
        let i = this.hero_chunk.i-1;
        let j = this.hero_chunk.j -1; //indeksy jednego chunka po skosie w gore
        for(let m =i; m<i+3; m++)
        {
            for(let n =j; n<j+3; n++)
            {
                let temp = {chunk: this.board[m][n], i:m,j:n};
                neighbourhood.push(temp);
            }
        }
        return neighbourhood;
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

        let y_position = 0;
        for(let i =0; i<chunk_in_y; i++) {

            let one_level = new Array(chunk_in_x);
            let x_position = 0;
            for(let j=0; j<chunk_in_x; j++)
            {
                let x = map[i][j];
                let texture = this.texture_pack[x];
                one_level[j] = new Chunk(texture,x,x_position,y_position,this.CHUNK_SIZE);

                x_position+=this.CHUNK_SIZE;
            }

            this.board[i] = one_level;
            y_position+=this.CHUNK_SIZE;

        }
    }

    draw_chunk(chunk)
    {
        this.background.clearRect(chunk.x_position,chunk.y_position,this.CHUNK_SIZE,this.CHUNK_SIZE);
        this.background.drawImage(chunk.texture,chunk.x_position,chunk.y_position);
    }


    draw_board()
    {
        const chunk_in_y = this.CANVAS_HEIGHT/this.CHUNK_SIZE;
        const chunk_in_x = this.CANVAS_WIGTH/this.CHUNK_SIZE;


        for(let i=0; i<chunk_in_y; i++)
        {

            for(let j=0; j<chunk_in_x; j++)
            {
                let chunk= this.board[i][j];
                this.background.drawImage(chunk.texture,chunk.x_position,chunk.y_position);

                //this.canvas.drawImage(chunk.texture,0,0,8,16,x,y,8,16);
                // canvas.fillStyle = chunk.color;
                // canvas.fillRect(x,y,16,16);


            }

        }

    }




}