class Bullet {
    constructor(x_position,y_position,color,speed)
    {
        this.BULLET_WIDTH = 4;
        this.BULLET_HIGHT = 8;

        this.x_position = x_position;
        this.y_position = y_position;
        this.color = color;
        this.speed =speed;

    }

    update()
    {
        this.y_position-=this.speed;
    }

    draw(canvas)
    {
        canvas.fillStyle = this.color;
        canvas.fillRect(this.x_position, this.y_position, this.BULLET_WIDTH, this.BULLET_HIGHT);
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

    update_bullets(canvas) {



        for (let i = 0; i < this.bullets.length; i++) {
            this.bullets[i].update();
            this.bullets[i].draw(canvas);

        }
    }
}




