var player;

function setup() {
  createCanvas(600,400);
  player = new ship();
}

function draw() {
  background(0);
  player.show();
  keyPressed();

}

function keyPressed(){// moves ship. need firing code block -Argenis
  if (keyCode === RIGHT_ARROW){
    if(player.x != width){
      player.move(1);
    }
  } else if (keyCode === LEFT_ARROW){
    if(player.x !=0){
      player.move(-1)
    }
  }


}
