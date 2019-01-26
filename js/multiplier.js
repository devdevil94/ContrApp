

class Multiplier{
	
	constructor(){
		this.input1 = 't+3';
		this.input2 = '3*t+t^2';
		this.output = '';
	}

	setInput1(input1){this.input1 = input1;}
	setInput2(input2){this.input2 = input2;}

	determineOutput(){
		//var parsedInput1 = math.parse(this.input1);
		//var parsedInput2 = math.parse(this.input2);
		this.output = this.input1 + '*' + this.input2;
		//var parsedOutput = math.parse(this.output);
		return math.simplify(this.output).toString();
	}

}