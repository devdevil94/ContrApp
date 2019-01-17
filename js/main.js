

var svg = new SVG(SVG_WIDTH, SVG_HEIGHT).getSVG();
var outputDiv = document.getElementById('output');


var plant1 = new Plant(80,50);
plant1.create(svg);
plant1.setTransferFunction('(3 + t)');

// var plant2 = new Plant(200,150);
// plant2.create(svg);
// plant2.setTransferFunction('1/3 - t');

plant1.determineOutput();

var out = plant1.getOutput();
var outTex = math.parse(out).toTex();

outputTxt = document.createTextNode('Output = ' + outTex);
outputDiv.appendChild(outputTxt);

var editButton = document.getElementById('edit');
var tFunctionInput = document.getElementById('tFunction');

editButton.addEventListener('click', function(){
	var tFunctionValue = tFunction.value;

	plant1.setTransferFunction(tFunctionValue);
	load_js();
});

function load_js(){
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.src = 'http://latex.codecogs.com/latexit.js';
	head.appendChild(script);
}