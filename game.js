function collision( obj1, obj2 ){
	return distance_between( obj1, obj2 ) < ( obj1.radius + obj2.radius );
}
function distance_between( obj1, obj2 ){
	return Math.sqrt( Math.pow( obj1.x - obj2.x, 2 ) + Math.pow( obj1.y - obj2.y, 2 ));
}
IslandAberration = function( id ){
	this.canvas = document.getElementById( id );
	this.c = this.canvas.getContext( "2d" );	
	this.currentScene = [];	
	this.moveDown = false;
	this.moveUp = false;
	this.moveRight = false;
	this.moveLeft = false;
	this.LeftCollision = false;
	this.rightCollision = false;	
	this.upCollision = false;		
	this.firstMap();
	this.canvas.addEventListener( "keydown", this.keyDown.bind( this ), true);
	this.canvas.addEventListener( "keyup", this.keyUp.bind( this ), true);	
	this.canvas.focus();
	window.requestAnimationFrame( this.frame.bind( this ));	
}
IslandAberration.prototype.firstMap = function(  ){	
	
}
IslandAberration.prototype.keyDown = function( e ){
	this.key_handler(e, true);	
}
IslandAberration.prototype.keyUp = function( e ){
	this.key_handler( e, false );	
}
IslandAberration.prototype.key_handler = function( e, value ){
    var nothing_handled = false;
    switch( e.key || e.keyCode ){
        case "ArrowLeft":
        case 37: //left arrow
        case "a":
        case 65: //a key
            this.moveLeft = value;
            break;
        case "ArrowRight":
        case 39: //Right arrow
        case "d":
        case 68: //d key
            this.moveRight = value;
            break;
        case "ArrowUp":
        case 38: //Up arrow
        case "w":
        case 87: //w key
            this.moveUp = value;
            break;
        case "ArrowDown":
        case 40: //Down arrow
        case "s":
        case 83: //s key
            this.moveDown = value;
            break;
        case " ":
        case 32: //spacebar key
            this.ship.trigger = value;
            break;
        case "g":
        case 71: //g key
            if( value ) this.guide = !this.guide;
            break;
        default:
            nothing_handled = true;
    }
    if(!nothing_handled) e.preventDefault();
}

IslandAberration.prototype.frame = function( timestamp ) {
	if ( !this.previous ) this.previous = timestamp;
	var elapsed = timestamp - this.previous;
	this.fps = 1000 / elapsed;
	this.update( elapsed / 1000 );
	this.draw();
	this.previous = timestamp;
	window.requestAnimationFrame( this.frame.bind( this ));
}
IslandAberration.prototype.update = function( elapsed ) {
	this.currentScene.forEach(function( item ){
		console.log( item )
	});
}
	
IslandAberration.prototype.draw = function() {
	this.c.clearRect( 0, 0, this.canvas.width, this.canvas.height );		
	
}

