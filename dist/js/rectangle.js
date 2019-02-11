
import {constants, Utils} from './utils';
import math from 'mathjs';
import InOutCircle from './input-output-circle';

export default class BlockShape{

	//TODO: make the rectangle resize itself depending on the text inside it
	constructor(x,y,w,h){
		this.x = x; this.y = y; this.w = w; this.h = h;
		this.offset= 0;
		this.dragging = false;
		this.rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		this.textElement = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
		this.container = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	}

	draw(svg){
		this.createRect();
		this.createText();
		this.createInOutCircles(svg);

		var translate = svg.createSVGTransform();
		translate.setTranslate(this.x, this.y);
		this.container.transform.baseVal.insertItemBefore(translate, 0);

		this.container.className.baseVal = 'draggable';

		this.addEventListeners();

		svg.appendChild(this.container);
	}

	setDragging(dragging){this.dragging = dragging;}
	getDragging(){return this.dragging;}

	addEventListeners(){
		this.container.addEventListener('mousedown', (event) => {
			if(!this.getDragging()){
				this.offset = Utils.startDrag(event);
				this.setDragging(true);
			}
			
		});
		this.container.addEventListener('mousemove', (event) => {
			if(this.getDragging()){
				Utils.drag(event, this.offset);
			}
		});
		this.container.addEventListener('mouseup', () => { 
			this.setDragging(false); 		
		});
		this.container.addEventListener('mouseleave', () => {
			this.setDragging(false);		

		});
	}

	createInOutCircles(){
		var topCircle = new InOutCircle(this.w/2, 0, this.container);
		var bottomCircle = new InOutCircle(this.w/2, this.h, this.container);
		var rightCircle = new InOutCircle(0, this.h/2, this.container);
		var leftCircle = new InOutCircle(this.w, this.h/2, this.container);
	}

	createRect(){
		Utils.setSvgElementAttributes(this.rect, {
			'width': this.w,
			'height': this.h,
			'stroke': '#000',
			'fill': '#fff'
		});
		
		this.container.appendChild(this.rect);
	}

	createText(){
		//Width of the text can be modified based on the number of chars.    
		Utils.setSvgElementAttributes(this.textElement, {
			'x': 0.33*this.w,
			'y': 0.25*this.h
		});
		this.container.appendChild(this.textElement);
	}

	adjustFunctionPosition(){
		//Adjust Function position when there is/are fraction(s)
	}


	getNumberOfFractions(){}

	getContainer(){return this.container;}

	setFunction(func){
		if(this.textElement.childNodes[0]){
			this.textElement.removeChild(this.textElement.childNodes[0]);
		}

		var img = document.createElement('img');
		img.src = 'http://latex.codecogs.com/svg.latex?' + math.parse(func).toTex();

		if(func.includes('/')){
			img.className = 'latex-img-frac';
		}else{
			img.className = 'latex-img';
		}
		this.textElement.appendChild(img);
	}

};
