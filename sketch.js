var tower,towerImg;
var door,doorImg,doorGroup;
var climber,climberImg,climberGroup;
var ghost,ghostImg;
var invisibleblock,invisibleblockGroup;
var gameState="play";

function preload(){
  towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  ghostImg=loadImage("ghost-standing.png");
  spookySound=loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  
  //spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY=1;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost standing",ghostImg);
  ghost.scale=0.3;
  
  doorGroup=createGroup();
  climberGroup=createGroup();
  invisibleblockGroup=new Group();
}

function draw(){
  if(gameState==="play"){
    
      if(tower.y>600){
    tower.y=300;
  }
  spawnDoors();

  
  if(keyDown("space")){
    ghost.velocityY=-10;
  }
  ghost.velocityY=ghost.velocityY + 0.8;
  
  if(keyDown("left")){
    ghost.x=ghost.x - 2;
  }
  
   if(keyDown("right")){
    ghost.x=ghost.x + 2;
  }
  
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  
  if(invisibleblockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState="end";
  }
  }
  drawSprites();
   if(gameState==="end"){
     textSize(55);
     fill("blue");
     strokeWeight(20)
     stroke("red");
     textAlign(CENTER);
     text("GAME OVER",width/2,height/2);
   }
   
}

function spawnDoors(){
  if(frameCount % 280===0){
    door=createSprite(200,-50);
    door.addImage("door",doorImg);
    door.x=Math.round(random(120,400));
    door.velocityY=1;
    doorGroup.add(door);
    door.lifetime = 800;
    
    climber=createSprite(200,10);
    climber.addImage(climberImg);
            
    invisibleblock=createSprite(200,15);
    invisibleblock.width=climber.width;
    invisibleblock.height=2;
    invisibleblock.x=door.x;
    
    climber.velocityY=1;
    climber.x=door.x;
    climber.lifetime=800;
    invisibleblock.velocityY=1;
    invisibleblock.debug=true;
    climberGroup.add(climber);

    invisibleblockGroup.add(invisibleblock);
    
    door.depth = ghost.depth;
    ghost.depth = ghost.depth+1;
  }
  
}