import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initSentry } from './config/sentry'

const app = createApp(App)

app.use(router)

// Initialize Sentry for error tracking and monitoring
initSentry(app, router)

app.mount('#app')
