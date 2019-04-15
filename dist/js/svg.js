export default class SVG {
  constructor(width, height) {
    this.svg = document.querySelector("svg");
    this.svg.style.width = width;
    this.svg.style.height = height;
  }

  getElement() {
    return this.svg;
  }
}
