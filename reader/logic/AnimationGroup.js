/**
* Constructor of the AnimationGroup
* @constructor 
*/
function AnimationGroup() {
    
    this.animation = [];

}

AnimationGroup.prototype.constructor = AnimationGroup;

/**
* Method that updates the animations
* @method
*/
AnimationGroup.prototype.update = function(currentTime) {
    
    for(var i=0; i < this.animation.lenght ; i++){
         this.animation[i].update(currentTime);
    }
       

}
