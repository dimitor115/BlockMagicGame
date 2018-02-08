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

        this.block_to_destory = [];


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

    put_block(position)
    {

        let m = position.x / 32;
        m = Math.floor(m);
        let n = position.y / 32;
        n = Math.floor(n);

        let chunk = this.Board[n-1][m];
        if(chunk.collison===0)
        {
            chunk.change_to(this.Texture_pack[2],2);
            this.draw_chunk(chunk);
        }

    }

    add_to_destroy(chunk)
    {
        this.block_to_destory.push(chunk);
    }

    update_board()
    {
        for(let i=0; i<this.block_to_destory.length; i++)
        {
            let chunk = this.block_to_destory[i];
            chunk.change_to_background(this.Texture_pack[0]);
            this.draw_chunk(chunk);
        }

        this.block_to_destory = new Array(0);
    }
}