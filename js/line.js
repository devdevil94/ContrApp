

class Line{
	
	constructor(startPoint,endPoint){
		this.startX = startPoint.x;
		this.startY = startPoint.y;
		this.endX = endPoint.x;
		this.endY = endPoint.y;
	}

	draw(svg){
		var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		path.setAttributeNS(null, 'd', 'M' + this.startX + ',' + this.startY + 'L' + this.endX + ',' + this.endY);
		path.setAttributeNS(null, 'stroke', 'black');
		path.setAttributeNS(null, 'stroke-width', 5);
		path.setAttributeNS(null, 'marker-end', 'url(#arrow)');

		svg.appendChild(path);
	}

	createArrowhead(svg){
		var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
		var marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
		var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

		path.setAttributeNS(null, 'fill', '#000');
		path.setAttributeNS(null, 'd', 'M0,0 L0,6 L9,3 z');

		marker.setAttributeNS(null, 'id', 'arrow');
		marker.setAttributeNS(null, 'markerHeight', 10);
		marker.setAttributeNS(null, 'markerWidth', 10);
		marker.setAttributeNS(null, 'refX', 0);
		marker.setAttributeNS(null, 'refY', 3);
		marker.setAttributeNS(null, 'orient', 'auto');
		marker.setAttributeNS(null, 'markerUnits', 'strokeWidth');

		marker.appendChild(path);
		defs.appendChild(marker);
		svg.appendChild(defs);
	}
}
