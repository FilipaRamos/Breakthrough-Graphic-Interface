function AnimationGroup() {
    
    this.animation = [];

}

AnimationGroup.prototype.constructor = AnimationGroup;

AnimationGroup.prototype.update = function(currentTime) {
    
    for(var i=0; i < this.animation.lenght ; i++){
         this.animation[i].update(currentTime);
    }
       

}
