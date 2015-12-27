/*
* Celula 
* @constructor
*/
function Celula(scene, type, highted, selected, posicaoX, posicaoY) {
 
  this.type = type; 
  this.highlighted = highted;
  this.selected = selected;
  this.animation;
  this.primitive={};
  this.posX = posicaoX;
  this.posY = posicaoY;
  
  this.player;
   
  if(this.type === 0)
    this.primitive = undefined;   
  else if(this.type === 1)
    this.primitive = new Piece(scene, "silver", this.scene.pieceType);
  else if(this.type === 2)
    this.primitive = new Piece(scene, "golden", this.scene.pieceType);
  else if(this.type === 5)
    this.primitive = new Piece(scene, "flagship", this.scene.pieceType);
 
};

Celula.prototype.constructor = Celula;
