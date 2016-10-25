var audioContext = new AudioContext();
// var source = audioContext.createMediaElementSource(myAudio);

var anotherGainNode = audioContext.createGain();
// var bass = 10;
var bassFilter = audioContext.createBiquadFilter();
bassFilter.type = "lowshelf";
bassFilter.frequency.value = 200;  // switches to 400 in UI
// bassFilter.gain.value = bass;  // you'll need to hook this to UI too

// spec initial values
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var canvas = document.querySelector('#fps');
canvas.width = WIDTH;
canvas.height = HEIGHT;

var maxFreq = 2000;
var maxVol = 1;

var initFreq = 100;
var initVol = 0.5;

//Mouse pointer

var CurX, CurY;

document.onmousemove = updatePage;


var canvasCtx = canvas.getContext('2d');


var url = 'test.mp3';

var source = audioContext.createBufferSource();
source.connect(bassFilter);
bassFilter.connect(anotherGainNode);
anotherGainNode.connect(audioContext.destination);


function updatePage(e) {
	CurX = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
	CurY = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);

	centerCurX = CurX - WIDTH / 2;
	centerCurY = -(CurY - HEIGHT / 2);

	anotherGainNode.gain.value = Math.sqrt(Math.pow(centerCurX, 2) + Math.pow(centerCurY, 2)) / HEIGHT * maxVol * 5;
	source.playbackRate.value = Math.sqrt(Math.pow(centerCurX, 2) + Math.pow(centerCurY, 2)) / HEIGHT + 0.1;
	bassFilter.gain.value = Math.sqrt(Math.pow(centerCurX, 2) + Math.pow(centerCurY, 2)) / HEIGHT * 4;

	// console.log(bassFilter.gain.value);
}


/* --- load buffer ---  */
var request = new XMLHttpRequest();
//open the request
request.open('GET', url, true);
//webaudio paramaters
request.responseType = 'arraybuffer';
//Once the request has completed... do this
request.onload = function () {
	audioContext.decodeAudioData(request.response, function (response) {
		/* --- play the sound AFTER the buffer loaded --- */
		//set the buffer to the response we just received.
		source.buffer = response;
		//start(0) should play asap.
		source.start(0);
		source.loop = true;
	}, function () {
		console.error('The request failed.');
	});
}
//Now that the request has been defined, actually make the request. (send it)
request.send();