function Connection(){

}

Connection.prototype.constructor = Connection;

Connection.prototype.getPrologRequest = function(requestString, onSuccess, onError, port){
    var requestPort = port || 8081
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:'+requestPort+'/'+requestString, true);

    request.onload = onSuccess || function(data){console.log("Request successful. Reply: " + data.target.response);};

    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send();
}
		


Connection.prototype.initBoard = function(callback){
    var self = this;
    this.getPrologRequest("initial", function(data) {
        var tabuleiro =  JSON.parse(data.target.response);
        if (typeof callback === "function") {
            callback(tabuleiro);
        }
    });
}

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


