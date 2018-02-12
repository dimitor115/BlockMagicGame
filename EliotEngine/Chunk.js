export default class Chunk{
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

    change_to(texture,collision)
    {
        this.texture = texture;
        this.collison = collision;
    }
}