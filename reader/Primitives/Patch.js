/**
* Patch Constructor
* Constructs a patch with the given U and V divisions, degree and with the fiven control vertexes
* @param divisionU - divisionU value 
* @param divisionV - divisionV value
* @paran degree - degree value
* @param controlVertex - controlVertex value
* @constructor
*/
function Patch(scene, divisionU, divisionV, degree, controlVertex) {
    
    CGFobject.call(this, scene);
    
    this.divisionU = divisionU;
    this.divisionV = divisionV;
    this.degree = degree;
    this.surfaces;
    
    var knotU = [];
    var knotV = [];

    var controlvertexes = []; //Array de array de vertices
    var sVertexes = []; //Array auxiliar...

    for (var i = 0; i < this.degree + 1; i++) {
        knotU.push(0);
        knotV.push(0);
    }
    for (var l = 0 ; l < this.degree + 1; l++) {
        knotU.push(1);
        knotV.push(1);
    }

var index=0;
for(var k=0; k < (this.degree + 1); k++){      
   for(var h=0; h < (this.degree + 1); h++){
            sVertexes[h] = (controlVertex[index]);
            console.log('Control Vertix: ' + controlVertex[index]);
            index++;
     }
       controlvertexes.push(sVertexes);   
       sVertexes = [];     
       console.log('Control textures' + controlvertexes);
}

    var nurbsSurface = new CGFnurbsSurface(this.degree,this.degree,knotU,knotV,controlvertexes);
    getSurfacePoint = function(u, v) {
        return nurbsSurface.getPoint(u, v);
    };
    
    this.surfaces = new CGFnurbsObject(this.scene,getSurfacePoint,this.divisionU,this.divisionV);
    
	
};


Patch.prototype = Object.create(CGFobject.prototype);
Patch.prototype.constructor = Patch;

/**
 * draw the patch
 * @constructor
 */
Patch.prototype.display = function() 
{
    this.scene.pushMatrix();
    this.surfaces.display();
    this.scene.popMatrix();
};

/**
* updating texture coordinates
* @constructor
*/
Patch.prototype.updateTextCoords = function(s,t){};