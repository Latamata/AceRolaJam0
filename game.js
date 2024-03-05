function distance_between( obj1, obj2 ){
	return Math.sqrt( Math.pow( obj1.x - obj2.x, 2 ) + Math.pow( obj1.y - obj2.y, 2 ));
}
IslandAberration = function( id ){
	
	this.canvas = document.getElementById( id );
	this.c = this.canvas.getContext( "2d" );	
	this.currentScene = [];	
	this.inDoors = false;
	this.startPressed = true;
	this.action = false;
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
	// this.firstMap(-300,-100);
	this.firstHouse();
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
    if ( !this.startPressed && this.startButton.x <  mouseX && this.startButton.x + this.startButton.width >  mouseX && this.startButton.y <  mouseY && this.startButton.y + this.startButton.height >  mouseY) {
		this.firstMap();
		this.startPressed = true;
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
            this.action = value;
			// console.log(this.action);
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
IslandAberration.prototype.collisionLogic = function( item ){	
	if( item.inZone && this.action ){
			// console.log("inzone")
			if(this.inDoors){
				this.firstMap(-350,-50);
			}
			else{
				this.firstHouse();
			}
			this.action = false;			
	}
	if( item.collision ){
		
		if( this.mainPlayer.x < item.x + item.width && this.mainPlayer.x +60 > item.x &&
		this.mainPlayer.y < item.y + item.height - 50 && this.mainPlayer.y+100 > item.y ){					
			if( this.mainPlayer.x < item.x ){					
				this.rightCollision = true;					
				//console.log("hit right");										
			}
			else if( this.mainPlayer.x > item.x ){					
				this.leftCollision = true;					
				//console.log("hit left");				
			}		
			if( this.mainPlayer.y < item.y ){					
				this.downCollision = true;				
				//console.log("hit up");				
			}
			else if( this.mainPlayer.y > item.y ){					
				this.upCollision = true;
				// console.log("hit down");				
			}									
		}			
	}				
}
IslandAberration.prototype.mainScreen = function(  ){	
	this.currentScene.push(this.startButton);  
}
IslandAberration.prototype.firstHouse = function( startPosX, startPosY ){	
	this.currentScene = [];
	this.currentScene.push( new MakeHouseFloor(325,0,400,400), new MakeDoorway(440,390,200,100));    
	this.inDoors = true;
}
IslandAberration.prototype.firstMap = function( startPosX, startPosY ){	
	this.currentScene = [];
	// this.currentScene.push( this.mainPlayer ); 
	for (let i = 0; i < 5; i++) {
		this.currentScene.push(new ForrestLineTop((i * 600) - 1500, -100, 600, 200));
		this.currentScene.push(new ForrestLineTop((i * 600) - 1500, 1100, 600, 200));
		this.currentScene.push(new ForrestLineSide( -1650, (i * 500)-100, 150, 500));
		this.currentScene.push(new ForrestLineSide( 1450, (i * 500)-100, 150, 500));
	}
	this.currentScene.push( new makeTotem(810 + startPosX,560 + startPosY,200,100),new MakeDoorway(810 + startPosX,360 + startPosY,200,100),new MakeHouseTwo( 650 + startPosX,100+startPosY, 430, 300 ),new MakeHouseOne( -650 + startPosX,100+startPosY, 200, 300 ), new MakeAberration(100+ startPosX,500+startPosY, 50,50));    
    this.inDoors = false;
}
IslandAberration.prototype.update = function( elapsed ) {
	if ( this.moveRight && !this.moveLeft && !this.rightCollision) {
		// wow this is actually not running
		// console.log("runningright");	
		this.mainPlayer.x_speed = -this.mainPlayer.speed;							
	}	
	else if( this.moveLeft && !this.moveRight && !this.leftCollision ){
		this.mainPlayer.x_speed = this.mainPlayer.speed;				
	}
	else{
		this.mainPlayer.x_speed = 0;	
		this.leftCollision = false;
		this.rightCollision = false;
	}
	if( this.moveUp && !this.moveDown && !this.upCollision){
		this.mainPlayer.y_speed = this.mainPlayer.speed;				
	}
	else if( this.moveDown && !this.moveUp && !this.downCollision ){
		this.mainPlayer.y_speed = -this.mainPlayer.speed;				
	}
	else{		
		// reset is not causing collision issue
		this.mainPlayer.y_speed = 0;		
		// im putting the reset of collision here since it seems to make it more fluid with movement
		this.downCollision = false;
		this.upCollision = false;
	}
	this.currentScene.forEach(function( item ){
		if(item.enemy){
			// console.log(distance_between(item, this.mainPlayer))
			if( item.x < this.mainPlayer.x ){
				// console.log("hit")
				item.x += 2;
			}	else{
				item.x -= 2;
			}
			if( item.y < this.mainPlayer.y ){
				// console.log("hit")
				item.y += 2;
			}	else{
				item.y -= 2;
			}
			
		}
		this.collisionLogic( item );
		item.update( elapsed, this.mainPlayer.x_speed, this.mainPlayer.y_speed );
		// console.log(item);
	}.bind(this));
}	
IslandAberration.prototype.draw = function() {
	this.c.clearRect( 0, 0, this.canvas.width, this.canvas.height );	
	
	this.currentScene.forEach(function( item ){
		// console.log( item )
		item.draw( this.c )
		
	}.bind(this));
	this.mainPlayer.draw( this.c)
}

