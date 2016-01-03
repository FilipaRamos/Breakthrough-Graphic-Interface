/**
* MyInterface Constructor
* @constructor
*/
function MyInterface() {
    
    CGFinterface.call(this);
}
;

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
    CGFinterface.prototype.init.call(this, application);
    
    this.gui = new dat.GUI();
    
    this.gui.add(this.scene, 'undo').name("Undo");
    
    
    this.luzes = this.gui.addFolder("ON/OFF");

    this.gameMode = this.gui.addFolder("GAME MODE");


    this.luzes.close();
    this.gameMode.open();
    
    this.levelList = ['random', 'hard'];
    
    this.gui.add(this.scene, 'level', this.levelList);
    
    
    this.themeList = ['Sea', 'Battlestar Galactica'];
    this.gui.add(this.scene, 'theme', this.themeList);
    
    
    this.gameMode.add(this.scene, 'hh').name("Human/Human");
    this.gameMode.add(this.scene, 'hb').name("Human/Bot");
    this.gameMode.add(this.scene, 'bb').name("Bot/Bot");
    
  
    return true;
};

/**
* Initiate the lights
* @method
*/
MyInterface.prototype.updateLights = function(){
    for (var j = 0; j < this.scene.luzesid.length; j++) {
        this.luzes.add(this.scene.onOff, j, this.scene.onOff[j]).name(this.scene.luzesid[j]);
    };
    
}

/**
* Process mouse activity
* @method
*/
MyInterface.prototype.processMouse = function() {
};