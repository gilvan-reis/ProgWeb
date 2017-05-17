(function(){
	var qtdLinhas = 46;
	var qtdColunas = 80;
	var FPS = 10;
	var pontuacao = 0;
	var gameOver = false;
	var tabuleiro;
	var peca = null;
	var proximaPeca = null;

	var tabela;
	var divTabuleiro;
	var divProximaPeca;
	var divInformacoes;

	//----
	function inicia(){
		divTabuleiro = document.querySelector("#tabuleiro");
		divProximaPeca = document.querySelector("#proximaPeca");
		divInformacoes = document.querySelector("#infomacoes");
		tabela = document.createElement("table");
		divTabuleiro.appendChild(tabela);

		tabuleiro = new Array(qtdLinhas);

    for (var i = 0; i < qtdLinhas; i++){
        tabuleiro[i] = document.createElement("tr");
        tabela.appendChild(tabuleiro[i]);

        for (var j = 0; j < qtdColunas; j++){
            tabuleiro[i][j] = document.createElement("td");
            tabuleiro[i].appendChild(tabuleiro[i][j]);
        }
    }

    criaPeca();
	}

	function reinicia(){
		peca = null;
		proximaPeca = null;
		pontuacao = 0;
		gameOver = false;

		//repintar tabela
		for (var i = 0; i < qtdLinhas; i++){
        for (var j = 0; j < qtdColunas; j++){
            tabuleiro[i][j].style.backgroundColor = white;
        }
    }
	}

	function criaPeca(){
		if(peca == null){ //testar
			//primeira chamada
			peca = novaPeca();
			proximaPeca = novaPeca();

			imprimePeca(peca);
		}else{
			peca = proximaPeca;
			proximaPeca = novaPeca();
		}
	}

	function novaPeca(){
		//utilizar closure para criar as pecas?
		switch(Math.floor(Math.random() * 5)){
			case 0:
				//quadrado
				//colocar rotacao, imprime peca e etc dentro do objeto peca?
				return {
						tipo:0,
						rotacao:0,
						//coordL:[-1,-1,0,0],
						coordL:[4,4,5,5],
						coordC:[39,40,39,40]
					}
				break;
			case 1:
				//S
				return {
						tipo:1,
						rotacao:0,
						//coordL:[-1,-1,0,0],
						coordL:[4,4,5,5],
						coordC:[40,41,39,40]
					}
				break;
			case 2:
				//I
				return {
						tipo:2,
						rotacao:0,
						//coordL:[0,0,0,0],
						coordL:[5,5,5,5],
						coordC:[38,39,40,41]
					}
				break;
			case 3:
				//T
				return {
						tipo:3,
						rotacao:0,
						//coordL:[-1,0,0,0],
						coordL:[4,5,5,5],
						coordC:[40,39,40,41]
					}
				break;
			case 4:
				//L
				return {
						tipo:4,
						rotacao:0,
						//coordL:[-1,0,0,0],
						coordL:[4,5,5,5],
						coordC:[39,39,40,41]
					}
				break;
		}
	}

	function imprimePeca(peca){
		for (var i = 0; i < 4; i++) {
			if(peca.coordL[i] >= 0){
				tabuleiro[peca.coordL[i]][peca.coordC[i]].style.backgroundColor = 'black';
			}
		}
	}

	function moverPeca(peca, direcao){
		switch (direcao) {
			case 0:
				//descer
				for (var i = 0; i < 4; i++) {
					if(peca.coordL[i] >= 0){
						tabuleiro[peca.coordL[i]][peca.coordC[i]].style.backgroundColor = 'black';
					}
				}
				break;

		}
	}

	function repintarQuadrado(coordLOld, coordCOld, coordLNew, coordCNew){
		for (var i = 0; i < 4; i++) {
			if(coordLOld[i] >= 0){
				tabuleiro[coordLOld[i]][coordCOld[i]].style.backgroundColor = 'white';
			}
			tabuleiro[coordLNew[i]][coordCNew[i]].style.backgroundColor = 'black';
		}
	}

	//----
	inicia();
})();
