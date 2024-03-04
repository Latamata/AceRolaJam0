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
	this.speed = 2;
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
function ForrestLine( x, y, width, height ){
	this.super( x, y );
	this.width = width;
	this.height = height;
	this.collision = true;
}
extend( ForrestLine, TopDownPlayerMovement );
ForrestLine.prototype.draw = function( c ){
	c.save();
	c.translate( this.x, this.y );	
	draw_forrestline( c );
	c.restore();
}
function MakeHouseTwo( x, y, width, height ){
	this.super( x, y );
	this.width = width;
	this.height = height;
	this.collision = true;
}
extend( MakeHouseTwo, TopDownPlayerMovement );
MakeHouseTwo.prototype.draw = function( c ){
	c.save();
	c.translate( this.x, this.y );	
	draw_housetwo( c );
	c.restore();
}
function MakeHouseOne( x, y, width, height ){
	this.super( x, y );
	this.width = width;
	this.height = height;
	this.collision = true;
}
extend( MakeHouseOne, TopDownPlayerMovement );
MakeHouseOne.prototype.draw = function( c ){
	c.save();
	c.translate( this.x, this.y );	
	draw_houseone( c );
	c.restore();
}
// ======================================================
function MakeHouseFloor( x, y, width, height ){
	this.super( x, y );
	this.width = width;
	this.height = height;
}
extend( MakeHouseFloor, TopDownPlayerMovement );
MakeHouseFloor.prototype.draw = function( c ){
	c.save();
	c.translate( this.x, this.y );	
	draw_house_floor( c, this.width, this.height );
	c.restore();
}
// ======================================================
function MakeDoorway( x, y, width, height ){
	this.super( x, y );
	this.width = width;
	this.height = height;
	this.inZone = false;
	// this.collision = true;
}
extend( MakeDoorway, TopDownPlayerMovement );
MakeDoorway.prototype.update = function( c ){
	if(this.x + this.width > 620 && this.x < 550 && 
	this.y + this.height > 350 && this.y  < 400	){			
		// console.log("inzone",this.inZone)
		this.inZone = true;
	}
	else{
		this.inZone = false;
	}
	TopDownPlayerMovement.prototype.update.apply( this, arguments );
}
MakeDoorway.prototype.draw = function( c ){
	c.save();
	c.translate( this.x, this.y );	
	// draw_button( c );
	c.restore();
}
function MakeButton( x, y ){
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
	