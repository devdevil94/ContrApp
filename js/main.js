
var svg = new SVG(SVG_WIDTH, SVG_HEIGHT).getSVG();

var plant = new Plant(80,50);
plant.create(svg);
//console.log(plant.getRect().getContainer());
//plant.setText('World');
//console.log(plant.getRect().getContainer());

function getMousePosition(event) {
	var CTM = svg.getScreenCTM();

	return {
		x: (event.clientX - CTM.e) / CTM.a,
		y: (event.clientY - CTM.f) / CTM.d
	};
}