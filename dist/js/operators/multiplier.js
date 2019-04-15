import constants from "../Constants";
import MultiplierContainer from "../MultiplierContainer";

//const Algebrite = require('algebrite');
const cq = require("coffeequate");

export default class Multiplier {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.shape = null;
    this.input1 = "";
    this.input2 = "";
    this.output = "";
  }
  create() {
    var shape = new MultiplierContainer(
      this.x,
      this.y,
      constants.MULTIPLIER_SQUARE_SIDE
    );
    shape.draw(svg);
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
}
