import { ref } from 'vue'

export function useEmoji() {
  const emojis = ref([])

  const fetchEmojis = async () => {
    const response = await fetch('https://emojihub.yurace.pro/api/all')
    const data = await response.json()

    emojis.value = data.filter(
      (emoji, index, self) => index === self.findIndex((e) => e.unicode[0] === emoji.unicode[0]),
    )
  }

  return {
    emojis,
    fetchEmojis,
  }
}
