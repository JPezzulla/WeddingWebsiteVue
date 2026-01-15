import type { Hotel, Venue, Restaurant, Activity, Event } from '@/data/locations'

export type MarkerCategory = 'venue' | 'hotel' | 'restaurant' | 'activity' | 'event'

export interface MarkerConfig {
  color: string
  textColor: string
  labelClass: string
  scale: number
  labelOrigin: { x: number; y: number }
}

const MARKER_CONFIGS: Record<MarkerCategory, MarkerConfig> = {
  venue: {
    color: '#FFD700', // Gold
    textColor: '#FFD700',
    labelClass: 'marker-label-venue',
    scale: 8,
    labelOrigin: { x: 0, y: -3 },
  },
  hotel: {
    color: '#4285F4', // Blue
    textColor: '#4285F4',
    labelClass: 'marker-label-hotel',
    scale: 6,
    labelOrigin: { x: 0, y: -2.5 },
  },
  restaurant: {
    color: '#EA4335', // Red
    textColor: '#EA4335',
    labelClass: 'marker-label-restaurant',
    scale: 6,
    labelOrigin: { x: 0, y: -2.5 },
  },
  activity: {
    color: '#9C27B0', // Purple
    textColor: '#9C27B0',
    labelClass: 'marker-label-activity',
    scale: 6,
    labelOrigin: { x: 0, y: -2.5 },
  },
  event: {
    color: '#EA4335', // Red
    textColor: '#EA4335',
    labelClass: 'marker-label-event',
    scale: 6,
    labelOrigin: { x: 0, y: -2.5 },
  },
}

export function getMarkerColor(category: MarkerCategory): string {
  return MARKER_CONFIGS[category]?.color || '#EA4335'
}

export function getMarkerConfig(category: MarkerCategory): MarkerConfig {
  return MARKER_CONFIGS[category] || MARKER_CONFIGS.event
}

export function createVenueMarker(
  map: google.maps.Map,
  venue: Venue
): google.maps.Marker {
  const config = getMarkerConfig('venue')

  const marker = new google.maps.Marker({
    position: { lat: venue.lat, lng: venue.lng },
    map: map,
    title: venue.name,
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: config.scale,
      fillColor: config.color,
      fillOpacity: 1,
      strokeColor: '#FFFFFF',
      strokeWeight: 2,
      anchor: new google.maps.Point(0, 0),
      labelOrigin: new google.maps.Point(config.labelOrigin.x, config.labelOrigin.y),
    },
    label: {
      text: venue.name,
      color: config.textColor,
      fontSize: '14px',
      fontWeight: '700',
      className: `marker-label ${config.labelClass}`,
    },
    cursor: 'pointer',
  })

  marker.addListener('click', () => {
    window.open(venue.link, '_blank')
  })

  return marker
}

export function createHotelMarker(
  map: google.maps.Map,
  hotel: Hotel
): google.maps.Marker {
  const config = getMarkerConfig('hotel')

  const marker = new google.maps.Marker({
    position: { lat: hotel.lat, lng: hotel.lng },
    map: map,
    title: hotel.name,
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: config.scale,
      fillColor: config.color,
      fillOpacity: 1,
      strokeColor: '#FFFFFF',
      strokeWeight: 2,
      anchor: new google.maps.Point(0, 0),
      labelOrigin: new google.maps.Point(config.labelOrigin.x, config.labelOrigin.y),
    },
    label: {
      text: hotel.name,
      color: config.textColor,
      fontSize: '13px',
      fontWeight: '700',
      className: `marker-label ${config.labelClass}`,
    },
    cursor: 'pointer',
  })

  if (hotel.link) {
    marker.addListener('click', () => {
      window.open(hotel.link, '_blank')
    })
  }

  return marker
}

export function createRestaurantMarker(
  map: google.maps.Map,
  restaurant: Restaurant
): google.maps.Marker {
  const config = getMarkerConfig('restaurant')

  const marker = new google.maps.Marker({
    position: { lat: restaurant.lat, lng: restaurant.lng },
    map: map,
    title: restaurant.name,
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: config.scale,
      fillColor: config.color,
      fillOpacity: 1,
      strokeColor: '#FFFFFF',
      strokeWeight: 2,
      anchor: new google.maps.Point(0, 0),
      labelOrigin: new google.maps.Point(config.labelOrigin.x, config.labelOrigin.y),
    },
    label: {
      text: restaurant.name,
      color: config.textColor,
      fontSize: '13px',
      fontWeight: '700',
      className: `marker-label ${config.labelClass}`,
    },
    cursor: 'pointer',
  })

  if (restaurant.link) {
    marker.addListener('click', () => {
      window.open(restaurant.link, '_blank')
    })
  }

  return marker
}

export function createActivityMarker(
  map: google.maps.Map,
  activity: Activity
): google.maps.Marker {
  const config = getMarkerConfig('activity')

  const marker = new google.maps.Marker({
    position: { lat: activity.lat, lng: activity.lng },
    map: map,
    title: activity.name,
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: config.scale,
      fillColor: config.color,
      fillOpacity: 1,
      strokeColor: '#FFFFFF',
      strokeWeight: 2,
      anchor: new google.maps.Point(0, 0),
      labelOrigin: new google.maps.Point(config.labelOrigin.x, config.labelOrigin.y),
    },
    label: {
      text: activity.name,
      color: config.textColor,
      fontSize: '13px',
      fontWeight: '700',
      className: `marker-label ${config.labelClass}`,
    },
    cursor: 'pointer',
  })

  if (activity.link) {
    marker.addListener('click', () => {
      window.open(activity.link, '_blank')
    })
  }

  return marker
}

export function createEventMarker(
  map: google.maps.Map,
  event: Event,
  showLabel: boolean = false
): google.maps.Marker {
  const config = getMarkerConfig('event')

  const markerOptions: google.maps.MarkerOptions = {
    position: { lat: event.lat, lng: event.lng },
    map: map,
    title: event.venue,
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: config.scale,
      fillColor: config.color,
      fillOpacity: 1,
      strokeColor: '#FFFFFF',
      strokeWeight: 2,
      anchor: new google.maps.Point(0, 0),
      labelOrigin: new google.maps.Point(config.labelOrigin.x, config.labelOrigin.y),
    },
    cursor: 'pointer',
  }

  if (showLabel) {
    markerOptions.label = {
      text: event.venue,
      color: config.textColor,
      fontSize: '13px',
      fontWeight: '700',
      className: `marker-label ${config.labelClass}`,
    }
  }

  const marker = new google.maps.Marker(markerOptions)

  // Add click listener based on venue
  if (event.venue === 'Cafe Ba-Ba-Reeba!') {
    marker.addListener('click', () => {
      window.open('https://www.cafebabareeba.com/', '_blank')
    })
  } else if (event.venue === "Ranalli's Pizza Bar") {
    marker.addListener('click', () => {
      window.open('https://ranallispizzeria.com/', '_blank')
    })
  } else if (event.venue === 'Cafe Brauer') {
    marker.addListener('click', () => {
      window.open('https://cafebrauer.com/', '_blank')
    })
  }

  return marker
}

// Create or update an active marker (for hover effects)
export function updateActiveMarker(
  marker: google.maps.Marker | null,
  map: google.maps.Map,
  position: google.maps.LatLngLiteral,
  category: MarkerCategory
): google.maps.Marker {
  const config = getMarkerConfig(category)

  if (marker) {
    // Reuse existing marker
    marker.setPosition(position)
    marker.setIcon({
      path: google.maps.SymbolPath.CIRCLE,
      scale: 12,
      fillColor: config.color,
      fillOpacity: 1,
      strokeColor: '#FFFFFF',
      strokeWeight: 3,
    })
    marker.setVisible(true)
    return marker
  } else {
    // Create new marker
    return new google.maps.Marker({
      position: position,
      map: map,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 12,
        fillColor: config.color,
        fillOpacity: 1,
        strokeColor: '#FFFFFF',
        strokeWeight: 3,
      },
    })
  }
}

export function createInfoWindowContent(
  name: string,
  category: string,
  details?: { address?: string; time?: string; day?: string }
): string {
  const categoryLabel = category.charAt(0).toUpperCase() + category.slice(1)

  let content = `
    <div style="padding: 8px; max-width: 250px;">
      <h3 style="margin: 0 0 8px 0; color: var(--dark-wood); font-size: 1.1rem; font-family: Georgia, serif;">${name}</h3>
  `

  if (details?.address) {
    content += `
      <p style="margin: 0 0 6px 0; color: var(--text-secondary); font-size: 0.9rem;">${details.address}</p>
    `
  }

  if (details?.day && details?.time) {
    content += `
      <p style="margin: 0; color: var(--sage-dark); font-size: 0.85rem; font-style: italic;">${details.day}, ${details.time}</p>
    `
  } else {
    content += `
      <p style="margin: 0; color: var(--sage-dark); font-size: 0.85rem; font-style: italic;">${categoryLabel}</p>
    `
  }

  content += `</div>`
  return content
}
