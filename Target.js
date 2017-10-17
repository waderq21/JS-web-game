function Target(x,y) {
 this.x = x;
 this.y = y;
    this.show = function(){
    fill(255);
    rectMode(CENTER);
    noStroke();
    rect(this.x,this.y,32,32);

}
this.move = function(x){
  this.x+=x;
}
this.shift = function(y){
  this.y+=y;
}
}
