//////////////////////////Imports\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
import "bootstrap/dist/css/bootstrap.css";

import SVG from "../dist/js/svg";
import Block from "../dist/js/Block";
import Line from "../dist/js/Line";
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
var transFuncBlockBtn = document.getElementById("transFunc-block-btn");
var multiplierBtn = document.getElementById("mul-operator-btn");

/********Adding Components To SVG********/

svgElement.addEventListener("click", (event) => {
  if (event.target.tagName == "svg" && componentType == "block") {
    event.preventDefault();

    const x = Utils.getMousePosition(event).x;
    const y = Utils.getMousePosition(event).y;

    var block = new Block(x, y, "tf-block-" + svg.getComponents().length);
    block.create(svgElement);

    var blockContainer = block.getContainer();
    blockContainer.getRect().addEventListener("click", () => {
      svg.deselectAllComponents();
      block.setSelected(true);
      functionInput.value = block.TransferFunction;
    });

    var blockCircles = blockContainer.getInOutCircles();

    const inOutCircles = [
      blockCircles["top"],
      blockCircles["bottom"],
      blockCircles["left"],
      blockCircles["right"]
    ];

    inOutCircles.forEach((circle) => {
      circle.getCircleElement().addEventListener("click", () => {
        for (var i = 0; i < svg.getComponents().length; i++) {
          var componentOnSvg = svg.getComponents()[i];
          var selectedCircle = componentOnSvg.getSelectedCircle();

          if (
            componentOnSvg.getId() != block.getId() &&
            selectedCircle != null
          ) {
            var startPoint = selectedCircle.CenterCoord;
            var endPoint = circle.CenterCoord;
            var line = new Line(startPoint, endPoint);

            selectedCircle.IsEndPoint = false;
            circle.IsEndPoint = true;

            selectedCircle.ConnectingLine = line;
            circle.ConnectingLine = line;

            svg.deselectAllInOutCircles();

            line.draw(svgElement);
            break;
          }
        }
      });
    });
    svg.addComponent(block);
    startTypeSetting();
  }
});

/********Settings Event Listeners********/

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

multiplierBtn.addEventListener("click", () => {
  componentType = "multiplier";
  transFuncBlockBtn.classList.remove("selected-btn");
  multiplierBtn.classList.add("selected-btn");
});

transFuncBlockBtn.addEventListener("click", () => {
  componentType = "block";
  multiplierBtn.classList.remove("selected-btn");
  transFuncBlockBtn.classList.add("selected-btn");
});
