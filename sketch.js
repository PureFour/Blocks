// module aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Mouse = Matter.Mouse,
    Detector = Matter.Detector,
    Events = Matter.Events,
    MouseConstraint = Matter.MouseConstraint;
//
//Main variables
var engine;
var world;
var ground;
var mouse;
var mConstraint;

var boxy =
{
  position :
  {
    x : 250,
    y : 80
  },
  on : true
}
var boxy_width = 75;
var boxy_vel = 5;
var Boxes = [];
//boundaries
var boundaries =
{
  position_L :
  {
    x : 100,
    y : 250
  },
  position_R :
  {
    x : 500,
    y : 250
  },
  size :
  {
    x : 30,
    y : 200
  }
}

//
//sound
var click_sound;
var lose_sound;
var win_sound;
//
function preload()
{
   click_sound = new Audio("click_sound.wav");
   lose_sound = new Audio("lose_sound.wav");
   win_sound = new Audio("win_sound.wav");
}
function setup()
{
  const canvas = createCanvas(600, 500);
  //canvas.position(560, 180);
  engine = Engine.create();
  world = engine.world;
  world.gravity.y = 1;
  frameRate(60);

  function collision()
  {
    boxy_width = random(25, 100);
    boxy.on = true;
    Boxes[Boxes.length - 1].body.isStatic = true;
    //play sound!
    if(click_sound) click_sound.play();
    else console.log("Audio not working!");
    //getting harder!

    //checkWin
    checkWin();
    //checkLose
    checkLose();
  }
  Events.on(engine,'collisionStart', collision);

  //initializing boundaries
  ground = new Bodies.rectangle(width/2, height - 10, width, 30, {isStatic : true});
  boundaryL = new Bodies.rectangle(boundaries.position_L.x, boundaries.position_L.y, boundaries.size.x, boundaries.size.y, {isStatic : true});
  boundaryR = new Bodies.rectangle(boundaries.position_R.x, boundaries.position_R.y, boundaries.size.x, boundaries.size.y, {isStatic : true});
  //mouse section
  const mouse = Mouse.create(canvas.elt);
  const options = {
   mouse: mouse,
 }

 // A fix for HiDPI displays
 mouse.pixelRatio = pixelDensity();
 mConstraint = MouseConstraint.create(engine, options);
 World.add(world, mConstraint);
 World.add(world, ground);
 World.add(world, boundaryL);
 World.add(world, boundaryR);
}
function draw()
{
  setInterval(function() { Engine.update(engine, 20 / 60); }, 10 / 60);
  background(29,32,43);
  //Engine.update(engine);
  rectMode(CENTER);
  fill(255,0,0);
  rect(ground.position.x, ground.position.y, width, 30);
  rect(boundaries.position_L.x, boundaries.position_L.y, 30, 200);
  rect(boundaries.position_R.x, boundaries.position_R.y, 30, 200);

  for(let i = 0; i < Boxes.length; i++)
  {
    Boxes[i].show();
    const pos = Boxes[i].body.position;
    if((pos.x > width || pos.x < 0) || (pos.y > height || pos.y < 0))
    {
      World.remove(world, Boxes[i].body);
      Boxes.splice(i, 1);
      i--;
      console.log(Boxes.length);
    }

  }
  fill(255);
  strokeWeight(1);
  //this is moving pad on top screen
  if(boxy.on)
  {
    rect(boxy.position.x, boxy.position.y, boxy_width, 25);
    if(boxy.position.x > boundaryR.position.x - 50 || boxy.position.x < boundaryL.position.x + 50) boxy_vel = -boxy_vel;
    boxy.position.x += boxy_vel;
  }
}
function mouseDragged()
{
  //Boxes.push(new Box(mouseX, mouseY, 25, 25));
}
function keyPressed()
{
  if(keyCode === 32 && boxy.on)
  {
  //  getAudioContext().resume();
    Boxes.push(new Box(boxy.position.x, boxy.position.y, boxy_width, 25));
    boxy.on = false;
  }
  else {}

  return false;
}
function mouseClicked()
{
  if(boxy.on)
  {
  //  getAudioContext().resume();
    Boxes.push(new Box(boxy.position.x, boxy.position.y, boxy_width, 25));
    boxy.on = false;
  }
  else {}
  return false;
}
function checkWin()
{
  if(Boxes.length > 12)
  {
    noLoop();
    console.log("WIN!");
    win_sound.play();
  }
}
function checkLose()
{
  const last_one = Boxes[Boxes.length - 1];
  if(Boxes.length > 1)
  if(last_one.body.position.y == Boxes[Boxes.length - 2].body.position.y || last_one.body.position.y > 450)
  {
    noLoop();
    console.log("LOSE!");
    lose_sound.play();
  }
}
