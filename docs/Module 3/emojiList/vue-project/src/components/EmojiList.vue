<script setup>
import Emoji from './Emoji.vue'

const props = defineProps({
  emojis: Array,
  position: String,
  selectedEmoji: String,
})
const emit = defineEmits(['submit-form'])
</script>

<template>
  <div class="emojis">
    <Emoji
      v-for="(emoji, index) in emojis"
      :key="`${emoji.unicode[0]}-${index}`"
      :emoji="emoji"
      :isSelected="emoji.name === selectedEmoji"
      @submit-form="(name) => $emit('submit-form', name, props.position)"
    />
  </div>
</template>
