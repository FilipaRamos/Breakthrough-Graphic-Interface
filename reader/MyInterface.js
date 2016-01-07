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

    this.scene = application.scene;
    
    this.gui.add(this.scene, 'undo').name("Undo");
    
    this.gui.add(this.scene, 'gameMovie').name("Game Movie");

    this.luzes = this.gui.addFolder("ON/OFF");

    this.gameMode = this.gui.addFolder("GAME MODE");

    this.luzes.close();
    this.gameMode.open();
    
    this.levelList = ['random', 'hard'];
    this.level="random";
    
    this.gui.add(this.scene, 'level', this.levelList);
    
    this.themeList = ['Dining Room', 'Battlestar Galactica', 'Star Wars'];
    this.theme="Dining Room";
    var themeDP=this.gui.add(this.scene, 'theme', this.themeList);

    var interface=this;

    themeDP.onChange(function(e){
       var filename="";
            switch(e){
                case "Dining Room":
                    filename="LAIG_TP1_LSX_T06_G06_v1.lsx";
                break;

                case "Battlestar Galactica":
                    filename="seaTheme.lsx";
                break;

                case "Star Wars":
                    filename="LAIG_TP1_LSX_T01_G01_v1.lsx";
                break;
            }

            new MySceneGraph(filename,interface.scene);

    });
    
    
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

    this.removeFolder("ON/OFF");
    this.luzes=this.gui.addFolder('ON/OFF')

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

MyInterface.prototype.removeFolder = function(name) {
  var folder = this.gui.__folders[name];
  if (!folder) {
    return;
  }
  folder.close();
  this.gui.__ul.removeChild(folder.domElement.parentNode);
  delete this.gui.__folders[name];
  this.gui.onResize();
}
