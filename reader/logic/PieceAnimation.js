function PieceAnimation(scene, posInit, posFinal, initTime) {
    
    this.posFinal = posFinal;
    this.posInit = posInit;
    this.initTime = initTime ;
    
    this.vecMovimento = [posFinal[0] - posInit[0] , posFinal[1]  - posInit[1]];
    //[xf-xi, yf- yi]
    this.maxHight = 5;
    
    this.totalTime = 20;
    this.t0;
    
    this.totalTime /= 1000;
    this.scene = scene;
    
    this.done = false;

}

PieceAnimation.prototype.constructor = PieceAnimation;

PieceAnimation.prototype.update = function(currentTime) {
    
    var time = (currentTime/1000 - this.initTime);
    
    var t = time / this.totalTime;
    
      if (t >= 0 && t < 1) {
         
        var des = -4 * this.maxHight * t * t + 4 * this.maxHight * t;
        
        this.scene.translate(this.posInit[0] * 1.2 + this.vecMovimento[0] * 1.2 * t, des + 0.5 , this.posFinal[1] *1.2 + this.vecMovimento[1] * 1.2 * t);
    
   } 
    else {
        var des = -4 * this.maxHight + 4 * this.maxHight;
        
        this.scene.translate( this.posInit[0] + this.vecMovimento[0] , des  , this.posFinal[1]);
        
        this.done = true;
    
    }

}
