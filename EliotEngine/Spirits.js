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
            let spirit = new Spirit(i+1,this.texture,this.width,this.height,200 + i*50,300,this.shift,fire_gun,3);
            this.spirits.push(spirit);
            console.log("load spirit : " + i);
        }
    }

    update_spirits(board,spirits){

        let updated_spirits = [];
        let temp_score =0;
        for(let i=0; i<this.spirits.length; i++)
        {

            let spirit = this.spirits[i];
            if(spirit.life_points>0){
                spirit.move(board,spirits);
                updated_spirits.push(spirit);

            }else{
                temp_score++;
            }

        }

       //delete this.spirits;
        this.spirits = updated_spirits;
        return temp_score;
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