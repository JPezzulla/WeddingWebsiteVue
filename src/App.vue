<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import SnakeGame from './components/SnakeGame.vue'
import PasswordGate from './components/PasswordGate.vue'
import { useKonamiCode } from './composables/useKonamiCode'
import { useAuth } from './composables/useAuth'

const showSnakeGame = ref(false)
const { isAuthenticated, checkAuth } = useAuth()

// Check authentication on app mount
onMounted(() => {
  checkAuth()
})

useKonamiCode(() => {
  showSnakeGame.value = true
})

const closeSnakeGame = () => {
  showSnakeGame.value = false
}
</script>

<template>
  <!-- Show password gate if not authenticated -->
  <PasswordGate v-if="!isAuthenticated" />

  <!-- Show main site if authenticated -->
  <template v-else>
    <Header />
    <main class="main-content">
      <RouterView />
    </main>
    <Footer />

    <!-- Konami Code Easter Egg -->
    <Teleport to="body">
      <SnakeGame v-if="showSnakeGame" @close="closeSnakeGame" />
    </Teleport>
  </template>
</template>

<style scoped>
.main-content {
  /* Add padding-top to account for fixed header */
  padding-top: 90px;
  min-height: calc(100vh - 200px);
}
</style>
