
//Important functions/objects to call
import { SVG } from './svg.js';


var svg = new SVG(SVG_WIDTH, SVG_HEIGHT).getSVG();
//Utils.createArrowhead(svg);
//Utils.createArrowend(svg);
/////////////////////////////////////
var Algebrite = require('../lib/node_modules/algebrite');

console.log(Algebrite.eval('t + t + t').toString());
