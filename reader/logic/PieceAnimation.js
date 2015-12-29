function PieceAnimation(scene, posInit, posFinal) {
    
    this.posFinal = posFinal;
    this.posInit = posInit;
    
    this.vecMovimento = [posFinal[0]*1.2 - posInit[0]*1.2 , posFinal[1]*1.2  - posInit[1]*1.2];
    //[xf-xi, yf- yi]
    this.maxHight = 5;
    
    this.totalTime = 20;
    
    this.totalTime /= 1000;
    this.scene = scene;
    
    this.done = false;


}

PieceAnimation.prototype.constructor = PieceAnimation;

PieceAnimation.prototype.update = function(currentTime) {
    
    var time = currentTime / 1000;
    
    var t = time / this.totalTime;
    
   if (t > 0 && t < 1) {
        
        var des = -4 * this.maxHight * t * t + 4 * this.maxHight * t;
        
        this.scene.translate(this.posInit[0]*1.2 + this.vecMovimento[0] * t, des + 0.5 , this.posFinal[1] * 1.2);
    
   } 
    else {
        var des = -4 * this.maxHight + 4 * this.maxHight;
        
        this.scene.translate( this.posInit[0]*1.2 + this.vecMovimento[0] , des + 0.5 , this.posFinal[1] * 1.2);
        
        this.done = true;
    
    }

}
