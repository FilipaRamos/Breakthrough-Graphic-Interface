function Piece(scene, type, position) {
	CGFobject.call(this,scene);

  this.type = type;
  this.position = position;
  this.scene = scene;

};

Piece.prototype = Object.create(CGFobject.prototype);
Piece.prototype.constructor = Piece;

/*
* Create a piece through the sphere primitive
* @method
*/
Piece.prototype.display = function () {
  this.onePiece = new MySphere(this.scene, 1, 50, 25);   
  this.scene.pushMatrix();
  
  // create a sphere which will be the piece
  this.onePiece.display(); 

  // apply the texture
  if (this.type == "silver") // silver ship
    this.scene.silverAppearance.apply();
  else if (this.type == "golden") // golden ship
    this.scene.goldenAppearance.apply();
  else if (this.type == "flagship") // the flagship
    this.scene.falgShipAppearance.apply();
  else
    return "error on the ship's type";

  // translate the piece to its location
  this.scene.translate(this.position[0], this.position[1], this.position[2]);

  this.scene.popMatrix();

};
