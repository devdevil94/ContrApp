

var svg = document.querySelector('svg');
svg.addEventListener('click', getPos);

function getMousePosition(event) {
	var CTM = svg.getScreenCTM();

	return {
		x: (event.clientX - CTM.e) / CTM.a,
		y: (event.clientY - CTM.f) / CTM.d
	};
}

function getPos(event){
	console.log(getMousePosition(event).x + " " + getMousePosition(event).y + "target = " + event.target);
}

var rect1 = new Rectangle(80,50,100,100);
rect1.draw(svg);
rect1.addEventListeners();

var rect2 = new Rectangle(150,250,100,100);
rect2.draw(svg);
rect2.addEventListeners();
