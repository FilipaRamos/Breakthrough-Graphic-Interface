function Connection() {
}

Connection.prototype.getPrologRequest = function(requestString, onSuccess){
    var requestPort = port || 8081
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:'+requestPort+'/'+requestString, true);

    request.onload = makeRequest(onSuccess) || function(data){console.log("Request successful. Reply: " + data.target.response);};

    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send();
}
		
Connection.prototype.makeRequest = function(request){
    // Get Parameter Values
    var requestString = request;				

    // Make Request
    getPrologRequest(requestString, handleReply);
}

//Handle the Reply
/*
Connection.prototype.handleReply = function(data){
    data.target.response;
}
*/

Connection.prototype.initBoard = function(callback){
    var self = this;
    this.getPrologRequest("initial", function(data) {
        var tabuleiro = self.boardPrologToJs(data.target.response);
        if (typeof callback === "function") {
            callback(tabuleiro);
        }
    });
}

Connection.prototype.boardPrologToJs = function(string){
    
    var i, j;
    var tabuleiro;
    /*
        string = " [[0,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,1,1,1,1,0,0,0],[0,0,0,0,0,0,0,0,0,0,0],[0,1,0,0,2,2,2,0,0,1,0], ...]";
    */
    var retorno = JSON.parse("[" + string + "]");

    tabuleiro = retorno;   


}


/*

Morreli.prototype.init = function() {
    var self = this;
    this.connection.initTabuleiro(this.size, function(board) {
        self.board.initTab(board);
    });
}

Connection.prototype.initTabuleiro = function(size, callback) {
    var self = this;
    this.getPrologRequest("iniciaTabuleiro(" + size + ")", function(data) {
        var tabuleiro = self.tabPrologToJavascript(data.target.response);
        if (typeof callback === "function") {
            callback(tabuleiro);
        }
    });
}
*/