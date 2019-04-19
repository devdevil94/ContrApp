import constants from "../Constants";
import MultiplierContainer from "../MultiplierContainer";

//const Algebrite = require('algebrite');
const cq = require("coffeequate");

export default class Multiplier {
  constructor(x, y, id) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.container = null;
    this.input1 = "";
    this.input2 = "";
    this.output = "";
  }
  create() {
    this.container = new MultiplierContainer(
      this.x,
      this.y,
      constants.MULTIPLIER_SQUARE_SIDE
    );
    this.container.draw(svg);
  }
  getContainer() {
    return this.container;
  }
  setInput1(input1) {
    var input1Exp = input1.replace(/\^/g, "**");
    this.input1 = input1Exp;
  }
  setInput2(input2) {
    var input2Exp = input2.replace(/\^/g, "**");
    this.input2 = input2Exp;
  }
  getOutput() {
    return this.output;
  }
  calcOutput() {
    var outputExp = cq(this.input1 + "*" + this.input2).toString();
    this.output = outputExp.replace(/\*\*/g, "^");
  }
  setSelected(selected) {
    this.selected = selected;
    this.container.setStrokeColor(selected);
  }
  isSelected() {
    return this.selected;
  }
}
