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

    fire_fireGun(render,board,destory,spirits)
    {
        for(let i=0; i<this.spirits.length; i++)
        {
            let spirit = this.spirits[i];
            spirit.check_if_fire();
            spirit.update_fire_gun(render,board,destory,spirits);
        }
    }

    generate_spirits(how_many)
    {
        this.spirits = [];
        for(let i=0; i<how_many; i++){
            let fire_gun = new FireGun('blue',24);
            let spirit = new Spirit(this.texture,this.width,this.height,this.shift,fire_gun,3);
            spirit.x_position = 160;
            spirit.y_position = 160;
            this.spirits.push(spirit);
            console.log("load spirit : " + i);
        }
    }

    update_spirits(board){

        let updated_spirits = [];

        for(let i=0; i<this.spirits.length; i++)
        {

            let spirit = this.spirits[i];
            if(spirit.life_points>0){
                spirit.move(board);
                updated_spirits.push(spirit);

            }else{
                //tu można jakoś usuwać
            }

        }

       // delete this.spirits;
        this.spirits = updated_spirits;
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