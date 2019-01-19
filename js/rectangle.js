
class Rectangle{

	//TODO: make the rectangle resize itself depending on the text inside it
	constructor(x,y,w,h){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.offset= 0;
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
		this.rect.setAttributeNS(null, 'stroke', '#000');
		this.rect.setAttributeNS(null, 'fill', 'white');

		this.rect.addEventListener('mousedown', this.startDrag);
		this.rect.addEventListener('mousemove', this.drag);
		this.rect.addEventListener('mouseup', this.endDrag);
		this.rect.addEventListener('mouseleave', this.endDrag);

		this.container.appendChild(this.rect);
	}

	createText(){
		this.textElement.setAttributeNS(null, "x", 0.33*this.w);//Width of the text can be modified based on the number of chars.    
		this.textElement.setAttributeNS(null, "y", 0.25*this.h); 

		this.textElement.addEventListener('mousedown', this.startDrag);
		this.textElement.addEventListener('mousemove', this.drag);
		this.textElement.addEventListener('mouseup', this.endDrag);
		this.textElement.addEventListener('mouseleave', this.endDrag);

		this.setFunction(this.txt);

		this.container.appendChild(this.textElement);
	}

	adjustFunctionPosition(){
		//Adjust Function position when there is a fraction
	}

	getContainer(){return this.container;}

	setFunction(func){
		if(this.textElement.childNodes[0]){
			this.textElement.removeChild(this.textElement.childNodes[0]);
		}

		var img = document.createElement('img');
		img.setAttribute('src', 'http://latex.codecogs.com/svg.latex?' + math.parse(func).toTex());

		if(func.includes('/')){
			img.className = 'latex-img-frac';
		}else{
			img.className = 'latex-img';
		}
		this.textElement.appendChild(img);
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
