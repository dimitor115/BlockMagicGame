class Bullet {
    constructor(x_position,y_position,color,speed)
    {
        this.BULLET_WIDTH = 6;
        this.BULLET_HIGHT = 10;

        this.x_position = x_position;
        this.y_position = y_position;
        this.color = color;
        this.speed =speed;
        this.disappear = false;

    }

    check_bullet_collision(board,destroy)
    {
        let m = this.x_position / 32;
        m = Math.floor(m);
        let n = this.y_position / 32;
        n = Math.floor(n);
        let chunk = board[n][m];

        if(chunk.collison===1)
            this.disappear=true;

        if(chunk.collison===2)
        {
            destroy(chunk);
            this.disappear=true;
        }

    }

    update()
    {
        this.y_position-=this.speed;
    }


}

class Fire_gun {
    constructor(color, speed) {
        this.color = color;
        this.speed = speed;
        this.bullets = [];

    }

    fire_bullet(x, y) {
        let bullet = new Bullet(x, y, this.color, this.speed);
        this.bullets.push(bullet);
    }

    update_bullets(render,board,destroy) {

        let new_bullets = [];
        for (let i = 0; i < this.bullets.length; i++) {

            let bullet = this.bullets[i];
            bullet.check_bullet_collision(board,destroy);

            if(!bullet.disappear)
            {
                bullet.update();
                render(bullet);
                new_bullets.push(bullet);
            }

        }
        this.bullets = new_bullets;
    }
}




