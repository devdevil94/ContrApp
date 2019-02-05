
module.exports = class Utils{
	
	static getMousePosition(event) {
		var CTM = svg.getScreenCTM();

		return {
			x: (event.clientX - CTM.e) / CTM.a,
			y: (event.clientY - CTM.f) / CTM.d
		};
	}

	static setSvgElementAttributes(el,attrsObj){
		for(var attr in attrsObj) {
        	el.setAttributeNS(null, attr, attrsObj[attr]);
    	}
	}

	static createArrowhead(svg){
		var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
		var marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
		var markerPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');

		this.setSvgElementAttributes(markerPath, {
			'fill': 'red',
			'd': 'M9,0 L9,6 L0,3 z'
		});

		var markerAttrs = {
			'id': 'arrowhead',
			'markerWidth': 10,
			'markerHeight': 10,
			'refX': 9,
			'refY': 3,
			'orient': 'auto',
			'markerUnits': 'strokeWidth'
		};

		this.setSvgElementAttributes(marker, markerAttrs);

		marker.appendChild(markerPath);
		defs.appendChild(marker);
		svg.appendChild(defs);
	}

	static createArrowend(svg){
		var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
		var marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
		var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

		this.setSvgElementAttributes(circle, {
			'fill': '#000',
			'cx': 2,
			'cy': 2,
			'r': 2,
			'stroke': 'none'
		});

		this.setSvgElementAttributes(marker, {
			'id': 'arrowend',
			'markerWidth': 4,
			'markerHeight': 4,
			'refX': 2,
			'refY': 2
		});

		marker.appendChild(circle);
		svg.appendChild(marker);
	}
};