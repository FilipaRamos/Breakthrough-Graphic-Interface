function Game(scene) {
    this.connection = new Connection();
    this.scene = scene;
    this.initTabuleiro = new Board(scene);
    this.newTabuleiro = new Board(scene);
    this.newPiece;
   
    
    this.state = "start";
    this.selectedObj;
    this.costLeft = 2;
    this.history = [];
   
    this.player = 0;
    this.possibleMoves = [];
    this.movesCost = [];
    this.animations = [];
    
    this.init();
}
;

Game.prototype.constructor = Game;

Game.prototype.init = function() {
    var self = this;
    this.connection.initBoard(function(board) {
        self.initTabuleiro.board = board;
        self.history.push(board);
        self.initTabuleiro.initCelulas();
    });
}

Game.prototype.getMoves = function(posX, posY) {
    var self = this;
    this.connection.getMoves(this.initTabuleiro.board, this.player, this.costLeft, function(arr) {
        // arr lista de 3 elementos
        console.log("posX " + posX);
        console.log("posY " + posY);
        console.log(arr);
        var initList = arr[0];
        for (var i = 0; i < initList.length; i++) {
            if (posX == (initList[i][0] - 1) && posY == (initList[i][1] - 1)) {
                console.log(arr[0][i][0] - 1);
                self.possibleMoves.push([arr[1][i][0] - 1, arr[1][i][1] - 1]);
                self.movesCost.push(arr[2][i]);
            }
        }
        
        for (i = 0; i < self.possibleMoves.length; i++) {
            self.initTabuleiro.floor[self.possibleMoves[i][1]][self.possibleMoves[i][0]].highlighted = true;
        }

        self.initTabuleiro.celulas[self.selectedObj.posX][self.selectedObj.posY].highlighted = true;
    
    });
}

Game.prototype.movePiece = function(posX, posY, posXFinal, posYFinal) {
    //movePiece(Board,X,Y,XF,YF,NewBoard2)
    var self = this;
    console.log("inicial: " + posX + 1 + " y " + posY + 1);
    console.log("final: " + posXFinal + 1 + " y " + posYFinal + 1);
    this.connection.movePiece(this.initTabuleiro.board, posX + 1, posY + 1, posXFinal + 1, posYFinal + 1, function(newBoard) {
        // arr lista de 3 elementos
        console.log("NewBoard" + newBoard);
        self.initTabuleiro.board = newBoard;
        self.initTabuleiro.initCelulas();
        
        /*self.history.push(newBoard);

        var centerPlaneY = Math.abs(Math.floor((posYFinal - posY)/2));
        var centerPlaneX = Math.abs(Math.floor((posXFinal - posX)/2));
        var center = [centerPlaneX, 0 , centerPlaneY];
        var radius;
        if(centerPlaneX != 0)
            radius = centerPlaneX;
        else radius = centerPlaneY;
        var startang = 0;
        var rotang = 180;*/
       // self.selectedObj.animation = new CircularAnimation(self.scene, 2, 10, center, radius, startang, rotang);
        //self.initTabuleiro.animations.push(self.selectedObj.animation);

        
        for (i = 0; i < self.possibleMoves.length; i++) {
            self.initTabuleiro.floor[self.possibleMoves[i][1]][self.possibleMoves[i][0]].highlighted = false;
            if(self.possibleMoves[i][0] == posXFinal && self.possibleMoves[i][1] == posYFinal)
            {
                self.costLeft -= self.movesCost[i];
                console.log("cost left " + self.costLeft);
            }
        }
        self.initTabuleiro.celulas[self.selectedObj.posX][self.selectedObj.posY].highlighted = false;

        self.possibleMoves = [];
    });

}

Game.prototype.undo = function(){
    if (this.history.length > 1) {
        var diff = this.history[this.history.length - 2];
        this.initTabuleiro.board = diff;
        this.initTabuleiro.initCelulas();
        this.display();
        this.history.pop();
    }
    return this.initTabuleiro.board;
}

Game.prototype.continueGame = function() {
    var self = this;
    this.connection.continueGame(this.initTabuleiro.board, function(res) {
        if(!res){
            return false;
        }
        else {
            return true;
        }
    });
}


Game.prototype.display = function() {

    this.scene.pushMatrix();       
    this.initTabuleiro.display();
    this.scene.popMatrix();

}

Game.prototype.deselect = function(){
     for (i = 0; i < this.possibleMoves.length; i++) {
           this.initTabuleiro.floor[this.possibleMoves[i][1]][this.possibleMoves[i][0]].highlighted = false;
      }

     this.initTabuleiro.celulas[this.selectedObj.posX][this.selectedObj.posY].highlighted = false;
      this.possibleMoves = [];
}

Game.prototype.clickEvent = function(id, obj) {
    
    if (this.state == "start") {
        if (id > 500 && obj.player == this.player) {
            this.selectedObj = obj;
            this.selectedObj.selected = true;
            this.getMoves(obj.posX, obj.posY);
            this.state = "select";
        }
    } 
    else 
    if (this.state == "select") 
    {
        if (this.selectedObj == obj) {
            this.deselect();
            this.state = "start";
        } 
        else {
            if (obj.highlighted) {
                this.movePiece(this.selectedObj.posX, this.selectedObj.posY, obj.posX, obj.posY);
                this.state = "analyse";
            }
           }
      
    }
    
    else
     if (this.state == "analyse") {
       if(this.costLeft == 0){
           if(this.player == 1)
                this.player = 0;
           else this.player = 1;
           this.costLeft = 2;
           this.state = "start";
       }
       else if(this.continueGame()){
            this.state = "end";
            console.log("END GAME!");
            return;
       }
       
       else{
          if (id > 500 && obj.player == this.player) {
            this.selectedObj = obj;
            this.selectedObj.selected = true;
            this.getMoves(obj.posX, obj.posY);
            this.state = "select";
        }
       }

    }
   
}
