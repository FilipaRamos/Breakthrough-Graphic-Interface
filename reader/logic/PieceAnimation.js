function PieceAnimation(scene, posInit, posFinal) {
    
    var centerPlaneY = Math.abs(Math.floor((posFinal[1] - posInit[1]) / 2));
    var centerPlaneX = Math.abs(Math.floor((posFinal[0] - posInit[0]) / 2));
    
    var radius;
    if (centerPlaneX != 0)
        this.radius = centerPlaneX;
    else
        radius = centerPlaneY;
        
    if (centerPlaneX != 0)
       this.center = [centerPlaneX, 0, centerPlaneY];
    else
        radius = centerPlaneY;

    this.startang = 0;
    this.rotang = 180;
    this.time = 2;

    this.time /= 1000;
    this.scene = scene;


}

PieceAnimation.prototype.constructor = PieceAnimation;

PieceAnimation.prototype.update = function(currentTime){
    currentTime/=1000;
    this.scene.translate(this.center[0], this.center[1], this.center[2]);

	var time = currentTime / 1000;

    if (time > this.time)
     return;

    var move = currentTime / this.time;

    var ang =  - (this.startang + this.rotang * move);

    this.scene.rotate(ang, 0, 1, 0);
    this.scene.translate(this.radius, 0, 0);

}