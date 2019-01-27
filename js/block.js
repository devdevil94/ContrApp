
class Block{

	constructor(x,y){
		this.x = x;
		this.y = y;
		this.rect = null;

		this.input = 't';
		this.output = '';
		this.transFunction = 't';

	}

	create(svg){
		this.rect = new Rectangle(this.x,this.y,BLOCK_WIDTH,BLOCK_HEIGHT);
		this.rect.draw(svg);
		this.rect.setFunction(this.transFunction);

		//var blockCircles = this.rect.getInOutCircles();
		// for(var circle in blockCircles)
		// 	blockCircles[circle].addEventListener('click', this.createPath);
	}

	createPath(event){
		var blockCircle = event.target;
		var x = blockCircle.getAttributeNS(null, 'cx');
		var y = blockCircle.getAttributeNS(null, 'cy');
		console.log(x + ' ' + y);
		var svg = blockCircle.parentNode.parentNode;
		var path = new Path(svg,x,y);
	}

	determineOutput(){
		var parsedInput = algebra.parse(this.input);
		var parsedTransFunction = algebra.parse(this.transFunction);
		this.output = parsedInput.multiply(parsedTransFunction).toString();  
	}

	getOutput(){ return this.output; }

	setInput(input){ this.input = input; }

	setTransferFunction(txt){
		this.transFunction = txt;
		this.rect.setFunction(this.transFunction);
	}
}