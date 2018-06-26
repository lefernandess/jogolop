var x = 100, y = 100, dx = 2, dy = 0, vidas = 3, disparo = true, xd, yd, xj, yj, xinimigo, yinimigo;
var raio = 40, raioj= 18, raiod = 4, colisao = false, corv=255, cora=0, nivel = 1

// mantém fixo o valor da posicao, evitar que a bala persiga o jogador.
var	alvox = 0;
var alvoy = 0;
var rand;

var tamanhoInimigo = 80;

var x_inimigo_orig;
var y_inimigo_orig;
var frutax;
var frutay;
var life_fruta;
var tiroVelocidade;

var background_img;

var monstro;
var personagem;
var coracao;

var comeco;

function setup(){
  
  createCanvas (500, 500); //tamanho da area
  personagem = loadImage("imagens/personagem.png");
  personagem2 = loadImage("imagens/personagem2.png");
  monstro = loadImage("imagens/monstro.png");
  coracao = loadImage("imagens/coracao.png");
  xj = 50;
  xd = xj;
  xinimigo = 200
  yinimigo = 400

  
  tiroVelocidade = 3;
  
  x_inimigo_orig = xinimigo;
  y_inimigo_orig = yinimigo;
  fruta = true;
  life_fruta = 2;
  
  comeco = true;
    
  yj = 340;
  yd = yj;

  frutax = 400;
  frutay = 100;
  
  tamanhoInimigo = 80;

  background_img = loadImage("imagens/fundo.png");
}

function draw(){
  // Tela inicial.
  if( comeco == true ){
    background(0);
	  textSize(50);
	  fill(255);
    text("RUN",width/2-80 , height/2-30);
    textSize(13);
    text("Pressione qualquer tecla para iniciar o jogo!",width/2-130 , height/2+100 );
    
    if(keyIsPressed === true){
      comeco = false;
    }
  } else{
    // se o disparo sumir na tela
    if (xd >= width || yd >= height) {
		  xd = 2;
    	yd = x;
      alvox = x;
  		alvoy = y;
    }
  

    // Movimenta o jogador.
	  if (keyIsDown(LEFT_ARROW)){
		  x -= 5;
		  image(personagem2, x-18, y-18, 36, 36);
  	}
	
    if (keyIsDown(RIGHT_ARROW)){
		  x += 5;
		  image(personagem2, x-18, y-18, 36, 36);
  	}
	
    if (keyIsDown(UP_ARROW)){
		  y -= 5;
		  image(personagem2, x-18, y-18, 36, 36);
  	}
	  
    if (keyIsDown(DOWN_ARROW)){
      y += 5;
      image(personagem2, x-18, y-18, 36, 36);
	  }
  
	  // movimentação do disparo
	  // se o disparo estiver ativo
	  if (disparo) {
		  // movimenta o disparo / tiro
		  xd = xd + tiroVelocidade;
		  yd = alvoy;
	  }


	  background (50); //fundo 
	  background(background_img);
  
	  if (disparo) {
		  fill (255, 255, 0)
		  // desenha a elipse / disparo
		  ellipse(xd,yd,8,8);
	  }
  
    //fill (corv, 0, cora); //cor vermelha
    //ellipse(xinimigo, yinimigo, tamanhoInimigo, tamanhoInimigo);
    image(monstro, xinimigo-(tamanhoInimigo/2), yinimigo-(tamanhoInimigo/2), tamanhoInimigo, tamanhoInimigo);
  
    // Quando o inimigo se encontra com o jogador.
    if((xinimigo-(tamanhoInimigo/2)) >= (x-18) && (xinimigo+(tamanhoInimigo/2)) <= (x+18)){
      if( (yinimigo-(tamanhoInimigo/2)) >= (y-18) && (yinimigo+(tamanhoInimigo/2)) <= (y+18)){
        vidas-=1;
      }
    }
  
    if(tamanhoInimigo <= 5){
      nivel++;
      xinimigo = random(0, 500);
      yinimigo = random(0,500);
      tamanhoInimigo = 80*nivel/2;
      tiroVelocidade += 2;
    }
   
    // Caso a bala atinga o inimigo.
    if( xd >= (xinimigo-(tamanhoInimigo/2)) && xd <= (xinimigo+(tamanhoInimigo/2))){
      if( yd >= (yinimigo-(tamanhoInimigo/2)) && yd <= (yinimigo+(tamanhoInimigo/2))){
        tamanhoInimigo -= 15;
      
        // Controla a repetição de tiros.
        yd = 0;
        xd = 0;
      }
    } 
  
  	// Objeto para dar mais vida para o jogador.
  	//fill(255);
  	//rect(frutax, frutay, 20, 20);
  	image(coracao, frutax, frutay, 20, 20);
  
	  // desenha jogador
	  //fill (0, 255, 0);
	  //ellipse( x, y, 36, 36); // tamanho do jogador
    image(personagem, x-18, y-18, 36, 36);
  
  	if( alvox == 0 && alvoy == 0){
	  	alvox = x;
  		alvoy = y;
    }
  
  	// Tiro atingiu o jogador
 	  if( yd >= (y - 18) && yd <= (y + 18)){
      if( xd >= (x - 18) && xd <= (x + 18)){
      	// Perde uma vida sempre que é atingido.
        vidas--;
        
        // Controla a repetição de tiros.
        yd = 0;
        xd = 0;
      }
    }
    
    // Fruta é o que dá mais uma vida ao usuário.
  	
    if( x >= frutax-10 && x <= frutax+10 && y >= frutay-10 && y <= frutay+10 ){
      vidas++;

      // Remove a fruta do cenário.
      frutax = 510; frutay = 510;
    }

	rand = random(0,2300)
    if( rand == 1){
      frutax = 300;
      frutay = 450;
    }

  
  if( x < 18 )
    x = 18;
  if( y < 18 )
    y = 18;
  if( y > height-18 )
    y = height-18;
  if( x > width-18 )
    x = width-18;
  
  // Realiza a ação do inimigo.
  if((x-18) >= (xinimigo-(tamanhoInimigo/2)) && (x+18) <= (xinimigo+(tamanhoInimigo/2)) ){
    if( (y-18) >= (yinimigo-(tamanhoInimigo/2)) && (y+18) <= (yinimigo+(tamanhoInimigo/2))){
      vidas-=1;
      
    }
  } else{
    if(xinimigo-(tamanhoInimigo/2) >= x-18)
      xinimigo--;
    else
      xinimigo++;
    
    if(yinimigo-(tamanhoInimigo/2) >= y-18)
      yinimigo--;
    else
      yinimigo++;
  }
  
  
  
  // Texto das vidas.
  textSize(20);
  fill(0);
  text("VIDAS: " + vidas, 400, 60); //texto
  text("NIVEL: " + nivel, 400, 20);
   
   // Caso o jogador perca.
  if( vidas == 0 ){
	  background(0);
    textSize(40);
    fill(200, 200, 40);
    text("GAME OVER", 130, 250);
    exit(0);
  }
  
  // Caso o jogador ganhe chegando ao 5º nível, é 6 pelo fato de que deve-se executar o 5 nivel totalmente.
  if( nivel == 6 ){
	  background(0);
    textSize(40);
    fill(200,200,40);
    text("VENCEDOR", 120, 250);
    exit(0);
  }
  
}
}
