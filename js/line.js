

class Line{
	
	constructor(startPoint,endPoint){
		this.startX = startPoint.x;
		this.startY = startPoint.y;
		this.endX = endPoint.x;
		this.endY = endPoint.y;
		this.line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
	}

	draw(svg){
		var lineAttrs = {
			'x1': this.startX,
			'y1': this.startY,
			'x2': this.endX,
			'y2': this.endY,
			'stroke': 'black',
			'stroke-width': 5,
			'marker-start': 'url(#arrowhead)',
			'marker-end': 'url(#arrowend)'
		};
		Utils.setSvgElementAttributes(this.line, lineAttrs);

		svg.appendChild(this.line);
	}

	removeArrowhead(){
		Utils.setSvgElementAttributes(this.line, {'marker-start': ''});
	}

}
