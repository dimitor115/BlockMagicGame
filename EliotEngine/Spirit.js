import Hero from './Hero.js';
import consts from "./consts.js";

export default class Spirit extends Hero {
    constructor(texture,hero_wight,hero_height,x_position,y_position,shift_quantity,fire_gun,life_points)
    {
        super(texture,hero_wight,hero_height,x_position,y_position,shift_quantity,fire_gun,life_points);
        this.journey_lenght =0;

        this.rotation = consts.DOWN_ROTATION;
    }

    check_if_fire()
    {
        const FIRE_PROBABILITY = 2;
        let fire = Math.floor((Math.random() * 100) + 1);

        if(fire < FIRE_PROBABILITY)
            this.fire_gun.fire_bullet(this.actual_top_position,this.rotation);
    }

    move(board,spirits){
        let temp_x_position = this.x_position;
        let temp_y_position = this.y_position;


        if(this.journey_lenght<=0)
        {
            let move = Math.floor((Math.random() * 100) + 1);
            this.journey_lenght = Math.floor((Math.random() * 60) + 10);
            if(move<35)
            {
                this.direction = {x:+this.shift_quantity,y:-this.shift_quantity};
            }
            else if(move < 70)
            {
                this.direction = {x:-this.shift_quantity,y:-this.shift_quantity};

            }
            else if(move < 85)
            {
                this.direction = {x:-this.shift_quantity,y:this.shift_quantity};

            }
            else
                this.direction = {x:this.shift_quantity,y:this.shift_quantity};


        }

            temp_x_position+= this.direction.x;
            temp_y_position+= this.direction.y;
            this.journey_lenght--;

        if(this.check_board_border_collision(board,temp_x_position,temp_y_position)) {
            if(!this.check_hero_collision(board,spirits,temp_x_position,temp_y_position)){
                this.x_position = temp_x_position;
                this.y_position = temp_y_position;
                this.center_point.x = this.x_position + this.hero_wight/2;
                this.center_point.y = this.y_position + this.hero_height/2;

            }else
                this.journey_lenght=0;
        }
        else
            this.journey_lenght=0;



    }
}