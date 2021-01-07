const Constraint = Matter.Constraint;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var engine, world;
var ball, sling;
var basket1, basket2, basket3, basket4, basket5;

var bg;

var score = 0;
var flag = false;
var level = 1;

var clapSound;

function preload(){
  bg = loadImage("images/background.jpg");

  clapSound = loadSound("sounds/clap.mp3");
}

function setup() {
  createCanvas(windowWidth-20, windowHeight-130);
  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);
  ball = new Ball(200, 150, 30); 
  sling = new SlingShot(ball.body,{x : 200, y : 150});
  basket1 = new Basket(width-700, 20, 30);
  basket2 = new Basket(width-600, 20, 30);
  basket3 = new Basket(width-400, 20, 30);
  basket4 = new Basket(width-200, 20, 30);
  basket5 = new Basket(width-100, 20, 30);
}

function draw() {
  background(bg);  
  textSize(35);
  fill("white");
  text("Score: " + score, windowWidth-200, 50);
  ball.display();
  sling.display();
  if(score<50){
    level = 1;
  }else if(score>=50 && score<100){
    level = 2;
  }else if(score >= 100 && score<150){
    level = 3;
  }else if(score >= 150 && score <200){
    level = 4;
  }else if(score >= 200 && score <500){
    level = 5;
  }else{
    World.remove(world, basket5.body);
    level = 6;
    textSize(50);
    fill("white");
    text("YOU WIN!!!", width/2-100, height/2);
  }

  if(level === 1){
  basket1.display(2);
  basket2.display(6);
  basket3.display(4);
  basket4.display(7);
  basket5.display(8);

  detectCollision(ball, basket1, 3);
  detectCollision(ball, basket2, 7);
  detectCollision(ball, basket3, 5);
  detectCollision(ball, basket4, 9);
  detectCollision(ball, basket5, 10);
}else if(level === 2){
  //console.log("111");

  World.remove(world, basket1.body);

  //console.log("222");

  basket2.display(7);
  basket3.display(5);
  basket4.display(8);
  basket5.display(9);

  detectCollision(ball, basket2, 8);
  detectCollision(ball, basket3, 6);
  detectCollision(ball, basket4, 10);
  detectCollision(ball, basket5, 11);
}else if(level === 3){
  World.remove(world, basket2.body);

  basket3.display(6);
  basket4.display(9);
  basket5.display(10);

  detectCollision(ball, basket3, 7);
  detectCollision(ball, basket4, 11);
  detectCollision(ball, basket5, 12);
}else if(level === 4){
  World.remove(world, basket3.body);

  basket4.display(10);
  basket5.display(11);

  detectCollision(ball, basket4, 15);
  detectCollision(ball, basket5, 17);
}else if(level === 5){
  World.remove(world, basket4.body);

  basket5.display(12);

  detectCollision(ball, basket5, 20);
}
if(touches.length>0){
  Matter.Body.setPosition(ball.body, {
    x : 200,
    y : 150
  })
  sling.attach(ball.body);
  touches = [];
}

  //console.log(ball.body.position.x + " "+ball.body.position.y);

}

function keyPressed(){
  if(keyCode === 32){
    Matter.Body.setPosition(ball.body, {
      x : 200,
      y : 150
    })
    sling.attach(ball.body);
  }

}

function mouseDragged(){
  if(ball.body.position.x < 250){
    Matter.Body.setPosition(ball.body, {x: mouseX , y: mouseY});
  }
}




function mouseReleased(){

  flag = true;

  sling.fly();
  
}

function detectCollision(lball, lbasket, points){
  ballPosition = lball.body.position;
  basketPosition = lbasket.body.position;
  var distance = dist(ballPosition.x, ballPosition.y, basketPosition.x, basketPosition.y);
  if(distance <= lbasket.r+ lball.r && flag){
    console.log("collisionDetected");
    score = score+points;
    flag = false;

    clapSound.play();
  }
}