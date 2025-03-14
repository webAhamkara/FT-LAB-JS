class Student {
	constructor(name, group) {
		this.name = name
		this.group = group
		Student.allGroups.add(group)
		Student.names.set(name, group)
	}
	static allGroups = new Set()
	static names = new Map()
	static theLargestGroup() {
		const groupCounts = new Map()
		for (const element of Student.names.values()) {
			groupCounts.set(element, (groupCounts.get(element) || 0) + 1)
		}
		const maxCount = Math.max(...groupCounts.values())
		const largestGroups = []
		for (const [element, count] of groupCounts) {
			if (count === maxCount) {
				largestGroups.push(element)
			}
		}
		let string
		if (largestGroups.length === 1) {
			string = `Наибольшая группа: ${largestGroups[0]}. Число обучающихся: ${maxCount}`
		} else {
			string = `Наибольшие группы: ${largestGroups.join(
				', '
			)}. В каждой по ${maxCount} студентов.`
		}
		console.log(string)
	}
}
const students = [
	new Student('Иван', 'Группа 2'),
	new Student('Мария', 'Группа 2'),
	new Student('Алексей', 'Группа 1'),
	new Student('Ольга', 'Группа 1'),
	new Student('Дмитрий', 'Группа 2'),
	new Student('Елена', 'Группа 2'),
	new Student('Ангелина', 'Группа 1'),
	new Student('Андрей', 'Группа 4'),
	new Student('Анна', 'Группа 2'),
	new Student('Артем', 'Группа 1'),
	new Student('Анастасия', 'Группа 3'),
	new Student('Борис', 'Группа 2'),
	new Student('Валентин', 'Группа 1'),
	new Student('Виктория', 'Группа 3'),
	new Student('Глеб', 'Группа 4'),
	new Student('Дарья', 'Группа 2'),
	new Student('Евгений', 'Группа 1'),
	new Student('Екатерина', 'Группа 1'),
	new Student('Захар', 'Группа 2'),
	new Student('Игорь', 'Группа 1'),
	new Student('Инна', 'Группа 3'),
	new Student('Кирилл', 'Группа 4'),
	new Student('Лариса', 'Группа 2'),
	new Student('Максим', 'Группа 1'),
	new Student('Наталья', 'Группа 3'),
	new Student('Олег', 'Группа 2'),
	new Student('Павел', 'Группа 1'),
	new Student('Светлана', 'Группа 3'),
	new Student('Татьяна', 'Группа 4'),
]
Student.theLargestGroup()
