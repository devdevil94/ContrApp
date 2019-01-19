

class Utils{
	
	static getMousePosition(event) {
		var CTM = svg.getScreenCTM();

		return {
			x: (event.clientX - CTM.e) / CTM.a,
			y: (event.clientY - CTM.f) / CTM.d
		};
	}

	static setSvgElementAttributes(el,attrsObj){
		for(var attr in attrsObj) {
        	el.setAttributeNS(null, attr, attrsObj[attr])  
    	}
	}

}