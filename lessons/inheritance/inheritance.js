/**
 * Created by User on 06.03.2016.
 */
function Shape(x, y) {
    this.x = x;
    this.y = y;
}
Shape.prototype.move = function (dx, dy) {
    this.x += dx;
    this.y += dy;
};

function Rect(x, y, width, height) {
    Shape.call(this, x, y);
    this.width = width;
    this.height = height;
}

Rect.prototype = Object.create(Shape.prototype);
Rect.prototype.dump = function () {
    console.log('x=' + this.x + ' y=' + this.y + ' width=' + this.width + ' height=' + this.height);
};
function Circle(x, y, radius) {
    Shape.call(this, x, y);
    this.radius = radius;
}
Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.dump = function () {
    console.log('x=' + this.x + ' y=' + this.y + ' radius=' + this.radius);
};
var rect = new Rect(10, 10, 10, 10);
rect.dump();
rect.move(10,10);
rect.dump();
var circle=new Circle(3,3,3);
circle.dump();
circle.move(4,4);
circle.dump();