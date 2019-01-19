

class Path{

	constructor(svg){
		this.lineList = [];
		svg.addEventListener('click', this.addNewLine);
	}

	addNewLine(event){
		var point = Utils.getMousePosition(event);
		var xPos = point.x; var yPos = point.y;

		var start = {x: xPos, y: yPos};
		var end = {x: , y: };
		var newLine = new Line(start, end);
	}
}