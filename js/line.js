

class Line{
	
	constructor(startPoint,endPoint){
		this.startX = startPoint.x;
		this.startY = startPoint.y;
		this.endX = endPoint.x;
		this.endY = endPoint.y;
	}

	draw(svg){
		var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		var pathAttrs = {
			'd': 'M' + this.startX + ',' + this.startY + 'L' + this.endX + ',' + this.endY,
			'stroke': 'black',
			'stroke-width': 5,
			'marker-end': 'url(#arrow)'
		};
		Utils.setSvgElementAttributes(path, pathAttrs);

		svg.appendChild(path);
	}

	createArrowhead(svg){
		var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
		var marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
		var markerPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');

		markerPath.setAttributeNS(null, 'fill', '#000');
		markerPath.setAttributeNS(null, 'd', 'M0,0 L0,6 L9,3 z');

		var markerAttrs = {
			'id': 'arrow',
			'markerWidth': 10,
			'markerHeight': 10,
			'refX': 0,
			'refY': 3,
			'orient': 'auto',
			'markerUnits': 'strokeWidth'
		};

		Utils.setSvgElementAttributes(marker, markerAttrs);

		marker.appendChild(markerPath);
		defs.appendChild(marker);
		svg.appendChild(defs);
	}
}
