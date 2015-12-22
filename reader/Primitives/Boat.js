function Boat(scene) {
	 CGFobject.call(this, scene);

};

Boat.prototype = Object.create(CGFobject.prototype);
Boat.prototype.constructor=Boat;


Boat.prototype.dispaly = function () {

 var triangEqui = MyTriangle(scene, -1, 0, 0, 1, 0, 0, 0, Math.sqrt(3), 0);
 var triangRect = MyTriangle(scene, 0, 0, 0, 1, 0, 0, 0, 1, 0);

    this.scene.pushMatrix();
    var i;
    for(i = 0; i < 6; i++){

    }

};

/**
* updating texture coordinates
* @constructor
*/
Boat.prototype.updateTextCoords = function(s,t){};