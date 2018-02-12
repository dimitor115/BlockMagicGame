import FireGun from './FireGun.js';
import Spirit from './Spirit.js';

export default class Spirits{
    constructor(texture,width,height,shift)
    {
        this.texture = texture;
        this.width = width;
        this.height = height;
        this.shift = shift;
        this.spirits = [];
    }

    generate_spirits(how_many)
    {
        this.spirits = [];
        for(let i=0; i<how_many; i++){
            let fire_gun = new FireGun('blue',24);
            let spirit = new Spirit(this.texture,this.width,this.height,this.shift,fire_gun);
            spirit.x_position = 160;
            spirit.y_position = 160;
            this.spirits.push(spirit);
            console.log("load spirit : " + i);
        }
    }

    move_spirits(board)
    {
        for(let i=0; i<this.spirits.length; i++)
        {
            let spirit = this.spirits[i];
            spirit.move(board);
        }
    }

}