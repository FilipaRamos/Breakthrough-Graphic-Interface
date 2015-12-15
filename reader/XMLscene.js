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

    this.initCameras();

    this.initLights();

    this.tree = new MyTree();

	this.materials = [];
    this.textures = [];
	this.animations = [];

	//this.lights = [];
	this.onOff = [false,false,false,false,false,false,false,false];
	this.luzesid = [];
	
	this.time = -1;

	this.interface = new CGFinterface(this,application);
	this.gui = new dat.GUI();

  	this.luzes=this.gui.addFolder("ON/OFF");
	this.luzes.open();

	this.matrixInitial = mat4.create();
	
	
	this.materialDefault = new CGFappearance(this);
	this.materialDefault.setAmbient(0.3, 0.3, 0.3, 1);
	this.materialDefault.setDiffuse(0.7, 0.7, 0.7, 1);
	this.materialDefault.setSpecular(0.0, 0.0, 0.0, 1);	
	this.materialDefault.setShininess(120);

    //this.cyl = new MyCylinder(this,1,0.5,0,9,50);
    //this.tri = new MyTriangle(this,-0.5,-0.5,0,0.5,-0.5,0,0,0.5,0);
    //this.spe = new MySphere(this, 0.5,50,50);
    //this.plane = new Plane(this, 20);
    //this.patch = new Patch(this, 20, 1, [[-0.5, 0.0, 0.5, 1], [-0.5, 0.0, -0.5, 1], [0.5, 0.0, 0.5, 1], [0.5, 0.0, -0.5, 1]]);
	//this.t = new Terrain(this, "shaders/colorMap.jpg", "shaders/hmap.jpg");
	//this.eva = new Evaluator(this, 3, 2, 10, 15, [[-5,5,4,1],[-5,2,4.5,1],[-5,-1,4,1], [][][] , [][][], [][][]]);
	this.cube = new Cube(this);
	this.piece = new Piece(this, "silver", [1,1,1]);
	this.anotherPiece = new Piece(this, "flagship", [10,10,10]);
	
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.test = new CGFtexture(this, "texture/floor.jpg");
    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);
	this.enableTextures(true);
	this.axis=new CGFaxis(this);



	this.clockAppearance = new CGFappearance(this);
	this.clockAppearance.loadTexture('texture/floor.jpg');
	this.clockAppearance.setSpecular(0, 0, 0, 1);
	this.clockAppearance.setShininess(10);
	this.clockAppearance.setDiffuse(0.4,0.4, 0.4, 1);

	this.silverAppearance = new CGFappearance(this);
  	this.silverAppearance.loadTexture('images/ship.jpg');
  	this.silverAppearance.setSpecular(0, 0, 0, 1);
  	this.silverAppearance.setShininess(10);
  	this.silverAppearance.setDiffuse(0.4,0.4, 0.4, 1);

  	this.goldenAppearance = new CGFappearance(this);
  	this.goldenAppearance.loadTexture('images/goldenShip.png');
  	this.goldenAppearance.setSpecular(0, 0, 0, 1);
  	this.goldenAppearance.setShininess(10);
  	this.goldenAppearance.setDiffuse(0.4,0.4, 0.4, 1);

  	this.falgShipAppearance = new CGFappearance(this);
  	this.falgShipAppearance.loadTexture('images/flagShip.png');
  	this.falgShipAppearance.setSpecular(0, 0, 0, 1);
  	this.falgShipAppearance.setShininess(10);
  	this.falgShipAppearance.setDiffuse(0.4,0.4, 0.4, 1);

	this.setUpdatePeriod(10);
	
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
    this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
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
	
	// ---- END Background, camera and axis setup

	// it is important that things depending on the proper loading of the graph
	// only get executed after the graph has loaded correctly.
	// This is one possible way to do it
		
	
	if (this.graph.loadedOk)
	{

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

	//Draw objects
	//this.displayNode(this.tree.root, this.tree.nodes[0].text, this.tree.nodes[0].material);
	//this.cyl.display();
	//this.t.display();
	//this.plane.display();
	// this.patch.display();
	//this.cube.display();

	//this.piece.display();
	this.anotherPiece.display();	

	};	
    //this.shader.unbind();
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
			//this.multMatrix(matrixAnimation);
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