function Evaluator(scene, degreeU, degreeV, divisionU, divisionV, controlVertex) {
    
    CGFobject.call(this, scene);
    
    this.degreeU = degreeU;
    this.degreeV = degreeV;
    this.divisionU = divisionU;
    this.divisionV = divisionV;
    this.degree = degree;
    this.surfaces;
    
    var knotU = [];
    var knotV = [];

    var controlvertexes = []; //Array de array de vertices
    var sVertexes = []; //Array auxiliar...

    for (var i = 0; i < this.degreeU + 1; i++) {
        knotU.push(0);
    }
    for (var l = 0 ; l < this.degreeU + 1; l++) {
        knotU.push(1);
    }

    for (var i = 0; i < this.degreeV + 1; i++) {
        knotV.push(0);
    }
    for (var l = 0 ; l < this.degreeV + 1; l++) {
        knotV.push(1);
    }

var index=0;
for(var k=0; k < (this.degreeU + 1); k++){      
   for(var h=0; h < (this.degreeV + 1); h++){
            sVertexes[h] = (controlVertex[index]);
            console.log('Control Vertix: ' + controlVertex[index]);
            index++;
     }
       controlvertexes.push(sVertexes);   
       sVertexes = [];     
       console.log('Control textures' + controlvertexes);
}

    var nurbsSurface = new CGFnurbsSurface(this.degreeU,this.degreeV,knotU,knotV,controlvertexes);
    getSurfacePoint = function(u, v) {
        return nurbsSurface.getPoint(u, v);
    };
    
    this.surfaces = new CGFnurbsObject(this.scene,getSurfacePoint,this.divisionU,this.divisionV);
    this.surfaces.primitiveType=this.scene.gl.LINES;
};


Evaluator.prototype = Object.create(CGFobject.prototype);
Evaluator.prototype.constructor = Evaluator;

/**
 * draw the patch
 * @constructor
 */
Evaluator.prototype.display = function() 
{
    this.scene.pushMatrix();
    this.surfaces.display();
    this.scene.popMatrix();
};

/**
* updating texture coordinates
* @constructor
*/
Evaluator.prototype.updateTextCoords = function(s,t){};