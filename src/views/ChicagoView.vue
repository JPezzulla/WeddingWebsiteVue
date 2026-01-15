<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import PageLayout from '../components/PageLayout.vue'
import InfoSection from '../components/InfoSection.vue'
import AsSeenOnBearBadge from '../components/AsSeenOnBearBadge.vue'
import MichelinStarBadge from '../components/MichelinStarBadge.vue'
import SegmentedControl from '../components/SegmentedControl.vue'
import { HOTELS, RESTAURANTS, ACTIVITIES, VENUE } from '@/data/locations'
import {
  createVenueMarker,
  createHotelMarker,
  createRestaurantMarker,
  createActivityMarker,
  updateActiveMarker,
  createInfoWindowContent,
  type MarkerCategory,
} from '@/utils/mapHelpers'
import { useGoogleMaps } from '@/composables/useGoogleMaps'

interface Location {
  name: string
  lat: number
  lng: number
  category: 'hotel' | 'restaurant' | 'activity'
}

const showMap = ref(window.innerWidth > 768) // Always true on desktop, toggleable on mobile
const hoveredLocation = ref<string | null>(null)
const selectedLocation = ref<string | null>(null)
const activeLocationCategory = ref<MarkerCategory | null>(null)
const mapElement = ref<HTMLElement | null>(null)
const showAllHotels = ref(false)
const showAllRestaurants = ref(false)
const showAllActivities = ref(false)

// Map state - optimized to prevent recreation
let map: google.maps.Map | null = null
let markers: google.maps.Marker[] = []
let activeMarker: google.maps.Marker | null = null
let infoWindow: google.maps.InfoWindow | null = null

const { loadGoogleMapsScript } = useGoogleMaps()

const goToLink = (link: string) => {
  window.open(link, '_blank')
}

const allLocations = computed<Location[]>(() => [
  ...HOTELS.map((h) => ({ name: h.name, lat: h.lat, lng: h.lng, category: 'hotel' as const })),
  ...RESTAURANTS.map((r) => ({ name: r.name, lat: r.lat, lng: r.lng, category: 'restaurant' as const })),
  ...ACTIVITIES.map((a) => ({ name: a.name, lat: a.lat, lng: a.lng, category: 'activity' as const })),
])

const visibleHotels = computed(() => (showAllHotels.value ? HOTELS : HOTELS.slice(0, 6)))
const visibleRestaurants = computed(() =>
  showAllRestaurants.value ? RESTAURANTS : RESTAURANTS.slice(0, 6)
)
const visibleActivities = computed(() =>
  showAllActivities.value ? ACTIVITIES : ACTIVITIES.slice(0, 6)
)

const initMap = () => {
  if (!mapElement.value || !showMap.value) return

  // OPTIMIZATION: Only create map if it doesn't exist
  if (!map) {
    map = new google.maps.Map(mapElement.value, {
      center: { lat: VENUE.lat, lng: VENUE.lng },
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

  // Add permanent markers for all locations on mobile
  if (window.innerWidth <= 768) {
    // Add restaurant markers
    RESTAURANTS.forEach((restaurant) => {
      const restaurantMarker = createRestaurantMarker(map!, restaurant)
      markers.push(restaurantMarker)
    })

    // Add activity markers
    ACTIVITIES.forEach((activity) => {
      const activityMarker = createActivityMarker(map!, activity)
      markers.push(activityMarker)
    })
  }
}

const updateMapLocation = (locationName: string, category: MarkerCategory) => {
  const location = allLocations.value.find((l) => l.name === locationName)
  if (!location || !map) return

  // Don't update anything if on mobile (map view)
  if (showMap.value && window.innerWidth <= 768) return

  map.panTo({ lat: location.lat, lng: location.lng })

  // Track the current active location category
  activeLocationCategory.value = category
  selectedLocation.value = locationName

  // OPTIMIZATION: Reuse activeMarker instead of creating new one
  activeMarker = updateActiveMarker(
    activeMarker,
    map,
    { lat: location.lat, lng: location.lng },
    category
  )

  // OPTIMIZATION: Reuse InfoWindow
  if (infoWindow) {
    const content = createInfoWindowContent(location.name, category)
    infoWindow.setContent(content)
    infoWindow.open(map, activeMarker)
  }
}

const handleLocationHover = (locationName: string | null, category: MarkerCategory) => {
  hoveredLocation.value = locationName
  if (locationName && showMap.value) {
    updateMapLocation(locationName, category)
  } else {
    // Only clear marker if the previous location was a hotel or venue (has permanent marker)
    // For restaurants and activities, keep the marker visible until a new one is hovered
    if (activeLocationCategory.value === 'hotel' || activeLocationCategory.value === 'venue') {
      // Hide active marker instead of destroying it
      if (activeMarker) {
        activeMarker.setVisible(false)
      }
      if (infoWindow) {
        infoWindow.close()
      }

      // Reset tracking
      activeLocationCategory.value = null
      selectedLocation.value = null
    }
    // For restaurants and activities, do nothing - keep marker visible
  }
}

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

watch(showMap, (newValue) => {
  if (newValue) {
    if (!map) {
      setupMap()
    } else {
      // Map already exists, just reinitialize markers
      setTimeout(() => {
        initMap()
      }, 100)
    }
  }
})

onMounted(() => {
  // Load map immediately on desktop
  if (showMap.value) {
    setupMap()
  }
})
</script>

<template>
  <PageLayout
    title="Explore Chicago"
    gradient-from="var(--sapphire-blue)"
    gradient-to="var(--amethyst)"
    background-image="/images/joe-and-kait/Kauffman-Pezzulla-E-0023.jpg"
    background-position="center 47%"
    background-size="cover"
  >
    <!-- Content Container -->
    <div class="content-wrapper" :class="{ 'with-map': showMap }">
      <!-- Main Content -->
      <div class="main-content" :class="{ scrollable: showMap }">
        <!-- Hotels Section -->
        <InfoSection
          title="Where to Stay"
          intro="We recommend staying near Lincoln Park for easy access to the venue. Here are some of our favorite options:"
        >
          <div class="cards-grid" :class="{ vertical: showMap }">
            <div
              v-for="hotel in visibleHotels"
              :key="hotel.name"
              class="info-card"
              :class="{ active: hoveredLocation === hotel.name }"
              @mouseenter="handleLocationHover(hotel.name, 'hotel')"
              @mouseleave="handleLocationHover(null, 'hotel')"
            >
              <h3>{{ hotel.name }}</h3>
              <div class="card-meta">
                <span class="distance">{{ hotel.distance }}</span>
                <span class="price">{{ hotel.price }}</span>
              </div>
              <p>{{ hotel.description }}</p>
              <p
                style="padding-top: 8px; font-size: 13px; font-style: italic"
                class="hotel-link-text"
                v-if="hotel?.isHotelLincoln"
              >
                *This is where Joe and Kait will be staying.
              </p>
              <a :href="hotel.link" rel="noreferrer" target="_blank" v-if="hotel.link">
                <button class="hotel-link">
                  <span class="hotel-link-text">Click here to book at {{ hotel.name }}</span>
                </button>
              </a>
              <div v-else>
                <span class="hotel-link-text">Booking link coming soon!</span>
              </div>
            </div>
          </div>
          <div v-if="HOTELS.length > 6" class="show-more-container">
            <button @click="showAllHotels = !showAllHotels" class="show-more-btn">
              {{ showAllHotels ? 'Show Less' : 'Show More...' }}
            </button>
          </div>
        </InfoSection>

        <!-- Restaurants Section -->
        <InfoSection
          title="Where to Eat"
          intro="Chicago's food scene is incredible. Here are some must-try spots near the venue:"
          :alternate="true"
        >
          <div class="cards-grid" :class="{ vertical: showMap }">
            <div
              v-for="restaurant in visibleRestaurants"
              :key="restaurant.name"
              class="info-card restaurant-card"
              :class="{ active: hoveredLocation === restaurant.name }"
              @click="goToLink(restaurant.link)"
              @mouseenter="handleLocationHover(restaurant.name, 'restaurant')"
              @mouseleave="handleLocationHover(null, 'restaurant')"
            >
              <h3>{{ restaurant.name }}</h3>
              <div class="card-meta">
                <span class="cuisine">{{ restaurant.cuisine }}</span>
              </div>
              <p>{{ restaurant.description }}</p>
              <AsSeenOnBearBadge v-if="restaurant.asSeenOnBear" />
              <MichelinStarBadge
                v-if="restaurant.michelinStars"
                :stars="restaurant.michelinStars"
              />
            </div>
          </div>
          <div v-if="RESTAURANTS.length > 6" class="show-more-container">
            <button @click="showAllRestaurants = !showAllRestaurants" class="show-more-btn">
              {{ showAllRestaurants ? 'Show Less' : 'Show More...' }}
            </button>
          </div>
        </InfoSection>

        <!-- Activities Section -->
        <InfoSection
          title="Things to Do"
          intro="Make the most of your visit with these Chicago attractions:"
        >
          <div class="cards-grid" :class="{ vertical: showMap }">
            <div
              v-for="activity in visibleActivities"
              :key="activity.name"
              class="info-card"
              :class="{ active: hoveredLocation === activity.name }"
              @mouseenter="handleLocationHover(activity.name, 'activity')"
              @mouseleave="handleLocationHover(null, 'activity')"
            >
              <h3>{{ activity.name }}</h3>
              <p>{{ activity.description }}</p>
            </div>
          </div>
          <div v-if="ACTIVITIES.length > 6" class="show-more-container">
            <button @click="showAllActivities = !showAllActivities" class="show-more-btn">
              {{ showAllActivities ? 'Show Less' : 'Show More...' }}
            </button>
          </div>
        </InfoSection>

        <!-- Transportation Section -->
        <InfoSection title="Getting Around" :alternate="true">
          <div class="transport-grid">
            <div class="transport-card">
              <h3>Around the City</h3>
              <p>
                <strong>CTA Trains & Buses:</strong> Affordable and efficient public transit. Get a
                <a href="https://www.ventrachicago.com/" rel="noreferrer" target="_blank">Ventra</a>
                card for easy access.
              </p>
              <p><strong>Rideshare:</strong> Uber and Lyft are widely available throughout the city.</p>
              <p>
                <strong>Walking/Biking:</strong> Lincoln Park area is very walkable.
                <a href="https://divvybikes.com/" rel="noreferrer" target="_blank">Divvy bikes</a>
                available for rent.
              </p>
            </div>
            <div class="transport-card">
              <h3>From the Airport</h3>
              <p>
                <strong>O'Hare (ORD):</strong> Take the Blue Line CTA train to Clark/Lake, then
                transfer to Red Line north to Fullerton. About 50 minutes.
              </p>
              <p>
                <strong>Midway (MDW):</strong> Take the Orange Line to Red Line north to Fullerton.
                About 60 minutes.
              </p>
              <p><strong>Rideshare/Taxi:</strong> 30-45 minutes depending on traffic.</p>
            </div>
          </div>
        </InfoSection>

        <!-- CTA -->
        <section class="chicago-cta">
          <div class="container text-center">
            <h2>Need Help?</h2>
            <p style="margin: 0 auto">
              If you have questions about visiting Chicago, don't hesitate to reach out. We're happy
              to help make your trip memorable!
            </p>
          </div>
        </section>
      </div>

      <!-- Map Panel -->
      <div v-if="showMap" class="map-panel">
        <div class="map-sticky-wrapper">
          <div ref="mapElement" class="map-container"></div>
          <p class="map-hint">Hover over locations to see them on the map</p>
        </div>
      </div>
    </div>

    <!-- Mobile Toggle - Bottom Fixed -->
    <SegmentedControl
      v-model="showMap"
      :left-option="{
        value: 'list',
        label: 'List',
        icon: '<path d=&quot;M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z&quot; /><polyline points=&quot;9 22 9 12 15 12 15 22&quot; />',
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
.content-wrapper {
  display: flex;
  gap: 0;
  position: relative;
}

.content-wrapper.with-map {
  gap: 2rem;
}

.main-content {
  flex: 1;
  width: 100%;
}

.main-content.scrollable {
  max-height: none;
}

.map-panel {
  width: 45%;
  position: relative;
}

.map-sticky-wrapper {
  position: sticky;
  top: 120px;
  padding: 0 2rem 2rem 0;
  height: calc(100vh - 140px);
  display: flex;
  flex-direction: column;
}

.map-container {
  width: 100%;
  flex: 1;
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

.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  width: 100%;
}

.cards-grid.vertical {
  grid-template-columns: 1fr;
}

.cards-grid.vertical .info-card {
  width: 500px;
  margin: 0 auto;
  text-align: center;
  padding: 1.5rem;
}

.cards-grid.vertical .info-card h3 {
  text-align: center;
}

.cards-grid.vertical .card-meta {
  justify-content: center;
}

.cards-grid.vertical .info-card p {
  text-align: center;
}

.cards-grid.vertical .event-details,
.cards-grid.vertical .event-venue {
  align-items: center;
  justify-content: center;
}

.cards-grid.vertical .hotel-link {
  margin-left: 0;
  width: 100%;
}

.cards-grid.vertical .hotel-link-text {
  text-align: center;
}

.hotel-link {
  margin-top: auto;
  margin-left: 32px;
  align-items: center;
}

.hotel-link-text {
  font-size: small;
}

.info-card {
  padding: 2rem;
  background-color: #fff;
  border: 1px solid rgba(107, 122, 94, 0.2);
  border-radius: 8px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.restaurant-card {
  cursor: pointer;
}

.info-card:hover,
.info-card.active {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-color: var(--sage-green);
}

.info-card h3 {
  color: var(--sage-dark);
  margin-bottom: 0.75rem;
  font-size: 1.5rem;
}

.card-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 0.9rem;
}

.distance,
.cuisine {
  color: var(--text-light);
}

.price {
  color: var(--sage-dark);
  font-weight: 600;
}

.transport-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.transport-card {
  padding: 2rem;
  background-color: var(--cream);
  border-left: 4px solid var(--sapphire-blue);
  border-radius: 4px;
}

.transport-card h3 {
  color: var(--sapphire-blue);
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.transport-card p {
  margin-bottom: 1rem;
}

.transport-card p:last-child {
  margin-bottom: 0;
}

.transport-card strong {
  color: var(--text-primary);
}

.chicago-cta {
  padding: 8rem 2rem;
  background-color: var(--cream);
}

.chicago-cta h2 {
  margin-bottom: 2rem;
}

.show-more-container {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.show-more-btn {
  padding: 0.75rem 2rem;
  background-color: var(--sage-green);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.show-more-btn:hover {
  background-color: var(--sage-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.show-more-btn:active {
  transform: translateY(0);
}

/* Tablet/iPad responsive */
@media (max-width: 1024px) {
  .content-wrapper.with-map {
    flex-direction: column;
  }

  .map-panel {
    width: 100%;
    order: -1;
  }

  .map-sticky-wrapper {
    position: relative;
    top: 0;
    padding: 0 2rem 2rem;
  }

  .map-container {
    height: 400px;
  }

  .cards-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .transport-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .chicago-cta {
    padding: 6rem 2rem;
  }
}

/* Mobile responsive */
@media (max-width: 768px) {
  /* Content wrapper adjustments */
  .content-wrapper {
    position: relative;
  }

  .content-wrapper.with-map {
    flex-direction: column;
    gap: 0;
  }

  /* Hide main content when map is active */
  .content-wrapper.with-map .main-content {
    display: none;
  }

  /* Full screen map on mobile */
  .map-panel {
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

  .map-sticky-wrapper {
    position: relative;
    top: 0;
    padding: 0;
    height: 100vh;
  }

  .map-container {
    height: 100vh;
    border-radius: 0;
  }

  .map-hint {
    display: none;
  }

  /* List view styles */
  .cards-grid,
  .transport-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .info-card {
    text-align: center;
  }

  .card-meta {
    justify-content: center;
  }

  .hotel-link {
    margin-left: 0;
  }
}
</style>
