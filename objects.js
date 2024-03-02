function extend( ChildClass, ParentClass ){
	var parent = new ParentClass();
	ChildClass.prototype = parent;
	ChildClass.prototype.super = parent.constructor;
	ChildClass.prototype.constructor = ChildClass;
}
function TopDownPlayerMovement( x, y ){
	this.x = x;
	this.y = y;
	this.height = this.y + 100;
	this.width = this.x + 1000;
}
TopDownPlayerMovement.prototype.update = function( elapsed, ctx, heroXSpeed, heroYSpeed ){
	
	this.x += heroXSpeed;
	this.y += heroYSpeed;
	this.width = this.x + 1000;
}
function MakePlayer( x, y ){
	this.x = x;
	this.y = y;
	this.x_speed = 0;
	this.y_speed = 0;
	this.height = this.y + 100;
	this.width = this.x + 100;
	// this.imageflip = false;
}
MakePlayer.prototype.draw = function( c ){
	c.save();
	c.translate( this.x, this.y );
	draw_maindude( c );
	c.restore();
}
function MakeSquare( x, y ){
	this.super( x, y );
}
extend( MakeSquare, TopDownPlayerMovement );
MakeSquare.prototype.draw = function( c ){
	c.save();
	c.translate( this.x, this.y );	
	draw_square( c );
	c.restore();
}
	