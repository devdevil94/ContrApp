
class Plant{

	constructor(x,y){
		this.x = x;
		this.y = y;
		this.txt = '';
		this.rect = null;

		this.input = '';
		this.output = '';
		this.transFunction = '';

		this.parsedFunction = math.parse(this.transFunction);
		this.tex = '';
	}

	create(svg){
		this.rect = new Rectangle(this.x,this.y,RECT_WIDTH,RECT_HEIGHT);
		this.rect.draw(svg);
		this.tex = this.parsedFunction.toTex();
		this.rect.setText('$$ ' + this.tex + ' $$');
	}

	getRect(){return this.rect;}

	setTransferFunction(txt){
		this.transFunction = txt;
		this.parsedFunction = math.parse(this.transFunction);
		this.tex = this.parsedFunction.toTex();
		this.fixDimensions();
		this.rect.setText('$$ ' + this.tex + ' $$');
	}

	fixDimensions(){
		if(this.transFunction.includes('/')){
			var container = this.rect.getContainer();
			var fObject = container.childNodes[1];
			console.log(fObject);
			var latexSpan = fObject.childNodes[0];
			console.log(latexSpan);
			var latex = latexSpan.childNodes[1];
			console.log(latex);
		}
	}
}