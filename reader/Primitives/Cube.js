function Cube(scene) {
    CGFobject.call(this, scene);
   
    
    this.initBuffers();
};

Cube.prototype = Object.create(CGFobject.prototype);
Cube.prototype.constructor = Cube;


Cube.prototype.initBuffers = function() {
    this.vertices = [
    // Front face
    -0.5, -0.5, 0.5, 
    0.5, -0.5, 0.5, 
    0.5, 0.5, 0.5, 
    -0.5, 0.5, 0.5, 
    
    // Back face
    -0.5, -0.5, -0.5, 
    -0.5, 0.5, -0.5, 
    0.5, 0.5, -0.5, 
    0.5, -0.5, -0.5, 
    
    // Top face
    -0.5, 0.5, -0.5, 
    -0.5, 0.5, 0.5, 
    0.5, 0.5, 0.5, 
    0.5, 0.5, -0.5, 
    
    // Bottom face
    -0.5, -0.5, -0.5, 
    0.5, -0.5, -0.5, 
    0.5, -0.5, 0.5, 
    -0.5, -0.5, 0.5, 
    
    // Right face
    0.5, -0.5, -0.5, 
    0.5, 0.5, -0.5, 
    0.5, 0.5, 0.5, 
    0.5, -0.5, 0.5, 
    
    // Left face
    -0.5, -0.5, -0.5, 
    -0.5, -0.5, 0.5, 
    -0.5, 0.5, 0.5, 
    -0.5, 0.5, -0.5
    ];
    
    this.indices = [
    0, 1, 2, 0, 2, 3, // front
    4, 5, 6, 4, 6, 7, // back
    8, 9, 10, 8, 10, 11, // top
    12, 13, 14, 12, 14, 15, // bottom
    16, 17, 18, 16, 18, 19, // right
    20, 21, 22, 20, 22, 23 // left
    ];
    
    this.normals = [
    0, 0, 1, 
    0, 0, 1, 
    0, 0, 1, 
    0, 0, 1, 
    0, 0, -1, 
    0, 0, -1, 
    0, 0, -1, 
    0, 0, -1, 
    0, 1, 0, 
    0, 1, 0, 
    0, 1, 0, 
    0, 1, 0, 
    0, -1, 0, 
    0, -1, 0, 
    0, -1, 0, 
    0, -1, 0, 
    1, 0, 0, 
    1, 0, 0, 
    1, 0, 0, 
    1, 0, 0, 
    -1, 0, 0, 
    -1, 0, 0, 
    -1, 0, 0, 
    -1, 0, 0
    ]
    
    this.texCoords = [
    0, 1, 
    1, 1, 
    1, 0, 
    0, 0, 
    0, 1, 
    1, 1, 
    1, 0, 
    0, 0, 
    0, 1, 
    1, 1, 
    1, 0, 
    0, 0, 
    0, 1, 
    1, 1, 
    1, 0, 
    0, 0, 
    0, 1, 
    1, 1, 
    1, 0, 
    0, 0, 
    0, 1, 
    1, 1, 
    1, 0, 
    0, 0
    ]
    
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
}
;

/**
* updating texture coordinates
* @constructor
*/
Cube.prototype.updateTextCoords = function(s, t) {}
;


