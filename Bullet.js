function Bullet(x,y){
  this.x = x;
  this.y = y;

  this.show = function(){
    fill(0,255,0);
    //noStroke();
    rect(this.x,this.y,12,12);
  }

  this.move = function(){
    this.y = this.y - 3;
  }
}
