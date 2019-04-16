export default class SVG {
  constructor(width, height) {
    this.svg = document.querySelector("svg");
    this.svg.style.width = width;
    this.svg.style.height = height;
    this.components = new Array();
  }
  addComponent(component) {
    this.components.push(component);
  }
  deselectAllComponents() {
    this.components.forEach((component) => {
      component.setSelected(false);
    });
  }
  getComponents() {
    return this.components;
  }
  getElement() {
    return this.svg;
  }
}
