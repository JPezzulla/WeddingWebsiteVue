import { ref, onMounted, onUnmounted } from 'vue'

export function useKonamiCode(callback: () => void) {
  const konamiCode = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a',
    'Enter', // "Start" is typically Enter
  ]

  const userInput = ref<string[]>([])

  const handleKeyPress = (event: KeyboardEvent) => {
    const key = event.key

    userInput.value.push(key)

    // Keep only the last inputs equal to the length of the konami code
    if (userInput.value.length > konamiCode.length) {
      userInput.value.shift()
    }

    // Check if the current sequence matches the konami code
    const match = konamiCode.every((code, index) => code === userInput.value[index])

    if (match) {
      callback()
      userInput.value = [] // Reset after successful match
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeyPress)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyPress)
  })
}
