var w = window.innerWidth, h = window.innerHeight, r = (w<h) ? w / 3 : h / 3, x_off = 1000, y_off = 1000, z_off = 1000, vrtc = 180, px_offset = 120, noise_sc = 450, zv = .01, xv = 0, yv = 0, curforce = -100;
function setup() {
	createCanvas(w, h);
	frameRate(60);
}
function draw() {
	var curvec = createVector(mouseX / w - .5, mouseY / h - .5);
	curvec.mult(curforce);
	xv = curvec.x;
	yv = curvec.y;
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
	for (var a = 0; a<TWO_PI; a += TWO_PI / vrtc) {
		var x = r * sin(a), y = r * cos(a), new_x = x + (
			noise(
				((x_off + x) / noise_sc),
				((y_off + y) / noise_sc),
				z_off) * px_offset * sin(a)), new_y = y + (
			noise(
				((x_off + x) / noise_sc),
				((y_off + y) / noise_sc),
				z_off) * px_offset * cos(a))
		vertex(new_x, new_y);
	}
	endShape();
	pop();
	z_off += zv;
	x_off += xv;
	y_off += yv;
}