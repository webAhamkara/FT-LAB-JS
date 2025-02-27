function shellSort(arr) {
	let gap = Math.floor(arr.length / 2)

	while (gap > 0) {
		for (let i = gap; i < arr.length; i++) {
			const temp = arr[i]
			let j = i
			while (j >= gap && temp < arr[j - gap]) {
				arr[j] = arr[j - gap]
				j -= gap
			}
			arr[j] = temp
		}
		gap = Math.floor(gap / 2)
	}
	return arr
}
const arr = [15, -4, 25, 0, 93, 67, 23, 100, -1]
const sortedArr = shellSort(arr)
console.log(sortedArr)
