/**
* Constructor for the animation for a piece that has been captured
* @constructor
*/
function CapturePieceAnimation(scene, pos, initTime) {
    
    this.pos = pos;
    this.initTime = initTime ;
   
    this.maxHight = 5;
    
    this.totalTime = 20;
    this.t0;
    
    this.totalTime /= 1000;
    this.scene = scene;
    
    this.done = false;

}

CapturePieceAnimation.prototype.constructor = CapturePieceAnimation;

/**
* Update the capture Animation
* @method
*/
CapturePieceAnimation.prototype.update = function(currentTime) {
    
    var time = (currentTime/1000 - this.initTime);
    
    var t = time / this.totalTime;
    
      if (t >= 0 && t < 0.2) {
         
        var des = -4 * this.maxHight * t;
        
        this.scene.translate(this.pos[0] * 1.2 , des*t + 0.5, this.pos[1] * 1.2);
    
   } 
    else {
        
        this.done = true;
        this.scene.setPickEnabled(true);
    
    }

}
