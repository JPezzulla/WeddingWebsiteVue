import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initSentry, captureError } from './config/sentry'

const app = createApp(App)

// Global error handler for Vue component errors
app.config.errorHandler = (err, instance, info) => {
  console.error('Vue Error:', err)
  console.error('Component:', instance)
  console.error('Error Info:', info)

  // Send to Sentry
  captureError(err as Error, {
    source: 'vue-error-handler',
    component: instance?.$options?.name || instance?.$options?.__name || 'Unknown',
    errorInfo: info,
  })
}

// Global warning handler (development only)
if (import.meta.env.DEV) {
  app.config.warnHandler = (msg, instance, trace) => {
    console.warn('Vue Warning:', msg)
    console.warn('Trace:', trace)
  }
}

// Global unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled Promise Rejection:', event.reason)
  captureError(new Error(event.reason), {
    source: 'unhandled-promise-rejection',
    promise: event.promise,
  })
})

app.use(router)

// Initialize Sentry for error tracking and monitoring
initSentry(app, router)

app.mount('#app')
