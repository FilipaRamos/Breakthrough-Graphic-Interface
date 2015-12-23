function Game(scene) {
    this.connection = new Connection();
    this.scene = scene;
    this.tabuleiro = new Board(scene);

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

Game.prototype.validMove = function(){
    var self = this;
    this.connection.initBoard(function(arr) {
        // arr lista de 3 elementos
        self.tabuleiro.board=board;
        self.tabuleiro.display();
    });
}

Game.prototype.display = function() {
    
    this.scene.pushMatrix();
    this.tabuleiro.display();
    this.scene.popMatrix();

}