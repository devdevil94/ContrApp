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

function startTypeSetting() {
  var HUB = MathJax.Hub;
  var functions = document.querySelectorAll(".function-text");

  functions.forEach((func) => {
    HUB.Queue(["Typeset", HUB, func]);
    //Maybe resizing can be done after this step
    // console.log(func.offsetWidth + " " + func.offsetHeight);
  });
}
///////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

/********Initializations********/
var componentType = "no";
var functionInput = document.getElementById("tFunction-input");
var editBtn = document.getElementById("edit-Btn");
var blockBtn = document.getElementById("block-btn");

/********Adding Components To SVG********/

/********SVG Event Listeners********/

svgElement.addEventListener("click", (event) => {
  if (event.target.tagName == "svg" && componentType == "block") {
    event.preventDefault();

    const x = Utils.getMousePosition(event).x;
    const y = Utils.getMousePosition(event).y;

    var newBlock = new Block(x, y);
    newBlock.create(svgElement);
    newBlock
      .getContainer()
      .getRect()
      .addEventListener("click", () => {
        svg.deselectAllComponents();
        newBlock.setSelected(true);
        functionInput.value = newBlock.TransferFunction;
      });

    svg.addComponent(newBlock);
    startTypeSetting();
  }
});

/********Settings Event Listeners********/

blockBtn.addEventListener("click", () => {
  componentType = "block";
  blockBtn.classList.add("selected-btn");
});

editBtn.addEventListener("click", () => {
  var components = svg.getComponents();

  for (var i = 0; i < components.length; i++) {
    if (components[i].isSelected()) {
      components[i].TransferFunction = functionInput.value;
      startTypeSetting();
      break;
    }
  }
});
