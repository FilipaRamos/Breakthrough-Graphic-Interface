function Piece(scene, texture, piece) {

  CGFobject.call(this, scene);

  if(piece == "boat"){
    this.onePiece = new MyBoat(scene); /*(scene, 0.5, 50, 25)*/
  }
  else if(piece == "ship")
    this.onePiece = new MyVehicle(scene);

  this.texture = texture;
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
  if (this.texture === "silver") // silver ship
   this.scene.silverTexture.bind();
  else if (this.texture === "golden") // golden ship
    this.scene.goldenTexture.bind();
  else if (this.texture === "flagship") // the flagship
    this.scene.falgShipTexture.bind();

 // create a sphere which will be the piece
  this.scene.scale(1,0.5,0.5);
  this.scene.rotate(Math.PI/2, 0,1,0);
  this.onePiece.display(); 
  
  this.scene.popMatrix();
};
