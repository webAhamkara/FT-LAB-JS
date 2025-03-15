class Student {
	constructor(secondName, firstName, marks) {
		this.secondName = secondName
		this.firstName = firstName
		this.marks = marks
	}
	averageValue(subject) {
		const total = this.marks[subject].reduce((sum, mark) => sum + mark, 0)
		const average = total / this.marks[subject].length
		console.log(`Средняя оценка по "${subject}": ${average.toFixed(1)}}`)
		//toFixed(1) - округляет значение до 1 знака после запятой
	}
	printStudentInfo() {
		console.log(`Студент: ${this.secondName} ${this.firstName}`)
		console.log(`Оценки:`)
		for (const subject in this.marks) {
			if (this.marks[subject].length === 0) {
				console.log(`  ${subject}:`)
			} else {
				// const averageMark = this.averageValue(subject)
				console.log(`  ${subject}: ${this.marks[subject]}`)
			}
		}
		// console.log('\n')
	}
	schoolSubject(subject) {
		console.log(`${subject}: ${this.marks[subject]}`)
	}
	addMark(newMarks) {
		for (let subject in newMarks) {
			for (let mark of newMarks[subject]) {
				this.marks[subject].push(mark)
			}
		}
	}
	deleteMark(subject) {
		this.marks[subject] = []
	}
}

const student1 = new Student('Клыков', 'Дмитрий', {
	Математика: [5, 5, 4],
	Физика: [4, 5, 4],
	История: [3, 2, 3],
})
const student2 = new Student('Рожновская', 'Дарья', {
	Математика: [3, 3, 4],
	Физика: [4, 4, 3],
	История: [5, 5, 5],
})
student1.deleteMark('История')
student1.printStudentInfo()
