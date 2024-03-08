function draw_title( ctx, text ) {
	ctx.save();    
    ctx.fillStyle = "red"; // Set text color
    ctx.font = "60px Arial"; // Set font size and family
    ctx.fillText(text, 0, 0); // Draw the text at position (220, 60)
    ctx.restore();
}
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
	// ctx.save();	
	// ctx.restore();
	// Rotate the canvas 90 degrees counterclockwise
	// Rotate the canvas 90 degrees counterclockwise
	

	// Draw the image (assuming width and height are already swapped)
	// ctx.drawImage(picture, -picture.height, 0);		
	
	// Horizontal flip
	// ctx.save(); // Save the current transformation state
	// ctx.scale(-1, 1); // Scale horizontally by -1
	// ctx.drawImage(picture, -picture.width, 0); // Draw the image
	// ctx.restore(); // Restore the previous transformation state

	// Vertical flip
	// ctx.save(); // Save the current transformation state
	// ctx.scale(1, -1); // Scale vertically by -1
	// ctx.drawImage(picture, 0, -picture.height); // Draw the image
	// ctx.restore(); // Restore the previous transformation state

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
function draw_totem( ctx ){
	let picture = document.getElementById('totem');
	ctx.save();
	ctx.drawImage( picture, 0, 0 );
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
	// let table = document.getElementById('table');
	ctx.save();
	ctx.beginPath();
	ctx.rect( 0, 0, width, height );
	// ctx.drawImage(table, 0, 0);
	// ctx.strokeStyle = "white";
	ctx.fillStyle = "brown";
	// ctx.strokeStyle = "white";
	// ctx.stroke();
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
function draw_maindude( ctx ){
	let picture = document.getElementById('body');
	ctx.save();
	ctx.drawImage( picture, 0, 0 );
	// ctx.beginPath();
	// ctx.strokeStyle = "white";
	// ctx.fillStyle = "yellow";
	// ctx.rect( 0, 0, 100, 100 );
	// ctx.stroke();
	// ctx.fill();
	ctx.restore();

}