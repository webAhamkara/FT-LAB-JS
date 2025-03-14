class Mark {
	constructor(subject, mark) {
		this.subject = subject
		this.mark = mark
	}
}
class Student {
	constructor(secondName, firstName, marks) {
		this.secondName = secondName
		this.firstName = firstName
		this.marks = marks.map(m => new Mark(m.subject, m.mark))
	}
	printStudentInfo() {
		console.log(`Студент: ${this.secondName} ${this.firstName}`)
		console.log(`Оценки:`)
		this.marks.forEach(mark => {
			console.log(`  ${mark.subject} - ${mark.mark}`)
		})
		console.log('\n')
	}
}

const marks1 = [
	{ subject: 'Математика', mark: 5 },
	{ subject: 'Физика', mark: 4 },
	{ subject: 'История', mark: 3 },
]
const student1 = new Student('Клыков', 'Иван', marks1)

const marks2 = [
	{ subject: 'Математика', mark: 4 },
	{ subject: 'Физика', mark: 4 },
	{ subject: 'История', mark: 4 },
]
const student2 = new Student('Рожновская', 'Дарья', marks2)
student1.printStudentInfo()
student2.printStudentInfo()
