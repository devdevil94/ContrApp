



var svg = new SVG(SVG_WIDTH, SVG_HEIGHT).getSVG();

var plant = new Plant(80,50);
plant.create(svg);

plant.setTransferFunction('(3 + t)');


var plant2 = new Plant(200,150);
plant2.create(svg);

plant2.setTransferFunction('1/3 - t');



