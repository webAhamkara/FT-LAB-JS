function twoArray(arr1, arr2) {
	const set1 = new Set(arr1)
	const elements = new Set()
	arr2.forEach(item => {
		if (set1.has(item)) {
			elements.add(item)
		}
	})
	console.log(`Полученный массив: ${Array.from(elements)}`)
}
const array1 = [4, 3, 6, 7, 12, 45, 94]
const array2 = [62, 12, 55, 39, 3, 4, 11, 12]
twoArray(array1, array2)
