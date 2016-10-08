var audioContext = new AudioContext();
// var source = audioContext.createMediaElementSource(myAudio);


//creating audio nodes

var oscillator = audioContext.createOscillator();
var gainNode = audioContext.createGain();
var distortion = audioContext.createWaveShaper();
var biquadFilter = audioContext.createBiquadFilter();
var compressor = audioContext.createDynamicsCompressor();
var pinkNoise = audioContext.createPinkNoise();


// spec initial values
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var maxFreq = 2000;
var maxVol = 1;

var initFreq = 100;
var initVol = 0.5;

// oscillator options

oscillator.type = 'sine';
oscillator.frequency.value = initFreq;
oscillator.start();

biquadFilter.type = 'allpass';
biquadFilter.frequency.value = 1000;
biquadFilter.gain.value = 25;

compressor.threshold.value = -50;
compressor.knee.value = 40;
compressor.ratio.value = 12;
compressor.reduction.value = -20;
compressor.attack.value = 0;
compressor.release.value = 0.25;

gainNode.gain.value = initVol;


//Mouse pointer

var CurX, CurY;

document.onmousemove = updatePage;

function updatePage(e) {
	CurX = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
	CurY = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);

	centerCurX = CurX - WIDTH / 2;
	centerCurY = -(CurY - HEIGHT / 2);


	oscillator.frequency.value = Math.sqrt(Math.pow(centerCurX, 2) + Math.pow(centerCurY, 2))/WIDTH * maxFreq;
	gainNode.gain.value = Math.sqrt(Math.pow(centerCurX, 2) + Math.pow(centerCurY, 2))/HEIGHT * maxVol;

	console.log(oscillator.frequency.value, centerCurY);
}

function random(number1, number2) {
	var randomNo = number1 + (Math.floor(Math.random() * (number2 - number1)) + 1);
	return randomNo;
}

var canvas = document.querySelector('#fps');
canvas.width = WIDTH;
canvas.height = HEIGHT;

var canvasCtx = canvas.getContext('2d');

oscillator.connect(gainNode);
// pinkNoise.connect(distortion);
// distortion.connect(biquadFilter);
// biquadFilter.connect(compressor);
// compressor.connect(gainNode);
gainNode.connect(audioContext.destination);
