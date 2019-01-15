

class Utils{
	
	static getMousePosition(event) {
		var CTM = svg.getScreenCTM();

		return {
			x: (event.clientX - CTM.e) / CTM.a,
			y: (event.clientY - CTM.f) / CTM.d
		};
	}

}