import Utils from "./utils";
import constants from "./Constants";

export default class InOutCircle {
  constructor(cx, cy, element) {
    this.selected = false;
    this.cx = cx;
    this.cy = cy;
    this.circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );

    Utils.setSvgElementAttributes(this.circle, {
      cx: this.cx,
      cy: this.cy,
      r: constants.INOUT_CIRCLE_RADIUS,
      stroke: "none",
      fill: "#000"
    });

    element.appendChild(this.circle);
  }

  getCircleElement() {
    return this.circle;
  }

  setCircleColor() {
    if (this.selected)
      Utils.setSvgElementAttributes(this.circle, { fill: "red" });
    else Utils.setSvgElementAttributes(this.circle, { fill: "black" });
  }

  setSelected(selected) {
    this.selected = selected;
    this.setCircleColor();
  }
  getSelected() {
    return this.selected;
  }

  set centerCoord(coord) {
    this.cx = coord.cx;
    this.cy = coord.cy;
  }
  get centerCoord() {
    return {
      x: this.cx,
      y: this.cy
    };
  }
}
