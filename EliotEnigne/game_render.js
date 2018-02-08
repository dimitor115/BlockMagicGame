class Game_render{
    constructor(canvas_width,canvas_height)
    {
        const b = document.getElementById("game-layer");
        this.Action_board =b.getContext("2d");
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
}