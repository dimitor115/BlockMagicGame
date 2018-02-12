import Hero from './Hero.js';

export default class Spirit extends Hero {
    constructor(texture,hero_wight,hero_height,shift_quantity,fire_gun)
    {
        super(texture,hero_wight,hero_height,shift_quantity,fire_gun);
    }

    move(board){
        let MOVE_PROBABILITY = 70;

        let move = Math.floor((Math.random() * 100) + 1);
        if(move<MOVE_PROBABILITY)
        {
            move = Math.floor((Math.random() * 100) + 1);
            let temp_x_position = this.x_position;
            let temp_y_position = this.y_position;

            if(move<35)
                temp_x_position+=this.shift_quantity;
            else if(move < 70)
                temp_x_position-=this.shift_quantity;
            else if(move < 90)
                temp_y_position+=this.shift_quantity;
            else
                temp_y_position-=this.shift_quantity;

            if(!this.check_hero_collision(board,temp_x_position,temp_y_position)){
                this.x_position = temp_x_position;
                this.y_position = temp_y_position;
                this.center_point.x = this.x_position + this.hero_wight/2;
                this.center_point.y = this.y_position + this.hero_height/2;
            }
        }
    }
}