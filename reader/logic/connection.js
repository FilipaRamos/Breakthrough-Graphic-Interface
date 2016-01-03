/**
* Constructor for the Connection
* @constructor
*/
function Connection(){

}

Connection.prototype.constructor = Connection;

/**
* Request the connection with Prolog
* @method
*/
Connection.prototype.getPrologRequest = function(requestString, onSuccess, onError, port){
    var requestPort = port || 8081
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:'+requestPort+'/'+requestString, true);

    request.onload = onSuccess || function(data){console.log("Request successful. Reply: " + data.target.response);};

    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send();
}
		
/**
* Initiate the board
* @method
*/
Connection.prototype.initBoard = function(callback){
    var self = this;
    this.getPrologRequest("initial", function(data) {
        var tabuleiro =  JSON.parse(data.target.response);
        if (typeof callback === "function") {
            callback(tabuleiro);
        }
    });
}

/**
* Get the possible moves for a piece
* @method
*/
Connection.prototype.getMoves = function(board, player, costLeft, callback){
    var self = this;
    //[InitList,EndList,CostList]
    var board=JSON.stringify(board);
    this.getPrologRequest("getMoves(" + board + "," + player + "," +  costLeft + ")", function(data) {
        var arr =  JSON.parse(data.target.response);
        if (typeof callback === "function") {
            callback(arr);
        }
    });
}

/**
* Move a piece
* @method
*/
Connection.prototype.movePiece = function(board, x, y, xf, yf, callback){
    var self = this;
    //movePiece(Board,X,Y,XF,YF,NewBoard2)
    //[InitList,EndList,CostList]
    var board=JSON.stringify(board);
    this.getPrologRequest("movePiece(" + board + "," + x + "," + y + "," + xf + "," + yf + ")", function(data) {
        var newBoard =  JSON.parse(data.target.response);
        if (typeof callback === "function") {
            callback(newBoard);
        }
    });
}

/**
* Move forward with the game
* @method
*/
Connection.prototype.continueGame = function(board, callback){
    var self = this;
    var board=JSON.stringify(board);
    this.getPrologRequest("continueGame(" + board + ")", function(data) {
        var res =  JSON.parse(data.target.response);
        if (typeof callback === "function") {
            callback(res);
        }
    });
}

/**
* Get the random level of difficulty
* @method
*/
Connection.prototype.playRandom = function(board, player, costLeft, callback){
    var self = this;
    var board=JSON.stringify(board);
    this.getPrologRequest("randomMode(" + board + ',' + player + ',' +  costLeft + ")", function(data) {
        //array de dois elementos um com newBoard e CosttoSpend
        var res =  JSON.parse(data.target.response);
        if (typeof callback === "function") {
            callback(res);
        }
    });
}

/**
* Get the hard level of difficulty
* @method
*/
Connection.prototype.playHard = function(board, player, costLeft, callback){
    var self = this;
    var board=JSON.stringify(board);
    this.getPrologRequest("hardMode(" + board + ',' + player + ',' +  costLeft + ")", function(data) {
        //array de dois elementos um com newBoard e CosttoSpend
        var res =  JSON.parse(data.target.response);
        if (typeof callback === "function") {
            callback(res);
        }
    });
}

/**
* Return the board from prolog
* @method
*/
Connection.prototype.boardFromProlog = function(string){
    
    var i, j;
    var tabuleiro;
    /*
        string = " [[0,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,1,1,1,1,0,0,0],[0,0,0,0,0,0,0,0,0,0,0],[0,1,0,0,2,2,2,0,0,1,0], ...]";
    */
    var retorno = JSON.parse(string);

    tabuleiro = retorno; 


    return tabuleiro;  


}


