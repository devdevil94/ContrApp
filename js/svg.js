

export class SVG{
	
	constructor(width,height){
		this.svg = document.querySelector('svg');
		this.svg.style.width = width;
		this.svg.style.height = height;
	}

	getSVG(){return this.svg;}
}


