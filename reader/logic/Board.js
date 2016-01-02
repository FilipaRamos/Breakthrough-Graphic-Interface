/**
* Board Constructor
* Constructs a board
* @constructor
*/
function Board(scene) {
    
    this.celulas = [];
    this.floor = [];
    this.board = [];
    this.captured = [];
    this.scene = scene;
    
    this.initFloor();
    
    
    this.textura = new CGFtexture(this.scene,"texture/wood_board.jpg");

    this.textura1 = new CGFtexture(this.scene,"texture/wood_board_highlighted.jpg");
}
;

Board.prototype.constructor = Board;


Board.prototype.initFloor = function() {
    
    var row = [];
    
    for (var y = 0; y < 11; y++) {
        for (var x = 0; x < 11; x++) {
            var piece = new Piece(this.scene,false,false,x,y);
            row[x] = piece;
        }
        this.floor[y] = row;
        row = [];
    }

}

Board.prototype.initCelulas = function() {
    var row = [];
    
    for (y = 0; y < 11; y++) {
        for (x = 0; x < 11; x++) {
            var piece = new Celula(this.scene,this.board[y][x],false,false,x,y);
            if (this.board[y][x] == 1)
                piece.player = 1;
            else if (this.board[y][x] == 2 || this.board[y][x] == 5) {
                piece.player = 0;
            }
            row[x] = piece;
        }
        this.celulas[y] = row;
        row = [];
    }

}

/**
 * draw the vehicle
 * @constructor
 */
Board.prototype.display = function() {
    var i;
    var j;
    var k = 1;
    
    this.scene.pushMatrix();
    
    for (i = 0; i < 11; i++) {
        for (j = 0; j < 11; j++) {
            if (this.floor[i][j].selected)
                this.textura1.bind();
            if (this.floor[i][j].highlighted)
                this.textura1.bind();
            else
                this.textura.bind();
            this.scene.registerForPick(k, this.floor[i][j]);
            this.floor[i][j].display();
            k++;
        
        }
    }
    
    
    k = 500;

    
    if (this.celulas[0] !== undefined) {
        for (i = 0; i < 11; i++) {
            for (j = 0; j < 11; j++) {
                this.scene.registerForPick(k, this.celulas[i][j]);
                if (this.celulas[i][j].primitive !== undefined) {
                   this.celulas[i][j].display();
                }
                k++;
            }
            
        }
    }
    
    for(var l = 0; l < this.captured.length; l++){
        this.captured[l].display();
        this.scene.translate(1.2,0,0);
    }
    
    this.scene.popMatrix();



}
;
