var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;
var zombie2, zombieImg2;
var zombie3, zombieImg3;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var zombieGroup;
var theme


var bulletImg
var bullets = 100;
var life = 3;

var gameState = "fight"

var score = 0


function preload(){
  
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  zombieImg = loadImage("assets/zombie.png")
  zombieImg2 = loadImage("assets/zombie2.png")
  zombieImg3 = loadImage("assets/zombie3.png")  


  bulletImg = loadImage("assets/bullet.png")

  bgImg = loadImage("assets/bg.jpg")
  
  theme = loadSound("assets/AllOfUs_Theme.mp3")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  console.log(canvas) 



//criar o sprite do jogador
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   //player.debug = true
   player.setCollider("rectangle",0,0,250,450)


   //criar sprites para representar as vidas restantes
   heart1 = createSprite(displayWidth - 160,displayHeight-725,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.15

  

    heart2 = createSprite(displayWidth - 130,displayHeight-725,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth - 100,displayHeight-725,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4
    console.log(heart3.x)
    console.log(heart3.y)

    //criar o grupo para os zumbis e as balas
    bulletGroup = new Group()
    zombieGroup = new Group()



}

function draw() {
 

  background(bgImg); 

  textSize(40)
  fill("white")
  text("Pontuação:" + score, displayWidth - 1350,displayHeight-710)

  

if(gameState === "fight"){

  theme.setVolume(0.5)
  theme.play()

  if(life===3){
    heart3.visible = true
    heart1.visible = false
    heart2.visible = false
  }
  if(life===2){
    heart2.visible = true
    heart1.visible = false
    heart3.visible = false
  }
  if(life===1){
    heart1.visible = true
    heart3.visible = false
    heart2.visible = false
  }

  //vá para gameState "lost" (perdeu) quando restar 0 vidas 
  if(life===0){
    heart1.visible = false
    heart3.visible = false
    heart2.visible = false
    gameState = "lost"
    
  }
  

  //mover o jogador para cima e para baixo e tornar o jogo compatível com dispositivos móveis usando touches (toques)
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-15
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+15
}
if(keyDown("LEFT_ARROW")||touches.length>0){
  player.x = player.x-15
 }
 if(keyDown("RIGHT_ARROW")||touches.length>0){
  player.x = player.x+15
 }


//disparar as balas e mudar a imagem do atirador para a posição de tiro quando a tecla espaço for pressionada
//disparar as balas e mudar a imagem do atirador para a posição de tiro quando a tecla espaço for pressionada
if(keyWentDown("space")){

  bulletSpawn()
  

}

//o jogador volta à imagem original quando paramos de pressionar a tecla espaço
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

//vá para gameState (estado do jogo) "bala" quando o jogador ficar sem balas
if(bullets== -1){
  gameState = "bullet"
    
}

//destruir o zumbi quando a bala tocar nele
if(zombieGroup.isTouching(bulletGroup)){
  for(var i=0;i<zombieGroup.length;i++){  
    for(var j=0;j<bulletGroup.length;j++){    
      //escreva uma condição para quando o zombiegroup (grupo de zumbi) tocar bulletGroup (grupo de bala)
 
      if(zombieGroup[i].isTouching(bulletGroup[j])){
//destruir o zumbi
        
        zombieGroup[i].destroy()
        bulletGroup[j].destroy()
        score = score + 100
        } 
        
      }
  }
}
 if(score == 10000 ){
  gameState = "won"
 }
//destruir o zumbi quando o jogador tocar nele
if(zombieGroup.isTouching(player)){

 for(var i=0;i<zombieGroup.length;i++){     
      
  if(zombieGroup[i].isTouching(player)){
       zombieGroup[i].destroy()
       life = life - 1
//Diminua a vida
       } 
 
 }
}

//chamar a função para gerar os zumbis
enemy1();
enemy2();
enemy3();
}

drawSprites();

//destrua o zumbi e o jogador e exiba uma mensagem no gameState "lost" (perdeu)
if(gameState == "lost"){

  zombieGroup.destroyEach()
  player.destroy()
  textSize(100)
  fill("white")
  text("Você Perdeu", windowWidth - windowWidth/2 - 300, windowHeight - windowHeight/2)
  
  textSize(100)
  fill("red")

  //use texto para mostrar que você perdeu
  //destrua o grupo de zumbis
  //destrua o jogador
 

}

//destrua o zumbi e o jogador e exiba uma mensagem no gameState "won" (ganhou)
 if(gameState == "won"){
 
  textSize(50)
  fill("White")
  text("Parabens por Conseguir a Pontuação Maxima !!! ", windowWidth - windowWidth/2 - 500,windowHeight - windowHeight/2)
  zombieGroup.destroyEach();
  player.destroy();

}

//destruir o zumbi, jogador e balas e exibir uma mensagem no gameState "bala"
else if(gameState == "bullet"){
 
  textSize(50)
  fill("white")
  text("Você ficou sem balas!!! Mas conseguiu " + score + " pontos",windowWidth - windowWidth/2 - 600,windowHeight - windowHeight /2)
  zombieGroup.destroyEach();
  player.destroy();
  bulletGroup.destroyEach();

}

}


//criar função para gerar os zumbis
function bulletSpawn(){
  bullet = createSprite(player.x+30,player.y-30,20,10)
  bullet.velocityX = 20
  bullet.lifetime = 3000
  bullet.addImage(bulletImg)
  bullet.scale = 0.2

  
  bulletGroup.add(bullet)
  player.depth = bullet.depth
  player.depth = player.depth+2
  player.addImage(shooter_shooting)
  bullets = bullets-1
 
}
function enemy1(){
  if(frameCount%30===0){

    //atribuir posições x e y aleatóripraas para o zumbi aparecer
    zombie = createSprite(windowWidth + 50 ,random(100,windowHeight - 100),40,40)

    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -4
    zombie.debug= true
    zombie.setCollider("rectangle",0,0,450,900)
   
    zombie.lifetime = 1500
   zombieGroup.add(zombie)
  }
}

function enemy2(){
  if(frameCount%50===0){

    //atribuir posições x e y aleatórias para o zumbi aparecer
    zombie2 = createSprite(windowWidth + 50 ,random(100,windowHeight - 100),40,40)

    zombie2.addImage(zombieImg2)
    zombie2.scale = 0.15
    zombie2.velocityX = -7
    zombie2.debug= true
    zombie2.setCollider("rectangle",0,0,450,900)
   
    zombie2.lifetime = 1500
   zombieGroup.add(zombie2)
  }
}

function enemy3(){
  if(frameCount%120===0){

    //atribuir posições x e y aleatórias para o zumbi aparecer
    zombie3 = createSprite(windowWidth + 50 ,random(100,windowHeight - 100),40,40)

    zombie3.addImage(zombieImg3)
    zombie3.scale = 0.15
    zombie3.velocityX = -10
    zombie3.debug= true
    zombie3.setCollider("rectangle",0,0,450,900)
   
    zombie3.lifetime = 1500
   zombieGroup.add(zombie3)
  }
}
 