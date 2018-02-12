const NULL_STRING =  'null';

let which_key_pressed = NULL_STRING;

let space_pressed = false;
let enter_pressed = false;
import FireGunt from 'FireGun';

export default class EliotEngine {
    constructor(canvas_wight, canvas_height, chunk_size) {
        this.CANVAS_WIGTH = canvas_wight;
        this.CANVAS_HEIGHT = canvas_height;
        this.CHUNK_SIZE = chunk_size;

        this.CHUNK_IN_Y = this.CANVAS_HEIGHT/this.CHUNK_SIZE;
        this.CHUNK_IN_X = this.CANVAS_WIGTH/this.CHUNK_SIZE;


        this.Board = null;
        this.hero = null;
        this.hero_chunk = null;

        this.Game_render = new Game_render(this.CHUNK_IN_X,this.CHUNK_IN_Y);
    }

    start_engine() {
        this.Board.draw_board();
        //this.find_hero_chunk();
        this.Game_render.render_hero(this.hero);
        this.Game_render.render_spirits(this.spirits_manager.spirits);
        //this.hero_neighbourhood;
        this.main_loop();

    }

    load_hero(img,wight,height,shift) {
        let fire_gun = new FireGun('red',24);
        let image = new Image();
        image.src = 'img/'+img;
        this.hero = new Hero(image,wight,height,shift,fire_gun);

    }

    load_spirit(img,width,height,shift)
    {
        let image = new Image();
        image.src = 'img/'+img;
        this.spirits_manager = new Spirits(image,width,height,shift);
        this.spirits_manager.generate_spirits(1);
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

        let put_block = (position)=>{this.Board.put_block(position);
        };

        let hero_move = () => {
            this.hero.move(this.Board.Board);
            this.hero.check_if_fire();
            this.hero.check_if_put(put_block)

        };
        let render_bullet =(bullet)=>{this.Game_render.render_bullets(bullet);};
        let destroy_block =(chunk)=>{this.Board.add_to_destroy(chunk)};

        let hero_render = () => {
            this.Game_render.Action_board.clearRect(0,0,this.CANVAS_WIGTH,this.CANVAS_HEIGHT); //clear all action board CZEMU ?!
            this.Game_render.render_hero(this.hero);
            this.hero.update_fire_gun(render_bullet,this.Board.Board,destroy_block);
        };

        let spirit = () => {
            this.Game_render.render_spirits(this.spirits_manager.spirits);

        };

        let board = () => {
            this.Board.update_board()
        };

        //let render =() =>{this.Game_render.render_action_board()};



        setInterval(function() {
            hero_move();
            hero_render();
            spirit();
            board();
        }, 1000/FPS);


    }


    load_textures(texture_pack_size,texture_format)
    {
        let texture_pack = new Array(texture_pack_size);
        for(let i =0; i<texture_pack_size; i++)
        {
            let img= new Image();
            console.log(img.src);
            texture_pack[i] = img;
            console.log("loaded texture nr:" + i);
            img.src = 'img/' + i + texture_format;
        }

        return texture_pack;
    }

    generate_board(texture_pack){
        const chunk_in_y = this.CANVAS_HEIGHT/this.CHUNK_SIZE;
        const chunk_in_x = this.CANVAS_WIGTH/this.CHUNK_SIZE;
        let board = new Array(chunk_in_y);

        let y_position = 0;
        for(let i =0; i<chunk_in_y; i++) {

            let one_level = new Array(chunk_in_x);
            let x_position = 0;
            for(let j=0; j<chunk_in_x; j++)
            {
                let x = map[i][j];
                let texture = texture_pack[x];
                one_level[j] = new Chunk(texture,x,x_position,y_position,this.CHUNK_SIZE);

                x_position+=this.CHUNK_SIZE;
            }

            board[i] = one_level;
            y_position+=this.CHUNK_SIZE;
        }

        return board;
    }


    //BORDER !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

}