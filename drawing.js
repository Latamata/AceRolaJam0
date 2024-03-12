function draw_title( ctx, text ) {
	ctx.save();    
    ctx.fillStyle = "red"; // Set text color
    ctx.font = "60px Arial"; // Set font size and family
    ctx.fillText(text, 0, 0); // Draw the text at position (220, 60)
    ctx.restore();
}
// =======================================
function draw_info( ctx, text ) {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.fillStyle = "yellow";
    ctx.rect(0, 0, 500, 500);
    ctx.stroke();
    ctx.fill();
    ctx.fillStyle = "black"; // Set text color
    ctx.font = "20px Arial"; // Set font size and family
    ctx.fillText("while exploring abandoned house, a ghost ", 55, 60); // Draw the text at position (220, 60)
    ctx.fillText("appeared and you ran out to the car to find", 55, 90); // Draw the text at position (220, 60)
    ctx.fillText(" out you dropped car keys back at the house", 55, 120); // Draw the text at position (220, 60)
    ctx.fillText("WASD to move 'g' for action", 55, 180); // Draw the text at position (220, 60)
    ctx.fillText("Salt Cirlcles scare ghost", 55, 210); // Draw the text at position (220, 60)
    ctx.fillText("click to close........", 55, 250); // Draw the text at position (220, 60)
    ctx.restore();
}
// =======================================
function draw_button( ctx, text ) {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.fillStyle = "yellow";
    ctx.rect(0, 0, 200, 100);
    ctx.stroke();
    ctx.fill();
    ctx.fillStyle = "black"; // Set text color
    ctx.font = "20px Arial"; // Set font size and family
    ctx.fillText(text, 55, 60); // Draw the text at position (220, 60)
    ctx.restore();
}
// =======================================
function draw_wall( ctx, side ){
	
	let picture = document.getElementById('wallside');
	if(side === "top"){
		ctx.save();
		ctx.rotate(-Math.PI / 2);
		ctx.drawImage( picture, 0, 0 );
		ctx.restore();		
	}
	else if(side === "left"){
		ctx.save();	
		ctx.scale(-1, -1); // Scale vertically by -1
		ctx.drawImage(picture, -picture.width, -picture.height); // Draw the image
		// ctx.drawImage( picture, 0, 0 );
		ctx.restore();
	} else if(side === "bot"){
		ctx.save();
		ctx.rotate(-Math.PI / 2);
		ctx.scale( -1, -1); // Scale vertically by -1
		ctx.drawImage(picture, picture.width-30, -picture.height); // Draw the image
		ctx.restore();	
	}
	else{
		ctx.save();	
		// ctx.scale(-1, -1); // Scale vertically by -1
		// ctx.drawImage(picture, -picture.width, -picture.height); // Draw the image
		ctx.drawImage( picture, 0, 0 );
		ctx.restore();
	}
}
// =======================================
function draw_key( ctx ){
	let picture = document.getElementById('keys');
	ctx.save();
	ctx.drawImage( picture, 0, 0 );
	ctx.restore();
}
// =======================================
function draw_car( ctx ){
	let picture = document.getElementById('car');
	ctx.save();
	ctx.drawImage( picture, 0, 0 );
	ctx.restore();
}
// =======================================
function draw_saltcircle( ctx ){
	let picture = document.getElementById('totem');
	ctx.save();
	ctx.drawImage( picture, 0, 30 );
	ctx.restore();
}
// =======================================
function draw_housetwo( ctx ){
	let picture = document.getElementById('housetwo');
	ctx.save();
	ctx.drawImage( picture, 0, 0 );
	ctx.restore();
}
// =======================================
function draw_houseone( ctx ){
	let picture = document.getElementById('houseone');
	ctx.save();
	ctx.drawImage( picture, 0, 0 );
	ctx.restore();
}
// =======================================
function draw_forrestline_side( ctx ){
	let picture = document.getElementById('forrestlineside');
	ctx.save();
	ctx.drawImage( picture, 0, 0 );
	ctx.restore()
}
// =======================================
function draw_forrestline( ctx ){
	let picture = document.getElementById('forrestline');
	ctx.save();
	ctx.drawImage( picture, 0, 0 );
	ctx.restore();
}
// =======================================
function draw_house_floor( ctx, width, height ){
	ctx.save();
	ctx.beginPath();
	ctx.rect( 0, 0, width, height );
	ctx.fillStyle = "brown";
	ctx.fill();
	ctx.restore();
}
// =======================================
function draw_aberration( ctx ){
	let picture = document.getElementById('aberration');
	ctx.save();
	ctx.drawImage( picture, 0, 0 );
	ctx.restore();
}
// =======================================
function draw_maindude( ctx, currentFrame, direction ){
	let picture = document.getElementById('body');
	ctx.save();
	// ctx.drawImage( picture, 0, 0 );
	if(direction){	
		ctx.scale(-1, 1);			
		// Draw the image with the flipped horizontal position
		ctx.drawImage(picture, currentFrame * 57, 0, 57, 100, -57, 0, 57, 100);	
	}
	else{
		ctx.drawImage( picture, currentFrame * 57, 0, 57, 100, 0, 0, 57, 100 );	
	}
	ctx.restore();

}