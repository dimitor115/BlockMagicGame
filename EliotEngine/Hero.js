import consts from './consts.js';
//import which_key_pressed, { space_pressed, enter_pressed} from './global.js';
//import shift_pressed from './global';
import Point from './Point.js';

export default class Hero {
    constructor(id,texture,hero_width,hero_height,x_position,y_position,shift_quantity,fire_gun,life_points)
    {

        this.texture = texture;
        this.hero_width = hero_width;
        this.hero_height = hero_height;
        this.x_position = x_position;
        this.y_position = y_position;
        this.shift_quantity = shift_quantity;
        this.center_point = new Point(this.x_position + hero_width/2,this.y_position + hero_height/2);
        this.fire_gun = fire_gun;
        this.life_points = life_points;
        this.rotation= consts.UP_ROTATION;
        this.backpack_blocks =0;
        this.ID = id;
    }

    add_block_to_backpack()
    {
        this.backpack_blocks++;
        console.log(this.ID + "add, acctual :" + this.backpack_blocks)
    }

    check_rotation()
    {
        if(l_key_pressed)
        {
            l_key_pressed=false;

            if(this.rotation>=3)
                this.rotation = consts.RIGHT_ROTATION;
            else
                this.rotation++;

            console.log("rotate!" + this.rotation);
        }
    }

    update_fire_gun(render,board,destroy,spirits)
    {
        let add_to_backpack = () => {
            this.add_block_to_backpack();
        }
        this.fire_gun.update_bullets(render,board,destroy,add_to_backpack,spirits);
    }

    check_if_fire()
    {
        if(space_pressed)
        {
            space_pressed=false;
            this.fire_gun.fire_bullet(this.actual_top_position,this.rotation);//POPRAWIĆ
        }
    }

    get actual_top_position()
    {
        switch (this.rotation)
        {
            case consts.RIGHT_ROTATION:
                return new Point(this.x_position + consts.CHUNK_SIZE,this.center_point.y);
            case consts.UP_ROTATION:
                return new Point(this.center_point.x,this.y_position);
            case consts.LEFT_ROTATION:
                return new Point(this.x_position,this.center_point.y);
            case consts.DOWN_ROTATION:
                return new Point(this.center_point.x,this.y_position+consts.CHUNK_SIZE);
        }
    }

    check_if_put(put_block)
    {
        if(enter_pressed)
        {
            enter_pressed=false;
            if(this.backpack_blocks >0)
            {
                let position = this.actual_top_position;
                put_block(position,this.rotation);
                this.backpack_blocks--;
            }
        }
    }

    mark_as_shoted()
    {
        this.life_points--;
        console.log("trafimy :C");
    }

    move(board,spirits)
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
            if(!this.check_hero_collision(board, spirits,temp_x_position,temp_y_position)){
                this.x_position = temp_x_position;
                this.y_position = temp_y_position;
                this.center_point.x = this.x_position + this.hero_width/2;
                this.center_point.y = this.y_position + this.hero_height/2;
            }
        }

    }

    check_hero_collision(board,spirits,temp_x, temp_y)
    {
        //TU WSZĘDZIE SĄ WSPÓŁRZĘDNE O JEDEN ŻEBY NIE BRAŁO KLOCKA DLA WSPÓLNYCH WSPÓŁRZĘDNYCH 

        const left_up_point = new Point(temp_x+1,temp_y+1);
        const left_down_point = new Point(temp_x+1,temp_y+this.hero_height-1);
        const right_up_point = new Point(temp_x + this.hero_width -1,temp_y+1);
        const right_down_point = new Point(temp_x + this.hero_width -1,temp_y + this.hero_height -1);
        const left_center = new Point(temp_x +1,temp_y + this.hero_height/2);
        const right_center = new Point(temp_x + this.hero_width -1, temp_y + this.hero_height/2);
        const up_center = new Point(temp_x + this.hero_width/2, temp_y+1);
        const down_center = new Point(temp_x + this.hero_width/2, temp_y + this.hero_height -1);

        let critical_points = [left_up_point,left_down_point,right_up_point,right_down_point,left_center,right_center,up_center,down_center];

        let get_chunk_from_point=(point)=>{
            let m = point.x / 32;
            m = Math.floor(m);
            let n = point.y / 32;
            n = Math.floor(n);
            return board[n][m];
        };

        let check_collision_with_spirits=(critical_point)=>{
            for(let j=0; j<spirits.length; j++)
            {
                let spirit = spirits[j];
                if(spirit !== this && spirit.check_point_collisoion(critical_point))
                    return true;
            }

        };

        for(let i=0; i<critical_points.length; i++)
        {
            let critical_point = critical_points[i];
            let chunk = get_chunk_from_point(critical_point);
            if(chunk!== undefined && ( chunk.collison>0 || check_collision_with_spirits(critical_point))) //check if any of chunks that hero will be, has collision >0
                return true;

        }
        return false;

    }

    check_board_border_collision(board,temp_x,temp_y) {
        let y_max = board.length * 32;
        let x_max = board[0].length * 32;

        return (temp_x >= 0 && temp_x + this.hero_width <= x_max) && (temp_y >= 0 && temp_y + this.hero_height <= y_max);
    }

    check_point_collisoion(point) //check if point is inside
    {
        return (point.x > this.x_position && point.x < this.x_position+this.hero_width) && (point.y > this.y_position && point.y < this.y_position+this.hero_height)
    }

}
