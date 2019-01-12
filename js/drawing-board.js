

function makeDraggable(event) {

	var svg = event.target;

	svg.addEventListener('mousedown', startDrag);
	svg.addEventListener('mousemove', drag);
	svg.addEventListener('mouseup', endDrag);
	svg.addEventListener('mouseleave', endDrag);

	var selectedElement = false;

	function startDrag(event) {
		if (event.target.classList.contains('comp-group')) {
    		selectedElement = event.target;
    		
    		console.log(selectedElement);
		    offset = getMousePosition(event);

		    offset.x -= parseFloat(selectedElement.getAttributeNS(null, "x"));
		    offset.y -= parseFloat(selectedElement.getAttributeNS(null, "y"));
  		}
	}
	function drag(event) {
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