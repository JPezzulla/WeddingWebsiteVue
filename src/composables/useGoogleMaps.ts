import { ref } from 'vue'

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
        resolve()
        return
      }

      // If currently loading, queue this promise
      if (scriptLoading) {
        loadPromises.push(resolve)
        return
      }

      // Start loading
      scriptLoading = true

      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=${CALLBACK_NAME}`
      script.async = true
      script.defer = true

      // Set up global callback
      ;(window as any)[CALLBACK_NAME] = () => {
        scriptLoaded = true
        scriptLoading = false
        isLoaded.value = true

        // Resolve all queued promises
        loadPromises.forEach((resolveFunc) => resolveFunc())
        loadPromises.length = 0

        resolve()
      }

      script.onerror = () => {
        scriptLoading = false
        reject(new Error('Failed to load Google Maps script'))
      }

      document.head.appendChild(script)
    })
  }

  return {
    isLoaded,
    loadGoogleMapsScript,
  }
}
