

export default class SVG{
	
	constructor(width,height){
		this.svg = document.querySelector('svg');
		this.svg.style.width = width;
		this.svg.style.height = height;

		document.addEventListener('DOMContentLoaded', ()=>{renderMathInElement(document.body, {});});
	}

	getElement(){return this.svg;}
};


