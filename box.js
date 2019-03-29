class Box
{
  constructor(x, y, width, height)
  {
    const options =
    {
      restitution : 0,
      friction : 1,
      mass : 1
    }
    this.body = Bodies.rectangle(x, y, width, height, options); //creating physics body
    World.add(world, this.body); //adding to world
    this.width = width;
    this.height = height;
    this.color = [random(255),random(255), random(255)];
  }

  show()
  {
    const pos = this.body.position;
    push();
    fill(this.color);
    rect(pos.x, pos.y, this.width, this.height);
    pop();
  }

  remove_when_off_screen()
  {
    const pos = this.body.position;
    if((pos.x > width || pos.x < 0) || (pos.y > height || pos.y < 0))
    {
      World.remove(world, this.body);
    }
  }
}
