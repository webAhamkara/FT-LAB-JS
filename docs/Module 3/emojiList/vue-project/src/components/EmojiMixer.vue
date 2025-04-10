<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  firstEmoji: Object,
  secondEmoji: Object,
})

const showModal = ref(false)

const kitchenEmoji = computed(() => {
  if (props.firstEmoji && props.secondEmoji) {
    const unicodeFirst = props.firstEmoji.unicode[0].replace('U+', '').toLowerCase()
    const unicodeSecond = props.secondEmoji.unicode[0].replace('U+', '').toLowerCase()
    return `https://emk.vercel.app/s/${unicodeFirst}_${unicodeSecond}?size=550`
  }
  return null
})

const openModal = () => {
  if (kitchenEmoji.value) {
    showModal.value = true
  }
}

const closeModal = () => {
  showModal.value = false
}
</script>

<template>
  <div>
    <button class="mix-button" @click="openModal" :disabled="!kitchenEmoji">Смешать смайлы</button>
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <img v-if="kitchenEmoji" :src="kitchenEmoji" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.emoji-container {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
}
.mix-button {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 1000;
}

.mix-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
