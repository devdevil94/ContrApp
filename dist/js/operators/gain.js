

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
    //Make sure that the gain is a number and not any othe character
    setGain(gain){this.gain = gain;}
	getOutput(){return this.output;}
	calcOutput(){
		var outputExp = cq(this.gain + '*' + this.input2).toString();
		this.output = outputExp.replace(/\*\*/g, '^');
	}
};