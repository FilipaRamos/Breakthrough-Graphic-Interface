function Piece(scene, type) {

  CGFobject.call(this, scene);
  this.onePiece = new MySphere(scene, 0.5, 50, 25);   

  this.type = type;
  this.scene = scene;

};

Piece.prototype = Object.create(CGFobject.prototype);
Piece.prototype.constructor = Piece;

/*
* Create a piece through the sphere primitive
* @method
*/
Piece.prototype.display = function () {
  this.scene.pushMatrix();
  
  // apply the texture
  if (this.type === "silver") // silver ship
   //this.scene.silverAppearance.apply();
   this.scene.silverTexture.bind();
  else if (this.type === "golden") // golden ship
   //this.scene.goldenAppearance.apply();
    this.scene.goldenTexture.bind();
  else if (this.type === "flagship") // the flagship
    this.scene.falgShipTexture.bind();
 // else
 //   return "error on the ship's type";

 // create a sphere which will be the piece
  this.onePiece.display(); 
  
  this.scene.popMatrix();
};
