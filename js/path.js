

class Path{

	constructor(svg,Xstart,Ystart){
		this.lineList = [];
		//this.clickCount = 0;
		this.Xprev = Xstart;
		this.Yprev = Ystart;
		this.outFunction = ''; 
		svg.addEventListener('click', this.addNewLine);
	}

	set outputFunction(output){ this.outFunction = output; }
	get outputFunction(){return this.outFunction;}

	addNewLine(event){
		var currentPoint = Utils.getMousePosition(event);

		var Xcurrent = currentPoint.x; var Ycurrent = currentPoint.y;

		var start = {x: this.Xprev, y: this.Yprev};
		var end = {x: Xcurrent, y: Ycurrent};
		
		this.Xprev = Xcurrent; this.Yprev = Ycurrent;

		var newLine = new Line(start, end);
		var svg = event.target;
		newLine.draw(svg);
	}

	isListEmpty(){return this.lineList.length == 0;}
}