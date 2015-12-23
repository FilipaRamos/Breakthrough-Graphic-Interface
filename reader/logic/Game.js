function Game(scene) {
    this.connection = new Connection();
    this.scene = scene;
    this.tabuleiro = new Board(scene);
    this.costLeft = 2;

    this.player = 0;

    this.init();
};

Game.prototype.constructor = Game;

Game.prototype.init = function() {
    var self = this;
    this.connection.initBoard(function(board) {
        self.tabuleiro.board=board;
        self.tabuleiro.initCelulas();
    });
}

Game.prototype.getMoves = function(posX, posY){
    var self = this;
    this.connection.getMoves(this.tabuleiro.board,this.player,this.costLeft,function(arr){
        // arr lista de 3 elementos
        console.log(arr);
        console.log(posY);
        var highlightList = [];
        var initList = arr[0];
       for(var i=0; i < initList.length ; i++){
           if(posX === (initList[i][0]-1) && posY === (initList[i][1]-1)){
                console.log(arr[0][i][0]-1);
                highlightList.push([arr[1][i][0]-1, arr[1][i][1]-1]);
                console.log([arr[1][i][0]-1, arr[1][i][1]-1]);
           }
       }

       for (i = 0; i < highlightList.length; i++) {
            self.tabuleiro.floor[highlightList[i][0]][highlightList[i][1]].highted= true;
        }
    });
}

Game.prototype.display = function() {
    
    this.scene.pushMatrix();
    this.tabuleiro.display();
    this.scene.popMatrix();

}