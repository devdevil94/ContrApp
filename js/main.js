



var svg = new SVG(SVG_WIDTH, SVG_HEIGHT).getSVG();
var answerDiv = document.getElementById('answer');


var plant1 = new Plant(80,50);
plant1.create(svg);
plant1.setTransferFunction('(3 + t)');

// var plant2 = new Plant(200,150);
// plant2.create(svg);
// plant2.setTransferFunction('1/3 - t');

plant1.determineOutput();

var out = plant1.getOutput();
var outTex = math.parse(out).toTex();


answerDiv.innerText = 'Output = ' + outTex;

