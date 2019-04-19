import math from "mathjs";
import InOutCircle from "./InputOutputCircle";
import Utils from "./Utils";

export default class BlockContainer {
  //TODO: make the rectangle resize itself depending on the text inside it
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.offset = 0;
    this.dragging = false;
    this.inOutCircles = null;
    this.rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    this.textElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "foreignObject"
    );
    this.container = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "g"
    );
  }
  draw(svg) {
    this.createRect();
    this.createText();
    this.createInOutCircles();

    this.updateAllCirclesCoord({ x: this.x, y: this.y });

    var translate = svg.createSVGTransform();
    translate.setTranslate(this.x, this.y);
    this.container.transform.baseVal.insertItemBefore(translate, 0);

    this.container.className.baseVal = "draggable block";

    // Utils.setSvgElementAttributes(this.container, { stroke: "#000" });
    this.addEventListeners();
    this.addSelectedCircleEventListener();

    svg.appendChild(this.container);
  }

  setDragging(dragging) {
    this.dragging = dragging;
  }
  getDragging() {
    return this.dragging;
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
        this.Coord = Utils.drag(this.w, this.h, event, this.offset);
      }
    });
    this.container.addEventListener("mouseup", () => {
      this.setDragging(false);
    });
    this.container.addEventListener("mouseleave", () => {
      this.setDragging(false);
    });
  }
  set Coord(coord) {
    this.x = coord.x;
    this.y = coord.y;
    // console.log(coord);
    this.updateAllCirclesCoord(coord);
  }
  get Coord() {
    return { x: this.x, y: this.y };
  }
  createInOutCircles() {
    this.inOutCircles = {
      top: new InOutCircle(this.w / 2, 0, this.container),
      bottom: new InOutCircle(this.w / 2, this.h, this.container),
      left: new InOutCircle(0, this.h / 2, this.container),
      right: new InOutCircle(this.w, this.h / 2, this.container)
    };
  }
  getInOutCircles() {
    return this.inOutCircles;
  }
  updateAllCirclesCoord(containerCoord) {
    var top = this.inOutCircles.top;
    var bottom = this.inOutCircles.bottom;
    var left = this.inOutCircles.left;
    var right = this.inOutCircles.right;
    //NEEDS SOME REFACTORING LATER!!!!!!!!!!!!!!!!!!
    this.updateCircleCoord(
      top,
      containerCoord.x + this.w / 2,
      containerCoord.y
    );
    this.updateCircleCoord(
      bottom,
      containerCoord.x + this.w / 2,
      containerCoord.y + this.h
    );
    this.updateCircleCoord(
      left,
      containerCoord.x,
      containerCoord.y + this.h / 2
    );
    this.updateCircleCoord(
      right,
      containerCoord.x + this.w,
      containerCoord.y + this.h / 2
    );
  }
  updateCircleCoord(circle, cx, cy) {
    // console.log(circle.CenterCoord);
    circle.CenterCoord = {
      cx: cx,
      cy: cy
    };
    if (circle.hasConnectingLine()) {
      var line = circle.ConnectingLine;
      // console.log(circle);
      if (circle.IsEndPoint) {
        line.endPoint = {
          x: circle.CenterCoord.cx,
          y: circle.CenterCoord.cy
        };
      } else {
        line.startPoint = {
          x: circle.CenterCoord.cx,
          y: circle.CenterCoord.cy
        };
      }
    }
  }
  addSelectedCircleEventListener() {
    var top = this.inOutCircles.top;
    var bottom = this.inOutCircles.bottom;
    var right = this.inOutCircles.right;
    var left = this.inOutCircles.left;

    top.getCircleElement().addEventListener("click", () => {
      this.deselectAllCircles();
      this.getInOutCircles().top.setSelected(
        !this.getInOutCircles().top.isSelected()
      );
    });
    bottom.getCircleElement().addEventListener("click", () => {
      this.deselectAllCircles();
      this.getInOutCircles().bottom.setSelected(
        !this.getInOutCircles().bottom.isSelected()
      );
    });
    right.getCircleElement().addEventListener("click", () => {
      this.deselectAllCircles();
      this.getInOutCircles().right.setSelected(
        !this.getInOutCircles().right.isSelected()
      );
    });
    left.getCircleElement().addEventListener("click", () => {
      this.deselectAllCircles();
      this.getInOutCircles().left.setSelected(
        !this.getInOutCircles().left.isSelected()
      );
    });
  }

  deselectAllCircles() {
    for (var circle in this.inOutCircles) {
      this.inOutCircles[circle].setSelected(false);
    }
  }
  getRect() {
    return this.rect;
  }
  createRect() {
    Utils.setSvgElementAttributes(this.rect, {
      width: this.w,
      height: this.h,
      // stroke: "#000",
      fill: "#fff"
    });

    this.container.appendChild(this.rect);
  }
  createText() {
    //Width of the text can be modified based on the number of chars.
    Utils.setSvgElementAttributes(this.textElement, {
      x: 0,
      y: 0,
      width: this.w,
      height: this.h
    });
    this.container.appendChild(this.textElement);
  }
  adjustFunctionPosition() {
    //Adjust Function position when there is/are fraction(s)
  }
  getNumberOfFractions() {}
  getContainer() {
    return this.container;
  }
  setStrokeColor(selected) {
    if (selected)
      Utils.setSvgElementAttributes(this.rect, {
        stroke: "#00f"
      });
    else
      Utils.setSvgElementAttributes(this.rect, {
        stroke: "#000"
      });
  }
  setFunction(func) {
    if (this.textElement.childNodes[0]) {
      this.textElement.removeChild(this.textElement.childNodes[0]);
    }

    var functionDiv = document.createElement("div");
    functionDiv.setAttribute("class", "function-text");
    var funcTex = "$$" + math.parse(func).toTex() + "$$";

    functionDiv.innerHTML = funcTex;
    this.textElement.appendChild(functionDiv);
  }
}

// top.CenterCoord = {
//   cx: containerCoord.x + this.w / 2,
//   cy: containerCoord.y
// };
// bottom.CenterCoord = {
//   cx: containerCoord.x + this.w / 2,
//   cy: containerCoord.y + this.h
// };
// left.CenterCoord = {
//   cx: containerCoord.x,
//   cy: containerCoord.y + this.h / 2
// };
// right.CenterCoord = {
//   cx: containerCoord.x + this.w,
//   cy: containerCoord.y + this.h / 2
// };

// for(var c in this.inOutCircles){
// 	var circle = this.inOutCircles[c];
// 	console.log(circle);
// 	circle.getCircleElement().addEventListener('click', () =>{
// 		this.deselectAllCircles();
// 		this.getInOutCircles().circle.setSelected(!this.getInOutCircles().circle.getSelected());
// 	});
// }
