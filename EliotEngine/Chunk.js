export default class Chunk{
    constructor(texture,collision,x_position,y_position,size, life_points){
        this.texture = texture;
        this.collision = collision;
        this.x_position = x_position;
        this.y_position = y_position;
        this.size = size;
        this.life_points = life_points; //Zamienić na ang:wytrzymałość
    }

    check_collision(point)
    {
        return (point.x > this.x_position && point.x < this.x_position+this.size) && (point.y > this.y_position && point.y < this.y_position+this.size)
    }

    mark_as_hit(){
        this.life_points--;
    }

    change_to_background(texture)
    {
        this.texture = texture;
        this.collision=0;
        this.life_points =0;
    }

    change_to(texture,collision)
    {
        this.texture = texture;
        this.collision = collision;
        this.life_points = 5; //JaKAŚ STAŁA
    }
}