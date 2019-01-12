
	import Rectangle from 'rectangle-class.js';



	var svg = document.querySelector('svg');

	svg.addEventListener('mousedown', startDrag);
	svg.addEventListener('mousemove', drag);
	svg.addEventListener('mouseup', endDrag);
	svg.addEventListener('mouseleave', endDrag);

	var selectedElement = false;

