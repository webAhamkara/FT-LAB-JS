function counter(arr) {
	const map1 = new Map()
	arr.forEach(element => {
		if (map1.has(element)) {
			map1.set(element, map1.get(element) + 1)
		} else {
			map1.set(element, 1)
		}
	})
	console.log(map1)
}
const array = [3, 8, 23, 4, 4, 8]
counter(array)
