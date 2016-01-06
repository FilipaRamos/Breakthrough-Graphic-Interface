/**
* Method that calls the scene
* @constructor
*/
function XMLscene() {
    CGFscene.call(this);
}

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

/**
* Method that initiates the scene
* @constructor
*/
XMLscene.prototype.init = function(application) {
    CGFscene.prototype.init.call(this, application);
    this.application = application;
    
    // para apagar o log do picking
    this.clearPickRegistration();
    
    this.initCameras();
    
    this.initLights();
    this.luzesid = [];
    this.onOff = [false, false, false, false, false, false, false, false];
    
    this.theme = 'Sea';
    this.level = 'random';
    
    this.tree = new MyTree();
    
    this.materials = [];
    this.textures = [];
    this.animations = [];

    this.timerDisplay = new timerDisplay(this);

    this.matrixInitial = mat4.create();
    
    this.materialDefault = new CGFappearance(this);
    this.materialDefault.setAmbient(0.3, 0.3, 0.3, 1);
    this.materialDefault.setDiffuse(0.7, 0.7, 0.7, 1);
    this.materialDefault.setSpecular(0.0, 0.0, 0.0, 1);
    this.materialDefault.setShininess(120);
    
    this.game = new Game(this);
    this.menu = new menu(this);
    this.game.level = "random";
    
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.test = new CGFtexture(this,"texture/floor.jpg");
    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);
    this.enableTextures(true);
    this.axis = new CGFaxis(this);
    
    // PARA AS LETRAS
    this.appearance = new CGFappearance(this);
    this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
    this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
    this.appearance.setSpecular(0.0, 0.0, 0.0, 1);
    this.appearance.setShininess(120);

    this.floorTexture = new CGFtexture(this, "texture/floor.jpg");
    
    // font texture: 16 x 16 characters
    // http://jens.ayton.se/oolite/files/font-tests/rgba/oolite-font.png
    this.fontTexture = new CGFtexture(this,"textures/oolite-font.png");
    this.appearance.setTexture(this.fontTexture);
    console.log(this.appearance);
    
    // planos onde estão as letras
    this.logo = new Letters(this);
    this.timer = new Letters(this);
    this.player = new Letters(this);
    
    // instatiate text shader
    this.textShader = new CGFshader(this.gl,"shaders/font.vert","shaders/font.frag");
    
    // set number of rows and columns in font texture
    this.textShader.setUniformsValues({
        'dims': [16, 16]
    });
    
    this.silverTexture = new CGFtexture(this,"images/sea/ship.jpg");
    console.log(this.silverTexture);
    this.goldenTexture = new CGFtexture(this,"images/sea/goldenShip.png");
    console.log(this.goldenTexture);
    this.falgShipTexture = new CGFtexture(this,"images/sea/flagShip.png");
    console.log(this.falgShipTexture);
    
    this.setUpdatePeriod(50);
    this.setPickEnabled(true);

};

XMLscene.prototype.undo = function() {
    if (this.game) {
        this.game.undo();
    }
}

XMLscene.prototype.gameMovie = function(){
	if(this.game){
		this.game.gameMovie();
	}
}

XMLscene.prototype.hh = function() {
    if (this.game) {
        console.log("H&H");
        this.game.mode = "HumanHuman";
        this.game.level = this.application.interface.level;
    }
}

XMLscene.prototype.hb = function() {
    if (this.game) {
        console.log("H&B");
        this.game.mode = "HumanMachine";
        this.game.level = this.application.interface.level;
    }
}

XMLscene.prototype.bb = function() {
    if (this.game) {
        console.log("B&B");
        this.game.mode = "MachineMachine";
        this.game.level = this.application.interface.level;
    }
}


XMLscene.prototype.update = function(currTime) {
    if (this.game.time == -1) {
        this.game.time = currTime;
        return;
    }
    
    this.game.currTime = (currTime - this.game.time) / 1000;
}

/**
* Method that initiates the lights
* @constructor
*/
XMLscene.prototype.initLights = function() {

//this.shader.bind();
//this.shader.unbind();
}
;


/**
* Method that initiates the cameras
* @constructor
*/
XMLscene.prototype.initCameras = function() {
    this.camera = new CGFcamera(0.6,0.1,500,vec3.fromValues(9, 15, 15),vec3.fromValues(9, 3, 9));

}
;

/**
* Method that sets the default appearance
* @constructor
*/
XMLscene.prototype.setDefaultAppearance = function() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
}
;

/**
* Handler called when the graph is finally loaded. 
* As loading is asynchronous, this may be called already after the application has started the run loop
* @constructor
*/
XMLscene.prototype.onGraphLoaded = function() {
    
    this.application.interface.updateLights();
    //this.gl.clearColor(this.graph.background[0],this.graph.background[1],this.graph.background[2],this.graph.background[3]);
}
;

/**
* Method that loads the textures
* @constructor
*/
XMLscene.prototype.loadTextures = function() {
    
    var textures = this.scene.texture_list.getTextures();
    
    for (var j = 0; j < textures.length; j++) {
        
        var id = textures[j].getId();
        var path = textures[j].getPath();
        
        this.id = new CGFappearance(this);
        this.id.loadTexture(path);
    
    }

}
;

/**
* Method that displays the scene
* @constructor
*/
XMLscene.prototype.display = function() {
    // ---- BEGIN Background, camera and axis setup
    //this.shader.bind();
    
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();
    
    //Draw objects
    
    this.setDefaultAppearance();
    
    if (this.graph.loadedOk) {
        
        // Draw axis
        if (this.axis.length != 0)
            this.axis.display();
        
        this.multMatrix(this.matrixInitial);
        
        for (var i = 0; i < this.lights.length; i++) {
            
            if (this.onOff[i]) {
                this.lights[i].enable();
            } else
                this.lights[i].disable();
            this.lights[i].update();
        }
        
        this.logPicking();
        this.clearPickRegistration();
        

        this.displayNode(this.tree.root, this.tree.nodes[0].text, this.tree.nodes[0].material);
        this.scale(0.25, 0.25, 0.25);
        this.translate(35,11,34);
        this.game.display();
    
    }
    
    this.setActiveShaderSimple(this.textShader);
    this.appearance.apply();
    this.timerDisplay.display(this.game.points1);		
    this.setActiveShaderSimple(this.defaultShader);

};

/**
* Method that displays the nodes
* @constructor
* @param nodeID - the id of the node to be displayed
*/
XMLscene.prototype.displayNode = function(nodeID, textID, materialID) {
    
    var node = null ;
    var nextTextureID, nextMaterialID;
    var matrixAnimation = mat4.create();
    mat4.identity(matrixAnimation);
    
    //encontrar o node ou leave com esse id e depois chamar a funcao de novo
    
    for (var j = 0; j < this.tree.nodes.length; j++) {
        if (this.tree.nodes[j].id == nodeID) {
            node = this.tree.nodes[j];
        }
    }
    
    for (var k = 0; k < this.tree.leaves.length; k++) {
        if (this.tree.leaves[k].id == nodeID) {
            node = this.tree.leaves[k];
        }
    }
    
    if (node === null ) {
        return "ERRO!!";
    
    }
    
    if (node.isLeaf) {
        
        
        for (var i = 0; i < this.materials.length; i++) {
            if (this.materials[i].id === materialID)
                var material = this.materials[i];
        }
        
        for (var l = 0; l < this.textures.length; l++) {
            if (this.textures[l].id === textID)
                var texture = this.textures[l];
        }
        
        if (material !== undefined) {
            material.apply();
        }
        
        if (texture !== undefined) {
            node.primitive.updateTextCoords(texture.amplif_factorS, texture.amplif_factorT);
            texture.bind();
        }
        
        
        node.primitive.display();
        
        if (texture !== undefined) {
            texture.unbind();
        }
        
        if (material !== undefined) {
            this.materialDefault.apply();
        }
    
    } 
    
    else {
        
        if (node.text == "null") {
            nextTextureID = textID;
        } else if (node.text == "clear") {
            nextTextureID = undefined;
        } else {
            nextTextureID = node.text;
        }
        
        if (node.material == "null") {
            nextMaterialID = materialID;
        } else {
            nextMaterialID = node.material;
        }
        
        
        node.animation.update(this.currTime);
        
        
        
        for (var i = 0; i < node.descendants.length; i++) {
            this.pushMatrix();
            //Adicionar animações
            //this.multMatrix(matrixAnimation);
            this.multMatrix(node.transformation);
            
            this.displayNode(node.descendants[i], nextTextureID, nextMaterialID);
            this.popMatrix();
        
        }
    }

}
;


XMLscene.prototype.logPicking = function() {
    if (this.pickMode == false) {
        if (this.pickResults != null  && this.pickResults.length > 0) {
            for (var i = 0; i < this.pickResults.length; i++) {
                var obj = this.pickResults[i][0];
                if (obj) {
                    var customId = this.pickResults[i][1] - 1;
                    this.game.clickEvent(customId, obj);
                    
                    console.log("Picked object: " + obj + ", with pick id " + customId);
                }
            }
            this.pickResults.splice(0, this.pickResults.length);
        }
    }
}

XMLscene.prototype.sartPiking = function(obj) {
    obj.selected = true;
}

XMLscene.prototype.resartPiking = function(obj) {
    obj.selected = false;
}

XMLscene.prototype.displayPlayer = function(nrPlayer){

	this.setActiveShaderSimple(this.textShader);
    this.appearance.apply();
    this.displayOnePlayer(nrPlayer);		
    this.setActiveShaderSimple(this.defaultShader);

};

XMLscene.prototype.displayOnePlayer = function(nrPlayer) {
    
    this.pushMatrix();

	this.rotate(-1.5, 1,0,0);
    this.scale(2, 2, 2);
    
    this.activeShader.setUniformsValues({
        'charCoords': [0, 5]
    });
    this.player.display();
    
    this.translate(1, 0, 0);
    this.activeShader.setUniformsValues({
        'charCoords': [12, 4]
    });
    this.player.display();
    
    this.translate(1, 0, 0);
    this.activeShader.setUniformsValues({
        'charCoords': [1, 4]
    });
    this.player.display();
    
    this.translate(1, 0, 0);
    this.activeShader.setUniformsValues({
        'charCoords': [9, 5]
    });
    this.player.display();
    
    this.translate(1, 0, 0);
    this.activeShader.setUniformsValues({
        'charCoords': [5, 4]
    });
    this.player.display();
    
    this.translate(1, 0, 0);
    this.activeShader.setUniformsValues({
        'charCoords': [2, 5]
    });
    this.player.display();
    
    this.translate(1, 0, 0);
    this.activeShader.setUniformsValues({
        'charCoords': [nrPlayer, 3]
    });
    this.player.display();
    
    this.popMatrix();

};
