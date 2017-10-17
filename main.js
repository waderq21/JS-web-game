var player;
var targets = [];
var targetsDir=-1;
var gameOver;
function setup() {
  createCanvas(600,400);
  player = new ship();
  
  for (var i = 9; i >= 5; i--) {
    targets[i]=new Target(50+50*i,height/6);
  }
  for (var i = 4; i >= 0; i--) {
    targets[i]=new Target(50+50*i+250,height/6+50);
  }
  gameOver=false;
}

function draw() {
  background(0);
  player.show();
  for (var i = 9; i >= 0; i--) {
    if(targets[i].x>600){
       targetsDir=-1;
       shiftAll();
       ;
    }
    if(targets[i].x<0){
       targetsDir=1;
       shiftAll();
       ;
    }
    if(targets[i].y>3500){
        gameOver =true;
    }
  }
  for (var i = 9; i >= 0; i--) {
    targets[i].move(targetsDir*6)
  }
  for (var i = 9; i >= 0; i--) {
    targets[i].show();
  }
  keyPressed();
  //target new Target();
    }

function shiftAll(){
  for (var i = 9; i >= 0; i--) {
          targets[i].shift(10);
          }
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
