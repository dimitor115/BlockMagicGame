import consts from './consts.js';
// import which_key_pressed, { space_pressed, enter_pressed} from './global.js';
import Point from './Point.js';

export default class Hero {
    constructor(texture,hero_wight,hero_height,shift_quantity,fire_gun)
    {
        this.texture = texture;
        this.hero_wight = hero_wight;
        this.hero_height = hero_height;
        this.x_position = 96; //pozycja lewego górnego rogu
        this.y_position = 96; // pozyc lewego górnego rogu
        this.shift_quantity = shift_quantity;
        this.center_point = new Point(this.x_position + hero_wight/2,this.y_position + hero_height/2);
        this.fire_gun = fire_gun;
    }

    update_fire_gun(render,board,destory)
    {
        this.fire_gun.update_bullets(render,board,destory);
    }

    check_if_fire()
    {
        if(space_pressed)
        {
            space_pressed=false;
            this.fire_gun.fire_bullet(this.center_point.x,this.y_position);
        }
    }

    check_if_put(put_block)
    {
        if(enter_pressed)
        {
            enter_pressed=false;
            let position = new Point(this.center_point.x,this.y_position);
            put_block(position);
        }
    }

    move(board)
    {
        let temp_x_position = this.x_position;
        let temp_y_position = this.y_position;

        switch (which_key_pressed){
            case consts.KEY_UP:
                temp_y_position-=this.shift_quantity;
                break;
            case consts.KEY_DOWN:
                temp_y_position+=this.shift_quantity;
                break;
            case consts.KEY_RIGHT:
                temp_x_position+=this.shift_quantity;
                break;
            case consts.KEY_LEFT:
                temp_x_position-=this.shift_quantity;
                break;
        }

        if(this.check_board_border_collision(board,temp_x_position,temp_y_position))
        {
            if(!this.check_hero_collision(board,temp_x_position,temp_y_position)){
                this.x_position = temp_x_position;
                this.y_position = temp_y_position;
                this.center_point.x = this.x_position + this.hero_wight/2;
                this.center_point.y = this.y_position + this.hero_height/2;
            }
        }

    }

    check_hero_collision(board,temp_x, temp_y)
    {


        const left_up_point = new Point(temp_x+1,temp_y+1);
        const left_down_point = new Point(temp_x+1,temp_y+this.hero_height-1);
        const right_up_point = new Point(temp_x + this.hero_wight -1,temp_y+1);
        const right_down_point = new Point(temp_x + this.hero_wight -1,temp_y + this.hero_height -1);
        const center_point = this.center_point;
        let critical_points = [left_up_point,left_down_point,right_up_point,right_down_point,center_point];


        let get_chunk_from_point=(point)=>{
            let m = point.x / 32;
            m = Math.floor(m);
            let n = point.y / 32;
            n = Math.floor(n);
            return board[n][m];
        };

        for(let i=0; i<critical_points.length; i++)
        {
            let critical_point = critical_points[i];
            let chunk = get_chunk_from_point(critical_point);
            if(chunk.collison>0) //check if any of chunks that hero will be, has collision >0
                return true;
        }
        return false;

    }

    check_board_border_collision(board,temp_x,temp_y) {
        let y_max = board.length * 32;
        let x_max = board[0].length * 32;

        return (temp_x >= 0 && temp_x + this.hero_wight <= x_max) && (temp_y >= 0 && temp_y + this.hero_height <= y_max);
    }

}
