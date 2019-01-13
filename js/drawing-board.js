

var svg = document.querySelector('svg');

function getMousePosition(event) {
	var CTM = svg.getScreenCTM();

	return {
		x: (event.clientX - CTM.e) / CTM.a,
		y: (event.clientY - CTM.f) / CTM.d
	};
}


var rect1 = new Rectangle(80,50,100,100);
rect1.draw(svg);

var rect2 = new Rectangle(150,250,100,100);
rect2.draw(svg);

