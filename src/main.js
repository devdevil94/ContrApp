//Imports
import { SVG } from './src/svg.js';
import { Block } from './src/block.js';
import { constants } from './src/constants.js';






//Important functions/objects to call
var svg = new SVG(constants.SVG_WIDTH, constants.SVG_HEIGHT).getSVG();
/////////////////////////////////////


var block = new Block(constants.BLOCK_WIDTH, constants.BLOCK_HEIGHT);
block.create(svg);