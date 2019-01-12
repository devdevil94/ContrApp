


class Rectangle{

	constructor(x,y,w,h){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}

	this.startDrag = function(event) {
		if (event.target.classList.contains('draggable')) {
    		selectedElement = event.target;
    		
    		console.log(selectedElement);
		    offset = getMousePosition(event);

		    offset.x -= parseFloat(selectedElement.getAttributeNS(null, "x"));
		    offset.y -= parseFloat(selectedElement.getAttributeNS(null, "y"));
  		}
	}

	this.drag = function (event) {
		if (selectedElement) {
		    event.preventDefault();

		    var coord = getMousePosition(event);

		    selectedElement.setAttributeNS(null, "x", coord.x - offset.x);
    		selectedElement.setAttributeNS(null, "y", coord.y - offset.y);
  		}
	}
	function endDrag(event) {
		selectedElement = null;
	}

	function getMousePosition(evt) {
  		var CTM = svg.getScreenCTM();

		return {
			x: (evt.clientX - CTM.e) / CTM.a,
			y: (evt.clientY - CTM.f) / CTM.d
		};
	}
}