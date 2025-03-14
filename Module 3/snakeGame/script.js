const boardSize = 10
const gameBoard = document.getElementById('game-board')
const cells = []
const toggleButtonOne = document.getElementById('joystick')
const toggleButtonTwo = document.getElementById('counter')
const speedInput = document.getElementById('speed')

let snake = [{ x: 0, y: 0 }]
let food = { x: 5, y: 5 }
let direction = 'right'
let speed = 600

function initializeGameBoard() {
	for (let row = 0; row < boardSize; row++) {
		for (let col = 0; col < boardSize; col++) {
			const cell = document.createElement('div')
			cell.className = 'cell'
			cells.push(cell)
			gameBoard.appendChild(cell)
		}
	}
}

function render() {
	cells.forEach(cell => cell.classList.remove('snake', 'food'))

	snake.forEach(segment => {
		const index = segment.x + segment.y * boardSize
		cells[index].classList.add('snake')
	})

	const foodIndex = food.x + food.y * boardSize
	cells[foodIndex].classList.add('food')
}

function update() {
	const head = Object.assign({}, snake[0])

	switch (direction) {
		case 'up':
			head.y -= 1
			break
		case 'down':
			head.y += 1
			break
		case 'left':
			head.x -= 1
			break
		case 'right':
			head.x += 1
			break
	}

	if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize) {
		resetGame()
		return
	}

	if (isCollisionWithSelf(head)) {
		resetGame()
		return
	}

	if (head.x === food.x && head.y === food.y) {
		snake.unshift(head)
		generateFood()
	} else {
		snake.pop()
		snake.unshift(head)
	}
}

function isCollisionWithSelf(head) {
	return snake
		.slice(1)
		.some(segment => segment.x === head.x && segment.y === head.y)
}

function generateFood() {
	food = {
		x: Math.floor(Math.random() * boardSize),
		y: Math.floor(Math.random() * boardSize),
	}
}

function resetGame() {
	snake = [{ x: 0, y: 0 }]
	direction = 'right'
	generateFood()
	updateScore(snake.length)
}

initializeGameBoard()

function gameLoop() {
	update()
	render()
	updateScore(snake.length)
	setTimeout(gameLoop, speed)
}
document.addEventListener('keydown', function (e) {
	if (e.key === 'ArrowLeft') direction = 'left'
	if (e.key === 'ArrowUp') direction = 'up'
	if (e.key === 'ArrowRight') direction = 'right'
	if (e.key === 'ArrowDown') direction = 'down'
	if (e.code === 'KeyR') resetGame()
})

document
	.getElementById('up')
	.addEventListener('click', () => (direction = 'up'))
document
	.getElementById('right')
	.addEventListener('click', () => (direction = 'right'))
document
	.getElementById('down')
	.addEventListener('click', () => (direction = 'down'))
document
	.getElementById('left')
	.addEventListener('click', () => (direction = 'left'))

toggleButtonOne.addEventListener('click', () => {
	const toggle = document.querySelector('.joystick')
	if (toggle.classList.contains('active')) {
		toggle.classList.remove('active')
	} else {
		toggle.classList.add('active')
	}
})
toggleButtonTwo.addEventListener('click', () => {
	const toggle = document.querySelector('.score')
	if (toggle.classList.contains('active')) {
		toggle.classList.remove('active')
	} else {
		toggle.classList.add('active')
	}
})

function updateScore(score) {
	const counter = document.querySelector('.score')
	counter.textContent = score
}

speedInput.addEventListener('change', () => {
	const newSpeed = parseInt(speedInput.value, 10)

	if (!isNaN(newSpeed) && newSpeed > 0 && newSpeed <= 2000) {
		speed = newSpeed
	} else {
		alert('Пожалуйста, введите корректное значение скорости (от 1 до 2000 мс).')
	}
})

updateScore(snake.length)
gameLoop()
