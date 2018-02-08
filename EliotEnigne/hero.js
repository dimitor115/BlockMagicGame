class hero {
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

    render_hero(canvas){
        canvas.drawImage(this.texture,this.x_position,this.y_position); //POPRAWIĆ I PRZENIEŚĆ DO GŁÓWNEJ KLASY
    }

    update_fire_gun(canvas,board)
    {
        this.fire_gun.update_bullets(canvas,board);
    }

    check_if_fire()
    {
        if(space_pressed)
        {
            space_pressed=false;
            this.fire_gun.fire_bullet(this.center_point.x,this.y_position);
        }
    }

    move(neighbourhood)
    {
        let temp_x_position = this.x_position;
        let temp_y_position = this.y_position;

        switch (which_key_pressed){
            case "w" :
                temp_y_position-=this.shift_quantity;
                break;
            case "s":
                temp_y_position+=this.shift_quantity;
                break;
            case "d":
                temp_x_position+=this.shift_quantity;
                break;
            case "a":
                temp_x_position-=this.shift_quantity;
                break;
        }

        if(!this.check_hero_collision(neighbourhood,temp_x_position,temp_y_position)){
            this.x_position = temp_x_position;
            this.y_position = temp_y_position;
            this.center_point.x = this.x_position + this.hero_wight/2;
            this.center_point.y = this.y_position + this.hero_height/2;
        }

    }

    check_hero_collision(neighbourhood, temp_x, temp_y)
    {
        for(let i=0; i<neighbourhood.length; i++){

            let chunk = neighbourhood[i].chunk;
            if(chunk.collison===1 && this.collision_for_chunk(chunk,temp_x,temp_y))
                return true;
        }
    }

    collision_for_chunk(chunk,temp_x,temp_y)
    {
        let left_up_point = new Point(temp_x,temp_y);
        let left_down_point = new Point(temp_x,temp_y+this.hero_height);
        let right_up_point = new Point(temp_x + this.hero_wight,temp_y);
        let right_down_point = new Point(temp_x + this.hero_wight,temp_y + this.hero_height);

        return chunk.check_collision(left_down_point) || chunk.check_collision(left_up_point) || chunk.check_collision(right_up_point) || chunk.check_collision(right_down_point);
    }



}