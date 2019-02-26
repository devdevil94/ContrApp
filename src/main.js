//////////////////////////Imports\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
import 'bootstrap/dist/css/bootstrap.css';
// import 'katex/dist/katex.css';
import SVG from '../dist/js/svg';
import Block from '../dist/js/block';
import {constants, Utils} from '../dist/js/utils';
import Multiplier from '../dist/js/operators/multiplier';

require('./style.css');
require('./index.html');
///////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


/////////////Important functions/objects to call\\\\\\\\\\\\\\\
var svg = new SVG(constants.SVG_WIDTH, constants.SVG_HEIGHT).getSVG();
///////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

var mulRect = new Multiplier(100, 100, constants.MULTIPLIER_SQUARE_SIDE);
mulRect.create(svg);

var block = new Block(200,200);
block.create(svg);
block.setTransferFunction('t^2 * (t+3)');
