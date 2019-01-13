


class Rectangle{

	constructor(x,y,w,h){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		this.offset= 0;
	}
//<text x="80" y="78" fill="black">Hello World</text>
	draw(svg){
		this.rect.className.baseVal = 'draggable';

		this.rect.setAttributeNS(null, 'x', this.x);
		this.rect.setAttributeNS(null, 'y', this.y);
		this.rect.setAttributeNS(null, 'width', this.w);
		this.rect.setAttributeNS(null, 'height', this.h);
		this.rect.setAttributeNS(null, 'fill', '#007bff');

		svg.appendChild(this.rect);
	}

	addEventListeners(){
		this.rect.addEventListener('mousedown', this.startDrag);
		this.rect.addEventListener('mousemove', this.drag);
		this.rect.addEventListener('mouseup', this.endDrag);
		this.rect.addEventListener('mouseleave', this.endDrag);
	}

	startDrag(event) {

		// console.log(event.target);

	 //    this.offset = getMousePosition(event.target);

	 //    this.offset.x -= parseFloat(event.target.getAttributeNS(null, "x"));
	 //    this.offset.y -= parseFloat(event.target.getAttributeNS(null, "y"));
	}

	drag(event) {
	// 	if (event.target.classList.contains('draggable')) {
	// 	    event.preventDefault();

	// 	    var coord = getMousePosition(event.target);

	// 	    event.target.setAttributeNS(null, "x", coord.x - this.offset.x);
 //    		event.target.setAttributeNS(null, "y", coord.y - this.offset.y);
 //  		}
	 }

	endDrag(event) {
		// event.target = null;
	}

}