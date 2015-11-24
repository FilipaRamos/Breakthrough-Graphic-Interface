function Animation(scene, animation){

 	CGFappearance.call(this,scene);

 	this.animation = animation;
}

Animation.prototype = Object.create(CGFappearance.prototype);

Animation.prototype.constructor = Animation;

Animation.prototype.addAnimation = function(type){
	type.update(this.currentTime);
}