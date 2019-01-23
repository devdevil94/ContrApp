
//Important functions/objects to call
var svg = new SVG(SVG_WIDTH, SVG_HEIGHT).getSVG();
//Utils.createArrowhead(svg);
//Utils.createArrowend(svg);
/////////////////////////////////////

var block = new Block(50,50);
block.create(svg);

var block2 = new Block(150,150);
block2.create(svg);