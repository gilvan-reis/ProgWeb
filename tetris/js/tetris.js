(function(){
	var qtdLinhas = 46;
	var qtdColunas = 40;
	var FPS = 3;
	//var FPS = 10;
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
		gameLoop = setInterval(loop, 1000/FPS);
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
		}else{
			peca = proximaPeca;
			proximaPeca = novaPeca();
		}

		imprimePeca(peca);
		//clearInterval(gameLoop); //para totalmente o loop
	}

	function novaPeca(){
		//utilizar closure para criar as pecas?
		var metade = Math.floor(qtdColunas/2);
		switch(Math.floor(Math.random() * 5)){
		//switch(0){
			case 0:
				//quadrado
				//colocar rotacao, imprime peca e etc dentro do objeto peca?
				return {
						tipo:0,
						rotacao:0,
						//coordL:[-1,-1,0,0],
						coordL:[4,4,5,5],
						coordC:[metade-1,metade,metade-1,metade],
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
						//coordL:[-1,-1,0,0],
						coordL:[4,4,5,5],
						coordC:[metade,metade+1,metade-1,metade],
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
									//if(!(tabuleiroPintado())){ //verifica se nao vai haver colisao ao rotacionar
									if(true){
										this.rotacao=1;
										var l = this.coordL[0];
										var c = this.coordC[0];
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
									if(true){ //verifica se nao vai haver colisao ao rotacionar
										this.rotacao=0;
										var l = this.coordL[2];
										var c = this.coordC[2];
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
						//coordL:[0,0,0,0],
						coordL:[5,5,5,5],
						coordC:[metade-2,metade-1,metade,metade+1],
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
									if(true){ //verifica se nao vai haver colisao ao rotacionar
										this.rotacao=1;
										var l = this.coordL[2];
										var c = this.coordC[2];
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
									if(true){ //verifica se nao vai haver colisao ao rotacionar
										this.rotacao=0;
										var l = this.coordL[2];
										var c = this.coordC[2];
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
						//coordL:[-1,0,0,0],
						coordL:[4,5,5,5],
						coordC:[metade,metade-1,metade,metade+1],
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
									if(true){ //verifica se nao vai haver colisao ao rotacionar
										this.rotacao=1;
										var l = this.coordL[2];
										var c = this.coordC[2];
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
									if(true){ //verifica se nao vai haver colisao ao rotacionar
										this.rotacao=2;
										var l = this.coordL[1];
										var c = this.coordC[1];
										repintaPeca(this.coordL[0], this.coordC[0], l, c-1, true);
										this.coordL[0] = l;
										this.coordC[0] = c-1;
										//a peca 2 nao muda
										//a peca 3 nao muda
										//a peca 4 nao muda
									}
									break;
								case 2:
									if(true){ //verifica se nao vai haver colisao ao rotacionar
										this.rotacao=3;
										var l = this.coordL[1];
										var c = this.coordC[1];

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
									if(true){ //verifica se nao vai haver colisao ao rotacionar
										this.rotacao=0;
										var l = this.coordL[2];
										var c = this.coordC[2];
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
						//coordL:[-1,0,0,0],
						coordL:[4,5,5,5],
						coordC:[metade-1,metade-1,metade,metade+1],
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
									if(true){ //verifica se nao vai haver colisao ao rotacionar
										this.rotacao=1;
										var l = this.coordL[2];
										var c = this.coordC[2];
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
									if(true){ //verifica se nao vai haver colisao ao rotacionar
										this.rotacao=2;
										var l = this.coordL[2];
										var c = this.coordC[2];
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
									if(true){ //verifica se nao vai haver colisao ao rotacionar
										this.rotacao=3;
										var l = this.coordL[1];
										var c = this.coordC[1];
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
									if(true){ //verifica se nao vai haver colisao ao rotacionar
										this.rotacao=0;
										var l = this.coordL[1];
										var c = this.coordC[1];
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
				tabuleiro[peca.coordL[i]][peca.coordC[i]].style.backgroundColor = 'black';
			}
		}
	}

	function repintaPeca(coordLOld, coordCOld, coordLNew, coordCNew, apagarAntigo){
			if((coordLOld >= 0) && (apagarAntigo)){
				tabuleiro[coordLOld][coordCOld].style.backgroundColor = 'white';
			}
			tabuleiro[coordLNew][coordCNew].style.backgroundColor = 'black';
	}

	function verificaBaixoPeca(){
		if(peca.coordL[3] == qtdLinhas - 1){
			console.log("peca chegou ao final do tabuleiro. Criando nova");
			return true;
		}else{
			switch(peca.tipo){
				case 0:
					if(tabuleiroPintado(peca.coordL[2]+1, peca.coordC[2])){
						console.log("bateu");
						return true;
					} else if(tabuleiroPintado(peca.coordL[3]+1, peca.coordC[3])){
						console.log("bateu");
						return true;
					}
					break;
				case 1:
					if(peca.rotacao == 0){
						if(tabuleiroPintado(peca.coordL[1]+1, peca.coordC[1])){
							console.log("bateu");
							return true;
						} else if(tabuleiroPintado(peca.coordL[2]+1, peca.coordC[2])){
							console.log("bateu");
							return true;
						} else if(tabuleiroPintado(peca.coordL[3]+1, peca.coordC[3])){
							console.log("bateu");
							return true;
						}
					} else {
						if(tabuleiroPintado(peca.coordL[1]+1, peca.coordC[1])){
							console.log("bateu");
							return true;
						} else if(tabuleiroPintado(peca.coordL[3]+1, peca.coordC[3])){
							console.log("bateu");
							return true;
						}
					}
					break;
				case 2:
					if(peca.rotacao == 0){
						if(tabuleiroPintado(peca.coordL[0]+1, peca.coordC[0])){
							console.log("bateu");
							return true;
						} else if(tabuleiroPintado(peca.coordL[1]+1, peca.coordC[1])){
							console.log("bateu");
							return true;
						} else if(tabuleiroPintado(peca.coordL[2]+1, peca.coordC[2])){
							console.log("bateu");
							return true;
						} else if(tabuleiroPintado(peca.coordL[3]+1, peca.coordC[3])){
							console.log("bateu");
							return true;
						}
					} else {
						if(tabuleiroPintado(peca.coordL[3]+1, peca.coordC[3])){
							console.log("bateu");
							return true;
						}
					}
					break;
				case 3:
					if(peca.rotacao == 0){
						if(tabuleiroPintado(peca.coordL[1]+1, peca.coordC[1])){
							console.log("bateu");
							return true;
						} else if(tabuleiroPintado(peca.coordL[2]+1, peca.coordC[2])){
							console.log("bateu");
							return true;
						} else if(tabuleiroPintado(peca.coordL[3]+1, peca.coordC[3])){
							console.log("bateu");
							return true;
						}
					} else if(peca.rotacao == 1){
						if(tabuleiroPintado(peca.coordL[2]+1, peca.coordC[2])){
							console.log("bateu");
							return true;
						} else if(tabuleiroPintado(peca.coordL[3]+1, peca.coordC[3])){
							console.log("bateu");
							return true;
						}
					} else if(peca.rotacao == 2){
						if(tabuleiroPintado(peca.coordL[0]+1, peca.coordC[0])){
							console.log("bateu");
							return true;
						} else if(tabuleiroPintado(peca.coordL[2]+1, peca.coordC[2])){
							console.log("bateu");
							return true;
						} else if(tabuleiroPintado(peca.coordL[3]+1, peca.coordC[3])){
							console.log("bateu");
							return true;
						}
					} else {
						if(tabuleiroPintado(peca.coordL[1]+1, peca.coordC[1])){
							console.log("bateu");
							return true;
						} else if(tabuleiroPintado(peca.coordL[3]+1, peca.coordC[3])){
							console.log("bateu");
							return true;
						}
					}
					break;
				case 4:
					if(peca.rotacao == 0){
						if(tabuleiroPintado(peca.coordL[1]+1, peca.coordC[1])){
							console.log("bateu");
							return true;
						} else if(tabuleiroPintado(peca.coordL[2]+1, peca.coordC[2])){
							console.log("bateu");
							return true;
						} else if(tabuleiroPintado(peca.coordL[3]+1, peca.coordC[3])){
							console.log("bateu");
							return true;
						}
					} else if(peca.rotacao == 1){
						if(tabuleiroPintado(peca.coordL[1]+1, peca.coordC[1])){
							console.log("bateu");
							return true;
						} else if(tabuleiroPintado(peca.coordL[3]+1, peca.coordC[3])){
							console.log("bateu");
							return true;
						}
					} else if(peca.rotacao == 2){
						if(tabuleiroPintado(peca.coordL[0]+1, peca.coordC[0])){
							console.log("bateu");
							return true;
						} else if(tabuleiroPintado(peca.coordL[1]+1, peca.coordC[1])){
							console.log("bateu");
							return true;
						} else if(tabuleiroPintado(peca.coordL[3]+1, peca.coordC[3])){
							console.log("bateu");
							return true;
						}
					} else {
						if(tabuleiroPintado(peca.coordL[2]+1, peca.coordC[2])){
							console.log("bateu");
							criaPeca();
							return true;
						} else if(tabuleiroPintado(peca.coordL[3]+1, peca.coordC[3])){
							console.log("bateu");
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

	function tabuleiroPintado(coordL, coordC){
		if(coordC == qtdColunas){
			return true;
		}else if(coordC == -1){
			return true;
		}else if(coordL == qtdLinhas){
			return true;
		}

		return tabuleiro[coordL][coordC].style.backgroundColor == "black";
	}

	function linhaCompleta(linha){
		for (var j = 0; j < qtdColunas; j++){
			if(tabuleiro[linha][j].style.backgroundColor == "white"){
				return false;
			}
        }

		return true;
	}

	function moverLinha(linhaOrigem, linhaDestino){
		//nao vai precisar alterar as coordenadas da peca pq uma linha so podera ser movida quando a peca ficar presa
		for (var j = 0; j < qtdColunas; j++){
			tabuleiro[linhaDestino][j].style.backgroundColor = tabuleiro[linhaOrigem][j].style.backgroundColor;
        }
	}

	function apagaLinha(linhaOrigem){
		//nao vai precisar alterar as coordenadas da peca pq uma linha so podera ser movida quando a peca ficar presa
		for (var j = 0; j < qtdColunas; j++){
			tabuleiro[linhaDestino][j].style.backgroundColor = "white";
        }
	}

	function verificaSeLinhaExcluida(){
		var apontaLinha = -1;
		for(var linha=peca.coordL[3]; linha<=peca.coordL[0]; i--){
			if(linhaCompleta(linha)){
				if(apontaLinha == -1){
					apontaLinha = linha;
				}
			}else{
				moverLinha(linha,apontaLinha);
				apontaLinha = -1;
			}
		}
	}


	//----
	addEventListener("keydown", function(e) {
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
	});

	function loop(){
		if(!gameOver){
			if(verificaBaixoPeca()){
				//verifica se alguma linha deve ser excluida

				criaPeca();
			}
			//verifica se game over

			peca.mover(0);
			//console.log(peca.coordL[3]);


		}

	}

	//----
	inicia();
})();
