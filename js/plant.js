
class Plant{

	constructor(x,y){
		this.x = x;
		this.y = y;
		this.txt = '';
		this.rect = null;

		this.input = '5t';
		this.output = '';
		this.transFunction = '4t+3';

		this.parsedFunction = math.parse(this.transFunction);
		this.tex = '';
	}

	create(svg){
		this.rect = new Rectangle(this.x,this.y,RECT_WIDTH,RECT_HEIGHT);
		this.rect.draw(svg);
		this.tex = this.parsedFunction.toTex();
		console.log(this.tex);
		this.rect.setText('$$ ' + this.tex + ' $$');
	}

	getRect(){return this.rect;}

	setTransferFunction(txt){
		this.transFunction = txt;
		this.parsedFunction = math.parse(this.transFunction);
		this.tex = this.parsedFunction.toTex();
		this.rect.setText('$$ ' + this.tex + ' $$');
	}
}