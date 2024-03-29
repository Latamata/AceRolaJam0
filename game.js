function distance_between( obj1, obj2 ){
	return Math.sqrt( Math.pow( obj1.x - obj2.x, 2 ) + Math.pow( obj1.y - obj2.y, 2 ));
}
ForestHaunting = function( id ){
	
	this.canvas = document.getElementById( id );
	this.c = this.canvas.getContext( "2d" );	
	this.currentScene = [];	
	this.inDoors = false;
	this.restartPressed = true;
	this.startPressed = false;
	this.infoPressed = false;
	this.playerWin = false;
	this.action = false;
	this.moveDown = false;
	this.moveUp = false;
	this.moveRight = false;
	this.moveLeft = false;
	this.LeftCollision = false;
	this.rightCollision = false;	
	this.upCollision = false;	
	this.downCollision = false;	
	this.enemyLoc;
	this.mainPlayer = new MakePlayer( this.canvas.width / 2, this.canvas.height / 2 );	
	this.startButton = new MakeButton( this.canvas.width / 3+60, this.canvas.height / 4, "Start Game" );	
	this.restartButton = new MakeButton( this.canvas.width / 3+60, this.canvas.height / 4, "Restart Game" );	
	this.infoButton = new MakeInfo(280,50,"this is the text that will tell player the 411");	
	this.currentTitle = new MakeTitle( 290, 100, "ForestHaunting" );
	// this.firstMap(-350,-50);
	this.mainScreen();
	// this.firstHouse();
	this.canvas.addEventListener( "keydown", this.keyDown.bind( this ), true);
	this.canvas.addEventListener( "keyup", this.keyUp.bind( this ), true);	
	this.canvas.addEventListener( 'mousedown', this.onMouseDown.bind( this ));
	this.canvas.focus();
	window.requestAnimationFrame( this.frame.bind( this ));	
	
}
function playCarSound() {
	
  var audio = document.getElementById('carAudio');
  audio.play();
}
function playGhostSound() {
  var audio = document.getElementById('ghostAudio');
  audio.play();
}
function stopGhostSound() {
  var audio = document.getElementById('ghostAudio');
  audio.pause();
  audio.currentTime = 0; // This resets the audio to the beginning
}
ForestHaunting.prototype.onMouseDown = function( event ) {
    var mouseX = event.clientX - this.canvas.getBoundingClientRect().left;
    var mouseY = event.clientY - this.canvas.getBoundingClientRect().top;
	
    if ( !this.restartPressed && this.restartButton.x <  mouseX && this.restartButton.x + this.restartButton.width >  mouseX && this.restartButton.y <  mouseY && this.restartButton.y + this.restartButton.height >  mouseY) {
		// console.log("hello world");
		this.firstMap( 1100, -550 );
	}
	if ( !this.startPressed && this.startButton.x <  mouseX && this.startButton.x + this.startButton.width >  mouseX && this.startButton.y <  mouseY && this.startButton.y + this.startButton.height >  mouseY) {
		this.mainScreen( true );
		this.startPressed = true;
		this.mainPlayer.hasKey = false;
		// this.infoPressed = false;
    }
		// console.log("sup");		
    // Check collision with startButton
    else if ( !this.infoPressed && this.infoButton.x <  mouseX && this.infoButton.x + this.infoButton.width >  mouseX && this.infoButton.y <  mouseY && this.infoButton.y + this.infoButton.height >  mouseY) {
		this.infoPressed = true;
		this.firstMap( 1100, -550 );
    }
	
}
ForestHaunting.prototype.keyDown = function( e ){
	this.key_handler( e, true );	
}
ForestHaunting.prototype.keyUp = function( e ){
	this.key_handler( e, false );	
}
ForestHaunting.prototype.key_handler = function( e, value ){
    var nothing_handled = false;
    switch( e.key.toLowerCase() || e.keyCode ){
        case "arrowleft":
        case 37: //Left arrow
        case "a":
        case 65: //A key
            this.moveLeft = value;
            break;
        case "arrowright":
        case 39: //Right arrow
        case "d":
        case 68: //D key
            this.moveRight= -value;
            break;
        case "arrowup":
        case 38: //Up arrow
        case "w":
        case 87: //W key
            this.moveUp = value;
            break;
        case "arrowdown":
        case 40: //Down arrow
        case "s":
        case 83: //S key
            this.moveDown = -value;
            break;
        case " ":
        case 32: //Spacebar key
            // this.ship.trigger = value;
            break;
        case "g":
        case 71: //G key
            this.action = value;
            // console.log(this.action);
            break;
        default:
            nothing_handled = true;
    }
    if(!nothing_handled) e.preventDefault();
}
ForestHaunting.prototype.frame = function( timestamp ) {
	if ( !this.previous ) this.previous = timestamp;
	var elapsed = timestamp - this.previous;
	this.fps = 1000 / elapsed;
	this.update( elapsed / 1000 );
	this.draw();
	this.previous = timestamp;
	window.requestAnimationFrame( this.frame.bind( this ));
}
ForestHaunting.prototype.movementLogic = function(){		
	
	if (this.moveRight && !this.moveLeft && !this.rightCollision) {
		this.mainPlayer.x_speed = -this.mainPlayer.speed;							
	} 
	else if (this.moveLeft && !this.moveRight && !this.leftCollision) {
		this.mainPlayer.x_speed = this.mainPlayer.speed;				
	} 
	else {
		this.mainPlayer.x_speed = 0;	
		this.leftCollision = false;
		this.rightCollision = false;
	}
	if (this.moveUp && !this.moveDown && !this.upCollision) {
		
		this.mainPlayer.y_speed = this.mainPlayer.speed;				
	} 
	else if (this.moveDown && !this.moveUp && !this.downCollision) {
		this.mainPlayer.y_speed = -this.mainPlayer.speed;				
	} 
	else {		
		this.mainPlayer.y_speed = 0;		
		this.downCollision = false;
		this.upCollision = false;
	}
	const diagonalFactor = Math.sqrt(2); // Adjusts for diagonal movement slowdown

	// Adjust diagonal movement speed
	if (this.moveDown && this.moveRight) {
		this.mainPlayer.x_speed /= diagonalFactor;
		this.mainPlayer.y_speed /= diagonalFactor;
	}

	if (this.moveUp && this.moveRight) {
		this.mainPlayer.x_speed /= diagonalFactor;
		this.mainPlayer.y_speed /= diagonalFactor;
	}

	if (this.moveDown && this.moveLeft) {
		this.mainPlayer.x_speed /= diagonalFactor;
		this.mainPlayer.y_speed /= diagonalFactor;
	}

	if (this.moveUp && this.moveLeft) {
		this.mainPlayer.x_speed /= diagonalFactor;
		this.mainPlayer.y_speed /= diagonalFactor;
	}

}
ForestHaunting.prototype.collisionLogic = function( item, index ){
	// interaction between the ghost and totem 			
	if ( item.isTotem && this.currentScene[ this.enemyLoc ]  && distance_between( item,this.currentScene[ this.enemyLoc ] )<= 600) {
		if(distance_between( this.currentScene[ this.enemyLoc ], item ) < 80){
			// console.log("ghost within the range")
			this.currentScene[ this.enemyLoc ].movementDirection = -1;
		}
		else if(distance_between( this.currentScene[ this.enemyLoc ], item ) > 550) {
			this.currentScene[this.enemyLoc].movementDirection = 1;
		}
		
	}
	if( item.enemy ){
		if( distance_between( this.mainPlayer, item ) < 65 ){
			// console.log("ghost kill me");
			this.restartScreen();
			this.restartPressed = false;
			this.currentTitle.buttonText = "You Died....";
		}
		if( !this.inDoors && !this.playerWin && distance_between( this.mainPlayer, item ) < 500 ){
			playGhostSound();
		}
		else{
			stopGhostSound();
		}
		this.enemyLoc = index;
		// Reverse movement direction if needed
		let xSpeed = 1.5 * item.movementDirection;
		let ySpeed = 1.8 * item.movementDirection;

		// Adjust position based on player position
		if (item.x < this.mainPlayer.x) {
			item.x += xSpeed;
		} else {
			item.x -= xSpeed;
		}
		if (item.y < this.mainPlayer.y) {
			item.y += ySpeed;
		} else {
			item.y -= ySpeed;
		}			
	}
	if ( item.enemy ) {
			this.enemyLoc = index; // Set this.enemyLoc when encountering an enemy
		}
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
	
	if ( item.isKey ) {			
			if(distance_between( this.mainPlayer, item ) < 50 ){	
			
				this.currentScene.splice( index, 1 );
				this.mainPlayer.hasKey = true;
				console.log(this.mainPlayer.hasKey)
			}
	}
	// detection for player and enemy
	
	if( item.collision ){
		
		if( this.mainPlayer.x < item.x + item.width && this.mainPlayer.x +60 > item.x &&
		this.mainPlayer.y < item.y + item.height - 50 && this.mainPlayer.y+100 > item.y ){	
			if ( item.isCar && this.action && this.mainPlayer.hasKey ) {					
				this.winScreen();
				// need this for audio to stop on ghost
				this.playerWin = true;
			}
			if( this.mainPlayer.x < item.x && this.moveRight ){					
				this.rightCollision = true;					
				console.log("hit right");										
			}
			else if( this.mainPlayer.x > item.x && this.moveLeft ){					
				this.leftCollision = true;					
				console.log("hit left");				
			}			
			if( this.mainPlayer.y < item.y && this.moveDown ){					
				this.downCollision = true;				
				console.log("hit up");				
			}
			else if( this.mainPlayer.y > item.y && this.moveUp ){					
				this.upCollision = true;
				console.log("hit down");				
			}								
		}			
	}				
}
ForestHaunting.prototype.restartScreen = function(  ){

	// this.startPressed = false;
	this.currentScene = [];	
	this.currentScene.push( this.restartButton, this.currentTitle ); 

	
}
ForestHaunting.prototype.mainScreen = function( info ){
	
	if( info ){
		this.currentScene.push( this.infoButton )	
	}
	else{
		this.startPressed = false;
		this.currentScene = [];	
		this.currentScene.push( this.startButton, this.currentTitle ); 
	}
	
	
}
ForestHaunting.prototype.winScreen = function(  ){
	// this.mainPlayer.hasKey = false;
	// this.startPressed = false;
	
	playCarSound();
	this.currentScene = [];	
	this.currentScene.push( new MakeTitle( 290, 100, "ForestHaunting" ), new MakeTitle( 290, 300, "Created by Latamata" ) );  
	console.log("win")
}
ForestHaunting.prototype.firstHouse = function(  ){	
	this.currentScene = [];
	stopGhostSound();
	this.currentScene.push(   new MakeHouseFloor(325,0,400,400), new MakeDoorway(440,390,200,100), this.mainPlayer, new MakeWallSide(725,-40,100,450,false),
	new MakeWallSide(290,0,450,60,"top"), new MakeWallSide(290,0,40,450,"left"), new MakeWallSide(325,389,450,30,"bot"), new MakeDoor(480,402) );  
	if( !this.mainPlayer.hasKey ){	
		this.currentScene.push( new MakeKey(325,0,50,50) );    	
	}		
	this.inDoors = true;
}
ForestHaunting.prototype.firstMap = function( startPosX, startPosY ){	
	this.currentScene = [];
	
	for ( let i = 0; i < 5; i++ ) {
		this.currentScene.push(new ForrestLineTop((i * 600) - 1500 + startPosX, -100 + startPosY, 600, 200));
		this.currentScene.push(new ForrestLineTop((i * 600) - 1500 + startPosX, 1100 + startPosY, 600, 200));
		this.currentScene.push(new ForrestLineSide( -1650+ startPosX, (i * 500)-100+ startPosY, 150, 500));
		this.currentScene.push(new ForrestLineSide( 1450+ startPosX, (i * 500)-100+ startPosY, 150, 500));
	}
	this.currentScene.push( new makeCar(-750 + startPosX,1000 + startPosY,200,330),/*topleft*/new MakeSaltCircle(-810 + startPosX,150 + startPosY,200,100),
	/*nexttocar*/new MakeSaltCircle(-930 + startPosX,990 + startPosY,200,100),/*left of house*/new MakeSaltCircle(50 + startPosX,350 + startPosY,200,100),
	new MakeSaltCircle(450 + startPosX,850 + startPosY,200,100),/*new MakeSaltCircle(700 + startPosX,900 + startPosY,200,100),*/
	new MakeDoorway(810 + startPosX,360 + startPosY,200,100),new MakeHouseTwo( 650 + startPosX,100+startPosY, 430, 300 ),
	new MakeHouseOne( -650 + startPosX,100+startPosY, 200, 300 ), new MakeAberration(100+ startPosX,500+startPosY, 50,50));   
	this.currentScene.push( this.mainPlayer ); 	
    this.inDoors = false;
}
ForestHaunting.prototype.update = function( elapsed ) {
	
	this.movementLogic();
	this.currentScene.forEach(function( item, index ){		
		
		this.collisionLogic( item, index );
		item.update( elapsed, this.mainPlayer.x_speed, this.mainPlayer.y_speed );
		
	}.bind( this ));
}	
ForestHaunting.prototype.draw = function() {
	this.c.clearRect( 0, 0, this.canvas.width, this.canvas.height );	
	
	this.currentScene.forEach(function( item ){
		// console.log( item )
		item.draw( this.c )
		
	}.bind( this ));	
	// draw_info(this.c);
}

