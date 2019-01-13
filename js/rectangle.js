


class Rectangle{

	constructor(x,y,w,h){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.offset= 0;
		this.dragging = false;
		this.rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
	}
//<text x="80" y="78" fill="black">Hello World</text>
	draw(svg){
		this.rect.className.baseVal = 'draggable';

		this.rect.setAttributeNS(null, 'x', this.x);
		this.rect.setAttributeNS(null, 'y', this.y);
		this.rect.setAttributeNS(null, 'width', this.w);
		this.rect.setAttributeNS(null, 'height', this.h);
		this.rect.setAttributeNS(null, 'fill', '#007bff');

		this.rect.addEventListener('mousedown', this.startDrag);
		this.rect.addEventListener('mousemove', this.drag);
		this.rect.addEventListener('mouseup', this.endDrag);
		this.rect.addEventListener('mouseleave', this.endDrag);

		svg.appendChild(this.rect);
	}

	startDrag(event) {
		if(!this.dragging){
		    this.offset = getMousePosition(event);

		    console.log('startDrag : x = ' + this.offset.x + ' y = ' + this.offset.y);

		    this.offset.x -= parseFloat(event.target.getAttributeNS(null, "x"));
		    this.offset.y -= parseFloat(event.target.getAttributeNS(null, "y"));
		    console.log('startDrag : x = ' + this.offset.x + ' y = ' + this.offset.y);

		    this.dragging = true;
		}
	 //    event.target.addEventListener('mousemove', this.drag);
	 //    event.target.addEventListener('mouseup', this.endDrag);
		// event.target.addEventListener('mouseleave', this.endDrag);
	}

	drag(event) {
		if(this.dragging){
			console.log(event.target);
		    event.preventDefault();

		    var coord = getMousePosition(event);

		    console.log('drag x = ' + this.offset.x + ' y = ' + this.offset.y);

		    event.target.setAttributeNS(null, "x", coord.x - this.offset.x);
			event.target.setAttributeNS(null, "y", coord.y - this.offset.y);
		}
	}

	endDrag(event) {
		console.log('endDrag');
		this.dragging = false;
	}
}
