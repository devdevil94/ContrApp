//Imports
import SVG from '../dist/js/svg';
import Block from '../dist/js/block';
import {constants, Utils} from '../dist/js/utils';
import 'bootstrap/dist/css/bootstrap.css';
import Multiplier from '../dist/js/operators/multiplier';

require('./style.css');
require('./index.html');
/////////////////////////////////





//Important functions/objects to call
//var svg = new SVG(constants.SVG_WIDTH, constants.SVG_HEIGHT).getSVG();
//////////////////////////////////////

var mul = new Multiplier();
mul.setInput1('t+3');
mul.setInput2('1/(6*t^2+3)');
mul.calcOutput();

console.log(mul.getOutput());