function CameraAnimation(scene, initTime) {
    
    this.startang = 0;
    this.rotang = 3;

    this.currAng=0;
    
    
    this.initTime = initTime;
    this.totalTime = 10;

    this.scene = scene;
    
    this.done = false;

}

CameraAnimation.prototype.constructor = CameraAnimation;

CameraAnimation.prototype.update = function(currentTime) {
    
    var move = (currentTime - this.initTime) / (this.totalTime);
    var ang = (Math.PI * move);

    currAng=ang-this.currAng;
    
    if (ang >= Math.PI) {
        this.done = true;
        return;
    } 
    
    else
        this.scene.application.interface.activeCamera.orbit(CGFcameraAxisID.Y, currAng);

   this.currAng=ang;
}
