//////////////////////////Imports\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
import "bootstrap/dist/css/bootstrap.css";

import SVG from "../dist/js/svg";
import Block from "../dist/js/Block";
import constants from "../dist/js/Constants";
import Multiplier from "../dist/js/operators/Multiplier";
import Utils from "../dist/js/Utils";
const math = require("mathjs");
const katex = require("katex");
require("./style.css");
require("../dist/index.html");
///////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

/////////////Important functions/objects to call\\\\\\\\\\\\\\\
var svg = new SVG(constants.SVG_WIDTH, constants.SVG_HEIGHT);
var svgElement = svg.getElement();
///////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

var mulRect = new Multiplier(100, 100, constants.MULTIPLIER_SQUARE_SIDE);
mulRect.create(svgElement);

var block = new Block(200, 200);
block.create(svgElement);
block.setTransferFunction("t^2");

const eq = math.parse("(t^2)*(t+3)").toTex();
document.getElementById("hip").innerText = "$$" + eq + "$$";

// var textElement = document.createElementNS(
//   "http://www.w3.org/2000/svg",
//   "foreignObject"
// );
// Utils.setSvgElementAttributes(textElement, { width: 160, height: 120 });
// textElement.appendChild(document.getElementById("hip"));
// svgElement.appendChild(textElement);
