//Imports
import { SVG } from '../dist/js/svg.js';
import { Block } from '../dist/js/block.js';
import { constants } from '../dist/js/constants.js';






//Important functions/objects to call
var svg = new SVG(constants.SVG_WIDTH, constants.SVG_HEIGHT).getSVG();
/////////////////////////////////////


var block = new Block(constants.BLOCK_WIDTH, constants.BLOCK_HEIGHT);
block.create(svg);