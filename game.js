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
	this.downCollision = false;	
	this.mainPlayer = new MakePlayer( this.canvas.width / 2, this.canvas.height / 2 );	
	this.startButton = new MakeButton( this.canvas.width / 3, this.canvas.height / 4 );	
	this.firstMap();
	this.canvas.addEventListener( "keydown", this.keyDown.bind( this ), true);
	this.canvas.addEventListener( "keyup", this.keyUp.bind( this ), true);	
	this.canvas.addEventListener( 'mousedown', this.onMouseDown.bind(this));
	this.canvas.focus();
	window.requestAnimationFrame( this.frame.bind( this ));	
	
}
IslandAberration.prototype.onMouseDown = function(event) {
    var mouseX = event.clientX - this.canvas.getBoundingClientRect().left;
    var mouseY = event.clientY - this.canvas.getBoundingClientRect().top;
    
    // Check collision with startButton
    if (this.startButton.x <  mouseX && this.startButton.x + this.startButton.width >  mouseX && this.startButton.y <  mouseY && this.startButton.y + this.startButton.height >  mouseY) {
		this.firstMap();
    }
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
            this.moveRight= -value;
            break;
        case "ArrowUp":
        case 38: //Up arrow
        case "w":
        case 87: //w key
			// console.log("hiii")
            this.moveUp = value;
            break;
        case "ArrowDown":
        case 40: //Down arrow
        case "s":
        case 83: //s key
            this.moveDown = -value;
            break;
        case " ":
        case 32: //spacebar key
            // this.ship.trigger = value;
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
IslandAberration.prototype.mainScreen = function(  ){	
	this.currentScene.push(this.startButton);  
}
IslandAberration.prototype.firstMap = function(  ){	
	this.currentScene = [];
	// this.currentScene.push( this.mainPlayer );    
	this.currentScene.push( new MakeWall( 100,100, 200, 100	),new MakeWall( 650,100, 200, 300 ),new MakeHouseOne( -650,100, 200, 300 ), new MakeAberration(100,500, 50,50));    
    
}
IslandAberration.prototype.update = function( elapsed ) {
	if ( this.moveRight && !this.moveLeft && !this.rightCollision) {
		// wow this is actually not running
		// console.log("runningright");	
		this.mainPlayer.x_speed = -1;							
	}	
	else if( this.moveLeft && !this.moveRight && !this.leftCollision ){
		this.mainPlayer.x_speed = 1;				
	}
	else{
		this.mainPlayer.x_speed = 0;	
		this.leftCollision = false;
		this.rightCollision = false;
	}
	if( this.moveUp && !this.moveDown && !this.upCollision){
		this.mainPlayer.y_speed = 1;				
	}
	else if( this.moveDown && !this.moveUp && !this.downCollision ){
		this.mainPlayer.y_speed = -1;				
	}
	else{		
		// reset is not causing collision issue
		this.mainPlayer.y_speed = 0;		
		// im putting the reset of collision here since it seems to make it more fluid with movement
		this.downCollision = false;
		this.upCollision = false;
	}
	this.currentScene.forEach(function( item ){
		
		if( this.mainPlayer.x < item.x + item.width && this.mainPlayer.x +60 > item.x &&
			this.mainPlayer.y < item.y + item.height && this.mainPlayer.y+100 > item.y){					
			if( this.mainPlayer.x < item.x ){					
					this.rightCollision = true;					
					//console.log("hit right");										
				}
				if( this.mainPlayer.x > item.x ){					
					this.leftCollision = true;					
					//console.log("hit left");				
				}		
				if( this.mainPlayer.y < item.y ){					
					this.downCollision = true;				
					//console.log("hit up");				
				}
				if( this.mainPlayer.y > item.y ){					
					this.upCollision = true;
					//console.log("hit down");				
				}									
		}		
		item.update( elapsed, this.mainPlayer.x_speed, this.mainPlayer.y_speed );
		
	}.bind(this));
}	
IslandAberration.prototype.draw = function() {
	this.c.clearRect( 0, 0, this.canvas.width, this.canvas.height );	
	this.mainPlayer.draw( this.c)
	this.currentScene.forEach(function( item ){
		// console.log( item )
		item.draw( this.c )
		
	}.bind(this));
}

