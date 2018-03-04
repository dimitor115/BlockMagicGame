import FireGun from './FireGun.js';
import Hero from './Hero.js';
import Spirits from './Spirits.js';
import GameRender from './GameRender.js';
import Chunk from './Chunk.js';
import Board from './Board.js';
import Gui from './Gui.js';

const img_path = 'assets/img/';


export default class EliotEngine {
    constructor(canvas_wight, canvas_height, chunk_size) {
        this.CANVAS_WIGTH = canvas_wight;
        this.CANVAS_HEIGHT = canvas_height;
        this.CHUNK_SIZE = chunk_size;

        this.CHUNK_IN_Y = this.CANVAS_HEIGHT/this.CHUNK_SIZE; //ile chunkow pionowo
        this.CHUNK_IN_X = this.CANVAS_WIGTH/this.CHUNK_SIZE; // ile chunków poziomo

        this.Board = null;
        this.hero = null;
        this.hero_chunk = null;

        this.game_render = new GameRender(this.CHUNK_IN_X,this.CHUNK_IN_Y);
        this.Gui = new Gui(this.CANVAS_WIGTH,this.CANVAS_HEIGHT,160);

        this.Score =0;
    }

    start_engine() {
        this.Board.draw_board();
        this.Gui.temp_start_info();
        this.game_render.render_hero(this.hero);
        this.game_render.render_spirits(this.spirits_manager.spirits);
        engine_start = true;
        this.Gui.update_score(this.Score);

    }

    load_hero(img,wight,height,shift) {
        let fire_gun = new FireGun('red',24);
        let image = new Image();
        image.src = `${img_path}${img}`;
        this.hero = new Hero(0,image,wight,height,96,96,shift,fire_gun);
    }

    load_spirit(img,width,height,shift)
    {
        let image = new Image();
        image.src = `${img_path}${img}`;
        image.onload=function () {
          console.log("loaded spritit");
        };
        this.spirits_manager = new Spirits(image,width,height,shift);
        this.spirits_manager.generate_spirits(3);
    }

    load_board(texture_pack_size,texture_format)
    {
        let texture_pack = this.load_textures(texture_pack_size,texture_format);
        let board = this.generate_board(texture_pack);

        const chunk_in_y = this.CANVAS_HEIGHT/this.CHUNK_SIZE;
        const chunk_in_x = this.CANVAS_WIGTH/this.CHUNK_SIZE;
        this.Board = new Board(board,chunk_in_x,chunk_in_y,this.CHUNK_SIZE,texture_pack);


    }

    main_loop(){

        let FPS = 45;

        let copy_table=(table)=> {
            let temp_table = [];
            for (let i=0; i<table.length; i++){
                temp_table.push(table[i]);
            }
            return temp_table;
        };
        let spirits;

        let update_spirits_array = () => {
            spirits = copy_table(this.spirits_manager.spirits);
            spirits.push(this.hero);
        };



        let put_block = (position,rotation)=>{this.Board.put_block(position,rotation);
        };

        let hero_move = () => {
            this.hero.move(this.Board.Board,spirits);
            this.hero.check_rotation();
            this.hero.check_if_fire();
            this.hero.check_if_put(put_block);


        };
        let render_bullet =(bullet)=>{this.game_render.render_bullets(bullet);};

        let destroy_block =(chunk)=>{this.Board.add_to_destroy(chunk);};



        let hero_render = () => {
            this.game_render.Action_board.clearRect(0,0,this.CANVAS_WIGTH,this.CANVAS_HEIGHT); //clear all action board CZEMU ?!
            this.game_render.render_hero(this.hero);

            this.hero.update_fire_gun(render_bullet,this.Board.Board,destroy_block,spirits);
        };

        

        let spirit = () => {
            const score_update = this.spirits_manager.update_spirits(this.Board.Board,spirits);
            this.Score+=score_update;
            if(score_update>0){ this.Gui.update_score(this.Score);}

            this.spirits_manager.fire_fireGun(render_bullet,this.Board.Board,destroy_block,spirits);
            this.game_render.render_spirits(this.spirits_manager.spirits);
        };

        let board = () => {
            this.Board.update_board()
        };

        let start_engine = () => {
            this.start_engine();
        };

        //let render =() =>{this.game_render.render_action_board()};


        setInterval(function() {

            if(loaded_img && !engine_start)
                start_engine();


            if(engine_start)
            {
                update_spirits_array();
                hero_move();

                hero_render();
                spirit();
                board();
            }
        
        }, 1000/FPS);


    }


    load_textures(texture_pack_size,texture_format)
    {
        let texture_pack = new Array(texture_pack_size);
        for(let i =0; i<texture_pack_size; i++)
        {
            let img= new Image();
            img.onload = function () {
                console.log("loaded texture nr:" + i);
                if(i===texture_pack_size-1)
                {
                    loaded_img = true;
                    console.log("loaded last img");
                }
            };

            img.src = `${img_path}${i}${texture_format}`;
            texture_pack[i] = img;
        }

        return texture_pack;
    }

    generate_map(){
        let map = new Array(this.CHUNK_IN_Y);


        for(let i=0; i<this.CHUNK_IN_Y; i++) {
            let one_level = new Array(this.CHUNK_IN_X);
            for (let j = 0; j < this.CHUNK_IN_X; j++)
            {
                if(i>this.CHUNK_IN_Y * 0.75)
                {
                    let temp = Math.floor((Math.random() * 100) + 1);
                    if(temp < 25)
                        one_level[j] = 2;
                    else
                        one_level[j] =0;
                }else
                    one_level[j] = 0;
            }
            map[i] = one_level;
        }
        return map;
    }

    generate_board(texture_pack){
        const chunk_in_y = this.CANVAS_HEIGHT/this.CHUNK_SIZE;
        const chunk_in_x = this.CANVAS_WIGTH/this.CHUNK_SIZE;
        const chunk_life_points = 5;
        const map = this.generate_map();

        let board = new Array(chunk_in_y);

        let y_position = 0;
        for(let i =0; i<chunk_in_y; i++) {

            let one_level = new Array(chunk_in_x);
            let x_position = 0;
            for(let j=0; j<chunk_in_x; j++)
            {
                let x = map[i][j];
                //let x =0;
                let texture = texture_pack[x];
                one_level[j] = new Chunk(texture,x,x_position,y_position,this.CHUNK_SIZE,chunk_life_points);

                x_position+=this.CHUNK_SIZE;
            }

            board[i] = one_level;
            y_position+=this.CHUNK_SIZE;
        }

        return board;
    }

}