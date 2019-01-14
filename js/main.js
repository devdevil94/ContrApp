
var svg = new SVG(SVG_WIDTH, SVG_HEIGHT).getSVG();

var rect1 = new Rectangle(80,50,RECT_WIDTH,RECT_HEIGHT);
rect1.draw(svg, 'Text');

var rect2 = new Rectangle(150,250,RECT_WIDTH,RECT_HEIGHT);
rect2.draw(svg, 'Text');

function getMousePosition(event) {
	var CTM = svg.getScreenCTM();

	return {
		x: (event.clientX - CTM.e) / CTM.a,
		y: (event.clientY - CTM.f) / CTM.d
	};
}