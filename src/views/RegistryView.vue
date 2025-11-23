<script setup lang="ts">
import PageLayout from '../components/PageLayout.vue'
import ContentCard from '../components/ContentCard.vue'

// You'll replace this URL with your actual Zola Registry URL
const zolaRegistryUrl = 'https://www.zola.com/wedding/kaitlynandjoseph2026/registry'
</script>

<template>
  <PageLayout
    title="Registry"
    subtitle="Your presence is the greatest gift"
    gradient-from="var(--emerald-green)"
    gradient-to="var(--sage-dark)"
  >
    <!-- Registry Content -->
    <ContentCard icon-color="var(--sage-green)" max-width="900px">
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
          <polyline points="20 12 20 22 4 22 4 12" />
          <rect x="2" y="7" width="20" height="5" />
          <line x1="12" y1="22" x2="12" y2="7" />
          <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
          <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
        </svg>
      </template>

      <h2>Thank You for Celebrating With Us</h2>

      <p class="registry-description">
        Your love and support mean the world to us. If you'd like to give a gift, we've registered
        with Zola to make it easy. We're grateful for anything you choose to give, or simply for
        sharing in our joy on our wedding day.
      </p>

      <div class="registry-features">
        <div class="feature">
          <h3>Traditional Gifts</h3>
          <p>Home goods and essentials to start our life together</p>
        </div>
        <div class="feature">
          <h3>Experiences</h3>
          <p>Help us create memories on our honeymoon</p>
        </div>
        <div class="feature">
          <h3>Cash Funds</h3>
          <p>Contributions toward our future home and adventures</p>
        </div>
      </div>

      <div class="registry-cta">
        <a
          :href="zolaRegistryUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-primary"
        >
          View Our Zola Registry
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

      <p class="registry-note">
        Clicking the button above will take you to our Zola registry page where you can browse and
        purchase gifts.
      </p>
    </ContentCard>

    <!-- Quote Section -->
    <section class="quote-section">
      <div class="container text-center">
        <blockquote class="registry-quote">
          <p>
            "The greatest gift you can give us is your presence, but if you're feeling generous,
            we've created a registry to help us build our home together."
          </p>
          <cite>— Joseph & Kaitlyn</cite>
        </blockquote>
      </div>
    </section>
  </PageLayout>
</template>

<style scoped>
h2 {
  margin-bottom: 2rem;
  color: var(--dark-wood);
}

.registry-description {
  margin: 0 auto 3rem;
  max-width: 650px;
  font-size: 1.1rem;
  line-height: 1.8;
}

.registry-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
  padding: 2.5rem 2rem;
  background-color: var(--cream);
  border-radius: 8px;
}

.feature h3 {
  color: var(--sage-dark);
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.feature p {
  margin: 0 auto;
  font-size: 0.95rem;
  color: var(--text-secondary);
}

.registry-cta {
  margin: 3rem 0 2rem;
}

.registry-cta .btn {
  display: inline-flex;
  align-items: center;
  font-size: 1.1rem;
  padding: 1.25rem 3rem;
}

.registry-note {
  margin: 0 auto;
  font-size: 0.9rem;
  color: var(--text-light);
  font-style: italic;
}

.quote-section {
  padding: 6rem 2rem;
  background-color: #fff;
}

.registry-quote {
  max-width: 700px;
  margin: 0 auto;
}

.registry-quote p {
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  font-style: italic;
  color: var(--text-primary);
  line-height: 1.6;
  margin: 0 auto 2rem;
}

.registry-quote cite {
  font-family: 'Georgia', serif;
  font-size: 1.1rem;
  font-style: normal;
  color: var(--sage-dark);
}

@media (max-width: 768px) {
  .registry-features {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
