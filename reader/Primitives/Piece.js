function Piece(scene, highted, selected, posicaoX, posicaoY) {
    
    CGFobject.call(this, scene);
    this.highlighted = highted;
    this.selected = selected;
    this.posX = posicaoX;
    this.posY = posicaoY;
    
    this.onePiece = new Cube(this.scene);
   
    this.scene = scene;

}
;

Piece.prototype = Object.create(CGFobject.prototype);
Piece.prototype.constructor = Piece;

/*
* Create a piece through the sphere primitive
* @method
*/
Piece.prototype.display = function() {
    this.scene.pushMatrix();
    
    this.scene.translate(this.posX * 1.2, 0, this.posY * 1.2);
    this.onePiece.display();
    
    this.scene.popMatrix();
}
;
