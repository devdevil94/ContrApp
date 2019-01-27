//Imports
import { SVG } from './svg.js';
import {Block} from './block.js';
import {constants} from './constants.js';






//Important functions/objects to call
var svg = new SVG(constants.SVG_WIDTH, constants.SVG_HEIGHT).getSVG();
//Utils.createArrowhead(svg);
//Utils.createArrowend(svg);
/////////////////////////////////////


var block = new Block(constants.BLOCK_WIDTH, constants.BLOCK_HEIGHT);
block.create(svg);