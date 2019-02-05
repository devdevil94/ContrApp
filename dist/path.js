
module.exports = class Path{

	constructor(svg,Xstart,Ystart){
		var self = this;
		this.outFunction = '';
		this.count = 0;
		this.Xprev = this.Xstart;
		this.Yprev = this.Ystart;
		svg.addEventListener('click', this.addNewLine.bind(this), false);
	}

	set outputFunction(output){this.outFunction = output;}
	get outputFunction(){return this.outFunction;}

	setInitCoordinates(x,y){
		this.initX = x;
		this.initY = y;
	}

	getInitCoordinates(){
		return{
			x: this.initX,
			y: this.initY
		};
	}

	addNewLine(event){
		

		if(this.count == 0){
			
			this.count++;
			console.log(this.Xprev + ' ' + this.Yprev);
		}
			console.log(this.count);

		if(event.target.getAttribute('id') == 'svg'){
			var currentPoint = Utils.getMousePosition(event);
			var Xcurrent = currentPoint.x; var Ycurrent = currentPoint.y;

			var start = {x: this.Xprev, y: this.Yprev};
			var end = {x: Xcurrent, y: Ycurrent};
			
			this.Xprev = Xcurrent; this.Yprev = Ycurrent;

			var target = event.target;

			var newLine = new Line(start, end);
			newLine.draw(svg);
		}
	}

	isListEmpty(){return this.lineList.length == 0;}
};