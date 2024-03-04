
function draw_button(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.fillStyle = "yellow";
    ctx.rect(0, 0, 200, 100);
    ctx.stroke();
    ctx.fill();
    ctx.fillStyle = "black"; // Set text color
    ctx.font = "20px Arial"; // Set font size and family
    ctx.fillText("Start Game", 55, 60); // Draw the text at position (220, 60)
    ctx.restore();
}

function draw_housetwo( ctx ){
	let picture = document.getElementById('housetwo');
	ctx.save();
	ctx.drawImage( picture, 0, 0 );
	ctx.restore();
}
function draw_houseone( ctx ){
	let picture = document.getElementById('houseone');
	ctx.save();
	ctx.drawImage( picture, 0, 0 );
	ctx.restore();
}
function draw_forrestline( ctx ){
	let picture = document.getElementById('forrestline');
	ctx.save();
	ctx.drawImage( picture, 0, 0 );
	ctx.restore();
}
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
function draw_aberration( ctx ){
	let picture = document.getElementById('aberration');
	ctx.save();
	ctx.drawImage( picture, 0, 0 );
	ctx.restore();
}
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