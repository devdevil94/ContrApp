import { constants, Utils } from "./utils";


export default class InOutCircle{

    constructor(cx, cy, element){
        this.selected = false;
        
		this.circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

        Utils.setSvgElementAttributes(this.circle, {
            'cx': cx,
			'cy': cy,
			'r': constants.INOUT_CIRCLE_RADIUS,
			'stroke': 'none',
			'fill': '#000'
        });

        element.appendChild(this.circle);
    }
    
}