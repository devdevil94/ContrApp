
//Important functions/objects to call
var svg = new SVG(SVG_WIDTH, SVG_HEIGHT).getSVG();
//Utils.createArrowhead(svg);
//Utils.createArrowend(svg);
/////////////////////////////////////
var Expression = algebra.Expression;
var Equation = algebra.Equation;

var exp1 = algebra.parse('6*t');
var exp2 = algebra.parse('2*t+t^2');

var eq = new Equation(exp1, exp2);

console.log(exp1.multiply(exp2).toString());
console.log('t = ' + eq.solveFor('t').toString());