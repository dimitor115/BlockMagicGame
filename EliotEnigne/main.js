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

    change_to(texture,collision)
    {
        this.texture = texture;
        this.collison = collision;
    }
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

