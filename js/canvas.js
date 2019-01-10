
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext('2d');

function Rectangle(x, y, w, h){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;

	this.draw = function(){
		context.fillStyle = 'blue';
		context.fillRect(x, y, w, h);
	}
}

var rect = new Rectangle(100,50,300,300);
rect.draw();