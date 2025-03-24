let tasks = []
const priorityWindow = $('#priority-window')
const customWindow = $('#customWindow')
const confirm = $('#Confirm')
let resolvePriorityPromise = null
let editIndex = -1

function showPriorityWindow() {
	priorityWindow.show()
	return new Promise(resolve => {
		resolvePriorityPromise = resolve
	})
}

$('.priority-low').on('click', () => handlePriorityChoice('low'))
$('.priority-medium').on('click', () => handlePriorityChoice('medium'))
$('.priority-high').on('click', () => handlePriorityChoice('high'))

function handlePriorityChoice(priority) {
	priorityWindow.hide()
	if (resolvePriorityPromise) {
		resolvePriorityPromise(priority)
		resolvePriorityPromise = null
	}
}

function saveTasks() {
	localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTasks() {
	// Очищаем все колонки
	$('.column__first, .column__second, .column__third').empty()

	tasks.forEach((task, index) => {
		const listItem = $(
			`<li class="todo-item ${task.priority} ${
				task.completed ? 'completed' : ''
			}" data-index="${index}">
                <span>${task.text}</span>
                <div class="delete"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.5305 9.99595L19.0623 5.46883C20.3126 4.22108 20.3126 2.18956 19.0623 0.941811C17.8103 -0.313937 15.7817 -0.313937 14.5305 0.941811L9.99961 5.46883L5.46868 0.941811C4.21835 -0.313937 2.18967 -0.313937 0.937744 0.941811C-0.312582 2.18956 -0.312581 4.22108 0.937744 5.46883L5.46868 9.99595L0.937744 14.5311C-0.312581 15.7788 -0.312581 17.8104 0.937744 19.0582C2.18967 20.3139 4.21835 20.3139 5.46868 19.0582L9.99961 14.5311L14.5305 19.0582C15.7817 20.3139 17.8103 20.3139 19.0623 19.0582C20.3126 17.8104 20.3126 15.7788 19.0623 14.5311L14.5305 9.99595Z" fill="red"/></svg></div>
                <div class="edit"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.5" d="M16.3739 6.26097C17.6536 4.98121 17.6536 2.90632 16.3739 1.62657C15.0941 0.346809 13.0192 0.346809 11.7395 1.62657L11.0003 2.36577C11.0104 2.39633 11.0209 2.42732 11.0318 2.45871C11.3027 3.23967 11.814 4.26342 12.7756 5.2251C13.7373 6.18677 14.7611 6.69799 15.5421 6.96893C15.5733 6.97977 15.6041 6.99022 15.6346 7.0003L16.3739 6.26097Z" fill="#1C274C"/><path d="M11.0322 2.33325L11.0004 2.36508C11.0104 2.39564 11.0209 2.42664 11.0319 2.45803C11.3028 3.23898 11.814 4.26274 12.7757 5.22442C13.7374 6.18609 14.7611 6.6973 15.5421 6.96824C15.573 6.97899 15.6036 6.98936 15.6339 6.99936L8.5001 14.1331C8.01919 14.614 7.7786 14.8545 7.51352 15.0613C7.2007 15.3053 6.86226 15.5145 6.50417 15.6852C6.2006 15.8298 5.87794 15.9373 5.23267 16.1524L1.82989 17.2868C1.51234 17.3926 1.16224 17.3099 0.925545 17.0733C0.688853 16.8365 0.606211 16.4864 0.712061 16.1689L1.84632 12.7661C2.06142 12.1208 2.16896 11.7982 2.31364 11.4946C2.4843 11.1365 2.69346 10.7981 2.93744 10.4853C3.14424 10.2202 3.38473 9.97967 3.86564 9.49875L11.0322 2.33325Z" fill="#1C274C"/></svg></div>
            </li>`
		)

		// Определяем целевую колонку
		const column =
			{
				low: '.column__first',
				medium: '.column__second',
				high: '.column__third',
			}[task.priority] || '.column__first'

		// Добавляем в соответствующую колонку
		$(column).append(listItem)

		// Обработчики событий
		listItem.on('click', function (e) {
			if (!$(e.target).closest('.delete, .edit').length) {
				const index = $(this).data('index')
				tasks[index].completed = !tasks[index].completed
				saveTasks()
				renderTasks()
			}
		})

		listItem.find('.delete').on('click', function (e) {
			e.stopPropagation()
			const index = $(this).closest('.todo-item').data('index')
			tasks.splice(index, 1)
			saveTasks()
			renderTasks()
			customWindow.hide()
		})

		listItem.find('.edit').on('click', function (e) {
			e.stopPropagation()
			editIndex = $(this).closest('.todo-item').data('index')
			const text = $(this).closest('.todo-item').find('span').text()
			$('#customInput').val(text)
			customWindow.show()
		})
	})
}

function loadTasks() {
	const savedTasks = localStorage.getItem('tasks')
	if (savedTasks) {
		tasks = JSON.parse(savedTasks)
		renderTasks()
	}
}

async function addTask() {
	const priority = await showPriorityWindow()
	const newTask = $('#new-task').val()
	if (newTask.trim() !== '') {
		tasks.push({ text: newTask, completed: false, priority: priority })
		saveTasks()
		renderTasks()
		$('#new-task').val('')
	}
}

confirm.on('click', function () {
	const text = $('#customInput').val()
	if (text.trim() !== '' && editIndex !== -1) {
		tasks[editIndex].text = text
		saveTasks()
		renderTasks()
		editIndex = -1
	}
	customWindow.hide()
})

$('form').on('submit', function (e) {
	e.preventDefault()
	addTask()
})

loadTasks()
