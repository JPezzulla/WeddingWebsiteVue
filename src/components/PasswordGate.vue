<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'

const { login } = useAuth()

const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

const handleSubmit = () => {
  isLoading.value = true
  errorMessage.value = ''

  // Small delay for UX
  setTimeout(() => {
    const success = login(password.value)
    if (!success) {
      errorMessage.value = 'Incorrect password. Please try again.'
      password.value = ''
    }
    isLoading.value = false
  }, 300)
}
</script>

<template>
  <div class="password-gate">
    <div class="password-container">
      <div class="password-card">
        <div class="header-section">
          <h1 class="couple-names">Joseph & Kaitlyn</h1>
          <div class="divider"></div>
          <p class="wedding-date">October 17th, 2026</p>
        </div>

        <div class="form-section">
          <h2>Welcome!</h2>
          <p class="instructions">Please enter the password to view our wedding website.</p>

          <form @submit.prevent="handleSubmit">
            <div class="input-group">
              <input
                v-model="password"
                type="password"
                placeholder="Enter Password"
                class="password-input"
                :disabled="isLoading"
                autocomplete="off"
              />
              <button type="submit" class="btn btn-primary" :disabled="isLoading || !password">
                {{ isLoading ? 'Checking...' : 'Enter' }}
              </button>
            </div>

            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
          </form>
        </div>

        <div class="footer-section">
          <p class="hint">If you don't have the password, please contact the couple.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.password-gate {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--sage-light) 0%, var(--sapphire-blue) 100%);
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.password-gate::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('/images/joe-and-kait/Kauffman-Pezzulla-E-0112.jpg')
    center/cover;
  opacity: 0.2;
  z-index: 0;
}

.password-container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 500px;
}

.password-card {
  background: rgba(245, 243, 240, 0.98);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  padding: 3rem 2.5rem;
  animation: fadeInUp 0.6s ease;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.header-section {
  text-align: center;
  margin-bottom: 2.5rem;
}

.couple-names {
  font-family: 'Georgia', 'Palatino', serif;
  font-size: clamp(2rem, 5vw, 3rem);
  color: var(--dark-wood);
  margin-bottom: 1rem;
  font-weight: 400;
  letter-spacing: 0.05em;
}

.divider {
  width: 80px;
  height: 2px;
  background-color: var(--gold);
  margin: 1.5rem auto;
}

.wedding-date {
  font-family: 'Georgia', serif;
  font-size: 1.25rem;
  color: var(--text-secondary);
  margin: 0;
}

.form-section {
  margin-bottom: 2rem;
}

.form-section h2 {
  font-size: 1.75rem;
  color: var(--sage-dark);
  text-align: center;
  margin-bottom: 1rem;
}

.instructions {
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  font-size: 1rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.password-input {
  width: 100%;
  padding: 1rem 1.5rem;
  font-size: 1.1rem;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  border: 2px solid var(--sage-light);
  border-radius: 8px;
  background-color: #fff;
  color: var(--text-primary);
  transition: all 0.3s ease;
  text-align: center;
  letter-spacing: 0.05em;
}

.password-input:focus {
  outline: none;
  border-color: var(--sage-dark);
  box-shadow: 0 0 0 3px rgba(138, 154, 123, 0.1);
}

.password-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.password-input::placeholder {
  color: var(--text-light);
}

.btn {
  width: 100%;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

.error-message {
  color: var(--ruby-red);
  text-align: center;
  margin-top: 1rem;
  font-size: 0.95rem;
  animation: shake 0.4s ease;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-10px);
  }
  75% {
    transform: translateX(10px);
  }
}

.footer-section {
  text-align: center;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(138, 154, 123, 0.2);
}

.hint {
  color: var(--text-light);
  font-size: 0.9rem;
  margin: 0;
  font-style: italic;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .password-gate {
    padding: 1.5rem;
  }

  .password-card {
    padding: 2rem 1.5rem;
  }

  .couple-names {
    font-size: 2rem;
  }

  .wedding-date {
    font-size: 1.1rem;
  }

  .form-section h2 {
    font-size: 1.5rem;
  }

  .password-input,
  .btn {
    font-size: 1rem;
    padding: 0.875rem 1.25rem;
  }
}
</style>
