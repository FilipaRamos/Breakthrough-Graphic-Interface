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

    this.scene=application.scene;
    
    this.gui.add(this.scene, 'undo').name("Undo");
    
    
    this.luzes = this.gui.addFolder("ON/OFF");

    this.gameMode = this.gui.addFolder("GAME MODE");


    this.luzes.close();
    this.gameMode.open();
    
    this.levelList = ['random', 'hard'];
    this.level="random";
    
    this.gui.add(this.scene, 'level', this.levelList);
    
    
    this.themeList = ['Sea', 'Battlestar Galactica'];
    this.theme="Sea";
    var themeDP=this.gui.add(this.scene, 'theme', this.themeList);

    var interface=this;

    themeDP.onChange(function(e){
       var filename="";
            switch(e){
                case "Sea":
                    filename="LAIG_TP1_LSX_T06_G06_v1.lsx";
                break;

                case "Battlestar Galactica":
                    filename="seaTheme.lsx"
                break;
            }

            new MySceneGraph(filename,interface.scene);

        
    });
    
    
    this.gameMode.add(this.scene, 'hh').name("Human/Human");
    this.gameMode.add(this.scene, 'hb').name("Human/Bot");
    this.gameMode.add(this.scene, 'bb').name("Bot/Bot");
    
  
    return true;
};

MyInterface.prototype.updateLights = function(){

    this.removeFolder("ON/OFF");
    this.luzes=this.gui.addFolder('ON/OFF')

    for (var j = 0; j < this.scene.luzesid.length; j++) {
        this.luzes.add(this.scene.onOff, j, this.scene.onOff[j]).name(this.scene.luzesid[j]);
    };
    
}

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