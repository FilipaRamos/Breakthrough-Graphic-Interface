function PieceAnimation(scene, posInit, posFinal) {
    
    this.diffPlaneY = Math.abs((posFinal[1] - posInit[1]));
    this.diffPlaneX = Math.abs((posFinal[0] - posInit[0]));
    
    this.positions = [];
    this.vecMovimento = [Math.abs(posFinal[0] - posInit[0]), Math.abs(posFinal[1] - posInit[1])];
    //[xf-xi, yf- yi]
    this.maxHight = 5;
    
    this.totalTime = 20;
    
    this.totalTime /= 1000;
    this.scene = scene;


}

PieceAnimation.prototype.constructor = PieceAnimation;

PieceAnimation.prototype.update = function(currentTime) {
    
    var time = currentTime / 1000;
    
    var t = time / this.totalTime;
    
    if (t > 0 && t < 1) {
        
        var des = -4 * this.maxHight * t * t + 4 * this.maxHight * t;

        this.scene.translate(this.vecMovimento[0] * t, des, this.vecMovimento[1] * t);
    
    }
    else{
       var des = -4 * this.maxHight + 4 * this.maxHight ;

        this.scene.translate(this.vecMovimento[0] , des, this.vecMovimento[1]);
    
    }

}
