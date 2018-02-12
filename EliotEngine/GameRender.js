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
        //this.Action_board.save();
        //this.Action_board.rotate((Math.PI / 180)*90);
        //this.Action_board.fillRect(20,20,20,20);
        //this.Action_board.translate(40, 40);
        this.Action_board.drawImage(hero.texture,hero.x_position,hero.y_position);

        //this.Action_board.restore();
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
        this.Action_board.fillRect(bullet.x_position, bullet.y_position, bullet.BULLET_WIDTH, bullet.BULLET_HIGHT);
    }

    static test()
    {
        console.log(this.CANVAS_HEIGHT);
    }
}