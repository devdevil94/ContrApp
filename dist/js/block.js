import constants from "./Constants";
import Utils from "./Utils";
import BlockContainer from "./BlockContainer";

export default class Block {
  constructor(x, y, id) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.container = null;
    this.selected = false;
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
    this.container.setFunction(this.transFunction);
    this.setSelected(false);
  }
  getId() {
    return this.id;
  }
  calcOutput() {
    var parsedInput = algebra.parse(this.input);
    var parsedTransFunction = algebra.parse(this.transFunction);
    this.output = parsedInput.multiply(parsedTransFunction).toString();
  }
  getOutput() {
    return this.output;
  }
  getContainer() {
    return this.container;
  }
  setInput(input) {
    this.input = input;
  }
  set TransferFunction(txt) {
    this.transFunction = txt;
    this.container.setFunction(this.transFunction);
  }
  get TransferFunction() {
    return this.transFunction;
  }
  setSelected(selected) {
    this.selected = selected;
    this.container.setStrokeColor(selected);
  }
  isSelected() {
    return this.selected;
  }
  getSelectedCircle() {
    var blockCircles = this.container.getInOutCircles();
    var selectedCircle = null;

    for (var circle in blockCircles) {
      if (blockCircles[circle].isSelected()) {
        selectedCircle = blockCircles[circle];
        break;
      }
    }
    return selectedCircle;
  }
  deselectCircle() {
    if (this.getSelectedCircle() != null) {
      var selectedCircle = this.getSelectedCircle();
      selectedCircle.setSelected(false);
    }
  }
}
