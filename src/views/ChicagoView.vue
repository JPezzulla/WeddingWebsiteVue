<script setup lang="ts">
import PageLayout from '../components/PageLayout.vue'
import InfoSection from '../components/InfoSection.vue'
import AsSeenOnBearBadge from '../components/AsSeenOnBearBadge.vue'
import router from '@/router'

const goToLink = (link: string) => () => {
  window.location.assign(link)
}

const hotels = [
  {
    name: 'The Viceroy',
    distance: '1.6 miles from venue',
    price: '$$$',
    description: 'Historic hotel nearby in Gold Coast with elegant rooms.',
    link: 'https://www.viceroyhotelsandresorts.com/chicago#/booking/step-1?arrive=10%2F16%2F2026&depart=10%2F18%2F2026&group=KAUF101626',
  },
  {
    name: 'Hotel Lincoln',
    distance: '0.3 miles from venue',
    price: '$$',
    description: 'Modern boutique hotel with rooftop bar overlooking the park.',
  },
  {
    name: 'voco Chicago Downtown - Riverwalk by IHG',
    distance: '2.5 miles from venue',
    price: '$',
    description: 'Centrally located on the river, nearby to plenty of Chicago sightseeing.',
  },
]

const restaurants = [
  {
    name: 'Cafe Ba-Ba-Reeba!',
    cuisine: 'Tapas',
    description: 'Fun upscale tapas place with a relaxed vibe.',
    link: 'https://www.cafebabareeba.com/',
  },
  {
    name: `Pequod's Pizza`,
    cuisine: 'Deep Dish',
    description: 'Mecca for Chicago Deep Dish pizza',
    link: 'https://pequodspizza.com/',
    asSeenOnBear: true,
  },

  {
    name: `The Wiener's Circle`,
    cuisine: 'Chicago Hot Dogs',
    description: 'Old school Chicago Hot Dog spot.',
    link: 'https://www.wienerscirclechicago.com/',
  },
  {
    name: `John's Food and Wine`,
    cuisine: 'American Fine Dining',
    description: 'Upscale counter service and seasonal menus.',
    link: 'https://www.johnsfoodandwine.com/',
  },
  {
    name: 'Del Seoul',
    cuisine: 'Korean Fusion and Tacos',
    description: 'Korean tacos and street food classics',
    link: 'https://delseoul.com/',
  },
  {
    name: 'Mr. Beef',
    cuisine: 'Italian Beef Sandwhiches',
    description: 'Original spot for Chicago Italian Beef sandwhiches',
    link: 'https://delseoul.com/',
    asSeenOnBear: true,
  },
]

const activities = [
  {
    name: 'Lincoln Park Zoo',
    description: 'Free admission zoo in the heart of the park.',
  },
  {
    name: 'Lake Michigan Beaches',
    description: 'Beautiful beaches and lakefront trails.',
  },
  {
    name: 'Art Institute of Chicago',
    description: 'World-class art museum with incredible collections.',
  },
  {
    name: 'Millennium Park',
    description: 'See The Bean and Crown Fountain.',
  },
  {
    name: 'Museum of Contemporary Art',
    description: 'Non-traditional and modern exhibits close by to Lincoln Park.',
  },
  {
    name: 'United Center',
    description:
      'Check out a Bulls or Blackhawks game! Stay tuned for the 2026 season schedules and see a game in a historic venue!',
  },
]
</script>

<template>
  <PageLayout
    title="Explore Chicago"
    subtitle="A guide for our out-of-town guests"
    gradient-from="var(--sapphire-blue)"
    gradient-to="var(--amethyst)"
    background-image="/images/joe-and-kait/Kauffman-Pezzulla-E-0023.jpg"
    background-position="center 52%"
    background-size="cover"
  >
    <!-- Hotels Section -->
    <InfoSection
      title="Where to Stay"
      intro="We recommend staying near Lincoln Park for easy access to the venue. Here are some of our favorite options:"
    >
      <div class="cards-grid">
        <div v-for="hotel in hotels" :key="hotel.name" class="info-card">
          <h3>{{ hotel.name }}</h3>
          <div class="card-meta">
            <span class="distance">{{ hotel.distance }}</span>
            <span class="price">{{ hotel.price }}</span>
          </div>
          <p>{{ hotel.description }}</p>
          <a :href="hotel.link" rel="noreferrer" target="_blank" v-if="hotel.link">
            <button class="hotel-link">
              <span class="hotel-link-text" :href="hotel.link"
                >Click here to book at {{ hotel.name }}</span
              >
            </button>
          </a>
        </div>
      </div>
    </InfoSection>

    <!-- Restaurants Section -->
    <InfoSection
      title="Where to Eat"
      intro="Chicago's food scene is incredible. Here are some must-try spots near the venue:"
      :alternate="true"
    >
      <div class="cards-grid">
        <div
          v-for="restaurant in restaurants"
          :key="restaurant.name"
          class="info-card"
          :onclick="goToLink(restaurant.link)"
        >
          <h3>{{ restaurant.name }}</h3>
          <div class="card-meta">
            <span class="cuisine">{{ restaurant.cuisine }}</span>
          </div>
          <p>{{ restaurant.description }}</p>
          <AsSeenOnBearBadge v-if="restaurant.asSeenOnBear" />
        </div>
      </div>
    </InfoSection>

    <!-- Activities Section -->
    <InfoSection
      title="Things to Do"
      intro="Make the most of your visit with these Chicago attractions:"
    >
      <div class="cards-grid">
        <div v-for="activity in activities" :key="activity.name" class="info-card">
          <h3>{{ activity.name }}</h3>
          <p>{{ activity.description }}</p>
        </div>
      </div>
    </InfoSection>

    <!-- Transportation Section -->
    <InfoSection title="Getting Around" :alternate="true">
      <div class="transport-grid">
        <div class="transport-card">
          <h3>Around the City</h3>
          <p>
            <strong>CTA Trains & Buses:</strong> Affordable and efficient public transit. Get a
            Ventra card for easy access.
          </p>
          <p><strong>Rideshare:</strong> Uber and Lyft are widely available throughout the city.</p>
          <p>
            <strong>Walking/Biking:</strong> Lincoln Park area is very walkable. Divvy bikes
            available for rent.
          </p>
        </div>
        <div class="transport-card">
          <h3>From the Airport</h3>
          <p>
            <strong>O'Hare (ORD):</strong> Take the Blue Line CTA train to Clark/Lake, then transfer
            to Red Line north to Fullerton. About 50 minutes.
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
          If you have questions about visiting Chicago, don't hesitate to reach out. We're happy to
          help make your trip memorable!
        </p>
        <!-- <div style="margin-top: 2rem">
          <RouterLink to="/faq" class="btn btn-primary">View FAQ</RouterLink>
        </div> -->
      </div>
    </section>
  </PageLayout>
</template>

<style scoped>
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.hotel-link {
  margin-top: 8px;
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
}

.info-card:hover {
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

@media (max-width: 768px) {
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
