/**
* Board Constructor
* Constructs a board
* @constructor
*/
function Board(scene) {
    
  this.celulas = [];
  this.floor = []; 
  this.board = [[0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,1,1,1,1,1,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0],
				[0,1,0,0,2,2,2,0,0,1,0],	
				[0,1,0,2,0,0,0,2,0,1,0],
				[0,1,0,2,0,5,0,2,0,1,0],	
				[0,1,0,2,0,0,0,2,0,1,0],
				[0,1,0,0,2,2,2,0,0,1,0],
				[0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,1,1,1,1,1,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0]];

  var i=0;
  var j=0;

  this.scene = scene;
  var row = [];

  for(i=0; i<11; i++){
    for(j=0; j<11; j++){
      var celula = new Celula(scene, this.board[i][j], false, false);
      var piece = new Cube(scene); 
      row[j] =  celula;
    }
    this.celulas[i] = row;
    this.floor.push(piece);
    row = [];
  }
 
	this.textura = new CGFtexture(this.scene,"texture/nave.jpg");


};

Board.prototype.constructor = Board;

/**
 * draw the vehicle
 * @constructor
 */
Board.prototype.display = function() 
{
    var i;
    var j;

this.scene.pushMatrix();

for(i=0; i<11; i++){
  for(j=0; j<11; j++){
    this.scene.translate(1.2,0,0);
    this.textura.bind();	
	this.floor[j].display();
		
    }
    this.scene.translate(-11*1.2,0,1.2);
}
 
 this.scene.translate(0,1,-11*1.2);

 for(i=0; i<11; i++){
    for(j=0; j<11; j++){
    	this.scene.translate(1.2,0,0);
    	this.scene.registerForPick(j+1, this.celulas[i][j]); 
		if(this.celulas[i][j].primitive !== undefined){
			this.celulas[i][j].primitive.display();
        }
    }
    this.scene.translate(-11*1.2,0,1.2);
}
 

  this.scene.popMatrix();

};
