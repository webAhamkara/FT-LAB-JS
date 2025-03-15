//1
function multiplication(a, b, c) {
	console.log(Math.max(a * b, a * c, b * c))
}
multiplication(5, 9, 9)
//2
function soldier(name, rank = 'Рядовой') {
	console.log(`${name} ваше звание: ${rank}`)
}
soldier('Евлампий', 'Генерал')
//3
function callFunction(func, a, b) {
	return func(a, b)
}
const residue = function greatestCommonDivisor(a, b) {
	while (b !== 0) {
		let gcd = b
		b = a % b
		a = gcd
	}
	return a
}
const result = callFunction(residue, 200, 148)
console.log(result)
//4
function degree(a, b) {
	if (!Number.isInteger(a) || !Number.isInteger(b)) return
	const powerA = a % 2 === 0 ? x => x * x : x => x * x * x
	const powerB = b % 2 === 0 ? y => y * y : y => y * y * y
	console.log(powerA(a) + ', ' + powerB(b))
}
degree(4, 7)
//5
function factorial(n) {
	if (n === 0) {
		return 1
	} else {
		return n * factorial(n - 1)
	}
}
console.log(factorial(10))
