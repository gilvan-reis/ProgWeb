(function () {
    var MaxNumX = 80;
    var MaxNumY = 46;
    var tabuleiro;
    var peca;
    var fps = 10;
    var gameLoop;
    var matriz;
    var tabela;


    function init () {
        matriz = new Array(MaxNumY);
        tabela = document.createElement("table");

        /*for (var i = 0; i < MaxNumY; i++){
            matriz[i] = new Array(MaxNumX);

            for (var j = 0; j < MaxNumX; j++){
                matriz[i][j] = 0;
            }
        }*/

        for (var i = 0; i < MaxNumY; i++){
            matriz[i] = document.createElement("tr");
            tabela.appendChild(matriz[i]);

            for (var j = 0; j < MaxNumX; j++){
                matriz[i][j] = document.createElement("td");
                matriz[i].appendChild(matriz[i][j]);
            }
        }

        createPeca();
        gameLoop = setInterval(run, 1000/fps);
    }

    addEventListener("keydown", function(e) {
        if (e.key == "ArrowLeft") {
            //peca.style.left = (parseInt(peca.style.left) - 10) + "px";
            console.log(matriz[0][1]);
        } else if (e.key == "ArrowRight") {
            //peca.style.left = (parseInt(peca.style.left) + 10) + "px";
        }
    });

    function run () {
        //posicao = parseInt(peca.style.top);
        //posicao = posicao + 10;
        //if (posicao == 740) {
        //    clearInterval(gameLoop);
      //  }
        //peca.style.top = posicao + "px";
    }

    function createPeca () {
        tabuleiro = document.querySelector("#tabuleiro");
        //peca = document.createElement("div");
        //peca.style.top = "10px";
        //peca.style.left = "10px";



        //tabuleiro.appendChild(peca);
        tabuleiro.appendChild(tabela);
    }

    init();

})();
