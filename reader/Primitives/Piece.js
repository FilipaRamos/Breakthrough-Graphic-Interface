function Piece(scene, type, position) {
	CGFobject.call(this,scene);

  this.type = type;
  this.position = position;

  if (this.type == "silver") // silver ship
    this.textureFilePath = 'images/ship.png';
  else if (this.type == "golden") // golden ship
    this.textureFilePath = 'images/goldenShip.png';
  else if (this.type == "flagship") // the flagship
    this.textureFilePath = 'images/flagShip.png';
  else
    return "error on the ship's type";

  this.initBuffers(scene);
};

Piece.prototype = Object.create(CGFobject.prototype);
Piece.prototype.constructor=Piece;

/*
* Create a piece through the sphere primitive
* @method
*/
Piece.prototype.initBuffers = function (scene) {
  
  // create a sphere which will be the piece
  this.piece = new MySphere(scene, 1, 50, 1);    

  // create and load the texture and apply it
  this.loadTexture();
  this.pieceAppearance.apply();
  // translate the piece to its location
  this.scene.translate(this.position[0], this.position[1], this.position[2]);

  this.primitiveType=this.scene.gl.TRIANGLES;
  this.initGLBuffers();
};

/*
* Load texture to apply on the piece
* @method
*/
Piece.prototype.loadTexture = function () {

  this.pieceAppearance = new CGFappearance(this);
  this.pieceAppearance.loadTexture(this.textureFilePath);
  this.pieceAppearance.setSpecular(0, 0, 0, 1);
  this.pieceAppearance.setShininess(10);
  this.pieceAppearance.setDiffuse(0.4,0.4, 0.4, 1);

};