function Menu(scene) {

  CGFobject.call(this, scene);

};

Menu.prototype = Object.create(CGFobject.prototype);
Menu.prototype.constructor = Menu;

/*
* Create a piece through the sphere primitive
* @method
*/
Menu.prototype.display = function () {
 	
	this.option1 = new Cube(this.scene, false, false);
	this.option2 = new Cube(this.scene, false, false);
	this.option3 = new Cube(this.scene, false, false);

	this.scene.pushMatrix();
	this.scene.translate(0,10,0);
	//this.scene.translate(10,0,0);
	this.option1.display();
	this.scene.popMatrix();

};