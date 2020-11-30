var ground, invisibleGround;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage, monkey, monkey_running, monkey_collided;
var foodGroup, obstacleGroup;
var survivalTime = 0;
var score = 0;
var PLAY =1;
var END =0;
var gameState = PLAY;

function preload(){
  
  //loading monkey images
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_collided = ("sprite_0.png");
  
  //loading banana image
  bananaImage = loadImage("banana.png");
  
  //loading obstacle image
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  
  createCanvas(400, 400)
  
  //craeting monkey
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = true;

  
  //creating ground
  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -3;
  ground.x = ground.width/2;
  
  //creating food and obstacle froups
  foodGroup = new Group();
  obstacleGroup = new Group();
  
}


function draw() {
  
  background("white");
  
  //displaying score
  stroke("white");
  textSize(20);
  fill("white");
  text("score: " + score, 500, 50);
  
  //displaying survival time
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time: " + survivalTime, 100, 50);
  
  
  
  if (gameState === PLAY)
    {
      
      //making infinite ground
      if (ground.x <= 0)
      {
        ground.x = ground.width/2;
      }
      
      //making monkeyjump when space is pressed
      if(keyDown("space") && monkey.y >= 300)
      {
      monkey.velocityY = -15;
      }
  
      //calling food and obstacles functions
      food();
      obstacles();
      
      //applying gravity to monkey
      monkey.velocityY = monkey.velocityY + 0.8;
      
      survivalTime = Math.ceil(frameCount/frameRate());
      
      if (obstacleGroup.isTouching(monkey))
    {
      gameState = END;
    }
  
  }
    else if (gameState === END)
        {
          //monkey.addAnimation("collided", monkey_collided);
          ground.velocityX = 0;
          monkey.velocityX = 0;
          foodGroup.setVelocityXEach(0);
          obstacleGroup.setVelocityXEach(0);

          foodGroup.setLifetimeEach(-1);
          obstacleGroup.setLifetimeEach(-1);
        }
  
  monkey.collide(ground);
  
  drawSprites();
}

function food()
{
  //creating banana after every 80 frames
  if (frameCount % 80 === 0)
    {
      var banana = createSprite(380, 315, 20, 20);
      banana.addImage(bananaImage);
      banana.scale = 0.1;
      
      //giving random y position
      banana.y = Math.round(random(120,200));
      
      //giving velocity and lifetime
      banana.velocityX = -4;
      banana.lifetime = 100;  
      
      banana.depth = monkey.depth;
      monkey.depth = monkey.depth +1;
      
      //adding banana into food group
      foodGroup.add(banana);
    }
  
}

function obstacles()
{
  //creating obstacle after every 300 frames
  if (frameCount % 300 === 0)
    {
      var obstacle = createSprite(380, 330, 20, 20);
      obstacle.addImage(obstacleImage);
      obstacle.scale = 0.1;
      
      //giving velocity and lifetime
      obstacle.velocityX = -5;
      obstacle.lifetime = 80;
      
      //adding obstacle into obstacles group
      obstacleGroup.add(obstacle);
    }
}
