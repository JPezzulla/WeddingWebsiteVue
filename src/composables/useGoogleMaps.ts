import { ref } from 'vue'
import { captureError, addBreadcrumb } from '@/config/sentry'

const API_KEY = 'AIzaSyAFiKLXAhTC8-CGI-ZnV4n-wapmXeuMEPo'
const CALLBACK_NAME = 'initGoogleMaps'

// Global state shared across all instances
let scriptLoaded = false
let scriptLoading = false
const loadPromises: Array<() => void> = []

export function useGoogleMaps() {
  const isLoaded = ref(false)

  const loadGoogleMapsScript = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      // If already loaded, resolve immediately
      if (scriptLoaded) {
        isLoaded.value = true
        addBreadcrumb('Google Maps script already loaded')
        resolve()
        return
      }

      // If currently loading, queue this promise
      if (scriptLoading) {
        addBreadcrumb('Google Maps script loading, queuing request')
        loadPromises.push(resolve)
        return
      }

      // Start loading
      scriptLoading = true
      addBreadcrumb('Starting Google Maps script load')

      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=${CALLBACK_NAME}`
      script.async = true
      script.defer = true

      // Set up global callback
      ;(window as any)[CALLBACK_NAME] = () => {
        scriptLoaded = true
        scriptLoading = false
        isLoaded.value = true

        addBreadcrumb('Google Maps script loaded successfully')

        // Resolve all queued promises
        loadPromises.forEach((resolveFunc) => resolveFunc())
        loadPromises.length = 0

        resolve()
      }

      script.onerror = (event) => {
        scriptLoading = false
        const error = new Error('Failed to load Google Maps script')

        addBreadcrumb('Google Maps script failed to load', {
          event: String(event),
        })

        captureError(error, {
          source: 'useGoogleMaps',
          api_key_present: !!API_KEY,
        })

        reject(error)
      }

      document.head.appendChild(script)
    })
  }

  return {
    isLoaded,
    loadGoogleMapsScript,
  }
}
