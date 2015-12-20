/**
* Board Constructor
* Constructs a board
* @constructor
*/
function Board(scene) {
    
  this.celulas = [];
  var i=0;
  var j=0;
  this.scene = scene;

  for(i=0; i<10; i++){
    for(j=0; j<10; j++){
          var celula = new Cube(scene);
          this.celulas.push(celula);
      }
  }
 
    this.appearance = new CGFappearance(this.scene);
	//this.appearance.setSpecular(1, 1, 1, 1);
	this.appearance.setShininess(100);
	this.appearance.setDiffuse(0.4,0.4, 0.4, 1);
	//this.appearance.setAmbient(1, 1, 1, 1);
	this.textura = new CGFtexture(this.scene,"texture/nave.jpg");


};

Board.prototype.constructor = Board;

/**
 * draw the vehicle
 * @constructor
 */
Board.prototype.display = function() 
{
    var i=0;
    var j=0;

  this.scene.pushMatrix();
    for(; j<10; j++){
         for(i=0; i<10; i++){
            this.scene.translate(1.2,0,0);
            //this.appearance.apply();
            this.textura.bind();
            this.celulas[j].display();
        }
      
     this.scene.translate(-10*1.2,0,1.2);
     
  }

  this.scene.popMatrix();

};
