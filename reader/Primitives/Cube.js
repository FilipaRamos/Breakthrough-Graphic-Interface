function Cube(scene) {
	CGFobject.call(this,scene);

	this.initBuffers();
};

Cube.prototype = Object.create(CGFobject.prototype);
Cube.prototype.constructor=Cube;


Cube.prototype.initBuffers = function () {
        this.vertices = [
            -0.5, -0.5, -0.5, //0
            0.5, -0.5, -0.5,  //1
            -0.5, 0.5, -0.5,  //2
            0.5, 0.5, -0.5,   //3  
            -0.5,-0.5, 0.5,   //4
            0.5, -0.5, 0.5,   //5
            -0.5, 0.5, 0.5,   //6
            0.5, 0.5, 0.5,    //7     
                ];
 
        this.indices = [
        //face de tras

            3,1,0,
            0,2,3,

        //face lateral direita  
         
            3,7,5,
            5,1,3,

         //face lateral esquerda

            4,6,2,
            2,0,4,

          //face frontal

            4,5,7,
            7,6,4,
          

           //face do topo

           	6,7,3,
          	3,2,6,

           //face de baixo
            1,5,4,
            4,0,1,

          ];

          this.normals = [
          0,0,1,
          0,0,1,
          0,0,1,
          0,0,1,
          0,0,1,
          0,0,1,
          0,0,1,
          0,0,1,
          0,0,1,
          0,0,1,
          0,0,1,
          0,0,1
          ]

         this.texCoord = [
            0,0,
            1,0,
            1,1,
         ]
               
        this.primitiveType=this.scene.gl.TRIANGLES;
        this.initGLBuffers();
};
