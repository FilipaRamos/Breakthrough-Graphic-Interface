function Game(scene) {
    this.connection = new Connection();
    this.scene = scene;
    this.initTabuleiro = new Board(scene);
    this.newTabuleiro = new Board(scene);
    this.costLeft = 2;
    this.state = "start";
    this.selectedObj;
    
    this.jogadas = [];
    this.player = 0;
    this.possibleMoves = [];
    
    this.init();
}
;

Game.prototype.constructor = Game;

Game.prototype.init = function() {
    var self = this;
    this.connection.initBoard(function(board) {
        self.initTabuleiro.board = board;
        self.initTabuleiro.initCelulas();
    });
}

Game.prototype.getMoves = function(posX, posY) {
    var self = this;
    this.connection.getMoves(this.initTabuleiro.board, this.player, this.costLeft, function(arr) {
        // arr lista de 3 elementos
        console.log("posX " + posX);
        console.log("posY " + posY);
        var initList = arr[0];
        for (var i = 0; i < initList.length; i++) {
            if (posX === (initList[i][0] - 1) && posY === (initList[i][1] - 1)) {
                console.log(arr[0][i][0] - 1);
                self.possibleMoves.push([arr[1][i][0] - 1, arr[1][i][1] - 1]);
            }
        }
        
        for (i = 0; i < self.possibleMoves.length; i++) {
            self.initTabuleiro.floor[self.possibleMoves[i][0]][self.possibleMoves[i][1]].highlighted = true;
        }

        self.initTabuleiro.floor[self.selectedObj.posicao[0]][self.selectedObj.posicao[1]].highlighted = true;
    
    });
}

Game.prototype.movePiece = function(posX, posY, posXFinal, posYFinal) {
    //movePiece(Board,X,Y,XF,YF,NewBoard2)
    var self = this;
    console.log("inicial: " + posX + 1 + " y " + posY + 1);
    console.log("final: " + posXFinal + 1 + " y " + posYFinal + 1);
    this.connection.movePiece(this.initTabuleiro.board, posX + 1, posY + 1, posXFinal + 1, posYFinal + 1, function(newBoard) {
        // arr lista de 3 elementos
        console.log(newBoard);
        self.initTabuleiro.board = newBoard;
        self.initTabuleiro.initCelulas();
        
        for (i = 0; i < self.possibleMoves.length; i++) {
            self.initTabuleiro.floor[self.possibleMoves[i][0]][self.possibleMoves[i][1]].highlighted = false;
        }
        self.initTabuleiro.floor[self.selectedObj.posicao[0]][self.selectedObj.posicao[1]].highlighted = false;

        self.possibleMoves = [];
    });

}

Game.prototype.display = function() {
    
    this.scene.pushMatrix();
    this.initTabuleiro.display();
    this.scene.popMatrix();

}

Game.prototype.deselect = function(){
     for (i = 0; i < this.possibleMoves.length; i++) {
           this.initTabuleiro.floor[this.possibleMoves[i][0]][this.possibleMoves[i][1]].highlighted = false;
      }

      this.initTabuleiro.floor[this.selectedObj.posicao[0]][this.selectedObj.posicao[1]].highlighted = false;
}

Game.prototype.clickEvent = function(id, obj) {
    
    if (this.state == "start") {
        if (id > 500 && obj.player == this.player) {
            this.selectedObj = obj;
            this.getMoves(obj.posicao[0], obj.posicao[1]);
            this.state = "selected";
        }
    } 
    else 
    if (this.state == "selected") 
    {
        if (this.selectedObj == obj) {
            this.deselect();
            this.state = "start";
        } 
        else {
            if (obj.highlighted) {
                this.movePiece(this.selectedObj.posicao[1], this.selectedObj.posicao[0], obj.posicao[1], obj.posicao[0]);
                this.state = "move";
            }
           }
      
    }
    
    else
    if (this.state == "move") {
          this.state = "analyse";
    }
    
    if (this.state == "analyse") {
        return;
    }

}
