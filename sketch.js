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
var boxy =
{
  position :
  {
    x : 320,
    y : 80
  },
  on : true
}
var boxy_width = 75;
var vel = 3;
var Boxes = [];
var mConstraint;

//sound
var click_sound;
var lose_sound;
var win_sound;
//

function setup()
{
  const canvas = createCanvas(1000, 500);
  engine = Engine.create();
  world = engine.world;

  function collision()
  {

    boxy_width = random(25, 100);
    boxy.on = true;
    Boxes[Boxes.length - 1].body.isStatic = true;
    // if(Boxes.length > 1)
    //   Boxes[Boxes.length - 1].body.position.y = Boxes[Boxes.length - 2].body.position.y - 25;
  }
  Events.on(engine,'collisionStart', collision);

  ground = new Bodies.rectangle(width/2, height - 10, width, 30, {isStatic : true});
  ground1 = new Bodies.rectangle(width/4, height/2, 30, 200, {isStatic : true});
  ground2 = new Bodies.rectangle(width/2 + width/4, height/2, 30, 200, {isStatic : true});
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
 World.add(world, ground1);
 World.add(world, ground2);
}
function draw()
{
  background(29,32,43);
  Engine.update(engine);
  rectMode(CENTER);
  fill(255,0,0);
  rect(ground.position.x, ground.position.y, width, 30);
  rect(ground1.position.x, ground1.position.y, 30, 200);
  rect(ground2.position.x, ground2.position.y, 30, 200);

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
    // if(!Boxes[i].body.isStatic)
    //   Boxes[i].check_ground();
  }
  fill(255);
  strokeWeight(1);
  if(boxy.on)
  {
    rect(boxy.position.x, boxy.position.y, boxy_width, 25);
    if(boxy.position.x > 700 || boxy.position.x < 300) vel = -vel;
    boxy.position.x += vel;
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
    Boxes.push(new Box(boxy.position.x, boxy.position.y, boxy_width, 25));
    boxy.on = false;
  }
  return false;
}
function mouseClicked()
{
//  Boxes.push(new Box(mouseX, mouseY, 25, 25));
}
