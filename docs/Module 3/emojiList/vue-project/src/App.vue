<script setup>
import { ref, onMounted, computed } from 'vue'
import { useEmoji } from './composables/useEmoji'
import EmojiList from './components/EmojiList.vue'
import EmojiMixer from './components/EmojiMixer.vue'

const { emojis, fetchEmojis } = useEmoji()

onMounted(() => {
  fetchEmojis()
}) //тут наш пустой массив emojis заполняется данными
// Опишу жизненный цикл:
// App.vue->EmojiList: 1. Первый рендер (пустой массив)
//App.vue->API: 2. Запрос данных (onMounted)
//API-->App.vue: 3. Данные получены
//App.vue->EmojiList: 4. Передаёт обновлённый массив
//EmojiList->Emoji: 5. Рендер элементов
const selectedSmiles = ref([null, null])
const handleEmojiSelect = (name, position) => {
  const index = position === 'left' ? 0 : 1
  selectedSmiles.value[index] = name
}
const firstSelectedEmoji = computed(() => {
  return emojis.value.find((emoji) => emoji.name === selectedSmiles.value[0])
})

const secondSelectedEmoji = computed(() => {
  return emojis.value.find((emoji) => emoji.name === selectedSmiles.value[1])
})
</script>
<template>
  <div class="mainContent">
    <EmojiList
      :emojis="emojis"
      position="left"
      :selectedEmoji="selectedSmiles[0]"
      @submit-form="handleEmojiSelect"
    />
    <EmojiList
      :emojis="emojis"
      position="right"
      :selectedEmoji="selectedSmiles[1]"
      @submit-form="handleEmojiSelect"
    />
  </div>
  <EmojiMixer :firstEmoji="firstSelectedEmoji" :secondEmoji="secondSelectedEmoji" />
</template>

<style scoped>
.mainContent {
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-left: 5px;
}
.mainContent::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 2px;
  height: 101%;
  background: #090909;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-left: -5px;
}
.emojis {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}
</style>
