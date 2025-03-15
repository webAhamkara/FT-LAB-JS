const tasks = []

function addTask() {
	const newTask = $('#new-task').val()
	if (newTask.trim() !== '') {
		tasks.push({ text: newTask, completed: false })
		const listItem = $('<li class="todo-item"></li>')
		const taskText = $('<span></span>').text(newTask)
		const buttonDelete = $(
			'<div class="delete"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.5305 9.99595L19.0623 5.46883C20.3126 4.22108 20.3126 2.18956 19.0623 0.941811C17.8103 -0.313937 15.7817 -0.313937 14.5305 0.941811L9.99961 5.46883L5.46868 0.941811C4.21835 -0.313937 2.18967 -0.313937 0.937744 0.941811C-0.312582 2.18956 -0.312581 4.22108 0.937744 5.46883L5.46868 9.99595L0.937744 14.5311C-0.312581 15.7788 -0.312581 17.8104 0.937744 19.0582C2.18967 20.3139 4.21835 20.3139 5.46868 19.0582L9.99961 14.5311L14.5305 19.0582C15.7817 20.3139 17.8103 20.3139 19.0623 19.0582C20.3126 17.8104 20.3126 15.7788 19.0623 14.5311L14.5305 9.99595Z" fill="red"/></svg></div>'
		)
		const buttonEdit = $(
			'<div class="edit"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.5" d="M16.3739 6.26097C17.6536 4.98121 17.6536 2.90632 16.3739 1.62657C15.0941 0.346809 13.0192 0.346809 11.7395 1.62657L11.0003 2.36577C11.0104 2.39633 11.0209 2.42732 11.0318 2.45871C11.3027 3.23967 11.814 4.26342 12.7756 5.2251C13.7373 6.18677 14.7611 6.69799 15.5421 6.96893C15.5733 6.97977 15.6041 6.99022 15.6346 7.0003L16.3739 6.26097Z" fill="#1C274C"/><path d="M11.0322 2.33325L11.0004 2.36508C11.0104 2.39564 11.0209 2.42664 11.0319 2.45803C11.3028 3.23898 11.814 4.26274 12.7757 5.22442C13.7374 6.18609 14.7611 6.6973 15.5421 6.96824C15.573 6.97899 15.6036 6.98936 15.6339 6.99936L8.5001 14.1331C8.01919 14.614 7.7786 14.8545 7.51352 15.0613C7.2007 15.3053 6.86226 15.5145 6.50417 15.6852C6.2006 15.8298 5.87794 15.9373 5.23267 16.1524L1.82989 17.2868C1.51234 17.3926 1.16224 17.3099 0.925545 17.0733C0.688853 16.8365 0.606211 16.4864 0.712061 16.1689L1.84632 12.7661C2.06142 12.1208 2.16896 11.7982 2.31364 11.4946C2.4843 11.1365 2.69346 10.7981 2.93744 10.4853C3.14424 10.2202 3.38473 9.97967 3.86564 9.49875L11.0322 2.33325Z" fill="#1C274C"/></svg></div>'
		)
		const customWindow = $('.customWindow')
		const confirm = $('#Confirm')

		buttonDelete.on('click', function (e) {
			const index = $(this).parent().index()
			tasks.splice(index, 1)
			$(this).parent().remove()
		})
		buttonEdit.on('click', function (e) {
			e.stopPropagation()
			const text = $(this).closest('.todo-item').find('span').text()
			$('#customInput').val(text)
			customWindow.show()
		})
		confirm.on('click', function () {
			const text = $('#customInput').val()
			if (text.trim() !== '') {
				const listItem = buttonEdit.closest('.todo-item')
				listItem.find('span').text(text)
			}
			customWindow.hide()
		})

		$(listItem).append(taskText)
		$(listItem).append(buttonDelete)
		$(listItem).append(buttonEdit)

		$(listItem).on('click', function () {
			const index = $(this).index()
			tasks[index].completed = !tasks[index].completed
			$(this).toggleClass('completed')
		})

		$('#todo-list').append(listItem)
		$('#new-task').val('')
	}
}

$('form').on('submit', function (e) {
	e.preventDefault()
	addTask()
})
