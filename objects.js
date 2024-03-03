function extend( ChildClass, ParentClass ){
	var parent = new ParentClass();
	ChildClass.prototype = parent;
	ChildClass.prototype.super = parent.constructor;
	ChildClass.prototype.constructor = ChildClass;
}
function TopDownPlayerMovement( x, y ){
	this.x = x;
	this.y = y;
}
TopDownPlayerMovement.prototype.update = function( elapsed, heroXSpeed, heroYSpeed ){
	
	this.x += heroXSpeed;
	this.y += heroYSpeed;
	
}
// ======================================================
function MakePlayer( x, y ){
	this.x = x;
	this.y = y;
	this.x_speed = 0;
	this.y_speed = 0;
	this.height = this.y + 100;
	this.width = this.x + 100;
	// this.imageflip = false;
}
MakePlayer.prototype.update = function( elapsed ){
	
}
MakePlayer.prototype.draw = function( c ){
	c.save();
	c.translate( this.x, this.y );
	draw_maindude( c );
	c.restore();
}
// ======================================================
function MakeAberration( x, y, width, height ){
	this.super( x, y );
	this.width = width;
	this.height = height;
}
extend( MakeAberration, TopDownPlayerMovement );
MakeAberration.prototype.draw = function( c ){
	c.save();
	c.translate( this.x, this.y );	
	draw_aberration( c );
	c.restore();
}
// ======================================================
function MakeHouseOne( x, y, width, height ){
	this.super( x, y );
	this.width = width;
	this.height = height;
}
extend( MakeHouseOne, TopDownPlayerMovement );
MakeHouseOne.prototype.draw = function( c ){
	c.save();
	c.translate( this.x, this.y );	
	draw_houseone( c );
	c.restore();
}
// ======================================================
function MakeWall( x, y, width, height ){
	this.super( x, y );
	this.width = width;
	this.height = height;
}
extend( MakeWall, TopDownPlayerMovement );
MakeWall.prototype.draw = function( c ){
	c.save();
	c.translate( this.x, this.y );	
	draw_wall( c, this.width, this.height );
	c.restore();
}
// ======================================================
function MakeButton(x, y){
	this.x = x;
	this.y = y;
	this.width = 200;
	this.height = 100;
}
MakeButton.prototype.update = function( c ){
}
MakeButton.prototype.draw = function( c ){
	c.save();
	c.translate( this.x, this.y );	
	draw_button( c );
	c.restore();
}
	