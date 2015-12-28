/*
* Celula 
* @constructor
*/
function Celula(scene, type, highted, selected, posicaoX, posicaoY) {
    
    this.scene = scene;
    this.type = type;
    this.highlighted = highted;
    this.selected = selected;
    this.animation;
    this.primitive = {};
    this.posX = posicaoX;
    this.posY = posicaoY;
    
    this.player;
    
    if (this.type === 0)
        this.primitive = undefined;
    else if (this.type === 1) {
        this.primitive = new MyBoat(scene);
        this.type = "silver"
    } 
    else if (this.type === 2) {
        this.primitive = new MyBoat(scene);
        this.type = "golden"
    } 
    else if (this.type === 5) {
        this.primitive = new MyBoat(scene);
        this.type = "flagship"
    }

}
;

Celula.prototype.constructor = Celula;

Celula.prototype.display = function() {
    
    this.scene.pushMatrix();
    
    if (this.type === "silver")
        
        this.scene.silverTexture.bind();
    
    else if (this.type === "golden")
        
        this.scene.goldenTexture.bind();
    
    else if (this.type === "flagship")
        
        this.scene.falgShipTexture.bind();
        
    this.scene.translate(this.posX * 1.2, 0.5, this.posY * 1.2);
    this.scene.scale(1, 0.5, 0.5);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
     
    this.primitive.display();
    
    this.scene.popMatrix();
}
;
