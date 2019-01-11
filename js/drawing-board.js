

function makeDraggable(event) {

	var svg = event.target;

	svg.addEventListener('mousedown', startDrag);
	svg.addEventListener('mousemove', drag);
	svg.addEventListener('mouseup', endDrag);
	svg.addEventListener('mouseleave', endDrag);

	var selectedElement = false;

	function startDrag(event) {
		if (event.target.classList.contains('draggable')) {
    		selectedElement = event.target;
  		}
	}
	function drag(event) {
		if (selectedElement) {
		    event.preventDefault();
		    var x = parseFloat(selectedElement.getAttributeNS(null, "x"));
		    selectedElement.setAttributeNS(null, "x", x + 0.1);
  		}
	}
	function endDrag(event) {
		selectedElement = null;
	}
}