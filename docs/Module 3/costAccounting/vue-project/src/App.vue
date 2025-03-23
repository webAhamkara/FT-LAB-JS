<template>
  <div class="mainBlock">
    <div class="counter">
      <div class="counter-item">
        <span>Доходы</span>
        <input type="text" disabled :value="incomeBalance" />
      </div>
      <div class="counter-item">
        <span>Расходы</span>
        <input type="text" disabled :value="outcomeBalance" />
      </div>
      <div class="counter-item">
        <span>Баланс</span>
        <input type="text" disabled :value="totalBalance" />
      </div>
    </div>
    <input type="text" placeholder="Название статьи" v-model="text" @keyup.enter="article" />
    <input type="number" placeholder="Сумма" v-model="amount" @keyup.enter="article" />
    <button @click="article()">Добавить</button>
  </div>
  <div v-if="history.length == 0" class="default">Вы не совершали финансовых операций</div>
  <div v-for="el in history" :key="el.id" :class="getArticleClass(el)">
    <p>{{ el.articleText }}</p>
    <p>{{ el.articleAmount }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const history = ref([])
const text = ref('')
const amount = ref('')
const id = ref(0)
const incomeBalance = computed(() =>
  history.value.reduce((acc, el) => {
    const num = parseFloat(el.articleAmount) || 0
    return num > 0 ? acc + num : acc
  }, 0),
)
const outcomeBalance = computed(() =>
  history.value.reduce((acc, el) => {
    const num = parseFloat(el.articleAmount) || 0
    return num < 0 ? acc + Math.abs(num) : acc
  }, 0),
)
const totalBalance = computed(() => incomeBalance.value - outcomeBalance.value)
function article() {
  const amountValue = parseFloat(amount.value)
  if (isNaN(amountValue)) {
    alert('Пожалуйста, введите корректную сумму')
    amount.value = ''
    return
  }
  if (text.value.length == 0) {
    alert('Пожалуйста, введите название статьи')
    return
  }
  history.value.push({
    articleText: text.value,
    articleAmount: amount.value,
    id: id.value++,
  })
  text.value = ''
  amount.value = ''
}
function getArticleClass(el) {
  const amount = parseFloat(el.articleAmount)
  return {
    articlePlus: amount > 0,
    articleMinus: amount < 0,
  }
}
</script>

<style scoped>
.mainBlock,
.mainBlock input,
.mainBlock button,
.mainBlock input::placeholder,
.default,
.articlePlus,
.articleMinus {
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Open Sans',
    'Helvetica Neue',
    sans-serif;
}
.mainBlock {
  position: relative;
  width: 500px;
  height: 200px;
  background-color: rgb(210, 179, 112);
  display: flex;
  top: 0;
  border: 5px solid rgb(216, 156, 36);
  flex-wrap: wrap;
}
.mainBlock,
.articleMinus,
.articlePlus,
.counter {
  justify-content: space-around;
  justify-self: center;
  margin: 0;
  padding: 0;
  border-radius: 10px;
}
.mainBlock input {
  margin-top: 30px;
  width: 190px;
  height: 60px;
  border: none;
  border-radius: 5px;
  background-color: rgb(227, 225, 184);
  display: flex;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  line-height: 60px;
}
.mainBlock input:focus {
  outline: none;
}
.mainBlock input::placeholder {
  font-size: 22px;
  text-align: center;
}
.mainBlock button {
  position: relative;
  width: 190px;
  height: 60px;
  border: none;
  border-radius: 5px;
  font-size: 25px;
  font-weight: bold;
  color: rgb(96, 96, 96);
  background-color: rgb(157, 215, 98);
}
.mainBlock button:active {
  scale: 1.05;
}
.mainBlock button:hover {
  border: 3px solid rgb(77, 77, 77);
}
.articlePlus,
.articleMinus {
  position: relative;
  width: 500px;
  height: 100px;
  display: flex;
  text-align: center;
  line-height: 50px;
  margin-top: 15px;
  font-size: 25px;
  font-weight: bold;
}
.articlePlus {
  background-color: rgb(76, 188, 46);
  border: 5px solid rgb(83, 83, 83);
}
.articleMinus {
  background-color: rgb(188, 67, 46);
  border: 5px solid rgb(83, 83, 83);
}
.default {
  width: 500px;
  height: 80px;
  background-color: rgb(170, 209, 234);
  border: 5px solid rgb(68, 68, 68);
  font-size: 23px;
  display: flex;
  justify-self: center;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  border-radius: 10px;
  color: rgb(32, 32, 32);
  font-weight: bold;
}
.counter {
  width: 300px;
  height: auto;
  padding: 15px 0;
  background-color: rgb(210, 179, 112);
  position: absolute;
  left: 110%;
  top: -5px;
  border: 5px solid rgb(216, 156, 36);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.counter-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 2px;
  width: 100%;
}

.counter-item span {
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 3px;
  width: 100%;
  text-align: center;
}

.counter input {
  background-color: rgb(237, 221, 140);
  width: 180px;
  height: 50px;
  font-size: 18px;
  margin-top: 5px !important;
  border-radius: 5px;
}
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
