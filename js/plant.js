
class Plant{

	constructor(x,y){
		this.x = x;
		this.y = y;
		this.txt = '';
		this.rect = null;

		this.input = 't';
		this.output = '';
		this.transFunction = 't';
	}

	create(svg){
		this.rect = new Rectangle(this.x,this.y,RECT_WIDTH,RECT_HEIGHT);
		this.rect.draw(svg);
		this.rect.setFunction(this.transFunction);
	}

	determineOutput(){
		this.output = this.input +  ' * ' + this.transFunction;  
	}

	getOutput(){return this.output;}

	//getRect(){return this.rect;}

	setTransferFunction(txt){
		this.transFunction = txt;
		this.rect.setFunction(this.transFunction);
	}
}