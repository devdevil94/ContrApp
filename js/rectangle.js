


class Rectangle{

	constructor(x,y,w,h){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.offset= 0;
		this.transform = null;
		this.dragging = false;
		this.rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		this.txt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
		this.container = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	}
//<text x="80" y="78" fill="black">Hello World</text>
	draw(svg, txt){
		this.rect.className.baseVal = 'draggable';

		//this.rect.setAttributeNS(null, 'x', this.x);
		//this.rect.setAttributeNS(null, 'y', this.y);
		this.rect.setAttributeNS(null, 'width', this.w);
		this.rect.setAttributeNS(null, 'height', this.h);
		this.rect.setAttributeNS(null, 'fill', '#007bff');

		this.rect.addEventListener('mousedown', this.startDrag);
		this.rect.addEventListener('mousemove', this.drag);
		this.rect.addEventListener('mouseup', this.endDrag);
		this.rect.addEventListener('mouseleave', this.endDrag);

		this.txt.className.baseVal = 'draggable';

		this.txt.setAttributeNS(null, "x", this.w/2);     
		this.txt.setAttributeNS(null, "y", this.h/2); 
		this.txt.setAttributeNS(null, "font-size", 20);
		this.txt.setAttributeNS(null, "alignment-baseline", "middle");
		this.txt.setAttributeNS(null, "text-anchor", "middle");

		this.txt.addEventListener('mousedown', this.startDrag);
		this.txt.addEventListener('mousemove', this.drag);
		this.txt.addEventListener('mouseup', this.endDrag);
		this.txt.addEventListener('mouseleave', this.endDrag);

		this.txt.appendChild(document.createTextNode(txt));


		var translate = svg.createSVGTransform();
		translate.setTranslate(this.x, this.y);
		this.container.transform.baseVal.insertItemBefore(translate, 0);
		
		this.container.appendChild(this.rect);
		this.container.appendChild(this.txt);

		svg.appendChild(this.container);
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
