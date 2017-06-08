(function(){
	var qtdLinhas = 46;
	var qtdColunas = 40;
	//var FPS = 3;
	var FPS = 5;
	var pontuacao = 0;
	var gameOver = false;
	var tabuleiro;
	var peca = null;
	var proximaPeca = null;
	var gameLoop;

	var tabela;
	var divTabuleiro;
	var divProximaPeca;
	var divInformacoes;
	var placar;
	var tabelaProximaPeca;

	//----
	function inicia(){
		divTabuleiro = document.querySelector("#tabuleiro");
		divProximaPeca = document.querySelector("#proximaPeca");
		divInformacoes = document.querySelector("#informacoes");

		preencheInterfaceGrafica();

	    criaPeca();
		gameLoop = setInterval(loop, 1000/FPS);
	}

	function preencheInterfaceGrafica(){
		tabela = document.createElement("table");
		divTabuleiro.appendChild(tabela);

		tabuleiro = new Array(qtdLinhas);

	    for (var i = 0; i < qtdLinhas; i++){
	        tabuleiro[i] = document.createElement("tr");
	        tabela.appendChild(tabuleiro[i]);

	        for (var j = 0; j < qtdColunas; j++){
	            tabuleiro[i][j] = document.createElement("td");
	            tabuleiro[i].appendChild(tabuleiro[i][j]);
				tabuleiro[i][j].style.backgroundColor = "white";
	        }
	    }

		//---
		divProximaPeca.innerHTML = "<label><b><u>Proxima peça</u></b></label><br><br>";
		var tabelaProx = document.createElement("table");
		tabelaProx.align = "center";
		divProximaPeca.appendChild(tabelaProx);
		divProximaPeca.appendChild(document.createElement("br"));

		tabelaProximaPeca = new Array(4);

	    for (var i = 0; i < 4; i++){
	        tabelaProximaPeca[i] = document.createElement("tr");
	        tabelaProx.appendChild(tabelaProximaPeca[i]);

	        for (var j = 0; j < 4; j++){
	            tabelaProximaPeca[i][j] = document.createElement("td");
	            tabelaProximaPeca[i].appendChild(tabelaProximaPeca[i][j]);
				tabelaProximaPeca[i][j].style.backgroundColor = "white";
	        }
	    }

		//---
		divInformacoes.innerHTML = "<label><b><u>Informações</u></b></label><br><br>\
										<b>Pontuação</b><br>\
										<label id=placar>0</label><br><br>\
										<b>Comandos</b><br>\
										<label>&#x2190: move a peça para a esquerda</label><br>\
										<label>&#x2192: move a peça para a direita</label><br>\
										<label>&#x2191: rotaciona a peça</label><br>\
										<label>&#x2193: faz a peça descer</label><br>\
										<label>ESPACO: inicia um novo jogo</label><br>";
		placar = document.querySelector("#placar");
	}

	function reinicia(){
		peca = null;
		proximaPeca = null;
		pontuacao = 0;
		gameOver = false;

		//repintar tabela
		for (var i = 0; i < qtdLinhas; i++){
	        for (var j = 0; j < qtdColunas; j++){
	            tabuleiro[i][j].style.backgroundColor = "white";
	        }
	    }

		criaPeca();
		console.clear();
	}

	function imprimeProximaPeca(){
		for (var i = 0; i < 4; i++){
	        for (var j = 0; j < 4; j++){
	            tabelaProximaPeca[i][j].style.backgroundColor = "white";
	        }
	    }

		var metade = Math.floor(qtdColunas/2);
		for (var i = 0; i < 4; i++) {
			tabelaProximaPeca[proximaPeca.coordL[i]+3][proximaPeca.coordC[i]-metade+2].style.backgroundColor = proximaPeca.cor;
		}
	}

	function criaPeca(){
		if(peca == null){ //testar
			//primeira chamada
			peca = novaPeca();
			proximaPeca = novaPeca();
		}else{
			peca = proximaPeca;
			proximaPeca = novaPeca();
			incrementaPontuacao(10);
		}

		imprimeProximaPeca();

		//imprimePeca(peca);
		if(verificaBaixoPeca()){
			//gameOver
			gameOver = true;
			console.log(">>Game Over");
			alert("Fim de Jogo");
		}else{
			//peca.mover(0);
		}
		//clearInterval(gameLoop); //para totalmente o loop
	}

	function novaPeca(){
		//utilizar closure para criar as pecas?
		var metade = Math.floor(qtdColunas/2);
		switch(Math.floor(Math.random() * 5)){
		//switch(4){
			case 0:
				//quadrado
				//colocar rotacao, imprime peca e etc dentro do objeto peca?
				return {
						tipo:0,
						rotacao:0,
						coordL:[-2,-2,-1,-1],
						//coordL:[4,4,5,5],
						coordC:[metade-1,metade,metade-1,metade],
						cor:"red",
						mover: function(dir){
							switch (dir) {
								case 0:
								//baixo
									repintaPeca(this.coordL[0], this.coordC[0], this.coordL[0]+1, this.coordC[0], true);
									this.coordL[0] += 1;
									repintaPeca(this.coordL[1], this.coordC[1], this.coordL[1]+1, this.coordC[1], true);
									this.coordL[1] += 1;
									repintaPeca(this.coordL[2], this.coordC[2], this.coordL[2]+1, this.coordC[2], false);
									this.coordL[2] += 1;
									repintaPeca(this.coordL[3], this.coordC[3], this.coordL[3]+1, this.coordC[3], false);
									this.coordL[3] += 1;
									break;
								case 1:
									//direita
									repintaPeca(this.coordL[0], this.coordC[0], this.coordL[0], this.coordC[0]+1, true);
									this.coordC[0] += 1;
									repintaPeca(this.coordL[1], this.coordC[1], this.coordL[1], this.coordC[1]+1, false);
									this.coordC[1] += 1;
									repintaPeca(this.coordL[2], this.coordC[2], this.coordL[2], this.coordC[2]+1, true);
									this.coordC[2] += 1;
									repintaPeca(this.coordL[3], this.coordC[3], this.coordL[3], this.coordC[3]+1, false);
									this.coordC[3] += 1;
									break;
								case 2:
									//esquerda
									repintaPeca(this.coordL[0], this.coordC[0], this.coordL[0], this.coordC[0]-1, false);
									this.coordC[0] -= 1;
									repintaPeca(this.coordL[1], this.coordC[1], this.coordL[1], this.coordC[1]-1, true);
									this.coordC[1] -= 1;
									repintaPeca(this.coordL[2], this.coordC[2], this.coordL[2], this.coordC[2]-1, false);
									this.coordC[2] -= 1;
									repintaPeca(this.coordL[3], this.coordC[3], this.coordL[3], this.coordC[3]-1, true);
									this.coordC[3] -= 1;
									break;
							}
						},
						rotacionar:function(){}
					}
				break;
			case 1:
				//S
				return {
						tipo:1,
						rotacao:0,
						coordL:[-2,-2,-1,-1],
						//coordL:[4,4,5,5],
						coordC:[metade,metade+1,metade-1,metade],
						cor:"blue",
						mover: function(dir){
							switch (dir) {
								case 0:
								//baixo
									repintaPeca(this.coordL[0], this.coordC[0], this.coordL[0]+1, this.coordC[0], true);
									this.coordL[0] += 1;
									repintaPeca(this.coordL[2], this.coordC[2], this.coordL[2]+1, this.coordC[2], true);
									this.coordL[2] += 1;
									repintaPeca(this.coordL[3], this.coordC[3], this.coordL[3]+1, this.coordC[3], false);
									this.coordL[3] += 1;
									if(this.rotacao == 0){
										repintaPeca(this.coordL[1], this.coordC[1], this.coordL[1]+1, this.coordC[1], true);
										this.coordL[1] += 1;
									}else{
										repintaPeca(this.coordL[1], this.coordC[1], this.coordL[1]+1, this.coordC[1], false);
										this.coordL[1] += 1;
									}
									//console.log("descer:"+peca.coordL[0] + "," + peca.coordL[1] + "," + peca.coordL[2] + "," + peca.coordL[3]);
									break;
								case 1:
									//direita
									repintaPeca(this.coordL[0], this.coordC[0], this.coordL[0], this.coordC[0]+1, true);
									this.coordC[0] += 1;
									if(this.rotacao == 0){
										repintaPeca(this.coordL[1], this.coordC[1], this.coordL[1], this.coordC[1]+1, false);
										this.coordC[1] += 1;
										repintaPeca(this.coordL[2], this.coordC[2], this.coordL[2], this.coordC[2]+1, true);
										this.coordC[2] += 1;
										repintaPeca(this.coordL[3], this.coordC[3], this.coordL[3], this.coordC[3]+1, false);
										this.coordC[3] += 1;
									}else{
										repintaPeca(this.coordL[1], this.coordC[1], this.coordL[1], this.coordC[1]+1, true);
										this.coordC[1] += 1;
										repintaPeca(this.coordL[2], this.coordC[2], this.coordL[2], this.coordC[2]+1, false);
										this.coordC[2] += 1;
										repintaPeca(this.coordL[3], this.coordC[3], this.coordL[3], this.coordC[3]+1, true);
										this.coordC[3] += 1;
									}
									break;
								case 2:
									//esquerda
									repintaPeca(this.coordL[3], this.coordC[3], this.coordL[3], this.coordC[3]-1, true);
									this.coordC[3] -= 1;
									if(this.rotacao == 0){
										repintaPeca(this.coordL[0], this.coordC[0], this.coordL[0], this.coordC[0]-1, false);
										this.coordC[0] -= 1;
										repintaPeca(this.coordL[1], this.coordC[1], this.coordL[1], this.coordC[1]-1, true);
										this.coordC[1] -= 1;
										repintaPeca(this.coordL[2], this.coordC[2], this.coordL[2], this.coordC[2]-1, false);
										this.coordC[2] -= 1;
									}else{
										repintaPeca(this.coordL[0], this.coordC[0], this.coordL[0], this.coordC[0]-1, true);
										this.coordC[0] -= 1;
										repintaPeca(this.coordL[1], this.coordC[1], this.coordL[1], this.coordC[1]-1, false);
										this.coordC[1] -= 1;
										repintaPeca(this.coordL[2], this.coordC[2], this.coordL[2], this.coordC[2]-1, true);
										this.coordC[2] -= 1;
									}
									break;
							}
						},
						rotacionar:function(){
							switch(this.rotacao){
								case 0:
									var l = this.coordL[0];
									var c = this.coordC[0];
									if(!( tabuleiroPintado(l-1, c-1) || tabuleiroPintado(l, c-1) )){
										this.rotacao=1;
										repintaPeca(this.coordL[2], this.coordC[2], l-1, c-1, true);
										this.coordL[0] = l-1;
										this.coordC[0] = c-1;
										repintaPeca(this.coordL[1], this.coordC[1], l, c-1, true);
										this.coordL[1] = l;
										this.coordC[1] = c-1;
										this.coordL[2] = l;
										this.coordC[2] = c;
										//a peca 4 nao muda
									}
									break;
								default:
									var l = this.coordL[2];
									var c = this.coordC[2];
									if(!( tabuleiroPintado(l+1, c-1) || tabuleiroPintado(l, c+1) )){ //verifica se nao vai haver colisao ao rotacionar
										this.rotacao=0;
										repintaPeca(this.coordL[0], this.coordC[0], l+1, c-1, true);
										this.coordL[0] = l;
										this.coordC[0] = c;
										repintaPeca(this.coordL[1], this.coordC[1], l, c+1, true);
										this.coordL[1] = l;
										this.coordC[1] = c+1;
										this.coordL[2] = l+1;
										this.coordC[2] = c-1;
										//a peca 4 nao muda
									}
									break;
							}
						}
					}
				break;
			case 2:
				//I
				return {
						tipo:2,
						rotacao:0,
						coordL:[-1,-1,-1,-1],
						//coordL:[5,5,5,5],
						coordC:[metade-2,metade-1,metade,metade+1],
						cor:"green",
						mover: function(dir){
							switch (dir) {
								case 0:
								//baixo
									repintaPeca(this.coordL[0], this.coordC[0], this.coordL[0]+1, this.coordC[0], true);
									this.coordL[0] += 1;
									if(this.rotacao == 0){
										repintaPeca(this.coordL[1], this.coordC[1], this.coordL[1]+1, this.coordC[1], true);
										this.coordL[1] += 1;
										repintaPeca(this.coordL[2], this.coordC[2], this.coordL[2]+1, this.coordC[2], true);
										this.coordL[2] += 1;
										repintaPeca(this.coordL[3], this.coordC[3], this.coordL[3]+1, this.coordC[3], true);
										this.coordL[3] += 1;
									}else{
										repintaPeca(this.coordL[1], this.coordC[1], this.coordL[1]+1, this.coordC[1], false);
										this.coordL[1] += 1;
										repintaPeca(this.coordL[2], this.coordC[2], this.coordL[2]+1, this.coordC[2], false);
										this.coordL[2] += 1;
										repintaPeca(this.coordL[3], this.coordC[3], this.coordL[3]+1, this.coordC[3], false);
										this.coordL[3] += 1;
									}
									break;
								case 1:
									//direita
									repintaPeca(this.coordL[0], this.coordC[0], this.coordL[0], this.coordC[0]+1, true);
									this.coordC[0] += 1;
									if(this.rotacao == 0){
										repintaPeca(this.coordL[1], this.coordC[1], this.coordL[1], this.coordC[1]+1, false);
										this.coordC[1] += 1;
										repintaPeca(this.coordL[2], this.coordC[2], this.coordL[2], this.coordC[2]+1, false);
										this.coordC[2] += 1;
										repintaPeca(this.coordL[3], this.coordC[3], this.coordL[3], this.coordC[3]+1, false);
										this.coordC[3] += 1;
									}else{
										repintaPeca(this.coordL[1], this.coordC[1], this.coordL[1], this.coordC[1]+1, true);
										this.coordC[1] += 1;
										repintaPeca(this.coordL[2], this.coordC[2], this.coordL[2], this.coordC[2]+1, true);
										this.coordC[2] += 1;
										repintaPeca(this.coordL[3], this.coordC[3], this.coordL[3], this.coordC[3]+1, true);
										this.coordC[3] += 1;
									}
									break;
								case 2:
									//esquerda
									repintaPeca(this.coordL[3], this.coordC[3], this.coordL[3], this.coordC[3]-1, true);
									this.coordC[3] -= 1;
									if(this.rotacao == 0){
										repintaPeca(this.coordL[0], this.coordC[0], this.coordL[0], this.coordC[0]-1, false);
										this.coordC[0] -= 1;
										repintaPeca(this.coordL[1], this.coordC[1], this.coordL[1], this.coordC[1]-1, false);
										this.coordC[1] -= 1;
										repintaPeca(this.coordL[2], this.coordC[2], this.coordL[2], this.coordC[2]-1, false);
										this.coordC[2] -= 1;
									}else{
										repintaPeca(this.coordL[0], this.coordC[0], this.coordL[0], this.coordC[0]-1, true);
										this.coordC[0] -= 1;
										repintaPeca(this.coordL[1], this.coordC[1], this.coordL[1], this.coordC[1]-1, true);
										this.coordC[1] -= 1;
										repintaPeca(this.coordL[2], this.coordC[2], this.coordL[2], this.coordC[2]-1, true);
										this.coordC[2] -= 1;
									}
									break;
							}
						},
						rotacionar:function(){
							switch(this.rotacao){
								case 0:
									var l = this.coordL[2];
									var c = this.coordC[2];
									if(!( tabuleiroPintado(l-2, c) || tabuleiroPintado(l-1, c) || tabuleiroPintado(l+1, c) )){ //verifica se nao vai haver colisao ao rotacionar
										this.rotacao=1;
										repintaPeca(this.coordL[0], this.coordC[0], l-2, c, true);
										this.coordL[0] = l-2;
										this.coordC[0] = c;
										repintaPeca(this.coordL[1], this.coordC[1], l-1, c, true);
										this.coordL[1] = l-1;
										this.coordC[1] = c;
										//a peca 3 nao muda
										repintaPeca(this.coordL[3], this.coordC[3], l+1, c, true);
										this.coordL[3] = l+1;
										this.coordC[3] = c;
									}
									break;
								default:
									var l = this.coordL[2];
									var c = this.coordC[2];
									if(!( tabuleiroPintado(l, c-2) || tabuleiroPintado(l, c-1) || tabuleiroPintado(l, c+1) )){ //verifica se nao vai haver colisao ao rotacionar
										this.rotacao=0;
										repintaPeca(this.coordL[0], this.coordC[0], l, c-2, true);
										this.coordL[0] = l;
										this.coordC[0] = c-2;
										repintaPeca(this.coordL[1], this.coordC[1], l, c-1, true);
										this.coordL[1] = l;
										this.coordC[1] = c-1;
										//a peca 3 nao muda
										repintaPeca(this.coordL[3], this.coordC[3], l, c+1, true);
										this.coordL[3] = l;
										this.coordC[3] = c+1;
									}
									break;
							}
						}
					}
				break;
			case 3:
				//T
				return {
						tipo:3,
						rotacao:0,
						coordL:[-2,-1,-1,-1],
						//coordL:[4,5,5,5],
						coordC:[metade,metade-1,metade,metade+1],
						cor:"purple",
						mover: function(dir){
							switch (dir) {
								case 0:
								//baixo
									repintaPeca(this.coordL[0], this.coordC[0], this.coordL[0]+1, this.coordC[0], true);
									this.coordL[0] += 1;
									if(this.rotacao == 0){
										repintaPeca(this.coordL[1], this.coordC[1], this.coordL[1]+1, this.coordC[1], true);
										this.coordL[1] += 1;
										repintaPeca(this.coordL[2], this.coordC[2], this.coordL[2]+1, this.coordC[2], false);
										this.coordL[2] += 1;
										repintaPeca(this.coordL[3], this.coordC[3], this.coordL[3]+1, this.coordC[3], true);
										this.coordL[3] += 1;
									}else if(this.rotacao == 1){
										repintaPeca(this.coordL[1], this.coordC[1], this.coordL[1]+1, this.coordC[1], false);
										this.coordL[1] += 1;
										repintaPeca(this.coordL[2], this.coordC[2], this.coordL[2]+1, this.coordC[2], true);
										this.coordL[2] += 1;
										repintaPeca(this.coordL[3], this.coordC[3], this.coordL[3]+1, this.coordC[3], false);
										this.coordL[3] += 1;
									}else if(this.rotacao == 2){
										repintaPeca(this.coordL[1], this.coordC[1], this.coordL[1]+1, this.coordC[1], true);
										this.coordL[1] += 1;
										repintaPeca(this.coordL[2], this.coordC[2], this.coordL[2]+1, this.coordC[2], true);
										this.coordL[2] += 1;
										repintaPeca(this.coordL[3], this.coordC[3], this.coordL[3]+1, this.coordC[3], false);
										this.coordL[3] += 1;
									}else{
										repintaPeca(this.coordL[1], this.coordC[1], this.coordL[1]+1, this.coordC[1], true);
										this.coordL[1] += 1;
										repintaPeca(this.coordL[2], this.coordC[2], this.coordL[2]+1, this.coordC[2], false);
										this.coordL[2] += 1;
										repintaPeca(this.coordL[3], this.coordC[3], this.coordL[3]+1, this.coordC[3], false);
										this.coordL[3] += 1;
									}
									break;
								case 1:
									//direita
									repintaPeca(this.coordL[0], this.coordC[0], this.coordL[0], this.coordC[0]+1, true);
									this.coordC[0] += 1;
									if(this.rotacao == 0){
										repintaPeca(this.coordL[1], this.coordC[1], this.coordL[1], this.coordC[1]+1, true);
										this.coordC[1] += 1;
										repintaPeca(this.coordL[2], this.coordC[2], this.coordL[2], this.coordC[2]+1, false);
										this.coordC[2] += 1;
										repintaPeca(this.coordL[3], this.coordC[3], this.coordL[3], this.coordC[3]+1, false);
										this.coordC[3] += 1;
									}else if(this.rotacao == 1){
										repintaPeca(this.coordL[1], this.coordC[1], this.coordL[1], this.coordC[1]+1, true);
										this.coordC[1] += 1;
										repintaPeca(this.coordL[2], this.coordC[2], this.coordL[2], this.coordC[2]+1, false);
										this.coordC[2] += 1;
										repintaPeca(this.coordL[3], this.coordC[3], this.coordL[3], this.coordC[3]+1, true);
										this.coordC[3] += 1;
									}else if(this.rotacao == 2){
										repintaPeca(this.coordL[1], this.coordC[1], this.coordL[1], this.coordC[1]+1, false);
										this.coordC[1] += 1;
										repintaPeca(this.coordL[2], this.coordC[2], this.coordL[2], this.coordC[2]+1, false);
										this.coordC[2] += 1;
										repintaPeca(this.coordL[3], this.coordC[3], this.coordL[3], this.coordC[3]+1, true);
										this.coordC[3] += 1;
									}else{
										repintaPeca(this.coordL[1], this.coordC[1], this.coordL[1], this.coordC[1]+1, true);
										this.coordC[1] += 1;
										repintaPeca(this.coordL[2], this.coordC[2], this.coordL[2], this.coordC[2]+1, false);
										this.coordC[2] += 1;
										repintaPeca(this.coordL[3], this.coordC[3], this.coordL[3], this.coordC[3]+1, true);
										this.coordC[3] += 1;
									}
									break;
								case 2:
									//esquerda
									repintaPeca(this.coordL[3], this.coordC[3], this.coordL[3], this.coordC[3]-1, true);
									this.coordC[3] -= 1;
									if(this.rotacao == 0){
										repintaPeca(this.coordL[0], this.coordC[0], this.coordL[0], this.coordC[0]-1, true);
										this.coordC[0] -= 1;
										repintaPeca(this.coordL[1], this.coordC[1], this.coordL[1], this.coordC[1]-1, false);
										this.coordC[1] -= 1;
										repintaPeca(this.coordL[2], this.coordC[2], this.coordL[2], this.coordC[2]-1, false);
										this.coordC[2] -= 1;
									}else if(this.rotacao == 1){
										repintaPeca(this.coordL[0], this.coordC[0], this.coordL[0], this.coordC[0]-1, true);
										this.coordC[0] -= 1;
										repintaPeca(this.coordL[1], this.coordC[1], this.coordL[1], this.coordC[1]-1, false);
										this.coordC[1] -= 1;
										repintaPeca(this.coordL[2], this.coordC[2], this.coordL[2], this.coordC[2]-1, true);
										this.coordC[2] -= 1;
									}else if(this.rotacao == 2){
										repintaPeca(this.coordL[0], this.coordC[0], this.coordL[0], this.coordC[0]-1, false);
										this.coordC[0] -= 1;
										repintaPeca(this.coordL[1], this.coordC[1], this.coordL[1], this.coordC[1]-1, false);
										this.coordC[1] -= 1;
										repintaPeca(this.coordL[2], this.coordC[2], this.coordL[2], this.coordC[2]-1, true);
										this.coordC[2] -= 1;
									}else{
										repintaPeca(this.coordL[0], this.coordC[0], this.coordL[0], this.coordC[0]-1, true);
										this.coordC[0] -= 1;
										repintaPeca(this.coordL[1], this.coordC[1], this.coordL[1], this.coordC[1]-1, false);
										this.coordC[1] -= 1;
										repintaPeca(this.coordL[2], this.coordC[2], this.coordL[2], this.coordC[2]-1, true);
										this.coordC[2] -= 1;
									}
									break;
							}
						},
						rotacionar:function(){
							switch(this.rotacao){
								case 0:
									var l = this.coordL[2];
									var c = this.coordC[2];
									if(!( tabuleiroPintado(l+1, c) )){ //verifica se nao vai haver colisao ao rotacionar
										this.rotacao=1;
										//a peca 1 nao muda
										repintaPeca(this.coordL[1], this.coordC[1], l+1, c, true);
										this.coordL[1] = l;
										this.coordC[1] = c;
										this.coordL[2] = l;
										this.coordC[2] = c+1;
										this.coordL[3] = l+1;
										this.coordC[3] = c;
									}
									break;
								case 1:
									var l = this.coordL[1];
									var c = this.coordC[1];
									if(!( tabuleiroPintado(l, c-1) )){ //verifica se nao vai haver colisao ao rotacionar
										this.rotacao=2;
										repintaPeca(this.coordL[0], this.coordC[0], l, c-1, true);
										this.coordL[0] = l;
										this.coordC[0] = c-1;
										//a peca 2 nao muda
										//a peca 3 nao muda
										//a peca 4 nao muda
									}
									break;
								case 2:
									var l = this.coordL[1];
									var c = this.coordC[1];
									if(!( tabuleiroPintado(l-1, c) )){ //verifica se nao vai haver colisao ao rotacionar
										this.rotacao=3;
										repintaPeca(this.coordL[2], this.coordC[2], l-1, c, true);
										this.coordL[0] = l-1;
										this.coordC[0] = c;
										this.coordL[1] = l;
										this.coordC[1] = c-1;
										this.coordL[2] = l;
										this.coordC[2] = c;
										this.coordL[3] = l+1;
										this.coordC[3] = c;
									}
									break;
								default:
									var l = this.coordL[2];
									var c = this.coordC[2];
									if(!( tabuleiroPintado(l, c+1) )){ //verifica se nao vai haver colisao ao rotacionar
										this.rotacao=0;
										repintaPeca(this.coordL[3], this.coordC[3], l, c+1, true);
										//a peca 1 nao muda
										//a peca 2 nao muda
										//a peca 3 nao muda
										this.coordL[3] = l;
										this.coordC[3] = c+1;
									}
									break;
							}
						}
					}
				break;
			case 4:
				//L
				return {
						tipo:4,
						rotacao:0,
						coordL:[-2,-1,-1,-1],
						//coordL:[4,5,5,5],
						coordC:[metade-1,metade-1,metade,metade+1],
						cor:"black",
						mover: function(dir){
							switch (dir) {
								case 0:
								//baixo
									repintaPeca(this.coordL[0], this.coordC[0], this.coordL[0]+1, this.coordC[0], true);
									this.coordL[0] += 1;
									if(this.rotacao == 0){
										repintaPeca(this.coordL[1], this.coordC[1], this.coordL[1]+1, this.coordC[1], false);
										this.coordL[1] += 1;
										repintaPeca(this.coordL[2], this.coordC[2], this.coordL[2]+1, this.coordC[2], true);
										this.coordL[2] += 1;
										repintaPeca(this.coordL[3], this.coordC[3], this.coordL[3]+1, this.coordC[3], true);
										this.coordL[3] += 1;
									}else if(this.rotacao == 1){
										repintaPeca(this.coordL[1], this.coordC[1], this.coordL[1]+1, this.coordC[1], true);
										this.coordL[1] += 1;
										repintaPeca(this.coordL[2], this.coordC[2], this.coordL[2]+1, this.coordC[2], false);
										this.coordL[2] += 1;
										repintaPeca(this.coordL[3], this.coordC[3], this.coordL[3]+1, this.coordC[3], false);
										this.coordL[3] += 1;
									}else if(this.rotacao == 2){
										repintaPeca(this.coordL[1], this.coordC[1], this.coordL[1]+1, this.coordC[1], true);
										this.coordL[1] += 1;
										repintaPeca(this.coordL[2], this.coordC[2], this.coordL[2]+1, this.coordC[2], true);
										this.coordL[2] += 1;
										repintaPeca(this.coordL[3], this.coordC[3], this.coordL[3]+1, this.coordC[3], false);
										this.coordL[3] += 1;
									}else{
										repintaPeca(this.coordL[1], this.coordC[1], this.coordL[1]+1, this.coordC[1], false);
										this.coordL[1] += 1;
										repintaPeca(this.coordL[2], this.coordC[2], this.coordL[2]+1, this.coordC[2], true);
										this.coordL[2] += 1;
										repintaPeca(this.coordL[3], this.coordC[3], this.coordL[3]+1, this.coordC[3], false);
										this.coordL[3] += 1;
									}
									break;
								case 1:
									//direita
									repintaPeca(this.coordL[0], this.coordC[0], this.coordL[0], this.coordC[0]+1, true);
									this.coordC[0] += 1;
									if(this.rotacao == 0){
										repintaPeca(this.coordL[1], this.coordC[1], this.coordL[1], this.coordC[1]+1, true);
										this.coordC[1] += 1;
										repintaPeca(this.coordL[2], this.coordC[2], this.coordL[2], this.coordC[2]+1, false);
										this.coordC[2] += 1;
										repintaPeca(this.coordL[3], this.coordC[3], this.coordL[3], this.coordC[3]+1, false);
										this.coordC[3] += 1;
									}else if(this.rotacao == 1){
										repintaPeca(this.coordL[1], this.coordC[1], this.coordL[1], this.coordC[1]+1, false);
										this.coordC[1] += 1;
										repintaPeca(this.coordL[2], this.coordC[2], this.coordL[2], this.coordC[2]+1, true);
										this.coordC[2] += 1;
										repintaPeca(this.coordL[3], this.coordC[3], this.coordL[3], this.coordC[3]+1, true);
										this.coordC[3] += 1;
									}else if(this.rotacao == 2){
										repintaPeca(this.coordL[1], this.coordC[1], this.coordL[1], this.coordC[1]+1, false);
										this.coordC[1] += 1;
										repintaPeca(this.coordL[2], this.coordC[2], this.coordL[2], this.coordC[2]+1, false);
										this.coordC[2] += 1;
										repintaPeca(this.coordL[3], this.coordC[3], this.coordL[3], this.coordC[3]+1, true);
										this.coordC[3] += 1;
									}else{
										repintaPeca(this.coordL[1], this.coordC[1], this.coordL[1], this.coordC[1]+1, true);
										this.coordC[1] += 1;
										repintaPeca(this.coordL[2], this.coordC[2], this.coordL[2], this.coordC[2]+1, true);
										this.coordC[2] += 1;
										repintaPeca(this.coordL[3], this.coordC[3], this.coordL[3], this.coordC[3]+1, false);
										this.coordC[3] += 1;
									}
									break;
								case 2:
									//esquerda
									repintaPeca(this.coordL[3], this.coordC[3], this.coordL[3], this.coordC[3]-1, true);
									this.coordC[3] -= 1;
									if(this.rotacao == 0){
										repintaPeca(this.coordL[0], this.coordC[0], this.coordL[0], this.coordC[0]-1, true);
										this.coordC[0] -= 1;
										repintaPeca(this.coordL[1], this.coordC[1], this.coordL[1], this.coordC[1]-1, false);
										this.coordC[1] -= 1;
										repintaPeca(this.coordL[2], this.coordC[2], this.coordL[2], this.coordC[2]-1, false);
										this.coordC[2] -= 1;
									}else if(this.rotacao == 1){
										repintaPeca(this.coordL[0], this.coordC[0], this.coordL[0], this.coordC[0]-1, false);
										this.coordC[0] -= 1;
										repintaPeca(this.coordL[1], this.coordC[1], this.coordL[1], this.coordC[1]-1, true);
										this.coordC[1] -= 1;
										repintaPeca(this.coordL[2], this.coordC[2], this.coordL[2], this.coordC[2]-1, true);
										this.coordC[2] -= 1;
									}else if(this.rotacao == 2){
										repintaPeca(this.coordL[0], this.coordC[0], this.coordL[0], this.coordC[0]-1, false);
										this.coordC[0] -= 1;
										repintaPeca(this.coordL[1], this.coordC[1], this.coordL[1], this.coordC[1]-1, false);
										this.coordC[1] -= 1;
										repintaPeca(this.coordL[2], this.coordC[2], this.coordL[2], this.coordC[2]-1, true);
										this.coordC[2] -= 1;
									}else{
										repintaPeca(this.coordL[0], this.coordC[0], this.coordL[0], this.coordC[0]-1, true);
										this.coordC[0] -= 1;
										repintaPeca(this.coordL[1], this.coordC[1], this.coordL[1], this.coordC[1]-1, true);
										this.coordC[1] -= 1;
										repintaPeca(this.coordL[2], this.coordC[2], this.coordL[2], this.coordC[2]-1, false);
										this.coordC[2] -= 1;
									}
									break;
							}
						},
						rotacionar:function(){
							switch(this.rotacao){
								case 0:
									var l = this.coordL[2];
									var c = this.coordC[2];
									if(!( tabuleiroPintado(l-1, c) || tabuleiroPintado(l-1, c+1) || tabuleiroPintado(l+1, c) )){ //verifica se nao vai haver colisao ao rotacionar
										this.rotacao=1;
										repintaPeca(this.coordL[0], this.coordC[0], l-1, c, true);
										repintaPeca(this.coordL[1], this.coordC[1], l-1, c+1, true);
										repintaPeca(this.coordL[3], this.coordC[3], l+1, c, true);
										this.coordL[0] = l-1;
										this.coordC[0] = c;
										this.coordL[1] = l-1;
										this.coordC[1] = c+1;
										//a peca 3 nao altera
										this.coordL[3] = l+1;
										this.coordC[3] = c;
									}
									break;
								case 1:
									var l = this.coordL[2];
									var c = this.coordC[2];
									if(!( tabuleiroPintado(l, c-1) || tabuleiroPintado(l, c+1) || tabuleiroPintado(l+1, c+1) )){ //verifica se nao vai haver colisao ao rotacionar
										this.rotacao=2;
										repintaPeca(this.coordL[0], this.coordC[0], l, c-1, true);
										repintaPeca(this.coordL[1], this.coordC[1], l, c+1, true);
										repintaPeca(this.coordL[3], this.coordC[3], l+1, c+1, true);
										this.coordL[0] = l;
										this.coordC[0] = c-1;
										this.coordL[1] = l;
										this.coordC[1] = c;
										this.coordL[2] = l;
										this.coordC[2] = c+1;
										this.coordL[3] = l+1;
										this.coordC[3] = c+1;
									}
									break;
								case 2:
									var l = this.coordL[1];
									var c = this.coordC[1];
									if(!( tabuleiroPintado(l-1, c) || tabuleiroPintado(l+1, c-1) || tabuleiroPintado(l+1, c) )){ //verifica se nao vai haver colisao ao rotacionar
										this.rotacao=3;
										repintaPeca(this.coordL[0], this.coordC[0], l-1, c, true);
										repintaPeca(this.coordL[2], this.coordC[2], l+1, c-1, true);
										repintaPeca(this.coordL[3], this.coordC[3], l+1, c, true);
										this.coordL[0] = l-1;
										this.coordC[0] = c;
										//a peca 2 nao altera
										this.coordL[2] = l+1;
										this.coordC[2] = c-1;
										this.coordL[3] = l+1;
										this.coordC[3] = c;
									}
									break;
								default:
									var l = this.coordL[1];
									var c = this.coordC[1];
									if(!( tabuleiroPintado(l-1, c-1) || tabuleiroPintado(l, c-1) || tabuleiroPintado(l, c+1) )){ //verifica se nao vai haver colisao ao rotacionar
										this.rotacao=0;
										repintaPeca(this.coordL[0], this.coordC[0], l-1, c-1, true);
										repintaPeca(this.coordL[2], this.coordC[2], l, c-1, true);
										repintaPeca(this.coordL[3], this.coordC[3], l, c+1, true);
										this.coordL[0] = l-1;
										this.coordC[0] = c-1;
										this.coordL[1] = l;
										this.coordC[1] = c-1;
										this.coordL[2] = l;
										this.coordC[2] = c;
										this.coordL[3] = l;
										this.coordC[3] = c+1;
									}
									break;
							}
						}
					}
				break;
		}
	}

	function imprimePeca(peca){
		for (var i = 0; i < 4; i++) {
			if(peca.coordL[i] >= 0){
				tabuleiro[peca.coordL[i]][peca.coordC[i]].style.backgroundColor = peca.cor;
			}
		}
	}

	function repintaPeca(coordLOld, coordCOld, coordLNew, coordCNew, apagarAntigo){
			if((coordLOld >= 0) && (apagarAntigo)){
				tabuleiro[coordLOld][coordCOld].style.backgroundColor = 'white';
			}
			if(coordLNew >= 0){
				tabuleiro[coordLNew][coordCNew].style.backgroundColor = peca.cor;
			}
	}

	function verificaBaixoPeca(){
		if(peca.coordL[3] == qtdLinhas - 1){
			console.log("peca chegou ao final do tabuleiro. Criando nova");
			return true;
		}else{
			switch(peca.tipo){
				case 0:
					if(tabuleiroPintado(peca.coordL[2]+1, peca.coordC[2])){
						console.log("bateu 0.0.2");
						return true;
					} else if(tabuleiroPintado(peca.coordL[3]+1, peca.coordC[3])){
						console.log("bateu 0.0.3");
						return true;
					}
					break;
				case 1:
					//console.log(peca.coordL[0] + "," + peca.coordL[1] + "," + peca.coordL[2] + "," + peca.coordL[3]);
					if(peca.rotacao == 0){
						if((peca.coordL[1] >=-1) && (tabuleiroPintado(peca.coordL[1]+1, peca.coordC[1])) ){
							console.log("bateu 1.0.1");
							return true;
						} else if(tabuleiroPintado(peca.coordL[2]+1, peca.coordC[2])){
							console.log("bateu 1.0.2");
							return true;
						} else if(tabuleiroPintado(peca.coordL[3]+1, peca.coordC[3])){
							console.log("bateu 1.0.3");
							return true;
						}
					} else {
						if(tabuleiroPintado(peca.coordL[1]+1, peca.coordC[1])){
							console.log("bateu 1.1.1");
							return true;
						} else if(tabuleiroPintado(peca.coordL[3]+1, peca.coordC[3])){
							console.log("bateu 1.1.3");
							return true;
						}
					}
					break;
				case 2:
					if(peca.rotacao == 0){
						if(tabuleiroPintado(peca.coordL[0]+1, peca.coordC[0])){
							console.log("bateu 2.0.0");
							return true;
						} else if(tabuleiroPintado(peca.coordL[1]+1, peca.coordC[1])){
							console.log("bateu 2.0.1");
							return true;
						} else if(tabuleiroPintado(peca.coordL[2]+1, peca.coordC[2])){
							console.log("bateu 2.0.2");
							return true;
						} else if(tabuleiroPintado(peca.coordL[3]+1, peca.coordC[3])){
							console.log("bateu 2.0.3");
							return true;
						}
					} else {
						if(tabuleiroPintado(peca.coordL[3]+1, peca.coordC[3])){
							console.log("bateu 2.1.3");
							return true;
						}
					}
					break;
				case 3:
					if(peca.rotacao == 0){
						if(tabuleiroPintado(peca.coordL[1]+1, peca.coordC[1])){
							console.log("bateu 3.0.1");
							return true;
						} else if(tabuleiroPintado(peca.coordL[2]+1, peca.coordC[2])){
							console.log("bateu 3.0.2");
							return true;
						} else if(tabuleiroPintado(peca.coordL[3]+1, peca.coordC[3])){
							console.log("bateu 3.0.3");
							return true;
						}
					} else if(peca.rotacao == 1){
						if(tabuleiroPintado(peca.coordL[2]+1, peca.coordC[2])){
							console.log("bateu 3.1.2");
							return true;
						} else if(tabuleiroPintado(peca.coordL[3]+1, peca.coordC[3])){
							console.log("bateu 3.1.3");
							return true;
						}
					} else if(peca.rotacao == 2){
						if(tabuleiroPintado(peca.coordL[0]+1, peca.coordC[0])){
							console.log("bateu 3.2.0");
							return true;
						} else if(tabuleiroPintado(peca.coordL[2]+1, peca.coordC[2])){
							console.log("bateu 3.2.2");
							return true;
						} else if(tabuleiroPintado(peca.coordL[3]+1, peca.coordC[3])){
							console.log("bateu 3.2.3");
							return true;
						}
					} else {
						if(tabuleiroPintado(peca.coordL[1]+1, peca.coordC[1])){
							console.log("bateu 3.3.1");
							return true;
						} else if(tabuleiroPintado(peca.coordL[3]+1, peca.coordC[3])){
							console.log("bateu 3.3.3");
							return true;
						}
					}
					break;
				case 4:
					if(peca.rotacao == 0){
						if(tabuleiroPintado(peca.coordL[1]+1, peca.coordC[1])){
							console.log("bateu 4.0.1");
							return true;
						} else if(tabuleiroPintado(peca.coordL[2]+1, peca.coordC[2])){
							console.log("bateu 4.0.2");
							return true;
						} else if(tabuleiroPintado(peca.coordL[3]+1, peca.coordC[3])){
							console.log("bateu 4.0.3");
							return true;
						}
					} else if(peca.rotacao == 1){
						if(tabuleiroPintado(peca.coordL[1]+1, peca.coordC[1])){
							console.log("bateu 4.1.1");
							return true;
						} else if(tabuleiroPintado(peca.coordL[3]+1, peca.coordC[3])){
							console.log("bateu 4.1.3");
							return true;
						}
					} else if(peca.rotacao == 2){
						if(tabuleiroPintado(peca.coordL[0]+1, peca.coordC[0])){
							console.log("bateu 4.2.0");
							return true;
						} else if(tabuleiroPintado(peca.coordL[1]+1, peca.coordC[1])){
							console.log("bateu 4.2.1");
							return true;
						} else if(tabuleiroPintado(peca.coordL[3]+1, peca.coordC[3])){
							console.log("bateu 4.2.3");
							return true;
						}
					} else {
						if(tabuleiroPintado(peca.coordL[2]+1, peca.coordC[2])){
							console.log("bateu 4.3.2");
							criaPeca();
							return true;
						} else if(tabuleiroPintado(peca.coordL[3]+1, peca.coordC[3])){
							console.log("bateu 4.3.3");
							return true;
						}
					}
					break;

			}
		}
	}

	function verificaEsquerdaPeca(){
		switch(peca.tipo){
			case 0:
				if(peca.coordC[0] == 0){
					console.log("bateu esquerda");
					return true;
				}else if(tabuleiroPintado(peca.coordL[0], peca.coordC[0]-1)){
					console.log("bateu esquerda");
					return true;
				} else if(tabuleiroPintado(peca.coordL[2], peca.coordC[2]-1)){
					console.log("bateu esquerda");
					return true;
				}
				break;
			case 1:
				if(peca.rotacao == 0){
					if(peca.coordC[2] == 0){
						console.log("bateu esquerda");
						return true;
					}else if(tabuleiroPintado(peca.coordL[0], peca.coordC[0]-1)){
						console.log("bateu esquerda");
						return true;
					} else if(tabuleiroPintado(peca.coordL[2], peca.coordC[2]-1)){
						console.log("bateu esquerda");
						return true;
					}
				} else {
					if(peca.coordC[0] == 0){
						console.log("bateu esquerda");
						return true;
					}else if(tabuleiroPintado(peca.coordL[0], peca.coordC[0]-1)){
						console.log("bateu esquerda");
						return true;
					} else if(tabuleiroPintado(peca.coordL[1], peca.coordC[1]-1)){
						console.log("bateu esquerda");
						return true;
					} else if(tabuleiroPintado(peca.coordL[3], peca.coordC[3]-1)){
						console.log("bateu esquerda");
						return true;
					}
				}
				break;
			case 2:
				if(peca.coordC[0] == 0){
					console.log("bateu esquerda");
					return true;
				}else{
					if(peca.rotacao == 0){
						if(tabuleiroPintado(peca.coordL[0], peca.coordC[0]-1)){
							console.log("bateu esquerda");
							return true;
						}
					} else {
						if(tabuleiroPintado(peca.coordL[0], peca.coordC[0]-1)){
							console.log("bateu esquerda");
							return true;
						} else if(tabuleiroPintado(peca.coordL[1], peca.coordC[1]-1)){
							console.log("bateu esquerda");
							return true;
						} else if(tabuleiroPintado(peca.coordL[2], peca.coordC[2]-1)){
							console.log("bateu esquerda");
							return true;
						} else if(tabuleiroPintado(peca.coordL[3], peca.coordC[3]-1)){
							console.log("bateu esquerda");
							return true;
						}
					}
				}
				break;
			case 3:
				if(peca.rotacao == 0){
					if(peca.coordC[1] == 0){
						console.log("bateu esquerda");
						return true;
					}else if(tabuleiroPintado(peca.coordL[0], peca.coordC[0]-1)){
						console.log("bateu esquerda");
						return true;
					} else if(tabuleiroPintado(peca.coordL[1], peca.coordC[1]-1)){
						console.log("bateu esquerda");
						return true;
					}
				} else if(peca.rotacao == 1){
					if(peca.coordC[1] == 0){
						console.log("bateu esquerda");
						return true;
					}else if(tabuleiroPintado(peca.coordL[0], peca.coordC[0]-1)){
						console.log("bateu esquerda");
						return true;
					} else if(tabuleiroPintado(peca.coordL[1], peca.coordC[1]-1)){
						console.log("bateu esquerda");
						return true;
					} else if(tabuleiroPintado(peca.coordL[3], peca.coordC[3]-1)){
						console.log("bateu esquerda");
						return true;
					}
				} else if(peca.rotacao == 2){
					if(peca.coordC[0] == 0){
						console.log("bateu esquerda");
						return true;
					}else if(tabuleiroPintado(peca.coordL[0], peca.coordC[0]-1)){
						console.log("bateu esquerda");
						return true;
					} else if(tabuleiroPintado(peca.coordL[3], peca.coordC[3]-1)){
						console.log("bateu esquerda");
						return true;
					}
				} else {
					if(peca.coordC[1] == 0){
						console.log("bateu esquerda");
						return true;
					}else if(tabuleiroPintado(peca.coordL[0], peca.coordC[0]-1)){
						console.log("bateu esquerda");
						return true;
					} else if(tabuleiroPintado(peca.coordL[1], peca.coordC[1]-1)){
						console.log("bateu esquerda");
						return true;
					} else if(tabuleiroPintado(peca.coordL[3], peca.coordC[3]-1)){
						console.log("bateu esquerda");
						return true;
					}
				}
				break;
			case 4:
				if(peca.rotacao == 0){
					if(peca.coordC[0] == 0){
						console.log("bateu esquerda");
						return true;
					}else if(tabuleiroPintado(peca.coordL[0], peca.coordC[0]-1)){
						console.log("bateu esquerda");
						return true;
					} else if(tabuleiroPintado(peca.coordL[1], peca.coordC[1]-1)){
						console.log("bateu esquerda");
						return true;
					}
				} else if(peca.rotacao == 1){
					if(peca.coordC[0] == 0){
						console.log("bateu esquerda");
						return true;
					}else if(tabuleiroPintado(peca.coordL[0], peca.coordC[0]-1)){
						console.log("bateu esquerda");
						return true;
					} else if(tabuleiroPintado(peca.coordL[2], peca.coordC[2]-1)){
						console.log("bateu esquerda");
						return true;
					} else if(tabuleiroPintado(peca.coordL[3], peca.coordC[3]-1)){
						console.log("bateu esquerda");
						return true;
					}
				} else if(peca.rotacao == 2){
					if(peca.coordC[0] == 0){
						console.log("bateu esquerda");
						return true;
					}else if(tabuleiroPintado(peca.coordL[0], peca.coordC[0]-1)){
						console.log("bateu esquerda");
						return true;
					} else if(tabuleiroPintado(peca.coordL[3], peca.coordC[3]-1)){
						console.log("bateu esquerda");
						return true;
					}
				} else {
					if(peca.coordC[2] == 0){
						console.log("bateu esquerda");
						return true;
					}else if(tabuleiroPintado(peca.coordL[0], peca.coordC[0]-1)){
						console.log("bateu esquerda");
						return true;
					} else if(tabuleiroPintado(peca.coordL[1], peca.coordC[1]-1)){
						console.log("bateu esquerda");
						return true;
					} else if(tabuleiroPintado(peca.coordL[2], peca.coordC[2]-1)){
						console.log("bateu esquerda");
						return true;
					}
				}
				break;
		}
	}

	function verificaDireitaPeca(){
		switch(peca.tipo){
			case 0:
				if(peca.coordC[3] == qtdColunas - 1){
					console.log("bateu direita");
					return true;
				}else if(tabuleiroPintado(peca.coordL[1], peca.coordC[1]+1)){
					console.log("bateu direita");
					return true;
				} else if(tabuleiroPintado(peca.coordL[3], peca.coordC[3]+1)){
					console.log("bateu direita");
					return true;
				}
				break;
			case 1:
				if(peca.rotacao == 0){
					if(peca.coordC[1] == qtdColunas - 1){
						console.log("bateu direita");
						return true;
					}else if(tabuleiroPintado(peca.coordL[1], peca.coordC[1]+1)){
						console.log("bateu direita");
						return true;
					} else if(tabuleiroPintado(peca.coordL[3], peca.coordC[3]+1)){
						console.log("bateu direita");
						return true;
					}
				} else {
					if(peca.coordC[3] == qtdColunas - 1){
						console.log("bateu direita");
						return true;
					}else if(tabuleiroPintado(peca.coordL[0], peca.coordC[0]+1)){
						console.log("bateu direita");
						return true;
					} else if(tabuleiroPintado(peca.coordL[2], peca.coordC[2]+1)){
						console.log("bateu direita");
						return true;
					} else if(tabuleiroPintado(peca.coordL[3], peca.coordC[3]+1)){
						console.log("bateu direita");
						return true;
					}
				}
				break;
			case 2:
				if(peca.coordC[3] == qtdColunas - 1){
					console.log("bateu direita");
					return true;
				}else{
					if(peca.rotacao == 0){
						if(tabuleiroPintado(peca.coordL[3], peca.coordC[3]+1)){
							console.log("bateu direita");
							return true;
						}
					} else {
						if(tabuleiroPintado(peca.coordL[0], peca.coordC[0]+1)){
							console.log("bateu direita");
							return true;
						} else if(tabuleiroPintado(peca.coordL[1], peca.coordC[1]+1)){
							console.log("bateu direita");
							return true;
						} else if(tabuleiroPintado(peca.coordL[2], peca.coordC[2]+1)){
							console.log("bateu direita");
							return true;
						} else if(tabuleiroPintado(peca.coordL[3], peca.coordC[3]+1)){
							console.log("bateu direita");
							return true;
						}
					}
				}
				break;
			case 3:
				if(peca.rotacao == 0){
					if(peca.coordC[3] == qtdColunas - 1){
						console.log("bateu direita");
						return true;
					}else if(tabuleiroPintado(peca.coordL[0], peca.coordC[0]+1)){
						console.log("bateu direita");
						return true;
					} else if(tabuleiroPintado(peca.coordL[3], peca.coordC[3]+1)){
						console.log("bateu direita");
						return true;
					}
				} else if(peca.rotacao == 1){
					if(peca.coordC[2] == qtdColunas - 1){
						console.log("bateu direita");
						return true;
					}else if(tabuleiroPintado(peca.coordL[0], peca.coordC[0]+1)){
						console.log("bateu direita");
						return true;
					} else if(tabuleiroPintado(peca.coordL[2], peca.coordC[2]+1)){
						console.log("bateu direita");
						return true;
					} else if(tabuleiroPintado(peca.coordL[3], peca.coordC[3]+1)){
						console.log("bateu direita");
						return true;
					}
				} else if(peca.rotacao == 2){
					if(peca.coordC[2] == qtdColunas - 1){
						console.log("bateu direita");
						return true;
					}else if(tabuleiroPintado(peca.coordL[2], peca.coordC[2]+1)){
						console.log("bateu direita");
						return true;
					} else if(tabuleiroPintado(peca.coordL[3], peca.coordC[3]+1)){
						console.log("bateu direita");
						return true;
					}
				} else {
					if(peca.coordC[3] == qtdColunas - 1){
						console.log("bateu direita");
						return true;
					}else if(tabuleiroPintado(peca.coordL[0], peca.coordC[0]+1)){
						console.log("bateu direita");
						return true;
					} else if(tabuleiroPintado(peca.coordL[2], peca.coordC[2]+1)){
						console.log("bateu direita");
						return true;
					} else if(tabuleiroPintado(peca.coordL[3], peca.coordC[3]+1)){
						console.log("bateu direita");
						return true;
					}
				}
				break;
			case 4:
				if(peca.rotacao == 0){
					if(peca.coordC[3] == qtdColunas - 1){
						console.log("bateu direita");
						return true;
					}else if(tabuleiroPintado(peca.coordL[0], peca.coordC[0]+1)){
						console.log("bateu direita");
						return true;
					} else if(tabuleiroPintado(peca.coordL[3], peca.coordC[3]+1)){
						console.log("bateu direita");
						return true;
					}
				} else if(peca.rotacao == 1){
					if(peca.coordC[1] == qtdColunas - 1){
						console.log("bateu direita");
						return true;
					}else if(tabuleiroPintado(peca.coordL[1], peca.coordC[1]+1)){
						console.log("bateu direita");
						return true;
					} else if(tabuleiroPintado(peca.coordL[2], peca.coordC[2]+1)){
						console.log("bateu direita");
						return true;
					} else if(tabuleiroPintado(peca.coordL[3], peca.coordC[3]+1)){
						console.log("bateu direita");
						return true;
					}
				} else if(peca.rotacao == 2){
					if(peca.coordC[3] == qtdColunas - 1){
						console.log("bateu direita");
						return true;
					}else if(tabuleiroPintado(peca.coordL[2], peca.coordC[2]+1)){
						console.log("bateu direita");
						return true;
					} else if(tabuleiroPintado(peca.coordL[3], peca.coordC[3]+1)){
						console.log("bateu direita");
						return true;
					}
				} else {
					if(peca.coordC[3] == qtdColunas - 1){
						console.log("bateu direita");
						return true;
					}else if(tabuleiroPintado(peca.coordL[0], peca.coordC[0]+1)){
						console.log("bateu direita");
						return true;
					} else if(tabuleiroPintado(peca.coordL[1], peca.coordC[1]+1)){
						console.log("bateu direita");
						return true;
					} else if(tabuleiroPintado(peca.coordL[3], peca.coordC[3]+1)){
						console.log("bateu direita");
						return true;
					}
				}
				break;
		}
	}

	function incrementaPontuacao(valor){
		pontuacao = pontuacao + valor;
		if(pontuacao % 100 == 0){
			//aumenta a velocidade
		}

		placar.innerHTML = pontuacao;
	}

	function tabuleiroPintado(coordL, coordC){
		if(coordC >= qtdColunas){
			return true;
		}else if(coordC <= -1){
			return true;
		}else if(coordL >= qtdLinhas){
			return true;
		}else if(coordL < 0){
			return true;
		}

		return tabuleiro[coordL][coordC].style.backgroundColor != "white";
	}

	function linhaCompleta(linha){
		for (var j = 0; j < qtdColunas; j++){
			if(tabuleiro[linha][j].style.backgroundColor == "white"){
				//console.log("linha: " + linha + ",coluna: " + j);
				return false;
			}
    }

		return true;
	}

	function moverLinha(linhaOrigem, linhaDestino){
		//nao vai precisar alterar as coordenadas da peca pq uma linha so podera ser movida quando a peca ficar presa
		for (var j = 0; j < qtdColunas; j++){
			tabuleiro[linhaDestino][j].style.backgroundColor = tabuleiro[linhaOrigem][j].style.backgroundColor;
			tabuleiro[linhaOrigem][j].style.backgroundColor = "white";
        }
	}

	function verificaSeLinhaExcluida(){
		var apontaLinha = peca.coordL[3];
		for(var linha=peca.coordL[3]; linha>=peca.coordL[0]; linha--){
			if(linha < 0){
				break;
			}
			if(!linhaCompleta(linha)){
				if(apontaLinha != linha){
					moverLinha(linha,apontaLinha);
				}
				apontaLinha = apontaLinha - 1;
			}else{
				incrementaPontuacao(100);
				console.log("linha completa: " + linha);
			}
		}
		var linha = peca.coordL[0] - 1;
		if(apontaLinha != linha){
			while (linha >= 0) {
				moverLinha(linha,apontaLinha);
				apontaLinha = apontaLinha - 1;
				linha = linha - 1;
			}
			return true;
		}else{
			return false;
		}
	}


	//----
	addEventListener("keydown", function(e) {
		if(gameOver == false){
			if (e.key == "ArrowLeft") {
				//peca.style.left = (parseInt(peca.style.left) - 10) + "px";
				if(!verificaEsquerdaPeca()){
					peca.mover(2);
				}

			} else if (e.key == "ArrowRight") {
				//peca.style.left = (parseInt(peca.style.left) + 10) + "px";
				//console.log(peca.coordC[3]);
				if(!verificaDireitaPeca()){
					peca.mover(1);
				}
			} else if (e.key == "ArrowUp") {
				//peca.style.left = (parseInt(peca.style.left) + 10) + "px";
				//moverPeca([peca.coordL[0]-1, peca.coordL[1]-1, peca.coordL[2]-1, peca.coordL[3]-1], peca.coordC);
				peca.rotacionar();
			} else if (e.key == "ArrowDown") {
				//moverPeca([peca.coordL[0]+1, peca.coordL[1]+1, peca.coordL[2]+1, peca.coordL[3]+1], peca.coordC);
				//peca.mover(0);
				loop();
				//peca.style.left = (parseInt(peca.style.left) + 10) + "px";
			}
		}

		if (e.key == " ") {
			reinicia();
		}
	});

	function loop(){
		if(gameOver == false){
			//console.log(peca.tipo + ":" + peca.coordL[0] + "," + peca.coordL[1] + "," + peca.coordL[2] + "," + peca.coordL[3]);
			if(verificaBaixoPeca()){
				//verifica se alguma linha deve ser excluida
				verificaSeLinhaExcluida();
				criaPeca();
			}else{
					peca.mover(0);
			}
		}
	}

	//----
	inicia();
})();
