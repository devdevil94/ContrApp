import { constants, Utils } from '../utils';
import InOutCircle from '../input-output-circle';

//const Algebrite = require('algebrite');
const cq = require('coffeequate');

class Multiplier{
	
	constructor(){
		this.input1 = '';
		this.input2 = '';
		this.output = '';
	}
	setInput1(input1){
		var input1Exp = input1.replace(/\^/g, '**');
		this.input1 = input1Exp;
	}
	setInput2(input2){
		var input2Exp = input2.replace(/\^/g, '**');
		this.input2 = input2Exp;
	}
	getOutput(){return this.output;}
	calcOutput(){
		var outputExp = cq(this.input1 + '*' + this.input2).toString();
		this.output = outputExp.replace(/\*\*/g, '^');
	}
};

class MultiplierShape{

	constructor(x,y,s){
		this.x = x; this.y = y; this.s = s;
		this.offset= 0;
		this.dragging = false;
		this.rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		this.linesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
		this.line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
		this.line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
		this.container = document.createElementNS('http://www.w3.org/2000/svg', 'g');
		this.leftCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
		this.rightCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
		
	}
	
	draw(svg){
		
		this.createRect();
		this.createCrossSign();
		this.createInOutCircles(svg);

		var translate = svg.createSVGTransform();
		translate.setTranslate(this.x, this.y);
		this.container.transform.baseVal.insertItemBefore(translate, 0);

		this.container.className.baseVal = 'draggable';

		this.addEventListeners();

		svg.appendChild(this.container);
	}

	createRect(){
		Utils.setSvgElementAttributes(this.rect, {
			'width': this.s, 
			'height': this.s,
			'stroke': '#000',
			'fill': 'white'
		});
		
		this.container.appendChild(this.rect);
	}

	createCrossSign(){
		Utils.setSvgElementAttributes(this.line1, {
			'x1': 10,
			'y1': 10,
			'x2': this.s - 10,
			'y2': this.s - 10,
			'stroke': '#000',
			'stroke-width': 2 
		});

		Utils.setSvgElementAttributes(this.line2, {
			'x1': this.s - 10,
			'y1': 10,
			'x2': 10,
			'y2': this.s - 10,
			'stroke': '#000',
			'stroke-width': 2 
		});

		this.container.appendChild(this.line1);
		this.container.appendChild(this.line2);

	}

	createInOutCircles(){
		var leftCircle = new InOutCircle(this.s, this.s/2, this.container);
		var rightCircle = new InOutCircle(0, this.s/2, this.container);
	}

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

	setDragging(dragging){this.dragging = dragging;}
	getDragging(){return this.dragging;}
};

export {MultiplierShape};