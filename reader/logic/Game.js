function Game(scene) {
    this.connection = new Connection();
    this.scene = scene;
    this.initTabuleiro = new Board(scene);
    this.newPiece;
    
    this.state = "start";
    this.mode;
    this.animFlag = false;
    this.level;
    this.selectedObj;
    this.costLeft = 2;
    this.history = new MyHistory();
    this.boardHistory = [];
    
    this.player = 0;
    this.possibleMoves = [];
    this.movesCost = [];
    this.animations = [];
    
    this.currTime = Date.now() / 1000;
    
    this.cameraAnimation;
    
    this.init();
    
    this.time = -1;

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
        
        self.state = "select";
    });
}

Game.prototype.applyDifferences = function(newBoard) {
    
    var diff = this.history.findDiferences(newBoard);
    
    var piece = this.initTabuleiro.celulas[diff["move"]["old"][1]][diff["move"]["old"][0]];
    var newpiece = this.initTabuleiro.celulas[diff["move"]["new"][1]][diff["move"]["new"][0]];
    piece.posX = diff["move"]["new"][0];
    piece.posY = diff["move"]["new"][1];
    piece.highlighted = false;
    newpiece.posX = diff["move"]["old"][0];
    newpiece.posY = diff["move"]["old"][1];
    newpiece.highlighted = false;
    this.initTabuleiro.celulas[diff["move"]["old"][1]][diff["move"]["old"][0]] = newpiece;
    this.initTabuleiro.celulas[diff["move"]["new"][1]][diff["move"]["new"][0]] = piece;
    
    var newlogicPiece = this.initTabuleiro.board[diff["move"]["new"][1]][diff["move"]["new"][0]];
    var oldlogicPiece = this.initTabuleiro.board[diff["move"]["old"][1]][diff["move"]["old"][0]];
    
    this.initTabuleiro.board[diff["move"]["old"][1]][diff["move"]["old"][0]] = newlogicPiece;
    this.initTabuleiro.board[diff["move"]["new"][1]][diff["move"]["new"][0]] = oldlogicPiece;
    
    
    if (diff["move"]["new"].length != 0) {
        var animMove = new MovePieceAnimation(this.scene,diff["move"]["old"],diff["move"]["new"],this.scene.game.currTime / 1000);
        this.initTabuleiro.celulas[diff["move"]["new"][1]][diff["move"]["new"][0]].animation = animMove;
    } 
    else {
        var animMove = new MovePieceAnimation(this.scene,diff["capture"]["new"],this.scene.game.currTime / 1000);
        var captMove = new CapturePieceAnimation(this.scene,diff["capture"]["new"],this.scene.game.currTime / 1000);
        
        this.initTabuleiro.celulas[diff["capture"]["new"][1]][diff["capture"]["new"][0]].animation = animMove;
        oldPiece.captured = true;
        oldPiece.animation = captMove;
        this.initTabuleiro.captured.push(oldPiece);
    
    }
    
    this.animations.push(animMove);




}

Game.prototype.movePiece = function(posX, posY, posXFinal, posYFinal) {
    //movePiece(Board,X,Y,XF,YF,NewBoard2)
    var self = this;
    console.log("inicial: " + posX + 1 + " y " + posY + 1);
    console.log("final: " + posXFinal + 1 + " y " + posYFinal + 1);
    this.connection.movePiece(this.initTabuleiro.board, posX + 1, posY + 1, posXFinal + 1, posYFinal + 1, function(newBoard) {
        
        
        self.history.push(newBoard);
        self.applyDifferences(newBoard);
        
        for (i = 0; i < self.possibleMoves.length; i++) {
            self.initTabuleiro.floor[self.possibleMoves[i][1]][self.possibleMoves[i][0]].highlighted = false;
            if (self.possibleMoves[i][0] == posXFinal && self.possibleMoves[i][1] == posYFinal) 
            {
                self.costLeft = self.movesCost[i];
                console.log("costLeft : " + self.costLeft + " " + self.movesCost[i]);
                self.movesCost = [];
            }
        }
        self.initTabuleiro.celulas[self.selectedObj.posX][self.selectedObj.posY].highlighted = false;
        self.possibleMoves = [];
        
        if (self.costLeft == 0) {
            self.cameraAnimation = new CameraAnimation(self.scene,self.currTime);
        }
        self.state = "analyse";
    });

}

Game.prototype.undo = function() {
    console.log(this.history.boardHistory);
    var diff = this.history.undo();
    
    if (diff !== undefined) {
        console.log(this.history.boardHistory);
        console.log(diff);
    }

}

Game.prototype.continueGame = function() {
    var self = this;
    this.connection.continueGame(this.initTabuleiro.board, function(res) {
        if (!res) {
            return false;
        } 
        else {
            return true;
        }
    });
}

Game.prototype.playRandom = function() {
    var self = this;
    this.connection.playRandom(this.initTabuleiro.board, this.player, this.costLeft, function(res) {
        console.log(res);
        
        //res[0] -> newBoard;
        //res[1] -> newCostLeft;
        
        self.history.push(res[0]);
        self.applyDifferences(res[0]);
        self.costLeft = res[1];
    
    });
}

Game.prototype.playHard = function() {
    var self = this;
    this.connection.playHard(this.initTabuleiro.board, this.player, this.costLeft, function(res) {
        console.log(res);
        
        //res[0] -> newBoard;
        //res[1] -> newCostLeft;
        
        self.history.push(res[0]);
        self.applyDifferences(res[0]);
        self.costLeft = res[1];
    
    
    });
}

Game.prototype.display = function() {
    
    this.scene.pushMatrix();
    if (this.animations.length != 0) {
        for (var i = 0; i < this.animations.length; i++) {
            this.animations[i].update;
        }
    }
    if (this.cameraAnimation != undefined && !this.cameraAnimation.done) {
        
        this.cameraAnimation.update(this.scene.game.currTime);
    }
    this.initTabuleiro.display();
    this.scene.popMatrix();
    
    this.animations = [];
}

Game.prototype.deselect = function() {
    for (i = 0; i < this.possibleMoves.length; i++) {
        this.initTabuleiro.floor[this.possibleMoves[i][1]][this.possibleMoves[i][0]].highlighted = false;
    }
    
    this.initTabuleiro.celulas[this.selectedObj.posX][this.selectedObj.posY].highlighted = false;
    this.possibleMoves = [];
}

Game.prototype.clickEvent = function(id, obj) {
    
    if (this.mode == "HumanHuman") {
        
        if (this.state == "start") {
            if (id > 500 && obj.player == this.player) {
                this.selectedObj = obj;
                this.selectedObj.selected = true;
                this.getMoves(obj.posX, obj.posY);
                this.animFlag = false;
            }
        }
        
        if (this.state == "select") 
        {
            if (this.selectedObj == obj) {
                this.deselect();
                this.state = "start";
            } 
            else {
                if (obj.highlighted) {
                    this.movePiece(this.selectedObj.posX, this.selectedObj.posY, obj.posX, obj.posY);
                } 
                else {
                    this.deselect();
                    this.state = "start";
                }
            }
        
        }
        
        if (this.state == "analyse") {
            if (this.costLeft == 0) {
                if (this.player == 1)
                    this.player = 0;
                else
                    this.player = 1;
                
                this.costLeft = 2;
                
                this.state = "start";
            } 
            else if (this.continueGame()) {
                this.state = "end";
                alert("The player who won was: \n" + this.player + " END!!");
                return;
            } 
            
            else {
                if (id > 500 && obj.player == this.player) {
                    this.selectedObj = obj;
                    this.selectedObj.selected = true;
                    this.getMoves(obj.posX, obj.posY);
                }
            }
        
        }
    } 
    
    else if (this.mode == "MachineMachine") {
        
        if (this.costLeft == 0) {
            
            if (this.player == 1) {
                this.player = 0;
            } 
            else {
                this.player = 1;
            }
            
            
            this.costLeft = 2;
        
        } 
        else if (this.continueGame()) {
            alert("The player who won was: \n" + this.player + " END!!");
            return;
        } 
        
        else {
            if (this.level == "random")
                this.playRandom();
            else
                this.playHard();
            
            // this.animFlag = false;
        }
    } 
    
    else if (this.mode == "HumanMachine") {
        
        if (this.state == "start") {
            if (this.player == 0) {
                if (id > 500 && obj.player == this.player) {
                    this.selectedObj = obj;
                    this.selectedObj.selected = true;
                    this.getMoves(obj.posX, obj.posY);
                    this.state = "select";
                }
            } 
            else if (this.player == 1) {
                //bot a jogar
                
                if (this.costLeft == 0) {
                    this.player = 0;
                    this.state = "start";
                    this.costLeft = 2;
                } 
                else if (this.continueGame()) {
                    alert("The player who won was: \n" + this.player + " END!!");
                    return;
                } 
                
                else {
                    if (this.level == "random")
                        this.playRandom();
                    else
                        this.playHard();
                }
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
                else {
                    this.deselect();
                    this.state = "start";
                }
            }
        
        } 
        
        else 
        if (this.state == "analyse") {
            if (this.costLeft == 0) {
                this.player = 1;
                this.costLeft = 2;
                this.state = "start";
            } 
            else if (this.continueGame()) {
                this.state = "end";
                alert("The player who won was: \n" + this.player + " END!!");
                return;
            } 
            
            else {
                if (this.player == 0) {
                    if (id > 500 && obj.player == this.player) {
                        this.selectedObj = obj;
                        this.selectedObj.selected = true;
                        this.getMoves(obj.posX, obj.posY);
                        this.state = "select";
                    }
                } 
                else 
                {
                    if (this.player == 1) {
                        //bot a jogar
                        
                        if (this.costLeft == 0) {
                            
                            this.player = 0;
                            this.state = "start";
                            this.costLeft = 2;
                        } 
                        else if (this.continueGame()) {
                            alert("The player who won was: \n" + this.player + " END!!");
                            return;
                        } 
                        else {
                            if (this.level == "random")
                                this.playRandom();
                            else
                                this.playHard();
                        }
                    }
                }
            }
        }
    }
}
