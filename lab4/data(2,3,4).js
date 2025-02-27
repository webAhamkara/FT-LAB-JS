class Figure {
	#x
	#y
	constructor(x, y) {
		this.#x = x
		this.#y = y
	}
	square() {
		return undefined
	}
}
class Circle extends Figure {
	constructor(x, y, r) {
		super(x, y)
		this.r = r
	}
	square() {
		return Math.PI * this.r ** 2
	}
}

class Rectangle extends Figure {
	constructor(x, y, h, w) {
		super(x, y)
		this.h = h
		this.w = w
	}

	square() {
		return this.h * this.w
	}
}
const figure1 = new Figure(2, 2)
console.log(figure1.square())
const figure2 = new Circle(2, 2, 2)
console.log(figure2.square())
const figure3 = new Rectangle(5, 5, 10, 3)
console.log(figure3.square())
