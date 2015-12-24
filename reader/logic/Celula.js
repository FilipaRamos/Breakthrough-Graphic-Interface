function Celula(scene, type, highted, selected) {
  this.type = type; 
  this.highlighted = highted;
  this.selected = selected;
  this.primitive={};
  this.posicao = [];
  this.player;
   
  if(this.type === 0)
    this.primitive = undefined;   
  else if(this.type === 1)
    this.primitive = new Piece(scene, "silver");
  else if(this.type === 2)
    this.primitive = new Piece(scene, "golden");
  else if(this.type === 5)
    this.primitive = new Piece(scene, "flagship");
 
    };


Celula.prototype.constructor = Celula;
