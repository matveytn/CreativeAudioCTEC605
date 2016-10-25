var w = window.innerWidth, h = window.innerHeight, r = (w<h) ? w / 3 : h / 3, x_off = 1000, y_off = 1000, z_off = 1000, vertices_amount = 180, px_offset = 120, NOISE_SCALE = 450, Z_SPEED = .01, X_SPEED = 0, Y_SPEED = 0, MOUSE_FORCE = -100, prevTime;
function setup() {
	createCanvas(w, h);
	frameRate(60);
}
function draw() {
	var mouseVector = createVector(mouseX / w - .5, mouseY / h - .5);
	mouseVector.mult(MOUSE_FORCE);
	X_SPEED = mouseVector.x;
	Y_SPEED = mouseVector.y;
	var rgb = sqrt(sq(mouseX - w / 2) + sq(-(mouseY - h / 2))) / 3.3;
	(rgb>=255) ? rgb = 255 : (rgb<=72) ? rgb = 72 : null;

	push();
	translate(w / 2, h / 2);
	background(219, 217, 201);
	noStroke();
	fill(rgb, 115, 133);
	beginShape();
	drawingContext.shadowOffsetX = 0;
	drawingContext.shadowOffsetY = 0;
	drawingContext.shadowBlur = 1000;
	drawingContext.shadowColor = "rgba(255 , 115, 133, 0.2)";
	for (var a = 0; a<TWO_PI; a += TWO_PI / vertices_amount) {
		var x = r * sin(a), y = r * cos(a), new_x = x + (
			noise(
				((x_off + x) / NOISE_SCALE),
				((y_off + y) / NOISE_SCALE),
				z_off) * px_offset * sin(a)), new_y = y + (
			noise(
				((x_off + x) / NOISE_SCALE),
				((y_off + y) / NOISE_SCALE),
				z_off) * px_offset * cos(a))
		vertex(new_x, new_y);
	}
	endShape();
	pop();
	z_off += Z_SPEED;
	x_off += X_SPEED;
	y_off += Y_SPEED;
}