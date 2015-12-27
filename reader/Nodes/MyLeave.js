/**
* MyLeave constructor
* tests whether the primitives are a rectangle, triangle, etc...
* @constructor
* @param scene - the scene
* @param id - the id of the leave
* @param type - the type of the leave
* @param coords - the coordinates of the leave
*/
function MyLeave(scene,id, type, coords, parts, order, partsU, partsV, controlPoints, texture, heightmap, kind) {
     this.id = id;
     this.type = type; 
     this.coords = coords;
     this.isLeaf = true;
     this.primitive={};
     
     if(this.type == "rectangle")
         this.primitive = new MyRectangle(scene, parseFloat(this.coords[0]), parseFloat(this.coords[1]), parseFloat(this.coords[2]), parseFloat(this.coords[3]));
        
        else if(this.type == "cylinder")
          this.primitive = new MyCylinder(scene, parseFloat(this.coords[0]), parseFloat(this.coords[1]), parseFloat(this.coords[2]), parseFloat(this.coords[3]), parseFloat(this.coords[4]));
    
        else if(this.type == "sphere")
          this.primitive = new MySphere(scene,parseFloat(this.coords[0]), parseFloat(this.coords[1]), parseFloat(this.coords[2]));

        else if(this.type == "triangle")
          this.primitive = new MyTriangle(scene, parseFloat(this.coords[0]), parseFloat(this.coords[1]), parseFloat(this.coords[2]), parseFloat(this.coords[3]), parseFloat(this.coords[4]), parseFloat(this.coords[5]), parseFloat(this.coords[6]), parseFloat(this.coords[7]), parseFloat(this.coords[8]));
       
        else if(this.type == "plane") {
            this.primitive = new Plane(scene, parts);
        }
        else if(this.type == "patch")
            this.primitive = new Patch(scene, partsU, partsV, order, controlPoints);

        else if(this.type == "vehicle")
            this.primitive = new MyVehicle(scene);
        
        else if(this.type == "terrain")
            this.primitive = new Terrain(scene, texture, heightmap);

        else if(this.type == "piece")
            this.scene.pieceType = kind;
       
    };


MyLeave.prototype.constructor = MyLeave;
