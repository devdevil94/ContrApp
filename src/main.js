//Imports
import SVG from '../dist/js/svg';
import Block from '../dist/js/block';
import {constants, Utils} from '../dist/js/utils';
import 'bootstrap/dist/css/bootstrap.css';
import Multiplier, { MultiplierShape } from '../dist/js/operators/multiplier';

require('./style.css');
require('./index.html');
/////////////////////////////////





//Important functions/objects to call
var svg = new SVG(constants.SVG_WIDTH, constants.SVG_HEIGHT).getSVG();
/////////////////////////////////////

// var mulRect = new MultiplierShape(100, 100, constants.MULTIPLIER_SQUARE_SIDE);
// mulRect.draw(svg);

var block = new Block(100,100);
block.create(svg);