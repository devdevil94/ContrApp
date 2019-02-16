
import {constants, Utils} from './utils';
import math from 'mathjs';
import InOutCircle from './input-output-circle';

 export default class Block{
	constructor(x,y){
		this.x = x; this.y = y;
		this.shape = null;

		this.input = 't';
		this.output = '';
		this.transFunction = 't';
	}
	create(svg){
		this.shape = new BlockShape(this.x, this.y, constants.BLOCK_WIDTH, constants.BLOCK_HEIGHT);
		this.shape.draw(svg);
		this.shape.setFunction(this.transFunction);

	}
	createPath(event){
		var blockCircle = event.target;
		var x = blockCircle.getAttributeNS(null, 'cx');
		var y = blockCircle.getAttributeNS(null, 'cy');
		console.log(x + ' ' + y);
		var svg = blockCircle.parentNode.parentNode;
		var path = new Path(svg,x,y);
	}
	determineOutput(){
		var parsedInput = algebra.parse(this.input);
		var parsedTransFunction = algebra.parse(this.transFunction);
		this.output = parsedInput.multiply(parsedTransFunction).toString();  
	}
	getOutput(){ return this.output; }
	setInput(input){ this.input = input; }
	setTransferFunction(txt){
		this.transFunction = txt;
		this.rect.setFunction(this.transFunction);
	}
};

class BlockShape{
	//TODO: make the rectangle resize itself depending on the text inside it
	constructor(x,y,w,h){
		this.x = x; this.y = y; this.w = w; this.h = h;
		this.offset= 0;
		this.dragging = false;
		this.inOutCircles = null;
		this.rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		this.textElement = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
		this.container = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	}
	draw(svg){
		this.createRect();
		this.createText();
		this.createInOutCircles();
		console.log(this.inOutCircles);

		var translate = svg.createSVGTransform();
		translate.setTranslate(this.x, this.y);
		this.container.transform.baseVal.insertItemBefore(translate, 0);

		this.container.className.baseVal = 'draggable block';

		this.addEventListeners();
		this.addSelectedCircleEventListener();
		
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
		this.inOutCircles = {
			top: new InOutCircle(this.w/2, 0, this.container),
			bottom: new InOutCircle(this.w/2, this.h, this.container),
			right: new InOutCircle(0, this.h/2, this.container),
			left: new InOutCircle(this.w, this.h/2, this.container)
		};
	}
	getInOutCircles(){return this.inOutCircles;}

	addSelectedCircleEventListener(){
		var top = this.inOutCircles.top;
		var bottom = this.inOutCircles.bottom;
		var right = this.inOutCircles.right;
		var left = this.inOutCircles.left;
		
		// for(var c in this.inOutCircles){
		// 	var circle = this.inOutCircles[c];
		// 	console.log(circle);
		// 	circle.getCircleElement().addEventListener('click', () =>{
		// 		this.deselectAllCircles();
		// 		this.getInOutCircles().circle.setSelected(!this.getInOutCircles().circle.getSelected());
		// 	});
		// }

		top.getCircleElement().addEventListener('click', () => {
			this.deselectAllCircles();
			this.getInOutCircles().top.setSelected(!this.getInOutCircles().top.getSelected());
		});
		bottom.getCircleElement().addEventListener('click', () => {
			this.deselectAllCircles();
			this.getInOutCircles().bottom.setSelected(!this.getInOutCircles().bottom.getSelected());
		});
		right.getCircleElement().addEventListener('click', () => {
			this.deselectAllCircles();
			this.getInOutCircles().right.setSelected(!this.getInOutCircles().right.getSelected());
		});
		left.getCircleElement().addEventListener('click', () => {
			this.deselectAllCircles();
			this.getInOutCircles().left.setSelected(!this.getInOutCircles().left.getSelected());
		});
	}

	deselectAllCircles(){
		console.log('all deselected');
		for(var circle in this.inOutCircles){
			this.inOutCircles[circle].setSelected(false);
		}
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
