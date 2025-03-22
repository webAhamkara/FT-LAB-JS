const students = [
	{ name: 'Иван', lastName: 'Иванов' },
	{ name: 'Мария', lastName: 'Петрова' },
	{ name: 'Алексей', lastName: 'Сидоров' },
	{ name: 'Ольга', lastName: 'Кузнецова' },
	{ name: 'Дмитрий', lastName: 'Смирнов' },
	{ name: 'Елена', lastName: 'Васильева' },
	{ name: 'Ангелина', lastName: 'Попова' },
	{ name: 'Андрей', lastName: 'Новиков' },
	{ name: 'Анна', lastName: 'Морозова' },
	{ name: 'Артем', lastName: 'Волков' },
	{ name: 'Анастасия', lastName: 'Соколова' },
	{ name: 'Борис', lastName: 'Лебедев' },
	{ name: 'Валентин', lastName: 'Козлов' },
	{ name: 'Виктория', lastName: 'Егорова' },
	{ name: 'Глеб', lastName: 'Павлов' },
	{ name: 'Дарья', lastName: 'Семенова' },
	{ name: 'Евгений', lastName: 'Голубев' },
	{ name: 'Екатерина', lastName: 'Виноградова' },
	{ name: 'Захар', lastName: 'Богданов' },
	{ name: 'Игорь', lastName: 'Воробьев' },
	{ name: 'Инна', lastName: 'Федорова' },
	{ name: 'Кирилл', lastName: 'Михайлов' },
	{ name: 'Лариса', lastName: 'Беляева' },
	{ name: 'Максим', lastName: 'Тарасов' },
	{ name: 'Наталья', lastName: 'Белова' },
	{ name: 'Олег', lastName: 'Комаров' },
	{ name: 'Павел', lastName: 'Орлов' },
	{ name: 'Светлана', lastName: 'Киселева' },
	{ name: 'Татьяна', lastName: 'Макарова' },
]
students.sort((a, b) => {
	if (a.lastName > b.lastName) return 1
	if (a.lastName < b.lastName) return -1
	if (a.name > b.name) return 1
	if (a.name < b.name) return -1
	return 0
})
students.forEach((element, index) => {
	console.log(`${index})${element.name} ${element.lastName}`)
})
console.log(binarySearch(students, 'Олег', 'Комаров'))
function binarySearch(arrayOfStudents, name, lastName) {
	let left = 0
	let right = arrayOfStudents.length - 1
	while (left <= right) {
		const middle = Math.floor((left + right) / 2)
		if (
			arrayOfStudents[middle].name === name &&
			arrayOfStudents[middle].lastName === lastName
		) {
			return middle
		}
		if (
			arrayOfStudents[middle].lastName < lastName ||
			(arrayOfStudents[middle].lastName === lastName &&
				arrayOfStudents[middle].name < name)
		) {
			left = middle + 1
		} else {
			right = middle - 1
		}
	}
	return -1
}
