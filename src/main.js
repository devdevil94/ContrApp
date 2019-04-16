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

/********Initializations********/
var componentType = "no";
var blockBtn = document.getElementById("block-btn");
blockBtn.addEventListener("click", () => {
  componentType = "block";
  blockBtn.classList.add("selected-btn");
});

/********Adding Components To SVG********/

// var mulRect = new Multiplier(100, 100, constants.MULTIPLIER_SQUARE_SIDE);
// mulRect.create(svgElement);

// var block1 = new Block(200, 200);
// block1.create(svgElement);
// block1.setTransferFunction("1/t^2-2(2+5t/t)/t");

// var block2 = new Block(300, 400);
// block2.create(svgElement);
// block2.setTransferFunction("-2(2+5t/t)/t");

// svg.addComponent(block1);
// svg.addComponent(block2);

/********SVG Event Listeners********/

svgElement.addEventListener("click", (event) => {
  if (event.target.tagName == "svg" && componentType == "block") {
    event.preventDefault();

    const x = Utils.getMousePosition(event).x;
    const y = Utils.getMousePosition(event).y;

    svg.deselectAllComponents();

    var newBlock = new Block(x, y);
    newBlock.create(svgElement);

    svg.addComponent(newBlock);
  }
});

/********Components Event Listeners********/
svg.getComponents().forEach((component) => {
  component
    .getContainer()
    .getRect()
    .addEventListener("click", () => {
      svg.deselectAllComponents();
      component.setSelected(true);
    });
});
