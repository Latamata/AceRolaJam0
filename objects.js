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
	this.currentFrame = 0;	
	this.elapsedTime = 0;
	this.direction = false;
	this.hasKey = false;
}
MakePlayer.prototype.update = function(elapsed) {
	
    // Define the duration for each frame
    var frameDuration = 0.5; // in seconds, adjust as needed

    // Accumulate elapsed time
    this.elapsedTime += elapsed;

    // Check if it's time to switch frames
    if (this.elapsedTime >= frameDuration) {
        // Increment current frame
        this.currentFrame = (this.currentFrame % 2) + 1; // Loop between frames 1 and 2

        // Reset elapsed time
        this.elapsedTime = 0;
		if(this.x_speed < 0){
			this.direction = true;
		}
		else{
			this.direction = false;
		}
    }
	if(	this.x_speed === 0 && this.y_speed === 0){
		this.currentFrame = 0;
	}
};

MakePlayer.prototype.draw = function( c ){
	c.save();
	c.translate( this.x, this.y );
	draw_maindude( c, this.currentFrame,this.direction );
	c.restore();
}
// ======================================================
function MakeAberration( x, y, width, height ){
	this.super( x, y );
	this.enemy = true;
	this.width = width;
	this.height = height;
	this.movementDirection = 1; 
}
extend( MakeAberration, TopDownPlayerMovement );
MakeAberration.prototype.update = function( c ){
	TopDownPlayerMovement.prototype.update.apply( this, arguments );
}
MakeAberration.prototype.draw = function( c ){
	c.save();
	c.translate( this.x, this.y );	
	draw_aberration( c );
	c.restore();
}
// ======================================================
function MakeWallSide( x, y, width, height, side ){
	this.super( x, y );
	this.width = width;
	this.height = height;
	this.side = side;
	this.collision = true;
}
extend( MakeWallSide, TopDownPlayerMovement );
MakeWallSide.prototype.draw = function( c ){
	c.save();
	c.translate( this.x, this.y );	
	draw_wall( c, this.side );
	c.restore();
}
// ======================================================
function ForrestLineSide( x, y, width, height ){
	this.super( x, y );
	this.width = width;
	this.height = height;
	this.collision = true;
}
extend( ForrestLineSide, TopDownPlayerMovement );
ForrestLineSide.prototype.draw = function( c ){
	c.save();
	c.translate( this.x, this.y );	
	draw_forrestline_side( c );
	c.restore();
}
// ======================================================
function MakeKey( x, y, width, height ){
	this.super( x, y );
	this.width = width;
	this.height = height;
	this.isKey = true;
}
extend( MakeKey, TopDownPlayerMovement );
MakeKey.prototype.update = function( c ){
	
	TopDownPlayerMovement.prototype.update.apply( this, arguments );
}
MakeKey.prototype.draw = function( c ){
	c.save();
	c.translate( this.x, this.y );	
	draw_key( c );
	c.restore();
}
// ======================================================
function makeCar( x, y, width, height ){
	this.super( x, y );
	this.width = width;
	this.height = height;
	this.isCar = true;
	this.collision = true;
}
extend( makeCar, TopDownPlayerMovement );
makeCar.prototype.update = function( c ){
	
	TopDownPlayerMovement.prototype.update.apply( this, arguments );
}
makeCar.prototype.draw = function( c ){
	c.save();
	c.translate( this.x, this.y );	
	draw_car( c );
	c.restore();
}
// ======================================================
function MakeSaltCircle( x, y, width, height ){
	this.super( x, y );
	// this.width = width;
	// this.height = height;
	this.isTotem = true;
}
extend( MakeSaltCircle, TopDownPlayerMovement );
MakeSaltCircle.prototype.update = function( c ){
	
	TopDownPlayerMovement.prototype.update.apply( this, arguments );
}
MakeSaltCircle.prototype.draw = function( c ){
	c.save();
	c.translate( this.x, this.y );	
	draw_saltcircle( c );
	c.restore();
}
// ======================================================
function ForrestLineTop( x, y, width, height ){
	this.super( x, y );
	this.width = width;
	this.height = height;
	this.collision = true;
}
extend( ForrestLineTop, TopDownPlayerMovement );
ForrestLineTop.prototype.draw = function( c ){
	c.save();
	c.translate( this.x, this.y );	
	draw_forrestline( c );
	c.restore();
}
// ======================================================
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
// ======================================================
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
// ======================================================
function MakeTitle( x, y, buttonText ){
	this.x = x;
	this.y = y;
	this.buttonText = buttonText;
}
MakeTitle.prototype.update = function( c ){
}
MakeTitle.prototype.draw = function( c ){
	c.save();
	c.translate( this.x, this.y );	
	draw_title( c, this.buttonText )
	c.restore();
}
// ======================================================
function MakeButton( x, y, buttonText ){
	this.x = x;
	this.y = y;
	this.width = 200;
	this.height = 100;
	this.buttonText = buttonText;
}
MakeButton.prototype.update = function( c ){
}
MakeButton.prototype.draw = function( c ){
	c.save();
	c.translate( this.x, this.y );	
	draw_button( c, this.buttonText );
	c.restore();
}
// ======================================================
function MakeInfo( x, y, buttonText ){
	this.x = x;
	this.y = y;
	this.width = 500;
	this.height = 500;
	this.buttonText = buttonText;
}
MakeInfo.prototype.update = function( c ){
}
MakeInfo.prototype.draw = function( c ){
	c.save();
	c.translate( this.x, this.y );	
	draw_info( c, this.buttonText );
	c.restore();
}
	