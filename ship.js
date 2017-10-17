function ship(){
  this.x = width/2;

  this.show = function(){
    fill(255);
    rectMode(CENTER);
    noStroke();
    rect(this.x,height-30,20,30);
    rect(this.x,height-45,5,10);
    rect(this.x+13,height-17,15,25);
    rect(this.x-13,height-17,15,25);
    // draws ship, placeholder? Can be replaced with face-Argenis
    }

  this.move = function(dir){
    this.x += dir*8;
  }


}
