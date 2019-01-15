
class Rectangle{

	constructor(x,y,w,h){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.offset= 0;
		this.txt = 'Hello';
		this.dragging = false;
		this.rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		this.textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
		this.container = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	}
//<text x="80" y="78" fill="black">Hello World</text>
	draw(svg){
		this.rect.setAttributeNS(null, 'width', this.w);
		this.rect.setAttributeNS(null, 'height', this.h);
		this.rect.setAttributeNS(null, 'fill', '#007bff');

		this.rect.addEventListener('mousedown', this.startDrag);
		this.rect.addEventListener('mousemove', this.drag);
		this.rect.addEventListener('mouseup', this.endDrag);
		this.rect.addEventListener('mouseleave', this.endDrag);

		this.textElement.setAttributeNS(null, "x", this.w/2);     
		this.textElement.setAttributeNS(null, "y", this.h/2); 
		this.textElement.setAttributeNS(null, "font-size", 20);
		this.textElement.setAttributeNS(null, "alignment-baseline", "middle");
		this.textElement.setAttributeNS(null, "text-anchor", "middle");

		this.textElement.addEventListener('mousedown', this.startDrag);
		this.textElement.addEventListener('mousemove', this.drag);
		this.textElement.addEventListener('mouseup', this.endDrag);
		this.textElement.addEventListener('mouseleave', this.endDrag);

		this.textElement.appendChild(document.createTextNode(this.txt));

		var translate = svg.createSVGTransform();
		translate.setTranslate(this.x, this.y);
		this.container.transform.baseVal.insertItemBefore(translate, 0);

		this.container.className.baseVal = 'draggable';

		this.container.appendChild(this.rect);
		this.container.appendChild(this.textElement);

		svg.appendChild(this.container);
	}

	getContainer(){return this.container;}

	setText(txt){
		this.textElement.childNodes[0].nodeValue = txt;
	}

	startDrag(event) {
		if(!this.dragging){
			this.offset = getMousePosition(event);

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

		    var coord = getMousePosition(event);

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
