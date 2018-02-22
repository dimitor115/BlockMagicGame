import consts from "./consts.js";
import Point from "./Point.js";


export class Bullet {
    constructor(x_position, y_position, color, speed,rotation) {
        this.BULLET_WIDTH = 6;
        this.BULLET_HEIGHT = 10;

        this.x_position = x_position;
        this.y_position = y_position;
        this.color = color;
        this.speed = speed;
        this.disappear = false;
        
        this.rotation = rotation;

    }

    check_bullet_spirits_collision(spirits)
    {
        for(let i=0; i<spirits.length; i++)
        {
            let spirit = spirits[i];
            let center_point = new Point(this.x_position+this.BULLET_WIDTH/2,this.y_position);
            if(spirit.check_point_collisoion(center_point))
            {
                spirit.mark_as_shoted();
            }
        }
    }

    check_bullet_collision(board, destroy,add_to_backpack) {

        let m = this.y_position / 32;
        m = Math.floor(m);

        let n = this.x_position / 32;
        n = Math.floor(n);


        let y_max = board.length;
        let x_max = board[0].length;

        if(m >0 && m <y_max && n>0 && n<x_max)
        {
            let chunk = board[m][n];

            if (chunk.collison === 1)
                this.disappear = true;

            if (chunk.collison === 2) {
                destroy(chunk);

                //wiem, że go trafiłem i jeśli ma tylko jedno życie to dodaje go do plecaka
                //DO REFRACTORA
                if(chunk.life_points <=1)
                    add_to_backpack();
                
                    this.disappear = true;
            }

        }
    }
    update() {

        switch (this.rotation)
        {
            case consts.RIGHT_ROTATION:
                this.x_position+=this.speed; break;
            case consts.UP_ROTATION:
                this.y_position-=this.speed; break;
            case consts.LEFT_ROTATION:
                this.x_position-=this.speed; break;
            case consts.DOWN_ROTATION:
                this.y_position+=this.speed; break
        }
    }
}

export default class FireGun {
    constructor(color, speed) {
        this.color = color;
        this.speed = speed;
        this.bullets = [];

    }

    fire_bullet(point,rotation) {
        let bullet = new Bullet(point.x, point.y, this.color, this.speed,rotation);
        this.bullets.push(bullet);
    }

    update_bullets(render, board, destroy,add_to_backpack, spirits) {

        let new_bullets = [];
        for (let i = 0; i < this.bullets.length; i++) {

            let bullet = this.bullets[i];
            bullet.check_bullet_collision(board, destroy,add_to_backpack);
            bullet.check_bullet_spirits_collision(spirits);

            if (!bullet.disappear) {
                bullet.update();
                render(bullet);
                new_bullets.push(bullet);
            }

        }
        this.bullets = new_bullets;
    }
}
