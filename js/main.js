

var svg = new SVG(SVG_WIDTH, SVG_HEIGHT).getSVG();
var outputDiv = document.getElementById('output');


var plant1 = new Plant(80,50);
plant1.create(svg);
plant1.setTransferFunction('1');
plant1.determineOutput();

var out = plant1.getOutput();

var editButton = document.getElementById('edit');
var tFunctionInput = document.getElementById('tFunction');

changeOutputDiv();

editButton.addEventListener('click', function(){
	var tFunctionValue = tFunctionInput.value;

	plant1.setTransferFunction(tFunctionValue);
	plant1.determineOutput();
	out = plant1.getOutput();

	changeOutputDiv();

});

function changeOutputDiv(){
	var img = document.createElement('img');
	img.src = 'http://latex.codecogs.com/svg.latex?' + math.parse(out).toTex();

	if(outputDiv.childNodes.length > 1){
		console.log(outputDiv.childNodes);
		outputDiv.removeChild(outputDiv.childNodes[2]);
	}
	outputDiv.appendChild(img);
}


// svg.addEventListener('click', function(event){
// 	var plant = new Plant(event.clientX, event.clientY);
// 	plant.create(svg);
// });