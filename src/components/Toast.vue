<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Props {
  message: string
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  duration: 30000,
})

const emit = defineEmits<{
  close: []
}>()

const visible = ref(false)

onMounted(() => {
  // Slide in animation
  setTimeout(() => {
    visible.value = true
  }, 100)

  // Auto-close after duration
  setTimeout(() => {
    close()
  }, props.duration)
})

const close = () => {
  visible.value = false
  setTimeout(() => {
    emit('close')
  }, 300) // Wait for fade-out animation
}
</script>

<template>
  <div class="toast" :class="{ visible }">
    <p>{{ message }}</p>
    <button class="close-btn" @click="close" aria-label="Close notification">×</button>
  </div>
</template>

<style scoped>
.toast {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: linear-gradient(135deg, var(--sage-green) 0%, var(--sage-dark) 100%);
  color: var(--cream);
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 350px;
  z-index: 9999;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;
}

.toast.visible {
  opacity: 1;
  transform: translateY(0);
}

.toast p {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.4;
  color: white;
}

.close-btn {
  background: transparent;
  border: none;
  color: var(--cream);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
  transition: opacity 0.2s ease;
  flex-shrink: 0;
}

.close-btn:hover {
  opacity: 1;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .toast {
    bottom: 1rem;
    right: 1rem;
    left: 1rem;
    max-width: none;
  }
}
</style>
