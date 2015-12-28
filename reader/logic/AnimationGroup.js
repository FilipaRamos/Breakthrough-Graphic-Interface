function AnimationGroup() {
    
    this.animation = [];


}

AnimationGroup.prototype.constructor = AnimationGroup;

AnimationGroup.prototype.addAnimation = function(animation) {
    this.animation.push(animation);
}

AnimationGroup.prototype.update = function(currentTime) {
    
    if (this.animations !== undefined && this.animations.length != 0) {
        this.animation[0].update(currentTime);
    }

}
