import constants from "./Constants";
import Utils from "./Utils";
import BlockContainer from "./BlockContainer";

export default class Block {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.container = null;
    this.selected = true;
    this.input = "t";
    this.output = "";
    this.transFunction = "t";
  }
  create(svg) {
    this.container = new BlockContainer(
      this.x,
      this.y,
      constants.BLOCK_WIDTH,
      constants.BLOCK_HEIGHT
    );
    this.container.draw(svg);
    console.log(this.container);
    this.container.setFunction(this.transFunction);
  }
  createPath(event) {
    var blockCircle = event.target;
    var x = blockCircle.getAttributeNS(null, "cx");
    var y = blockCircle.getAttributeNS(null, "cy");
    console.log(x + " " + y);
    var svg = blockCircle.parentNode.parentNode;
    var path = new Path(svg, x, y);
  }
  determineOutput() {
    var parsedInput = algebra.parse(this.input);
    var parsedTransFunction = algebra.parse(this.transFunction);
    this.output = parsedInput.multiply(parsedTransFunction).toString();
  }
  getOutput() {
    return this.output;
  }
  setInput(input) {
    this.input = input;
  }
  setTransferFunction(txt) {
    this.transFunction = txt;
    this.container.setFunction(this.transFunction);
  }
  setSelected(selected) {
    this.selected = selected;

    if (this.selected)
      Utils.setSvgElementAttributes(this.container.getRect(), {
        stroke: "red"
      });
    else
      Utils.setSvgElementAttributes(this.container.getRect(), {
        stroke: "#000"
      });
  }
}
