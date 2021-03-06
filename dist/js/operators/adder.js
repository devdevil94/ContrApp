

export default class Adder{

    constructor(){
		this.input1 = '';
		this.input2 = '';
		this.output = '';
	}
	setInput1(input1){
		var input1Exp = input1.replace(/\^/g, '**');
		this.input1 = input1Exp;
	}
	setInput2(input2){
		var input2Exp = input2.replace(/\^/g, '**');
		this.input2 = input2Exp;
	}
	getOutput(){return this.output;}
	calcOutput(){
		var outputExp = cq(this.input1 + '+' + this.input2).toString();
		this.output = outputExp.replace(/\*\*/g, '^');
	}
};