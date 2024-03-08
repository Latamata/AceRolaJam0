function distance_between( obj1, obj2 ){
	return Math.sqrt( Math.pow( obj1.x - obj2.x, 2 ) + Math.pow( obj1.y - obj2.y, 2 ));
}
ForestHaunting = function( id ){
	
	this.canvas = document.getElementById( id );
	this.c = this.canvas.getContext( "2d" );	
	this.currentScene = [];	
	this.inDoors = false;
	this.startPressed = false;
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
	this.currentTitle = new MakeTitle( 290, 100, "ForestHaunting" );
	this.firstHouse();
	// this.mainScreen();
	this.canvas.addEventListener( "keydown", this.keyDown.bind( this ), true);
	this.canvas.addEventListener( "keyup", this.keyUp.bind( this ), true);	
	this.canvas.addEventListener( 'mousedown', this.onMouseDown.bind( this ));
	this.canvas.focus();
	window.requestAnimationFrame( this.frame.bind( this ));	
	
}
function playSound() {
  var audio = document.getElementById('myAudio');
  audio.play();
}
ForestHaunting.prototype.onMouseDown = function( event ) {
    var mouseX = event.clientX - this.canvas.getBoundingClientRect().left;
    var mouseY = event.clientY - this.canvas.getBoundingClientRect().top;
    
    // Check collision with startButton
    if ( !this.startPressed && this.startButton.x <  mouseX && this.startButton.x + this.startButton.width >  mouseX && this.startButton.y <  mouseY && this.startButton.y + this.startButton.height >  mouseY) {
		this.firstMap( 1100, -550 );
		this.startPressed = true;
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
}
ForestHaunting.prototype.collisionLogic = function( item, index ){
	// interaction between the ghost and totem 			
	if ( item.isTotem && this.currentScene[ this.enemyLoc ]  && distance_between( item,this.currentScene[ this.enemyLoc ] )<= 600) {
		if(distance_between( this.currentScene[ this.enemyLoc ], item ) < 100){
			// console.log("ghost within the range")
			this.currentScene[ this.enemyLoc ].movementDirection = -1;
		}
		else if(distance_between( this.currentScene[ this.enemyLoc ], item ) > 550) {
			this.currentScene[this.enemyLoc].movementDirection = 1;
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
		if( item.enemy ){
			if( distance_between( this.mainPlayer, item ) < 65 ){
				// console.log("ghost kill me");
				this.mainScreen();
				this.currentTitle.buttonText = "You Died....";
				this.startButton.buttonText = "Restart";
			}
			this.enemyLoc = index;
			// console.log(distance_between(item, this.mainPlayer))
			// Reverse movement direction if needed
			let xSpeed = 2 * item.movementDirection;
			let ySpeed = 2 * item.movementDirection;

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
	if( item.collision ){
		
		if( this.mainPlayer.x < item.x + item.width && this.mainPlayer.x +60 > item.x &&
		this.mainPlayer.y < item.y + item.height - 50 && this.mainPlayer.y+100 > item.y ){	
			if ( item.isCar && this.action && this.mainPlayer.hasKey ) {			
				this.winScreen();
			}
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
ForestHaunting.prototype.mainScreen = function(  ){
	this.mainPlayer.hasKey = false;
	this.startPressed = false;
	this.currentScene = [];	
	this.currentScene.push( this.startButton, this.currentTitle ); 
}
ForestHaunting.prototype.winScreen = function(  ){
	// this.mainPlayer.hasKey = false;
	// this.startPressed = false;
	playSound();
	this.currentScene = [];	
	this.currentScene.push( new MakeTitle( 290, 100, "ForestHaunting" ), new MakeTitle( 290, 300, "Created by Latamata" ) );  
	console.log("win")
}
ForestHaunting.prototype.firstHouse = function(  ){	
	this.currentScene = [];
	
	this.currentScene.push(  new MakeHouseFloor(325,0,400,400), new MakeDoorway(440,390,200,100), this.mainPlayer, new MakeWallSide(725,-40,100,450,false), new MakeWallSide(290,0,400,60,"top"), new MakeWallSide(290,0,40,400,"left"), new MakeWallSide(325,390,400,30,"bot") );  
	if( !this.mainPlayer.hasKey ){	
		this.currentScene.push( new MakeKey(325,0,50,50) );    	
	}	
	this.inDoors = true;
}
ForestHaunting.prototype.firstMap = function( startPosX, startPosY ){	
	this.currentScene = [];
	
	for (let i = 0; i < 5; i++) {
		this.currentScene.push(new ForrestLineTop((i * 600) - 1500 + startPosX, -100 + startPosY, 600, 200));
		this.currentScene.push(new ForrestLineTop((i * 600) - 1500 + startPosX, 1100 + startPosY, 600, 200));
		this.currentScene.push(new ForrestLineSide( -1650+ startPosX, (i * 500)-100+ startPosY, 150, 500));
		this.currentScene.push(new ForrestLineSide( 1450+ startPosX, (i * 500)-100+ startPosY, 150, 500));
	}
	this.currentScene.push( new makeCar(-750 + startPosX,1000 + startPosY,200,330),new makeTotem(-810 + startPosX,50 + startPosY,200,100),new makeTotem(-920 + startPosX,950 + startPosY,200,100),new makeTotem(700 + startPosX,500 + startPosY,200,100)/**/,
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
	// draw_wall(this.c);
}

