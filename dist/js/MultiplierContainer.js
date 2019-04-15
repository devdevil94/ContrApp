import Utils from "./Utils";
import InOutCircle from "./InputOutputCircle";

export default class MultiplierContainer {
  constructor(x, y, s) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.offset = 0;
    this.dragging = false;
    this.inOutCircles = null;
    this.rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    this.line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    this.line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    this.container = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "g"
    );
    this.leftCircle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    this.rightCircle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
  }

  draw(svg) {
    this.createRect();
    this.createCrossSign();
    this.createInOutCircles();

    var translate = svg.createSVGTransform();
    translate.setTranslate(this.x, this.y);
    this.container.transform.baseVal.insertItemBefore(translate, 0);

    this.container.className.baseVal = "draggable block";

    this.addEventListeners();
    this.addSelectedCircleEventListeners();

    svg.appendChild(this.container);
  }

  createInOutCircles() {
    this.inOutCircles = {
      bottom: new InOutCircle(this.s, this.s / 2, this.container),
      right: new InOutCircle(0, this.s / 2, this.container),
      left: new InOutCircle(this.s / 2, this.s, this.container)
    };
  }
  getInOutCircles() {
    return this.inOutCircles;
  }

  addSelectedCircleEventListeners() {
    var bottom = this.inOutCircles.bottom;
    var right = this.inOutCircles.right;
    var left = this.inOutCircles.left;

    bottom.getCircleElement().addEventListener("click", () => {
      this.deselectAllCircles();
      this.getInOutCircles().bottom.setSelected(
        !this.getInOutCircles().bottom.getSelected()
      );
    });
    right.getCircleElement().addEventListener("click", () => {
      this.deselectAllCircles();
      this.getInOutCircles().right.setSelected(
        !this.getInOutCircles().right.getSelected()
      );
    });
    left.getCircleElement().addEventListener("click", () => {
      this.deselectAllCircles();
      this.getInOutCircles().left.setSelected(
        !this.getInOutCircles().left.getSelected()
      );
    });
  }

  addEventListeners() {
    this.container.addEventListener("mousedown", (event) => {
      if (!this.getDragging()) {
        this.offset = Utils.startDrag(event);
        this.setDragging(true);
      }
    });
    this.container.addEventListener("mousemove", (event) => {
      if (this.getDragging()) {
        Utils.drag(event, this.offset);
      }
    });
    this.container.addEventListener("mouseup", () => {
      this.setDragging(false);
    });
    this.container.addEventListener("mouseleave", () => {
      this.setDragging(false);
    });
  }

  createRect() {
    Utils.setSvgElementAttributes(this.rect, {
      width: this.s,
      height: this.s,
      stroke: "#000",
      fill: "white"
    });

    this.container.appendChild(this.rect);
  }

  createCrossSign() {
    Utils.setSvgElementAttributes(this.line1, {
      x1: 10,
      y1: 10,
      x2: this.s - 10,
      y2: this.s - 10,
      stroke: "#000",
      "stroke-width": 2
    });

    Utils.setSvgElementAttributes(this.line2, {
      x1: this.s - 10,
      y1: 10,
      x2: 10,
      y2: this.s - 10,
      stroke: "#000",
      "stroke-width": 2
    });

    this.container.appendChild(this.line1);
    this.container.appendChild(this.line2);
  }

  deselectAllCircles() {
    console.log("all deselected");
    for (var circle in this.inOutCircles) {
      this.inOutCircles[circle].setSelected(false);
    }
  }

  setDragging(dragging) {
    this.dragging = dragging;
  }
  getDragging() {
    return this.dragging;
  }
}
