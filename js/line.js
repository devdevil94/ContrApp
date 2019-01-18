

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
		path.setAttributeNS(null, 'stroke-width', 3);

		svg.appendChild(path);
	}
}