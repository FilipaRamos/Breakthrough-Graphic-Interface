function ListAnimations(scene, animationsID){

 	this.animations = [] ; 
 	this.scene = scene;

 	for(var j = 0; j < this.scene.animations.length ; j++){
 	    for( var k = 0; k < animationsID.length ; k++){
 	        if( animationsID[k] === this.scene.animations[j].id){
 	            this.animations.push(this.scene.animations[j]);
 	        }
 	    }
 	    
 	}
 	

 	this.somaTempo = [0];
 	var soma = 0;
    
    for(var i = 0; i < this.animations.length; i++){
         soma += this.animations[i].time*1000;
        this.somaTempo.push(soma);
    }

  this.index = -1;
  this.dec = 0;

}

ListAnimations.prototype.constructor = ListAnimations;

ListAnimations.prototype.getAnimationIndex = function(actTime){
    
    for(var i = 0; i < this.somaTempo.length ; i++){
        if(actTime < this.somaTempo[i]){
            return i-1;
        }
    }
        
        return -1;                              
                                    
}

ListAnimations.prototype.update = function (currTime){
      if(this.animations.length == 0)
        return;
      
      currTime = (currTime % (this.somaTempo[this.somaTempo.length -1])); 

     this.index = this.getAnimationIndex(currTime);
     this.dec = 0;
     if(this.index >= 0 )
      this.dec = this.somaTempo[this.index];
     

     if(this.index != -1)
      this.animations[this.index].update(currTime - this.dec);     




}