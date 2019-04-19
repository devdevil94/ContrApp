import Utils from "./Utils";
import constants from "./Constants";

export default class InOutCircle {
  constructor(cx, cy, element) {
    this.isEndPoint = false;
    this.selected = false;
    this.connectingLine = null;
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
  set IsEndPoint(isEndPoint) {
    this.isEndPoint = isEndPoint;
  }
  get IsEndPoint() {
    return this.isEndPoint;
  }
  getCircleElement() {
    return this.circle;
  }
  set ConnectingLine(line) {
    this.connectingLine = line;
  }
  get ConnectingLine() {
    return this.connectingLine;
  }
  hasConnectingLine() {
    return this.connectingLine != null;
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
  isSelected() {
    return this.selected;
  }

  set CenterCoord(coord) {
    this.cx = coord.cx;
    this.cy = coord.cy;
  }
  get CenterCoord() {
    return {
      cx: this.cx,
      cy: this.cy
    };
  }
}
