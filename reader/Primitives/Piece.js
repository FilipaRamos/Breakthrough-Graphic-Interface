function Piece(scene, type, position) {
	CGFobject.call(this,scene);

  this.type = type;
  this.position = position;

  if (this.type == "silver") // silver ship

  else if (this.type == "golden") // golden ship

  else if (this.type == "flagship") // the flagship

  else
    return "error on the ship's type";

    this.initBuffers();
};

Piece.prototype = Object.create(CGFobject.prototype);
Piece.prototype.constructor=Piece;


Piece.prototype.initBuffers = function () {
      
  

  this.primitiveType=this.scene.gl.TRIANGLES;
  this.initGLBuffers();
};