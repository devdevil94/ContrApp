import constants from "./Constants";

export default class Utils {
  static getMousePosition(event) {
    var CTM = svg.getScreenCTM();

    return {
      x: (event.clientX - CTM.e) / CTM.a,
      y: (event.clientY - CTM.f) / CTM.d
    };
  }

  static setSvgElementAttributes(el, attrsObj) {
    for (var attr in attrsObj) {
      el.setAttributeNS(null, attr, attrsObj[attr]);
    }
  }

  static startDrag(event) {
    var offset = Utils.getMousePosition(event);

    var g = event.target.parentNode;
    var svg = g.parentNode;
    var transforms = g.transform.baseVal;

    if (
      transforms.length == 0 ||
      transforms.getItem(0).type != SVGTransform.SVG_TRANSFORM_TRANSLATE
    ) {
      var translate = svg.createSVGTransform();
      translate.setTranslate(0, 0);
      g.transform.baseVal.insertItemBefore(translate, 0);
    }

    offset.x -= transforms.getItem(0).matrix.e;
    offset.y -= transforms.getItem(0).matrix.f;
    // console.log("startDrag offset: ");
    // console.log(offset);
    return offset;
  }

  static drag(w, h, event, offset) {
    event.preventDefault();

    var g = event.target.parentNode;
    var transforms = g.transform.baseVal;
    var translate = transforms.getItem(0);
    // console.log("drag coord: ");
    // console.log(coord);
    var coord = Utils.getMousePosition(event);
    var x = coord.x - offset.x;
    var y = coord.y - offset.y;

    if (x < 0) x = 0;
    if (y < 0) y = 0;

    if (x + w > constants.SVG_WIDTH) x = constants.SVG_WIDTH - w;
    if (y + h > constants.SVG_HEIGHT) y = constants.SVG_HEIGHT - h;

    translate.setTranslate(x, y);

    return { x: x, y: y };
  }

  static createArrowhead(svg) {
    var defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    var marker = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "marker"
    );
    var markerPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );

    this.setSvgElementAttributes(markerPath, {
      fill: "red",
      d: "M9,0 L9,6 L0,3 z"
    });

    var markerAttrs = {
      id: "arrowhead",
      markerWidth: 10,
      markerHeight: 10,
      refX: 9,
      refY: 3,
      orient: "auto",
      markerUnits: "strokeWidth"
    };

    this.setSvgElementAttributes(marker, markerAttrs);

    marker.appendChild(markerPath);
    defs.appendChild(marker);
    svg.appendChild(defs);
  }

  static createArrowend(svg) {
    var defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    var marker = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "marker"
    );
    var circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );

    this.setSvgElementAttributes(circle, {
      fill: "#000",
      cx: 2,
      cy: 2,
      r: 2,
      stroke: "none"
    });

    this.setSvgElementAttributes(marker, {
      id: "arrowend",
      markerWidth: 4,
      markerHeight: 4,
      refX: 2,
      refY: 2
    });

    marker.appendChild(circle);
    svg.appendChild(marker);
  }
}
