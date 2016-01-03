function CircularAnimation(scene, id, time, center, radius, startang, rotang){

    this.id = id;
    this.time = time;
    this.center = center;
    this.radius = radius;
    this.startang = startang*Math.PI/180;
    this.rotang = rotang*Math.PI/180; 

    this.time /= 1000;

}

CircularAnimation.prototype.constructor = CircularAnimation;

/*
* Update das coordenadas 
* @constructor
*/
CircularAnimation.prototype.update = function(currentTime){
    currentTime/=1000;
    this.scene.translate(parseFloat(this.center[0]), parseFloat(this.center[1]), parseFloat(this.center[2]));

	var time = currentTime / 1000;

    if (time > this.time)
     return;

    var move = currentTime / this.time;

    var ang =  - (this.startang + this.rotang * move);

    this.scene.rotate(ang, 0, 1, 0);
    this.scene.translate(this.radius, 0, 0);

}
