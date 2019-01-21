

class Path{

	constructor(svg){
		this.lineList = [];
		//this.clickCount = 0;
		this.Xprev = 50;
		this.Yprev = 50;       
		svg.addEventListener('click', this.addNewLine);
	}

	addNewLine(event){
		var currentPoint = Utils.getMousePosition(event);

		var Xcurrent = currentPoint.x; var Ycurrent = currentPoint.y;

		var start = {x: this.Xprev, y: this.Yprev};
		console.log(start);
		var end = {x: Xcurrent, y: Ycurrent};
		
		this.Xprev = Xcurrent; this.Yprev = Ycurrent;

		var newLine = new Line(start, end);
		var svg = event.target;
		newLine.draw(svg);
	}

	isListEmpty(){return this.lineList.length == 0;}
}