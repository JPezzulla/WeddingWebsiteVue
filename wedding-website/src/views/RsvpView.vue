<script setup lang="ts">
import PageLayout from '../components/PageLayout.vue'
import ContentCard from '../components/ContentCard.vue'
import InfoSection from '../components/InfoSection.vue'

// You'll replace this URL with your actual Zola RSVP URL
const zolaRsvpUrl = 'https://www.zola.com/wedding/your-wedding-url/rsvp'
</script>

<template>
  <PageLayout
    title="RSVP"
    subtitle="We can't wait to celebrate with you"
    gradient-from="var(--ruby-red)"
    gradient-to="var(--amethyst)"
  >
    <!-- RSVP Content -->
    <ContentCard icon-color="var(--gold)">
      <template #icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      </template>

      <h2>Please Respond by May 1, 2025</h2>

      <p class="rsvp-description">
        We're so excited to share our special day with you! Please let us know if you'll be able to
        join us by responding through our Zola wedding page.
      </p>

      <div class="rsvp-details">
        <div class="detail-item">
          <h3>Date</h3>
          <p>Saturday, June 14, 2025</p>
        </div>
        <div class="detail-item">
          <h3>Time</h3>
          <p>6:00 PM - 11:00 PM</p>
        </div>
        <div class="detail-item">
          <h3>Venue</h3>
          <p>Cafe Brauer<br />2021 N Stockton Dr<br />Chicago, IL 60614</p>
        </div>
      </div>

      <div class="rsvp-cta">
        <a :href="zolaRsvpUrl" target="_blank" rel="noopener noreferrer" class="btn btn-gold">
          RSVP on Zola
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            style="margin-left: 0.5rem"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </div>

      <p class="rsvp-note">
        You'll be redirected to our Zola page where you can let us know if you can make it and
        provide any dietary restrictions or special requests.
      </p>
    </ContentCard>

    <!-- Additional Info -->
    <InfoSection title="" :alternate="true">
      <div class="info-grid">
        <div class="info-item">
          <h3>Dress Code</h3>
          <p>Cocktail Attire</p>
        </div>
        <div class="info-item">
          <h3>Parking</h3>
          <p>Limited parking available at venue. We recommend using SpotHero or rideshare.</p>
        </div>
        <div class="info-item">
          <h3>Questions?</h3>
          <p>Check our <RouterLink to="/faq">FAQ page</RouterLink> or reach out to us directly.</p>
        </div>
      </div>
    </InfoSection>
  </PageLayout>
</template>

<style scoped>
h2 {
  margin-bottom: 2rem;
  color: var(--dark-wood);
}

.rsvp-description {
  margin: 0 auto 3rem;
  max-width: 600px;
  font-size: 1.1rem;
}

.rsvp-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
  padding: 2rem;
  background-color: var(--cream);
  border-radius: 8px;
}

.detail-item h3 {
  color: var(--sage-dark);
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
}

.detail-item p {
  margin: 0 auto;
  color: var(--text-primary);
}

.rsvp-cta {
  margin: 3rem 0 2rem;
}

.rsvp-cta .btn {
  display: inline-flex;
  align-items: center;
  font-size: 1.1rem;
  padding: 1.25rem 3rem;
}

.rsvp-note {
  margin: 0 auto;
  font-size: 0.9rem;
  color: var(--text-light);
  font-style: italic;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.info-item {
  padding: 2rem;
  text-align: center;
  background-color: var(--cream);
  border-radius: 8px;
}

.info-item h3 {
  color: var(--sage-dark);
  margin-bottom: 1rem;
}

.info-item p {
  margin: 0 auto;
}

.info-item a {
  color: var(--sage-dark);
  text-decoration: underline;
}

@media (max-width: 768px) {
  .rsvp-details {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }
}
</style>
