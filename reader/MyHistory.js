function MyHistory() {
    this.boardHistory = [];
}

MyHistory.prototype.constructor = MyHistory;

MyHistory.prototype.push = function(board) {
    if (board instanceof Array) {
        this.boardHistory.push(board);
        return true;
    } else {
        return false;
    }
}

MyHistory.prototype.pop = function() {
    return this.boardHistory.pop();
}

MyHistory.prototype.length = function() {
    return this.boardHistory.length;
}

MyHistory.prototype.top = function() {
    return this.boardHistory[this.boardHistory.length - 1];
}

MyHistory.prototype.findDiferences = function(newTab) {
    var oldTab = this.top();
    var newPos = [];
    // 0 - X, 1 - Y
    var oldPos = [];
    // 0 - X, 1 - Y
    var capture = [];
    
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
            else {
                capture.push(x, y);
            }
        }
    }
    
    return {
        "move": {
            "new": newPos,
            "old": oldPos
        },
        "capture": capture
    }

}

MyHistory.prototype.undo = function() {
    if (this.boardHistory.length > 1) {
        var diff = this.diff(this.boardHistory[this.boardHistory.length - 2]);
        this.pop();
    }
    return diff;
}
