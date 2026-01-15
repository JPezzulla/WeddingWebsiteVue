<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import PageLayout from '../components/PageLayout.vue'
import SegmentedControl from '../components/SegmentedControl.vue'
import { HOTELS, EVENTS, VENUE } from '@/data/locations'
import {
  createVenueMarker,
  createHotelMarker,
  createEventMarker,
  updateActiveMarker,
  createInfoWindowContent,
} from '@/utils/mapHelpers'
import { useGoogleMaps } from '@/composables/useGoogleMaps'

const hoveredEvent = ref<string | null>(null)
const selectedEvent = ref<string>('wedding')
const showMapMobile = ref(false)
const mapElement = ref<HTMLElement | null>(null)
const activeEventName = ref<string | null>(null)

// Map state - optimized to prevent recreation
let map: google.maps.Map | null = null
let markers: google.maps.Marker[] = []
let activeMarker: google.maps.Marker | null = null
let infoWindow: google.maps.InfoWindow | null = null

const { loadGoogleMapsScript } = useGoogleMaps()

const initMap = () => {
  if (!mapElement.value) return

  const currentEvent = EVENTS.find((e) => e.id === selectedEvent.value)
  if (!currentEvent) return

  // OPTIMIZATION: Only create map if it doesn't exist
  if (!map) {
    map = new google.maps.Map(mapElement.value, {
      center: { lat: currentEvent.lat, lng: currentEvent.lng },
      zoom: 13,
      mapId: 'DEMO_MAP_ID',
      disableDefaultUI: false,
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
    })

    // OPTIMIZATION: Create InfoWindow once and reuse
    infoWindow = new google.maps.InfoWindow({ zIndex: 200 })
  }

  // Clear existing markers visibility without destroying them
  markers.forEach((m) => m.setMap(null))
  markers = []

  // Add venue marker
  const venueMarker = createVenueMarker(map, VENUE)
  markers.push(venueMarker)

  // Add hotel markers
  HOTELS.forEach((hotel) => {
    const hotelMarker = createHotelMarker(map!, hotel)
    markers.push(hotelMarker)
  })

  // Add permanent markers for all event locations on mobile
  if (window.innerWidth <= 768) {
    // Add event location markers (skip Cafe Brauer since it's the venue)
    EVENTS.forEach((event) => {
      if (event.venue === 'Cafe Brauer') return

      const eventMarker = createEventMarker(map!, event, true)
      markers.push(eventMarker)
    })
  }

  // Create initial active marker for selected event (desktop only)
  if (window.innerWidth > 768) {
    // OPTIMIZATION: Reuse activeMarker if it exists
    activeMarker = updateActiveMarker(
      activeMarker,
      map,
      { lat: currentEvent.lat, lng: currentEvent.lng },
      'event',
    )

    // Show info window for initial event
    updateInfoWindow(currentEvent)
  }
}

const updateInfoWindow = (event: (typeof EVENTS)[0]) => {
  if (!activeMarker || !infoWindow || !map) return

  const content = createInfoWindowContent(event.name, 'event', {
    address: event.address,
    day: event.day,
    time: event.time,
  })

  infoWindow.setContent(content)
  infoWindow.open(map, activeMarker)
}

const updateMapLocation = (eventId: string) => {
  const event = EVENTS.find((e) => e.id === eventId)
  if (!event || !map) return

  // Don't update anything if on mobile (map view)
  if (showMapMobile.value) return

  // Smooth pan to new location
  map.panTo({ lat: event.lat, lng: event.lng })

  // Track active event name
  activeEventName.value = event.name

  // OPTIMIZATION: Reuse activeMarker instead of creating new one
  activeMarker = updateActiveMarker(activeMarker, map, { lat: event.lat, lng: event.lng }, 'event')

  // Update info window
  updateInfoWindow(event)
}

const handleEventHover = (eventId: string | null) => {
  hoveredEvent.value = eventId
  if (eventId) {
    selectedEvent.value = eventId
  } else {
    // Hide active marker instead of destroying it
    if (activeMarker) {
      activeMarker.setVisible(false)
    }
    if (infoWindow) {
      infoWindow.close()
    }

    // Reset tracking
    activeEventName.value = null
  }
}

watch(selectedEvent, (newEventId) => {
  if (newEventId && map) {
    updateMapLocation(newEventId)
  }
})

const setupMap = async () => {
  try {
    await loadGoogleMapsScript()
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      initMap()
    }, 100)
  } catch (error) {
    console.error('Failed to load Google Maps:', error)
  }
}

onMounted(() => {
  setupMap()
})
</script>

<template>
  <PageLayout
    title="Schedule"
    subtitle="Join us for a weekend of celebration"
    gradient-from="var(--sapphire-blue)"
    gradient-to="var(--emerald-green)"
  >
    <section class="schedule-section">
      <div class="schedule-container" :class="{ 'mobile-map-active': showMapMobile }">
        <!-- Events List -->
        <div class="events-list" :class="{ 'mobile-hidden': showMapMobile }">
          <div
            v-for="event in EVENTS"
            :key="event.id"
            class="event-card"
            :class="{ active: hoveredEvent === event.id || selectedEvent === event.id }"
            @mouseenter="handleEventHover(event.id)"
            @mouseleave="handleEventHover(null)"
            @click="selectedEvent = event.id"
          >
            <div class="event-date">
              <div class="day">{{ event.day }}</div>
              <div class="date">{{ event.date }}</div>
            </div>
            <div class="event-details">
              <h3 class="event-name">{{ event.name }}</h3>
              <div class="event-time">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {{ event.time }}
              </div>
              <div class="event-venue">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <div>
                  <div class="venue-name">{{ event.venue }}</div>
                  <div class="venue-address">{{ event.address }}</div>
                </div>
              </div>
              <p class="event-description">{{ event.description }}</p>
            </div>
          </div>
        </div>

        <!-- Map -->
        <div class="map-container" :class="{ 'mobile-fullscreen': showMapMobile }">
          <div ref="mapElement" class="map-wrapper"></div>
          <p class="map-hint">Hover over an event to see its location</p>
        </div>
      </div>
    </section>

    <!-- Mobile Toggle - Bottom Fixed -->
    <SegmentedControl
      v-model="showMapMobile"
      :left-option="{
        value: 'list',
        label: 'List',
        icon: '<rect x=&quot;3&quot; y=&quot;4&quot; width=&quot;18&quot; height=&quot;18&quot; rx=&quot;2&quot; ry=&quot;2&quot; /><line x1=&quot;16&quot; y1=&quot;2&quot; x2=&quot;16&quot; y2=&quot;6&quot; /><line x1=&quot;8&quot; y1=&quot;2&quot; x2=&quot;8&quot; y2=&quot;6&quot; /><line x1=&quot;3&quot; y1=&quot;10&quot; x2=&quot;21&quot; y2=&quot;10&quot; />',
      }"
      :right-option="{
        value: 'map',
        label: 'Map',
        icon: '<path d=&quot;M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z&quot; /><circle cx=&quot;12&quot; cy=&quot;10&quot; r=&quot;3&quot; />',
      }"
    />
  </PageLayout>
</template>

<style scoped>
.schedule-section {
  padding: 4rem 2rem;
  background-color: var(--cream);
}

.schedule-container {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

.events-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.event-card {
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1.5rem;
}

.event-card:hover,
.event-card.active {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  border-color: var(--sage-green);
}

.event-date {
  text-align: center;
  padding: 1rem;
  background-color: var(--cream);
  border-radius: 8px;
  min-width: 120px;
}

.day {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--sage-dark);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

.date {
  font-size: 0.95rem;
  color: var(--text-secondary);
}

.event-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.event-name {
  font-size: 1.5rem;
  color: var(--dark-wood);
  margin: 0;
}

.event-time,
.event-venue {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.event-time svg,
.event-venue svg {
  flex-shrink: 0;
  margin-top: 2px;
  color: var(--sage-green);
}

.venue-name {
  font-weight: 600;
  color: var(--text-primary);
}

.venue-address {
  font-size: 0.9rem;
  color: var(--text-light);
}

.event-description {
  margin: 0.5rem 0 0 0;
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
}

.map-container {
  position: sticky;
  top: 120px;
}

.map-wrapper {
  width: 100%;
  height: 500px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.map-hint {
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: var(--text-light);
  font-style: italic;
}

/* Tablet responsive */
@media (max-width: 1024px) {
  .schedule-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .map-container {
    position: relative;
    top: 0;
    order: -1;
  }

  .map-wrapper {
    height: 400px;
  }
}

/* Mobile responsive */
@media (max-width: 768px) {
  .schedule-section {
    padding: 3rem 1.5rem;
  }

  .schedule-container {
    position: relative;
  }

  /* Hide events list when map is active */
  .events-list.mobile-hidden {
    display: none;
  }

  /* Full screen map on mobile */
  .map-container.mobile-fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    z-index: 999;
    background-color: white;
  }

  .map-container.mobile-fullscreen .map-wrapper {
    height: 100vh;
    border-radius: 0;
  }

  .map-container.mobile-fullscreen .map-hint {
    display: none;
  }

  /* Normal map hidden on mobile when not in fullscreen */
  .map-container:not(.mobile-fullscreen) {
    display: none;
  }

  .event-card {
    grid-template-columns: 1fr;
    padding: 1.5rem;
  }

  .event-date {
    min-width: auto;
  }

  .event-name {
    font-size: 1.25rem;
  }
}
</style>
