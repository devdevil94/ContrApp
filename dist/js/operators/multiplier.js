import { Utils } from '../utils';

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
		this.createMiddleLines();

		var translate = svg.createSVGTransform();
		translate.setTranslate(this.x, this.y);
		this.container.transform.baseVal.insertItemBefore(translate, 0);

		this.container.className.baseVal = 'draggable plant';

		svg.appendChild(this.container);
	}

	createRect(){
		Utils.setSvgElementAttributes(this.rect, {
			'width': this.s, 
			'height': this.s,
			'stroke': '#000',
			'fill': 'white'
		});

		// this.rect.addEventListener('mousedown', this.startDrag);
		// this.rect.addEventListener('mousemove', this.drag);
		// this.rect.addEventListener('mouseup', this.endDrag);
		// this.rect.addEventListener('mouseleave', this.endDrag);
		
		this.container.appendChild(this.rect);
	}

	createMiddleLines(){
		Utils.setSvgElementAttributes(this.line1, {
			'x1': 0,
			'y1': 0,
			'x2': this.s,
			'y2': this.s,
			'stroke': '#000',
			'stroke-width': 2 
		});

		Utils.setSvgElementAttributes(this.line2, {
			'x1': this.s,
			'y1': 0,
			'x2': 0,
			'y2': this.s,
			'stroke': '#000',
			'stroke-width': 2 
		});

		this.linesGroup.appendChild(this.line1);
		this.linesGroup.appendChild(this.line2);

		// this.linesGroup.addEventListener('mousedown', this.startDrag);
		// this.linesGroup.addEventListener('mousemove', this.drag);
		// this.linesGroup.addEventListener('mouseup', this.endDrag);
		// this.linesGroup.addEventListener('mouseleave', this.endDrag);

		this.container.appendChild(this.linesGroup);
	}

};

export {MultiplierShape};