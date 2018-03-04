export default class Gui{
    constructor(bord_width,bord_height,gui_bar_width){
        const gui = document.getElementById("gui-layer");
        this.Gui = gui.getContext("2d");
        this.BORD_WIDTH = bord_width;
        this.BORD_HEIGHT = bord_height;
        this.GUI_BAR_WIDTH = gui_bar_width;
    }

    update_score(score){
        const font_size = 30;

        //this.Gui.clearRect(this.BORD_WIDTH,40,this.GUI_BAR_WIDTH,font_size);
        this.Gui.clearRect(0,0,1600,900);
        this.Gui.font =  font_size+"px Arial";
        this.Gui.fillStyle = "white";
        this.Gui.fillText(score,this.BORD_WIDTH + 10,40);
    }

    temp_start_info()
    {
        const text = `
            Witaj! \n
            Gra którą zaraz zobaczysz, jest jedynie prostą i jeszcze nie dokończoną demonstracją różnych funkcji autorskiego slinika do gier 2d o nazwie "EliotEngine"
            \n sterowanie : \n
            WSAD - poruszanie się po planszy \n
            Spacja - strzelanie \n
            Enter - budowanie klocków \n
            L - obracanie kierunku strzelania \n
            Możesz strzelać do fioletowych klocków, jeśli trafisz w jednen klika razy to zostanie on zburzony i będziesz mógł postawić jednen klocek gdzie będziesz chciał \n
            możesz również strzelać w stronę czerwonych stworków, kilka trafień gwarantuje jego zabicie i zdobycie punktu.
        `;
        alert(text);
    }


}