import { constants, Utils } from '../utils';

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

		this.container.className.baseVal = 'draggable plant';

		this.container.addEventListener('mousedown', this.startDrag);
		this.container.addEventListener('mousemove', this.drag);
		this.container.addEventListener('mouseup', this.endDrag);
		this.container.addEventListener('mouseleave', this.endDrag);

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

		// this.linesGroup.addEventListener('mousedown', this.startDrag);
		// this.linesGroup.addEventListener('mousemove', this.drag);
		// this.linesGroup.addEventListener('mouseup', this.endDrag);
		// this.linesGroup.addEventListener('mouseleave', this.endDrag);

	}

	createInOutCircles(svg){	
		Utils.setSvgElementAttributes(this.rightCircle, {
			'cx': 0,
			'cy': this.s/2,
			'r': constants.INOUT_CIRCLE_RADIUS,
			'stroke': 'none',
			'fill': '#000'
		});

		Utils.setSvgElementAttributes(this.leftCircle, {
			'cx': this.s,
			'cy': this.s/2,
			'r': constants.INOUT_CIRCLE_RADIUS,
			'stroke': 'none',
			'fill': '#000'
		});

		this.container.appendChild(this.rightCircle);
		this.container.appendChild(this.leftCircle);
	}

	startDrag(event) {
		if(!this.dragging){
			this.offset = Utils.getMousePosition(event);

			var g = event.target.parentNode;
			var svg = g.parentNode;
			var transforms = g.transform.baseVal;

			if (transforms.length == 0 || transforms.getItem(0).type != SVGTransform.SVG_TRANSFORM_TRANSLATE){
				var translate = svg.createSVGTransform();
				translate.setTranslate(0, 0);
				g.transform.baseVal.insertItemBefore(translate, 0);
			}

    		this.offset.x -= transforms.getItem(0).matrix.e;
    		this.offset.y -= transforms.getItem(0).matrix.f;

		    this.dragging = true;
		}
	}

	drag(event) {
		if(this.dragging){
		    event.preventDefault();

		    var coord = Utils.getMousePosition(event);

		    var g = event.target.parentNode;
		    var transforms = g.transform.baseVal;
		    var translate = transforms.getItem(0);

			translate.setTranslate(coord.x - this.offset.x, coord.y - this.offset.y);
		}
	}

	endDrag() { this.dragging = false; }

};

export {MultiplierShape};