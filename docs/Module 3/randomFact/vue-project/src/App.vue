<script setup>
import { ref } from 'vue'

const userText = ref('')
const userChoice = ref('trivia')
const answer = ref(null)
const loading = ref(false)

const choice = event => {
	userChoice.value = event.currentTarget.textContent.trim().toLowerCase()
}

const fetchFact = async () => {
	if (!userText.value) return

	try {
		loading.value = true
		answer.value = null

		const url = `https://numbersapi.p.rapidapi.com/${userText.value}/${userChoice.value}?fragment=true&json=true`

		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'x-rapidapi-key': 'e4f1e73af1msh896ad6f562d93dcp14e5b2jsnc25bcfd40ae5',
				'x-rapidapi-host': 'numbersapi.p.rapidapi.com',
			},
		})

		const responseText = await response.text()

		try {
			const data = JSON.parse(responseText)
			answer.value = {
				text: data.text || `${userText.value} - скучное значение`,
			}
		} catch (e) {
			answer.value = {
				text: responseText || 'Не удалось получить факт',
			}
		}
	} catch (error) {
		console.error('Ошибка запроса:', error)
		answer.value = {
			text: `Ошибка: ${error.message}`,
			type: 'error',
		}
	} finally {
		loading.value = false
	}
}
</script>

<template>
	<div class="mainBlock">
		<div class="mainBlock__section">
			<div class="dropdown">
				<button
					class="dropdown-toggle"
					type="button"
					data-bs-toggle="dropdown"
					aria-expanded="false"
					id="dropdown"
				>
					{{ userChoice || 'Categories' }}
				</button>
				<ul class="dropdown-menu">
					<li
						v-for="category in ['math', 'year', 'trivia']"
						@click="choice($event)"
					>
						<a class="dropdown-item">{{ category }}</a>
					</li>
				</ul>
			</div>
			<input type="text" v-model="userText" @keyup.enter="fetchFact" />
			<button id="confirm" @click="fetchFact">Search</button>
		</div>

		<div class="mainBlock__response">
			<div v-if="loading" class="loading-indicator">
				<div class="spinner"></div>
				Загрузка...
			</div>
			<div v-else-if="answer?.text">
				{{ answer.text }}
			</div>
			<div v-else>
				{{ answer?.type === 'error' ? 'Ошибка загрузки' : '' }}
			</div>
		</div>
	</div>
</template>

<style scoped>
.mainBlock {
	position: relative;
	display: flex;
	flex-direction: column;
	justify-self: center;
	margin: 0;
	padding: 0;
	width: auto;
	height: auto;
}
.mainBlock__section {
	display: flex;
	position: relative;
	align-content: end;
	top: 10px;
}
.mainBlock__section input {
	text-align: center;
	width: 200px;
	height: 40px;
}
.mainBlock__section input:focus {
	outline: none;
}
.mainBlock__section #confirm {
	width: 60px;
	height: 40px;
}
.mainBlock__section #confirm:active {
	transform: scale(1.1);
}
.mainBlock__section #dropdown {
	height: 40px;
	min-width: 100px;
}
.mainBlock__response {
	position: absolute;
	top: 60px;
}
.loading-indicator {
	display: flex;
	align-items: center;
	gap: 8px;
	color: #666;
}
.spinner {
	width: 20px;
	height: 20px;
	border: 3px solid #f3f3f3;
	border-radius: 50%;
	border-top: 3px solid #3498db;
	animation: spin 1s linear infinite;
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
