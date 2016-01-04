/**
* MyHistory Constructor
* @constructor
*/
function MyHistory() {
    this.boardHistory = [];
}

MyHistory.prototype.constructor = MyHistory;

/**
* Save the current history
* @method
*/
MyHistory.prototype.push = function(board) {
    if (board instanceof Array) {
        var clone = JSON.parse(JSON.stringify(board));
        this.boardHistory.push(clone);
        return true;
    } else {
        return false;
    }
}

/**
* Get the current board history
* @method
*/
MyHistory.prototype.pop = function() {
    return this.boardHistory.pop();
}

/**
* Get the history length
* @method
*/
MyHistory.prototype.length = function() {
    return this.boardHistory.length;
}

/**
* Get the element from the top of the history
* @method
*/
MyHistory.prototype.top = function() {
    return this.boardHistory[this.boardHistory.length - 1];
}

/**
* Find the differences between the new and old capture 
* @method
*/
MyHistory.prototype.findDiferences = function(newTab) {
    var oldTab = this.top();
    var newPos = [];
    // 0 - X, 1 - Y
    var oldPos = [];
    // 0 - X, 1 - Y
    var oldCapture = [];
    var newCapture = [];
    
    for (var y = 0; y < newTab.length; y++) {
        for (var x = 0; x < newTab.length; x++) {
            if (oldTab[y][x] != 0 && newTab[y][x] == 0) {
                newPiece = newTab[y][x];
                oldPos = [x, y];
            } 
            else if (oldTab[y][x] == 0 && newTab[y][x] != 0) {
                newPiece = newTab[y][x];
                newPos = [x, y];
            } 
            else if (oldTab[y][x] != newTab[y][x]) {
                oldCapture.push(oldTab[y][x]);
                newPos = [x,y];
            }
        }
    }
    
    return {
        "move": {
            "new": newPos,
            "old": oldPos
        },
        "capture": oldCapture
    }

}

/**
* Get the history for the undo
* @method
*/
MyHistory.prototype.undo = function() {
    if (this.boardHistory.length > 1) {
        var diff = this.findDiferences(this.boardHistory[this.boardHistory.length - 2]);
        this.pop();
    }
    return diff;
}
