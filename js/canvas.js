
var canvas = document.querySelector('canvas');
var width = canvas.width = 600;
var height = canvas.height = 600;

var handle = {
	x: 100,
	y: 50,
	w: 100,
	h: 100
};

var context = canvas.getContext('2d');

function Rectangle(x, y, w, h){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;

	this.draw = function(){
		context.fillStyle = 'blue';
		context.fillRect(this.x, this.y, this.w, this.h);
	}

	this.update = function(x,y){
		context.clearRect(0, 0, width, height);

		this.x = x;
		this.y = y;

		this.draw();
	}
}

var rect = new Rectangle(handle.x,handle.y,handle.w,handle.h);
rect.draw();

function onMouseMove(event){
	handle.x = event.clientX;
	handle.y = event.clientY;
	rect.update(handle.x, handle.y);
}

function onMouseUp(event){
	document.body.removeEventListener('mousemove', onMouseMove);
	document.body.removeEventListener('mouseup', onMouseUp);
}

function pointInRect(x, y, rect){
	return inRange(x, rect.x, rect.x + rect.w) && inRange(y, rect.y, rect.y + rect.h);
}

function inRange(value, min, max){
	return value >= Math.min(min, max) && value <= Math.max(min, max);
}

document.body.addEventListener('mousedown', function(event){
	if(pointInRect(event.clientX, event.clientY, handle)){
		document.body.addEventListener('mousemove', onMouseMove);
		document.body.addEventListener('mouseup', onMouseUp);
	}
});