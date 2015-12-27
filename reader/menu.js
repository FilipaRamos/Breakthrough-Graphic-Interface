function menu(scene) {

  CGFobject.call(this, scene);

};

menu.prototype = Object.create(CGFobject.prototype);
menu.prototype.constructor = menu;

/*
* Create a piece through the sphere primitive
* @method
*/
menu.prototype.display = function () {
 	
	this.option1 = new Cube(this.scene, false, false);
	this.scene.registerForPick(1, this.option1);
	this.option2 = new Cube(this.scene, false, false);
	this.scene.registerForPick(2, this.option2);
	this.option3 = new Cube(this.scene, false, false);
	this.scene.registerForPick(3, this.option3);

	this.scene.pushMatrix();

		this.scene.scale(10,10,10);

		// set character to display to be in the 6th column, 5th line (0-based)
		// the shader will take care of computing the correct texture coordinates 
		// of that character inside the font texture (check shaders/font.vert )
		// Homework: This should be wrapped in a function/class for displaying a full string

		this.scene.activeShader.setUniformsValues({'charCoords': [12,4]});
		this.scene.logo.display();

		this.scene.translate(1,0,0);
		this.scene.activeShader.setUniformsValues({'charCoords': [1,4]});
		this.scene.logo.display();

		this.scene.translate(1,0,0);
		this.scene.activeShader.setUniformsValues({'charCoords': [9,4]});
		this.scene.logo.display();

		this.scene.translate(1,0,0);
		this.scene.activeShader.setUniformsValues({'charCoords': [7,4]});
		this.scene.logo.display();

	this.scene.popMatrix();

/*
	this.scene.pushMatrix();
	this.scene.translate(-1,0,5);
	//this.scene.scale(2,2,2);
	this.option1.display();
	this.scene.translate(5.5,0,0);
	//this.scene.scale(2,2,2);
	this.option2.display();
	this.scene.translate(6,0,0);
	this.scene.scale(4,4,4);
	this.option3.display();
	this.scene.popMatrix();*/

};