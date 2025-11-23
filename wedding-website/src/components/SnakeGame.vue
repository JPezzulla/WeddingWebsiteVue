<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const emit = defineEmits<{
  close: []
}>()

// Game configuration
const GRID_SIZE = 20
const CELL_SIZE = 30 // Increased from 20 for better visibility
const INITIAL_SPEED = 150

// Game state
const snake = ref<{ x: number; y: number }[]>([{ x: 10, y: 10 }])
const food = ref({ x: 15, y: 15 })
const foodType = ref<'fish' | 'catfood' | 'chicken'>('fish')
const direction = ref({ x: 1, y: 0 })
const nextDirection = ref({ x: 1, y: 0 })
const score = ref(0)
const gameOver = ref(false)
const gameStarted = ref(false)
const gameInterval = ref<number | null>(null)
const catType = ref<'tuxedo' | 'tabby'>(Math.random() > 0.5 ? 'tuxedo' : 'tabby')

const canvasSize = computed(() => GRID_SIZE * CELL_SIZE)

// Calculate direction for each segment
const getSegmentDirection = (index: number) => {
  if (index === 0) {
    // Head uses current direction
    return direction.value
  }

  // Body/tail segments: direction is from current to previous segment
  const current = snake.value[index]
  const previous = snake.value[index - 1]

  return {
    x: previous.x - current.x,
    y: previous.y - current.y
  }
}

// Get rotation angle based on direction
const getRotationAngle = (dir: { x: number, y: number }) => {
  if (dir.x === 1 && dir.y === 0) return 0    // Right
  if (dir.x === -1 && dir.y === 0) return 180 // Left
  if (dir.x === 0 && dir.y === 1) return 90   // Down
  if (dir.x === 0 && dir.y === -1) return 270 // Up
  return 0
}

// Generate random food position
const generateFood = () => {
  let newFood: { x: number; y: number }
  do {
    newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    }
  } while (snake.value.some((segment) => segment.x === newFood.x && segment.y === newFood.y))

  food.value = newFood

  // Rotate food type
  const foodTypes: ('fish' | 'catfood' | 'chicken')[] = ['fish', 'catfood', 'chicken']
  const currentIndex = foodTypes.indexOf(foodType.value)
  foodType.value = foodTypes[(currentIndex + 1) % foodTypes.length]
}

// Handle keyboard input
const handleKeyPress = (event: KeyboardEvent) => {
  if (!gameStarted.value && !gameOver.value) {
    gameStarted.value = true
    startGame()
  }

  if (gameOver.value && event.key === 'Enter') {
    resetGame()
    return
  }

  switch (event.key) {
    case 'ArrowUp':
      if (direction.value.y === 0) nextDirection.value = { x: 0, y: -1 }
      event.preventDefault()
      break
    case 'ArrowDown':
      if (direction.value.y === 0) nextDirection.value = { x: 0, y: 1 }
      event.preventDefault()
      break
    case 'ArrowLeft':
      if (direction.value.x === 0) nextDirection.value = { x: -1, y: 0 }
      event.preventDefault()
      break
    case 'ArrowRight':
      if (direction.value.x === 0) nextDirection.value = { x: 1, y: 0 }
      event.preventDefault()
      break
  }
}

// Game loop
const gameLoop = () => {
  if (gameOver.value) return

  direction.value = nextDirection.value

  const head = snake.value[0]
  const newHead = {
    x: head.x + direction.value.x,
    y: head.y + direction.value.y,
  }

  // Check collision with walls
  if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
    gameOver.value = true
    return
  }

  // Check collision with self
  if (snake.value.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
    gameOver.value = true
    return
  }

  snake.value.unshift(newHead)

  // Check if food is eaten
  if (newHead.x === food.value.x && newHead.y === food.value.y) {
    score.value++
    generateFood()
  } else {
    snake.value.pop()
  }
}

const startGame = () => {
  if (gameInterval.value) clearInterval(gameInterval.value)
  gameInterval.value = window.setInterval(gameLoop, INITIAL_SPEED)
}

const resetGame = () => {
  snake.value = [{ x: 10, y: 10 }]
  direction.value = { x: 1, y: 0 }
  nextDirection.value = { x: 1, y: 0 }
  score.value = 0
  gameOver.value = false
  gameStarted.value = false
  catType.value = Math.random() > 0.5 ? 'tuxedo' : 'tabby'
  generateFood()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyPress)
  generateFood()
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress)
  if (gameInterval.value) clearInterval(gameInterval.value)
})
</script>

<template>
  <div class="modal-overlay" @click="emit('close')">
    <div class="modal-content" @click.stop>
      <button class="close-btn" @click="emit('close')">&times;</button>

      <div class="game-header">
        <div>Dinner Time for Cats!</div>
        <p class="score">Score: {{ score }}</p>
      </div>

      <div class="game-canvas-container">
        <svg
          :width="canvasSize"
          :height="canvasSize"
          class="game-canvas"
          :class="{ 'game-over': gameOver }"
        >
          <!-- Grid background -->
          <rect :width="canvasSize" :height="canvasSize" fill="var(--cream)" />

          <!-- Food -->
          <g :transform="`translate(${food.x * CELL_SIZE}, ${food.y * CELL_SIZE})`">
            <!-- Fish -->
            <g v-if="foodType === 'fish'">
              <ellipse cx="15" cy="15" rx="11" ry="6" fill="#ff9a56" />
              <path d="M 4 15 L 0 11 L 0 19 Z" fill="#ff9a56" />
              <circle cx="20" cy="13" r="2" fill="#333" />
              <path d="M 12 12 L 18 9 M 12 18 L 18 21" stroke="#d67d3e" stroke-width="1.5" />
              <ellipse cx="15" cy="15" rx="8" ry="4" fill="#ffb380" opacity="0.5" />
            </g>

            <!-- Cat Food Can -->
            <g v-if="foodType === 'catfood'">
              <!-- Can body -->
              <rect x="5" y="8" width="20" height="14" fill="#e5d4a6" rx="2" stroke="#c9a961" stroke-width="2" />
              <!-- Top label -->
              <rect x="5" y="8" width="20" height="4" fill="#c9a961" />
              <!-- Cat food inside -->
              <ellipse cx="15" cy="16" rx="7" ry="4" fill="#8b6f47" />
              <!-- Shine -->
              <rect x="7" y="10" width="2" height="10" fill="#fff" opacity="0.3" />
              <!-- Label text -->
              <text x="15" y="19" font-size="6" fill="#fff" text-anchor="middle" font-weight="bold">CAT</text>
              <!-- Can ring -->
              <ellipse cx="15" cy="8" rx="10" ry="2" fill="none" stroke="#a88b4f" stroke-width="1" />
            </g>

            <!-- Roasted Chicken -->
            <g v-if="foodType === 'chicken'">
              <!-- Main body -->
              <ellipse cx="15" cy="16" rx="9" ry="7" fill="#d4a574" />
              <!-- Drumsticks -->
              <ellipse cx="10" cy="13" rx="3.5" ry="4.5" fill="#c9935a" />
              <ellipse cx="20" cy="13" rx="3.5" ry="4.5" fill="#c9935a" />
              <!-- Legs -->
              <path d="M 8 21 L 9 26 M 22 21 L 21 26" stroke="#8b6f47" stroke-width="2.5" stroke-linecap="round" />
              <!-- Roasted texture spots -->
              <circle cx="12" cy="15" r="1.2" fill="#8b6f47" />
              <circle cx="18" cy="15" r="1.2" fill="#8b6f47" />
              <circle cx="15" cy="17" r="1" fill="#8b6f47" />
              <!-- Highlight for shine -->
              <ellipse cx="15" cy="14" rx="4" ry="2.5" fill="#e5c89a" opacity="0.6" />
            </g>
          </g>

          <!-- Snake Segments -->
          <g v-for="(segment, index) in snake" :key="index">
            <!-- Determine segment type: head, body, or tail -->
            <g :transform="`translate(${segment.x * CELL_SIZE}, ${segment.y * CELL_SIZE}) rotate(${getRotationAngle(getSegmentDirection(index)) + (index === snake.length - 1 ? 90 : 0)}, 15, 15)`">
              <!-- HEAD (first segment) -->
              <g v-if="index === 0">
                <!-- Tuxedo Cat Head -->
                <g v-if="catType === 'tuxedo'">
                  <!-- Ears (behind head) -->
                  <path d="M 5 8 L 2 0 L 10 5 Z" fill="#2d2d2d" />
                  <path d="M 25 8 L 28 0 L 20 5 Z" fill="#2d2d2d" />
                  <path d="M 5 8 L 3 3 L 8 6 Z" fill="#ffb3ba" />
                  <path d="M 25 8 L 27 3 L 22 6 Z" fill="#ffb3ba" />
                  <!-- Head -->
                  <circle cx="15" cy="15" r="13" fill="#2d2d2d" />
                  <ellipse cx="15" cy="16" rx="8" ry="10" fill="#ffffff" />
                  <circle cx="10" cy="13" r="2.2" fill="#8a9a7b" />
                  <circle cx="20" cy="13" r="2.2" fill="#8a9a7b" />
                  <ellipse cx="15" cy="18" rx="2.5" ry="1.5" fill="#ffb3ba" />
                  <path d="M 15 19 L 12 22 M 15 19 L 18 22" stroke="#2d2d2d" stroke-width="1.2" />
                </g>
                <!-- Tabby Cat Head -->
                <g v-else>
                  <!-- Ears (behind head) -->
                  <path d="M 5 8 L 2 0 L 10 5 Z" fill="#d4a574" />
                  <path d="M 25 8 L 28 0 L 20 5 Z" fill="#d4a574" />
                  <path d="M 5 8 L 3 3 L 8 6 Z" fill="#ffb3ba" />
                  <path d="M 25 8 L 27 3 L 22 6 Z" fill="#ffb3ba" />
                  <!-- Head -->
                  <circle cx="15" cy="15" r="13" fill="#d4a574" />
                  <circle cx="10" cy="13" r="2.2" fill="#6b9b37" />
                  <circle cx="20" cy="13" r="2.2" fill="#6b9b37" />
                  <path d="M 8 8 L 11 5 M 19 8 L 22 5" stroke="#8b6f47" stroke-width="1.5" />
                  <ellipse cx="15" cy="18" rx="2.5" ry="1.5" fill="#ffb3ba" />
                  <path d="M 15 19 L 12 22 M 15 19 L 18 22" stroke="#8b6f47" stroke-width="1.2" />
                </g>
              </g>

              <!-- TAIL (last segment) -->
              <g v-else-if="index === snake.length - 1">
                <!-- Tuxedo Cat Tail -->
                <g v-if="catType === 'tuxedo'">
                  <ellipse cx="15" cy="10" rx="6.5" ry="10" fill="#2d2d2d" />
                  <ellipse cx="11" cy="18" rx="4" ry="5" fill="#2d2d2d" />
                  <ellipse cx="19" cy="18" rx="4" ry="5" fill="#2d2d2d" />
                  <ellipse cx="11" cy="20" rx="2.5" ry="1.5" fill="#ffffff" />
                  <ellipse cx="19" cy="20" rx="2.5" ry="1.5" fill="#ffffff" />
                  <path d="M 15 3 Q 18 -1 22 2" stroke="#2d2d2d" stroke-width="4.5" fill="none" stroke-linecap="round" />
                </g>
                <!-- Tabby Cat Tail -->
                <g v-else>
                  <ellipse cx="15" cy="10" rx="6.5" ry="10" fill="#d4a574" />
                  <ellipse cx="11" cy="18" rx="4" ry="5" fill="#d4a574" />
                  <ellipse cx="19" cy="18" rx="4" ry="5" fill="#d4a574" />
                  <path d="M 15 3 Q 18 -1 22 2" stroke="#d4a574" stroke-width="4.5" fill="none" stroke-linecap="round" />
                  <circle cx="11" cy="13" r="1.5" fill="#8b6f47" opacity="0.6" />
                  <circle cx="19" cy="12" r="1.5" fill="#8b6f47" opacity="0.6" />
                </g>
              </g>

              <!-- BODY (middle segments) -->
              <g v-else>
                <!-- Tuxedo Cat Body -->
                <g v-if="catType === 'tuxedo'">
                  <ellipse cx="15" cy="15" rx="10" ry="13" fill="#2d2d2d" />
                  <ellipse cx="15" cy="16" rx="6.5" ry="10" fill="#ffffff" />
                </g>
                <!-- Tabby Cat Body -->
                <g v-else>
                  <ellipse cx="15" cy="15" rx="10" ry="13" fill="#d4a574" />
                  <circle cx="11" cy="11" r="1.8" fill="#8b6f47" opacity="0.6" />
                  <circle cx="19" cy="12" r="1.5" fill="#8b6f47" opacity="0.6" />
                  <circle cx="15" cy="18" r="1.8" fill="#8b6f47" opacity="0.6" />
                </g>
              </g>
            </g>
          </g>
        </svg>

        <!-- Overlays -->
        <div v-if="!gameStarted && !gameOver" class="game-overlay">
          <p class="overlay-text">Press any arrow key to start</p>
          <p class="instructions">Use arrow keys to control the snake</p>
        </div>

        <div v-if="gameOver" class="game-overlay game-over-overlay">
          <p class="overlay-text">Game Over!</p>
          <p class="final-score">Final Score: {{ score }}</p>
          <p class="instructions">Press Enter to play again</p>
        </div>
      </div>

      <div class="game-info">
        <p>
          <small>
            You're playing as {{ catType === 'tuxedo' ? 'a tuxedo cat' : 'a tabby cat' }}!
            Catch the rotating treats (fish, cat food, and chicken) to grow into a silly long cat.
            Good luck!
          </small>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  backdrop-filter: blur(5px);
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-content {
  background-color: #fff;
  border-radius: 12px;
  padding: 2rem;
  max-width: 750px;
  width: 95%;
  max-height: 95vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;
  display: flex;
  flex-direction: column;
}

@keyframes slideUp {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2rem;
  color: var(--text-light);
  cursor: pointer;
  transition: color 0.3s ease;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  color: var(--ruby-red);
}

.game-header {
  text-align: center;
  margin-bottom: 1rem;
  font-size: 40px;
  flex-shrink: 0;
}

.game-header h2 {
  color: var(--sage-dark);
  margin-bottom: 0.5rem;
}

.score {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--dark-wood);
  margin: 0;
}

.game-canvas-container {
  position: relative;
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-shrink: 0;
}

.game-canvas {
  border: 3px solid var(--sage-dark);
  border-radius: 8px;
  transition: border-color 0.3s ease;
}

.game-canvas.game-over {
  border-color: var(--ruby-red);
}

.game-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  background-color: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.overlay-text {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--sage-dark);
  margin: 0 0 0.5rem 0;
}

.final-score {
  font-size: 1.3rem;
  color: var(--dark-wood);
  margin: 0 0 1rem 0;
}

.instructions {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin: 0;
}

.game-info {
  margin-top: 1rem;
  text-align: center;
  flex-shrink: 0;
}

.game-info p {
  margin: 0 auto;
  color: var(--text-light);
  font-size: 0.85rem;
  font-style: italic;
}

@media (max-width: 768px) {
  .modal-content {
    padding: 1.5rem;
    max-width: 95%;
  }

  .game-header {
    margin-bottom: 0.75rem;
    font-size: 32px;
  }

  .game-info {
    margin-top: 0.75rem;
  }
}

@media (max-width: 650px) {
  .modal-content {
    padding: 1rem;
  }

  .game-canvas-container {
    transform: scale(0.85);
  }

  .game-header {
    font-size: 28px;
  }
}

@media (max-width: 500px) {
  .modal-content {
    padding: 1rem;
  }

  .game-canvas-container {
    transform: scale(0.7);
  }

  .game-header {
    font-size: 24px;
    margin-bottom: 0.5rem;
  }

  .game-info {
    margin-top: 0.5rem;
  }

  .game-info p {
    font-size: 0.75rem;
  }
}
</style>
