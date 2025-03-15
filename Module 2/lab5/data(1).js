function arraySum(arr) {
	let minValue = arr[0]
	let minIndex = 0
	let sum = 0
	for (let i = 1; i < arr.length; i++) {
		if (arr[i] < minValue) {
			minValue = arr[i]
			minIndex = i
		}
	}
	for (let j = 0; j < minIndex; j++) {
		sum += arr[j]
	}
	console.log(
		`Минимальный элемент под индексом ${minIndex}: ${minValue}.
Сумма элементов, расположенных до минимального элемента равна: ${sum}. `
	)
	return sum
}
arraySum([
	12.34, 56.78, 90.123, 45.67, 8.901, 23.456, 76.54, 98.765, 32.109, 55.432,
	11.223, 65.789, 43.21, 27.891, 81.234,
])
