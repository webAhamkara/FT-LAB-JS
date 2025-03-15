class Matrix {
	constructor(arr) {
		this.arr = arr
	}
	maxValueInColumn(index) {
		let maxValue = -Infinity
		for (let i = 0; i < this.arr.length; i++) {
			if (this.arr[i][index] >= maxValue) {
				maxValue = this.arr[i][index]
			}
		}

		return maxValue
	}
	findSaddlePoints() {
		let saddlePoints = []
		let minValueArr = []
		let minValue = +Infinity
		let index = 0
		for (let i = 0; i < this.arr.length; i++) {
			for (let j = 0; j < this.arr[i].length; j++) {
				if (this.arr[i][j] === minValue) {
					index = j
					minValueArr.push(index)
				}
				if (this.arr[i][j] < minValue) {
					minValue = this.arr[i][j]
					index = j
					minValueArr = []
					minValueArr.push(index)
				}
				if (j === this.arr[i].length - 1) {
					for (let k = 0; k < minValueArr.length; k++) {
						if (
							this.arr[i][minValueArr[k]] ===
							this.maxValueInColumn(minValueArr[k])
						) {
							saddlePoints.push([i, minValueArr[k]])
						}
					}
				}
			}
			minValue = +Infinity
			minValueArr = []
		}
		console.log(saddlePoints)
		return saddlePoints
	}
}
const matrix1 = new Matrix([
	[323, 277, 789, 234],
	[567, 84, 345, 78],
	[437, 305, 503, 305],
	[123, 55, 789, 234],
	[567, 305, 345, 678],
])
matrix1.findSaddlePoints()
