//Imports
import SVG from '../dist/js/svg';
import Block from '../dist/js/block';
import {constants, Utils} from '../dist/js/utils';
require('./style.css');
require('./index.html');






//Important functions/objects to call
var svg = new SVG(constants.SVG_WIDTH, constants.SVG_HEIGHT).getSVG();
//////////////////////////////////////


var block = new Block(constants.BLOCK_WIDTH, constants.BLOCK_HEIGHT);
block.create(svg);