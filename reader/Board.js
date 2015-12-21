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
          var celula = new Cube(scene);
          var piece = new Piece(scene, "silver");
          var piece2 = new Piece(scene, "golden");
		  var piece3 = new Piece(scene, "flagship");
          
       	if(this.board[i][j] === 1) {
         	row[j] = (piece);
         }
         else if(this.board[i][j] === 2) {
         	row[j] = (piece2);
         }
         else if(this.board[i][j] === 5) {
         	row[j] = (piece3);
         }
         else if(this.board[i][j] === 0){
         	row[j] = undefined;
         }
      }
      this.celulas[i] = row;
      this.floor.push(celula);
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
		if(this.celulas[i][j] !== undefined){
			this.celulas[i][j].display();
        }
    }
    this.scene.translate(-11*1.2,0,1.2);
}
  

  this.scene.popMatrix();

};
