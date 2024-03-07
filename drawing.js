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