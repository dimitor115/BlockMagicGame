class Board{
    constructor(board,chunks_in_x,chunks_in_y,chunk_size,texture_pack)
    {
        this.CHUNK_SIZE = chunk_size;

        this.Texture_pack = texture_pack;

        this.Board = board;
        this.CHUNKS_IN_X = chunks_in_x;
        this.CHUNKS_IN_Y = chunks_in_y;

        const bg = document.getElementById("background-layer");
        this.background = bg.getContext("2d");



    }


    draw_chunk(chunk)
    {
        this.background.clearRect(chunk.x_position,chunk.y_position,this.CHUNK_SIZE,this.CHUNK_SIZE);
        this.background.drawImage(chunk.texture,chunk.x_position,chunk.y_position);
    }


    draw_board()
    {

        for(let i=0; i<this.CHUNKS_IN_Y; i++)
        {
            for(let j=0; j<this.CHUNKS_IN_X; j++)
            {
                let chunk= this.Board[i][j];
                this.background.drawImage(chunk.texture,chunk.x_position,chunk.y_position);
            }

        }

    }
}