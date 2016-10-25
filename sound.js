var ac = new AudioContext(), gn = ac.createGain(), b = ac.createBiquadFilter(), vol = 1, src = ac.createBufferSource(), w = window.innerWidth, h = window.innerHeight, canvas = document.querySelector('#c');
b.type = "lowshelf";
b.frequency.value = 200;
src.connect(b);
b.connect(gn);
gn.connect(ac.destination);
canvas.width = w;
canvas.height = h;
document.onmousemove = function uP(e) {
	CurX = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
	CurY = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
	c = Math.sqrt(Math.pow(CurX - w / 2, 2) + Math.pow(-(CurY - h / 2), 2));
	gn.gain.value = c / h * vol * 5;
	src.playbackRate.value = c / h + 0.1;
	b.gain.value = c / h * 4;
}
var rq = new XMLHttpRequest();
rq.open('GET', 's.mp3', true);
rq.responseType = 'arraybuffer';
rq.onload = function () {
	ac.decodeAudioData(rq.response, function (rsp) {
		src.buffer = rsp;
		src.start(0);
		src.loop = true;
	}, function () {
		console.error('fail');
	});
}
rq.send();