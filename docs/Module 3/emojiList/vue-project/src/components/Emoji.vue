<script setup>
import { computed } from 'vue'

const props = defineProps({
  emoji: {
    type: Object,
    required: true,
  },
  isSelected: {
    type: Boolean,
    default: false,
  },
})
const emojiSymbol = computed(() => {
  const codePoint = props.emoji.unicode[0].replace('U+', '').trim()
  return String.fromCodePoint(parseInt(codePoint, 16))
})

const emit = defineEmits(['submit-form'])
const sendData = () => {
  emit('submit-form', props.emoji.name)
}
</script>

<template>
  <span class="emoji" @click="sendData" :class="{ selected: isSelected }">{{ emojiSymbol }}</span>
</template>
<style scoped>
.emoji {
  display: block;
  cursor: pointer;
  font-size: 80px;
}
.selected {
  border: 1px solid black;
}
</style>
