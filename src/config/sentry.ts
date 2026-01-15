import type { App } from 'vue'
import type { Router } from 'vue-router'

// Track if Sentry is initialized
let sentryInitialized = false
let Sentry: any = null

export async function initSentry(app: App, router: Router) {
  // Only initialize Sentry in production
  const isProduction = import.meta.env.PROD
  const dsn = import.meta.env.VITE_SENTRY_DSN

  if (!isProduction || !dsn) {
    console.log('Sentry disabled:', isProduction ? 'Missing DSN' : 'Development mode')
    return
  }

  // Wrap in try-catch to prevent Sentry from breaking the app
  try {
    // Dynamically import Sentry only when needed
    const SentryModule = await import('@sentry/vue')
    Sentry = SentryModule

    const {
      init,
      browserTracingIntegration,
      vueRouterInstrumentation,
      replayIntegration,
      setUser,
      addBreadcrumb,
    } = SentryModule

    sentryInitialized = true

    init({
      app,
      dsn,
      integrations: [
        // Browser tracing for performance monitoring
        browserTracingIntegration({
          router,
          // Track navigation performance
          routingInstrumentation: vueRouterInstrumentation(router),
        }),
        // Replay integration for session recordings (optional)
        replayIntegration({
          maskAllText: false, // Set to true for privacy
          blockAllMedia: false,
        }),
      ],

      // Performance Monitoring
      tracesSampleRate: 0.1, // 10% of transactions for performance monitoring
      tracePropagationTargets: ['localhost', /^https:\/\/josephandkaitlyn\.com/],

      // Session Replay
      replaysSessionSampleRate: 0.1, // 10% of sessions
      replaysOnErrorSampleRate: 1.0, // 100% of sessions with errors

      // Environment
      environment: import.meta.env.MODE,
      release: `wedding-website@${import.meta.env.VITE_APP_VERSION || '1.0.0'}`,

      // Ignore common errors
      ignoreErrors: [
        // Browser extensions
        'top.GLOBALS',
        'canvas.contentDocument',
        // Random network errors
        'NetworkError',
        'Network request failed',
        // Google Maps errors that are non-critical
        'ResizeObserver loop limit exceeded',
      ],

      // Before sending events, you can modify them
      beforeSend(event, hint) {
        // Add custom context
        event.tags = {
          ...event.tags,
          page: window.location.pathname,
        }

        // Filter out development errors
        if (event.environment === 'development') {
          return null
        }

        return event
      },

      // Enable debug mode in development
      debug: !isProduction,
    })

    // Set user context (optional - useful for identifying users in errors)
    setUser({
      id: 'guest', // You could set a unique ID based on session
    })

    // Add breadcrumbs for better error context
    addBreadcrumb({
      category: 'app',
      message: 'Application initialized',
      level: 'info',
    })
  } catch (error) {
    // If Sentry fails to initialize, log error but don't break the app
    console.error('Failed to initialize Sentry:', error)
    sentryInitialized = false
  }
}

// Helper function to manually capture errors
export function captureError(error: Error, context?: Record<string, any>) {
  if (!sentryInitialized || !Sentry) {
    console.warn('[Sentry] Not initialized. Error:', error.message, context)
    return
  }
  Sentry.captureException(error, {
    contexts: {
      custom: context,
    },
  })
}

// Helper function to capture messages
export function captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info') {
  if (!sentryInitialized || !Sentry) {
    console.warn('[Sentry] Not initialized. Message:', message)
    return
  }
  Sentry.captureMessage(message, level)
}

// Helper function to add breadcrumbs
export function addBreadcrumb(message: string, data?: Record<string, any>) {
  if (!sentryInitialized || !Sentry) {
    return
  }
  Sentry.addBreadcrumb({
    message,
    data,
    level: 'info',
  })
}

// Helper to set user context
export function setUser(id: string, email?: string) {
  if (!sentryInitialized || !Sentry) {
    return
  }
  Sentry.setUser({ id, email })
}
