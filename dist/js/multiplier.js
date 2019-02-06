
const Algebrite = require('algebrite');
const cq = require('coffeequate');

export default class Multiplier{
	
	constructor(){
		this.input1 = '(t+3)';
		this.input2 = '(3*t+t^2)';
		this.output = '';
	}

	setInput1(input1){this.input1 = input1;}
	setInput2(input2){this.input2 = input2;}
	getOutput(){return this.output;}
	determineOutput(){this.output = cq(this.input1 + '*' + this.input2);}
};