import Utils from "./Utils";

export default class Line {
  //TODO: Check if the line can be selected. It might be necessary to chance <line>
  // into a <rect> with a very small hight so it can be selected freely.

  constructor(startPoint, endPoint) {
    this.startX = startPoint.x;
    this.startY = startPoint.y;
    this.endX = endPoint.x;
    this.endY = endPoint.y;
    this.dragging = false;
    this.point = null;
    this.func = null;
    this.line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  }

  setFunctionFromOutputToInput(func) {
    this.func = func;
  }

  draw(svg) {
    Utils.setSvgElementAttributes(this.line, {
      x1: this.startX,
      y1: this.startY,
      x2: this.endX,
      y2: this.endY,
      stroke: "black",
      "stroke-width": 2
    });

    svg.appendChild(this.line);
  }

  set startPoint(point) {
    this.startX = point.x;
    this.startY = point.y;

    Utils.setSvgElementAttributes(this.line, {
      x1: this.startX,
      y1: this.startY
    });
  }
  get startPoint() {
    return {
      x: this.startX,
      y: this.startY
    };
  }

  set endPoint(point) {
    this.endX = point.x;
    this.endY = point.y;

    Utils.setSvgElementAttributes(this.line, { x2: this.endX, y2: this.endY });
  }
  get endPoint() {
    return {
      x: this.endX,
      y: this.endY
    };
  }

  startDrag(event) {
    if (!this.dragging) {
      this.point = Utils.getMousePosition(event);

      var square = event.target;
      var transforms = square.transform.baseVal;

      if (
        transforms.length == 0 ||
        transforms.getItem(0).type != SVGTransform.SVG_TRANSFORM_TRANSLATE
      ) {
        var translate = svg.createSVGTransform();
        translate.setTranslate(0, 0);
        square.transform.baseVal.insertItemBefore(translate, 0);
        //this.line.transform.baseVal.insertItemBefore(translate, 0);
      }

      this.point.x -= transforms.getItem(0).matrix.e;
      this.point.y -= transforms.getItem(0).matrix.f;

      this.dragging = true;
    }
  }

  drag(event) {
    if (this.dragging) {
      event.preventDefault();

      var coord = Utils.getMousePosition(event);
      var xPos = coord.x - this.point.x;
      var yPos = coord.y - this.point.y;

      var square = event.target;
      var squareTransforms = square.transform.baseVal;
      var translateSquare = squareTransforms.getItem(0);

      translateSquare.setTranslate(xPos, yPos);

      var lineGroup = square.parentNode;
      var line = lineGroup.childNodes[1];

      Utils.setSvgElementAttributes(line, { x2: coord.x, y2: coord.y });
    }
  }

  endDrag() {
    this.dragging = false;
  }

  removeCircle() {
    lineGroup.removeChild(lineGroup.childNodes[0]);
  }
}
