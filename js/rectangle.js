


class Rectangle{

	constructor(x,y,w,h){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}
//<text x="80" y="78" fill="black">Hello World</text>
	create(svg){
		svg.innerHTML = `
			<g class="draggable">
				<rect x="${this.x}" y="${this.y}" width="${this.w}" height="${this.h}" fill="#007bff"/>
			</g>
		`;

		svg.addEventListener('mousedown', this.startDrag);
		svg.addEventListener('mousemove', this.drag);
		svg.addEventListener('mouseup', this.endDrag);
		svg.addEventListener('mouseleave', this.endDrag);
	}

	startDrag(event) {
		console.log(selectedElement);
		if (event.target.classList.contains('draggable')) {
    		selectedElement = event.target;
    		
    		console.log(selectedElement);
		    offset = getMousePosition(event);

		    offset.x -= parseFloat(selectedElement.getAttributeNS(null, "x"));
		    offset.y -= parseFloat(selectedElement.getAttributeNS(null, "y"));
  		}
	}

	drag(event) {
		if (selectedElement) {
		    event.preventDefault();

		    var coord = getMousePosition(event);

		    selectedElement.setAttributeNS(null, "x", coord.x - offset.x);
    		selectedElement.setAttributeNS(null, "y", coord.y - offset.y);
  		}
	}

	endDrag(event) {
		selectedElement = null;
	}

	getMousePosition(evt) {
  		var CTM = svg.getScreenCTM();

		return {
			x: (evt.clientX - CTM.e) / CTM.a,
			y: (evt.clientY - CTM.f) / CTM.d
		};
	}
}
