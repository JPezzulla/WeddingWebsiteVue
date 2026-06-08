import { ref } from 'vue'
import { captureError } from '@/config/sentry'

const CORRECT_PASSWORD = import.meta.env.VITE_SITE_PASSWORD || ''
const AUTH_COOKIE_NAME = 'wedding_auth'
const COOKIE_EXPIRY_DAYS = 30

// Warn if password is not configured
if (!import.meta.env.VITE_SITE_PASSWORD) {
  const errorMessage =
    'VITE_SITE_PASSWORD environment variable is not set. Authentication will not work properly.'
  console.warn(errorMessage)

  // Capture in Sentry for production monitoring
  captureError(new Error(errorMessage), {
    environment: import.meta.env.MODE,
    missingVariable: 'VITE_SITE_PASSWORD',
  })
}

// Reactive authentication state
const isAuthenticated = ref(false)

// Get cookie value by name
function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null
  }
  return null
}

// Set cookie with expiry
function setCookie(name: string, value: string, days: number): void {
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  const expires = `expires=${date.toUTCString()}`
  document.cookie = `${name}=${value};${expires};path=/;SameSite=Strict`
}

// Delete cookie
function deleteCookie(name: string): void {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`
}

// Check if user is authenticated via cookie
export function checkAuth(): boolean {
  const authCookie = getCookie(AUTH_COOKIE_NAME)
  isAuthenticated.value = authCookie === 'true'
  return isAuthenticated.value
}

// Verify password and set authentication (case-insensitive)
export function login(password: string): boolean {
  if (password.toLowerCase() === CORRECT_PASSWORD.toLowerCase()) {
    isAuthenticated.value = true
    setCookie(AUTH_COOKIE_NAME, 'true', COOKIE_EXPIRY_DAYS)
    return true
  }
  return false
}

// Logout user
export function logout(): void {
  isAuthenticated.value = false
  deleteCookie(AUTH_COOKIE_NAME)
}

// Export the authentication state
export function useAuth() {
  return {
    isAuthenticated,
    checkAuth,
    login,
    logout,
  }
}
