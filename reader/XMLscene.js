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
XMLscene.prototype.init = function (application) {
    CGFscene.prototype.init.call(this, application);

    // para apagar o log do picking
    this.clearPickRegistration();

    this.undo = function(){
 		 if(this.game){
   			this.game.undo();
  		}
 	}

    this.initCameras();

    this.initLights();

    this.tree = new MyTree();

	this.materials = [];
    this.textures = [];
	this.animations = [];

	this.onOff = [false,false,false,false,false,false,false,false];
	this.luzesid = [];

	// PARA AS LETRAS
	// font texture: 16 x 16 characters
	// http://jens.ayton.se/oolite/files/font-tests/rgba/oolite-font.png
	this.fontTexture = new CGFtexture(this, "textures/oolite-font.png");
	this.appearance.setTexture(this.fontTexture);

	// plano onde estão as letras
	this.plane=new Plane(this);

	// instatiate text shader
	this.textShader=new CGFshader(this.gl, "shaders/font.vert", "shaders/font.frag");

	// set number of rows and columns in font texture
	this.textShader.setUniformsValues({'dims': [16, 16]});
	
	this.time = -1;

	this.interface = new CGFinterface(this,application);
	this.gui = new dat.GUI();

	this.gui.add(this, 'undo').name("Undo");

  	this.luzes=this.gui.addFolder("ON/OFF");
  	this.theme = this.gui.addFolder("THEME");
	this.luzes.open();
	this.theme.open();

	this.theme.add(this.onOff, 5,this.onOff[5]).name("sea wonder :)");
	this.theme.add(this.onOff, 6, this.onOff[6]).name("star wars!!");

	this.matrixInitial = mat4.create();
	
	
	this.materialDefault = new CGFappearance(this);
	this.materialDefault.setAmbient(0.3, 0.3, 0.3, 1);
	this.materialDefault.setDiffuse(0.7, 0.7, 0.7, 1);
	this.materialDefault.setSpecular(0.0, 0.0, 0.0, 1);	
	this.materialDefault.setShininess(120);

	//this.game = new Game(this);
	//this.menu = new Menu(this);
	this.seaBoard = new Terrain(this, "shaders/colorMap.jpg", "shaders/hmap.jpg");
	
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.test = new CGFtexture(this, "texture/floor.jpg");
    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);
	this.enableTextures(true);
	this.axis=new CGFaxis(this);

	this.silverTexture = new CGFtexture(this,"images/sea/ship.jpg");
 	this.goldenTexture = new CGFtexture(this,"images/sea/goldenShip.png");
 	this.falgShipTexture = new CGFtexture(this, "images/sea/flagShip.png");

	this.setUpdatePeriod(10);

	this.undo = function(){ this.game.undo(); };
	
};

/**
* Method that initiates the lights
* @constructor
*/
XMLscene.prototype.initLights = function () {

    //this.shader.bind();
    //this.shader.unbind();
};

/**
* Method that initiates the cameras
* @constructor
*/
XMLscene.prototype.initCameras = function () {
    this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(5, 30, 30), vec3.fromValues(5, 0, 5));

};

/**
* Method that sets the default appearance
* @constructor
*/
XMLscene.prototype.setDefaultAppearance = function () {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);	
};

/**
* Handler called when the graph is finally loaded. 
* As loading is asynchronous, this may be called already after the application has started the run loop
* @constructor
*/
XMLscene.prototype.onGraphLoaded = function () 
{
	for(var j=0; j < this.luzesid.length; j++){
		this.luzes.add(this.onOff, j,this.onOff[j]).name(this.luzesid[j]);
	}
	//this.gl.clearColor(this.graph.background[0],this.graph.background[1],this.graph.background[2],this.graph.background[3]);
};

/**
* Method that loads the textures
* @constructor
*/
XMLscene.prototype.loadTextures = function(){

	var textures = this.scene.texture_list.getTextures();

	for (var j = 0; j < textures.length; j++){

		var id = textures[j].getId();
		var path = textures[j].getPath();

		this.id = new CGFappearance(this);
		this.id.loadTexture(path);

	}

};

/**
* Method that displays the scene
* @constructor
*/
XMLscene.prototype.display = function () {
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
	
	if (this.graph.loadedOk){

		// Draw axis
		if(this.axis.length != 0)
			this.axis.display();

		this.multMatrix(this.matrixInitial);
		
		for(var i= 0; i< this.lights.length ; i++){

			if(this.onOff[i]){
				this.lights[i].enable();
			}else 
				this.lights[i].disable();
			this.lights[i].update();
		}

	this.logPicking();
	this.clearPickRegistration();

	this.game.display();
	}

	//this.menu.display(); 
	//this.seaBoard.display();

};

/**
* Method that displays the nodes
* @constructor
* @param nodeID - the id of the node to be displayed
*/
XMLscene.prototype.displayNode = function (nodeID, textID, materialID) {
	
	var node = null;
	var nextTextureID, nextMaterialID;
	var matrixAnimation = mat4.create();
	mat4.identity(matrixAnimation);

	//encontrar o node ou leave com esse id e depois chamar a funcao de novo

	for(var j=0; j < this.tree.nodes.length; j++){
		if(this.tree.nodes[j].id == nodeID){
			node = this.tree.nodes[j];
		}
	}

	for(var k=0; k < this.tree.leaves.length; k++){
		if(this.tree.leaves[k].id == nodeID){
			node = this.tree.leaves[k];
		}
	}

	if(node === null){
		return "ERRO!!";

	}

	if(node.isLeaf){
		
		
		for(var i = 0; i < this.materials.length ; i++){
			if(this.materials[i].id === materialID)
				var material = this.materials[i];
		}

		for(var l = 0; l < this.textures.length ; l++){
			if(this.textures[l].id === textID)
				var texture = this.textures[l];
		}

		if(material !== undefined){
			material.apply();
		}

		if(texture !== undefined){
			node.primitive.updateTextCoords(texture.amplif_factorS, texture.amplif_factorT);
			texture.bind();
		}
		

		node.primitive.display();

		if(texture !== undefined){
			texture.unbind();
		}

		if(material !== undefined){
			this.materialDefault.apply();
		}

	}
				
	else {
	
		if(node.text == "null"){
			nextTextureID = textID;
		} else if(node.text == "clear"){
			nextTextureID = undefined;
		} else {
			nextTextureID = node.text;
		}

		if(node.material == "null"){
			nextMaterialID = materialID;
		} else{
			nextMaterialID = node.material;
		}

		
		 node.animation.update(this.currTime);
		


		for(var i = 0; i < node.descendants.length; i++){
			this.pushMatrix();
			//Adicionar animações
			this.multMatrix(node.transformation);

			this.displayNode(node.descendants[i], nextTextureID, nextMaterialID);
			this.popMatrix();

		}
	}

};


XMLscene.prototype.update = function(currTime) {
    if (this.time === -1) {
        this.time = currTime;
        return;
    }
    
    this.currTime = (currTime - this.time) /1000;
}

XMLscene.prototype.logPicking = function(){
	if (this.pickMode == false) {
		if (this.pickResults != null && this.pickResults.length > 0) {
			for (var i=0; i< this.pickResults.length; i++) {
				var obj = this.pickResults[i][0];
				if (obj){
					var customId = this.pickResults[i][1]-1;
					this.game.clickEvent(customId,obj);
					
					console.log("Picked object: " + obj + ", with pick id " + customId);
				}
			}
			this.pickResults.splice(0,this.pickResults.length);
		}		
	}
}

XMLscene.prototype.sartPiking = function(obj){
	obj.selected = true;
}

XMLscene.prototype.resartPiking = function(obj){
	obj.selected = false;
}