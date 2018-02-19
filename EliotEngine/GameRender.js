import consts from "./consts.js";

export default class GameRender{
    constructor(canvas_width,canvas_height)
    {
        const b = document.getElementById("game-layer");
        this.Action_board = b.getContext("2d");
        this.CANVAS_WIDTH = canvas_width;
        this.CANVAS_HEIGHT = canvas_height;
    }

    render_action_board()
    {
        //this.Action_board.clearRect(0,0,this.CANVAS_WIDTH,this.CANVAS_HEIGHT); //clear all action board
    }

    render_hero(hero)
    {

        this.Action_board.drawImage(hero.texture,hero.x_position,hero.y_position);
    }


    render_spirits(spirits)
    {
        for(let i=0; i<spirits.length; i++)
        {
            this.render_hero(spirits[i]);
        }
    }

    render_bullets(bullet)
    {
        this.Action_board.fillStyle = bullet.color;
        let width,height;
        if(bullet.rotation===consts.RIGHT_ROTATION || bullet.rotation === consts.LEFT_ROTATION)
        {
            width = bullet.BULLET_HEIGHT;
            height = bullet.BULLET_WIDTH;
        }else
        {
            width = bullet.BULLET_WIDTH;
            height = bullet.BULLET_HEIGHT;
        }
        this.Action_board.fillRect(bullet.x_position, bullet.y_position, width, height);
    }
}