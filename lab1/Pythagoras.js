function greatestCommonDivisor(a, b) {
	// передается пара (m,n) где m > n
	while (b !== 0) {
		let gcd = b
		b = a % b
		a = gcd
	}
	return a
}

function Search(number) {
	let m = 2
	let count = 0
	let result = []
	while (count < number) {
		for (let n = 1; n < m; n++) {
			if (greatestCommonDivisor(m, n) === 1 && m % 2 !== n % 2) {
				let a = m * m - n * n
				let b = 2 * m * n
				let c = m * m + n * n
				result.push([a, b, c]) //примитивные
				count++
				for (let i = 2; i < 100; i++) {
					let a1 = i * a
					let b1 = i * b
					let c1 = i * c
					result.push([a1, b1, c1]) //кратные, т.е. не примитивные
				}
				if (count >= number) {
					break
				}
			}
		}
		m++
	}
	result.sort((x, y) => {
		if (x[2] !== y[2]) {
			return x[2] - y[2]
		} else {
			return x[0] - y[0]
		}
	})
	let output = result
		.slice(0, number)
		.map((triplet, index) => `${index + 1}) (${triplet.join(', ')})`)
		.join('<br>')
	return output
}
document.getElementById('submitButton').addEventListener('click', function () {
	const userInput = parseInt(document.getElementById('userInput').value)
	const result = Search(userInput)
	document.getElementById('result').innerHTML = result
})
document.getElementById('userInput').addEventListener('focus', function () {
	this.removeAttribute('placeholder') //this ссылается на элемент, который вызвал событие (в данном случае, это элемент userInput).
})
document.getElementById('userInput').addEventListener('blur', function () {
	if (!this.value) {
		this.setAttribute('placeholder', 'Введите значение')
	}
})
