function Piece(scene, type) {

  CGFobject.call(this, scene);
  this.onePiece = new MyBoat(scene) /*(scene, 0.5, 50, 25)*/;   
  
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
   this.scene.silverTexture.bind();
  else if (this.type === "golden") // golden ship
    this.scene.goldenTexture.bind();
  else if (this.type === "flagship") // the flagship
    this.scene.falgShipTexture.bind();

 // create a sphere which will be the piece
  this.scene.scale(1,0.5,0.5);
  this.scene.rotate(Math.PI/2, 0,1,0);
  this.onePiece.display(); 
  
  this.scene.popMatrix();
};
