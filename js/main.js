



var svg = new SVG(SVG_WIDTH, SVG_HEIGHT).getSVG();

var plant = new Plant(80,50);
plant.create(svg);

plant.setTransferFunction('t/(3 + t)');


var plant2 = new Plant(200,50);
plant2.create(svg);

plant2.setTransferFunction('4/3 - t');



// for(var i=0; i<=document.get; i++){

// }
