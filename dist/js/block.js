
import {constants, Utils} from './utils';

import BlockContainer from './BlockContainer'

export default class Block{
	constructor(x,y){
		this.x = x; this.y = y;
		this.shape = null;

		this.input = 't';
		this.output = '';
		this.transFunction = 't';
	}
	create(svg){
		this.shape = new BlockContainer(this.x, this.y, constants.BLOCK_WIDTH, constants.BLOCK_HEIGHT);
		this.shape.draw(svg);
		console.log(this.shape);		
		this.shape.setFunction(this.transFunction);
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
		this.shape.setFunction(this.transFunction);
	}
};

