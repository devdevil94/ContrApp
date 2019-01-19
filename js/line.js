

class Line{
	
	constructor(startPoint,endPoint){
		this.startX = startPoint.x;
		this.startY = startPoint.y;
		this.endX = endPoint.x;
		this.endY = endPoint.y;
		this.line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
		this.square = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		this.circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
	}

	draw(svg){
		Utils.setSvgElementAttributes(this.line, {
			'x1': this.startX,
			'y1': this.startY,
			'x2': this.endX,
			'y2': this.endY,
			'stroke': 'black',
			'stroke-width': 2,
		});

		Utils.setSvgElementAttributes(this.square, {
			'x': this.endX-5,
			'y': this.endY-5,
			'width': 10,
			'height': 10,
			'stroke': 'none',
			'fill': '#000'
		});

		Utils.setSvgElementAttributes(this.circle, {
			'cx': this.startX,
			'cy': this.startY,
			'r': 5,
			'stroke': 'none',
			'fill': '#000'
		});

		svg.appendChild(this.circle);
		svg.appendChild(this.line);
		svg.appendChild(this.square);
	}


	removeArrowhead(){
		this.arrowhead = null;
	}

}
