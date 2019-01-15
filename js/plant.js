

class Plant{

	constructor(x,y){
		this.x = x;
		this.y = y;
		this.txt = '';
		this.rect = null;
	}

	create(svg){
		this.rect = new Rectangle(this.x,this.y,RECT_WIDTH,RECT_HEIGHT);
		this.rect.draw(svg);
	}

	getRect(){return this.rect;}

	setText(txt){this.rect.setText(txt);}

}