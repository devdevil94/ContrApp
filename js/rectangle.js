
class Rectangle{

	//TODO: make the rectangle resize itself depending on the text inside it
	constructor(x,y,w,h){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.offset= 0;
		this.txt = 'Hi';
		this.mjx = null;
		this.dragging = false;
		this.rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		this.textElement = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
		this.container = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	}

	draw(svg){

		this.createRect();
		this.createText();

		var translate = svg.createSVGTransform();
		translate.setTranslate(this.x, this.y);
		this.container.transform.baseVal.insertItemBefore(translate, 0);

		this.container.className.baseVal = 'draggable plant';

		svg.appendChild(this.container);
	}

	createRect(){
		this.rect.setAttributeNS(null, 'width', this.w);
		this.rect.setAttributeNS(null, 'height', this.h);
		this.rect.setAttributeNS(null, 'stroke', 'black');
		this.rect.setAttributeNS(null, 'fill', 'white');

		//this.rect.className.baseVal = 'plant-rect';

		this.rect.addEventListener('mousedown', this.startDrag);
		this.rect.addEventListener('mousemove', this.drag);
		this.rect.addEventListener('mouseup', this.endDrag);
		this.rect.addEventListener('mouseleave', this.endDrag);

		this.container.appendChild(this.rect);
	}

	createText(){
		this.textElement.setAttributeNS(null, "x", 0);     
		this.textElement.setAttributeNS(null, "y", 0); 
		this.textElement.setAttributeNS(null, "font-size", 18);

		this.textElement.addEventListener('mousedown', this.startDrag);
		this.textElement.addEventListener('mousemove', this.drag);
		this.textElement.addEventListener('mouseup', this.endDrag);
		this.textElement.addEventListener('mouseleave', this.endDrag);

		var span = document.createElement('span');
		span.className = 'latex-span';
		span.setAttribute('lang', 'latex');
		span.appendChild(document.createTextNode(this.txt));

		this.textElement.appendChild(span);

		this.container.appendChild(this.textElement);
	}

	getContainer(){return this.container;}

	setText(txt){this.textElement.childNodes[0].innerText = txt;}

	getLaTex(){
		var laTexSpan = this.textElement.childNodes[0];

		if (laTexSpan.className == 'latex-span') {
			var latex = laTexSpan.childNodes[0];
			return latex;
		}

		return null;
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

	endDrag() {
		this.dragging = false;
	}
}
