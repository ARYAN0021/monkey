
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground,groundImage;
var PLAY=1;
var gameState=PLAY;
var END=0;
var invisibleGround;
function preload(){ 
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage=loadImage("s.png")
  over=loadImage("l.png")
}



function setup() {
  createCanvas(500,400);
 ground=createSprite(200,200,500,400);
  ground.addImage("ground",groundImage);
  ground.scale=1.6;
  ground.velocityX=-8;
  ground.x=ground.width/2;
   
  monkey=createSprite(40,370,10,10);
  monkey.addAnimation("run",monkey_running);
  monkey.scale=0.1;
  
  invisibleGround=createSprite(40,380,10,10);
  invisibleGround.visible=false;
  
 
   score=0;
  
  
  FoodGroup=createGroup();
  obstacleGroup=createGroup();
}


function draw() {

    monkey.collide(invisibleGround);
if (gameState === PLAY){
  
  ground.velocityX=-4;
  food();
  obstacles();
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  if (keyDown("space")){
    monkey.velocityY = -21;
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  
  if (monkey.isTouching(FoodGroup)){
       FoodGroup.destroyEach();
      score=score+1;
      monkey.scale += 0.01;
  }
    if (monkey.isTouching(obstacleGroup)){
      gameState = END;
      
    }
   
      }
  
drawSprites();
if (gameState=== END) {
  FoodGroup.setLifetimeEach(-1);
  obstacleGroup.setLifetimeEach(-1);
   obstacleGroup.setVelocityXEach(0);
   FoodGroup.setVelocityXEach(0);   
   ground.velocityX=0;
   monkey.velocityY=0;
   FoodGroup.destroyEach();
   obstacleGroup.destroyEach();
   
  textSize(40);
  fill(255);
  text("GAME OVER",150,200)
   
}
   stroke("black");
  textSize(20);
  fill("black");
  text("SCORE : "+ score,370,40);
}
function food(){
  if (World.frameCount%80===0){
 var
 banana=createSprite(500,Math.round(random(70,200)),10,10);
    banana.addImage("b",bananaImage);
    banana.scale=0.13;
    banana.lifetime=200;
    banana.velocityX=-7;
    FoodGroup.add(banana);
  }
}

function obstacles(){
  if (World.frameCount%300===0){
  var rock=createSprite(600,330,10,10);
    rock.addImage("stone",obstacleImage);
    rock.scale=0.2;
    rock.lifetime=150;
    rock.velocityX=-6;
    obstacleGroup.add(rock);
  }
}


