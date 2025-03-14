const student = {
	firstName: 'Иван',
	secondName: 'Иванов',
	marks: [
		{ subject: 'Математика', mark: 5 },
		{ subject: 'Физика', mark: 4 },
		{ subject: 'История', mark: 3 },
	],
}

function printStudentInfo(student) {
	console.log(`Студент: ${student.secondName} ${student.firstName}`)
	console.log('Оценки:')
	student.marks.forEach(mark => {
		console.log(` ${mark.subject} - ${mark.mark}`)
	})
}
printStudentInfo(student)
