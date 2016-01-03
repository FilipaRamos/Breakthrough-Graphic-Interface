function timerDisplay(scene) {

  CGFobject.call(this, scene);


};

timerDisplay.prototype = Object.create(CGFobject.prototype);
timerDisplay.prototype.constructor = timerDisplay;

/*
* Create a piece through the sphere primitive
* @method
*/
timerDisplay.prototype.display = function (time) {

	var separated = [], sNumber = time.toString();

	for (var i = 0, len = sNumber.length; i < len; i += 1) {
    	separated.push(+sNumber.charAt(i));
	}

	this.scene.pushMatrix();

	this.scene.translate(15, 0.5, 4);
	this.scene.rotate(-1.5, 1,0,0);
	this.scene.scale(2,2,2);

		for(var k = 0; k < separated.length; k ++){

			this.scene.activeShader.setUniformsValues({'charCoords': [separated[k], 3]});
			this.scene.timer.display();

			this.scene.translate(1,0,0);

		}

	this.scene.popMatrix();

};

timerDisplay.prototype.getLetters = function(){


};