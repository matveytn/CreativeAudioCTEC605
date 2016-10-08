/**
 * Created by Matt on 10/6/2016.
 */
var w = window.innerWidth, h = window.innerHeight;
function setup() {
	createCanvas(w, h);
	frameRate(60)
}

var r = (w<h) ? w / 3 : h / 3; // radius is a third of the smaller screen dimension
var x_off = 1000, y_off = 1000, z_off = 1000;
var vertices_amount = 180; //amount of vertices

var px_offset = 120;    // amplitude
var NOISE_SCALE = 450;  // the higher the softer


var Z_SPEED = .01; // noise change per frame

var X_SPEED = 0;
var Y_SPEED = 0;


var MOUSE_FORCE = -25;
// positive 'push', negative 'pull'


var dom_fps = document.getElementById("fps");
var prevTime;

function draw() {

	// change noise direction with mouse
	var mouseVector = createVector(mouseX / w - .5, mouseY / h - .5);
	mouseVector.mult(MOUSE_FORCE);
	X_SPEED = mouseVector.x;
	Y_SPEED = mouseVector.y;


	// draw shape:
	push();
	translate(w / 2, h / 2);
	background(218, 217, 199);   // bg color
	noStroke();
	fill(209, 115, 133);    // color
	beginShape();
	for (var a = 0; a<TWO_PI; a += TWO_PI / vertices_amount) {
		// var x = r * sin(a)*mouseVector.y/-10;
		// var y = r * cos(a)*mouseVector.x/10;
		var x = r * sin(a);
		var y = r * cos(a);

		var new_x = x + (
			noise(
				((x_off + x) / NOISE_SCALE),
				((y_off + y) / NOISE_SCALE),
				z_off) * px_offset * sin(a));

		var new_y = y + (
			noise(
				((x_off + x) / NOISE_SCALE),
				((y_off + y) / NOISE_SCALE),
				z_off) * px_offset * cos(a))
		vertex(new_x, new_y);
	}
	endShape();
	pop();


	// update NOISE offsets
	z_off += Z_SPEED;
	x_off += X_SPEED;
	y_off += Y_SPEED;


	// FPS counter for debugging
	// if (typeof prevTime !== "undefined") {
	// 	var now = Date.now();
	// 	dom_fps.innerHTML = (Math.round(1000 / (now - prevTime))) + ' fps';
	// }
	// prevTime = Date.now();
}

