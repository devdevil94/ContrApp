

export default class Gain{

    constructor(){
        this.gain = '';
		this.input = '';
        this.output = '';
	}
	setInput(input){
		var inputExp = input.replace(/\^/g, '**');
		this.input = inputExp;
    }
    setGain(gain){this.gain = gain;} // Make sure that the gain is a number and not any other character
	getOutput(){return this.output;}
	calcOutput(){
		var outputExp = cq(this.gain + '*' + this.input).toString();
		this.output = outputExp.replace(/\*\*/g, '^');
	}
};