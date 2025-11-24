<script setup lang="ts">
import { ref, onMounted } from 'vue'

const heroVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    heroVisible.value = true
  }, 100)
})
</script>

<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero" :class="{ visible: heroVisible }">
      <div class="hero-content">
        <h1 class="hero-title">Joseph & Kaitlyn</h1>
        <div class="hero-divider"></div>
        <p class="hero-date">October 17th, 2026</p>
        <p class="hero-venue">Cafe Brauer · Lincoln Park · Chicago</p>
        <div class="hero-cta">
          RSVP Available Soon!
          <!-- <RouterLink to="/rsvp" class="btn btn-primary">RSVP Now</RouterLink> -->
        </div>
      </div>
      <div class="hero-scroll-indicator">
        <span style="color: white">Scroll to explore</span>
        <div class="scroll-arrow"></div>
      </div>
    </section>

    <!-- Welcome Text Section -->
    <section class="welcome-section">
      <div class="container text-center">
        <h2 class="fade-in visible">Join Us</h2>
        <p class="fade-in visible" style="margin: 0 auto">
          We're thrilled to invite you to celebrate our wedding day with us at the beautiful Cafe
          Brauer in Chicago's Lincoln Park. Join us for an unforgettable evening of love, laughter,
          and celebration.
        </p>
      </div>
    </section>

    <!-- Quick Links -->
    <section class="quick-links">
      <div class="container">
        <div class="links-grid">
          <RouterLink to="/us" class="link-card">
            <h3>Our Story</h3>
            <p>Learn about our journey together</p>
          </RouterLink>
          <RouterLink to="/party" class="link-card">
            <h3>Wedding Party</h3>
            <p>Meet the special people by our side</p>
          </RouterLink>
          <RouterLink to="/chicago" class="link-card">
            <h3>Visit Chicago</h3>
            <p>Explore our beautiful city</p>
          </RouterLink>
          <!-- <RouterLink to="/registry" class="link-card">
            <h3>Registry</h3>
            <p>View our wedding registry</p>
          </RouterLink> -->
          <!-- <RouterLink to="/faq" class="link-card">
            <h3>FAQ</h3>
            <p>Find answers to common questions</p>
          </RouterLink> -->
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  width: 100%;
}

/* Hero Section */
.hero {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, var(--sage-light) 0%, var(--sapphire-blue) 100%);
  position: relative;
  overflow: hidden;
  opacity: 0;
  transition: opacity 1s ease;
}

.hero.visible {
  opacity: 1;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('/images/joe-and-kait/Kauffman-Pezzulla-E-0001.jpg');
  background-position: center 30%;
  background-size: cover;
  opacity: 0.3;
  z-index: 0;
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: var(--cream);
  transform: translateY(20px);
  animation: fadeInUp 1s ease forwards 0.3s;
  opacity: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-title {
  font-size: clamp(3rem, 10vw, 7rem);
  color: var(--cream);
  margin-bottom: 1rem;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.hero-divider {
  width: 100px;
  height: 2px;
  background-color: var(--gold);
  margin: 2rem auto;
}

.hero-date {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-family: 'Georgia', serif;
  margin-bottom: 0.5rem;
  color: var(--cream);
}

.hero-venue {
  font-size: clamp(1rem, 2vw, 1.25rem);
  font-family: 'Helvetica Neue', sans-serif;
  color: var(--cream);
  opacity: 0.9;
  margin-bottom: 3rem;
}

.hero-cta {
  margin-top: 2rem;
}

.hero-scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: #ffffff;
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 0.9rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  z-index: 1;
  animation: bounce 2s infinite;
}

.scroll-arrow {
  width: 24px;
  height: 24px;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
  transform: rotate(45deg);
  margin: 1rem auto 0;
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-10px);
  }
  60% {
    transform: translateX(-50%) translateY(-5px);
  }
}

/* Welcome Section */
.welcome-section {
  padding: 8rem 2rem;
  background-color: var(--cream);
}

/* Quick Links */
.quick-links {
  padding: 6rem 2rem;
  background-color: #fff;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.link-card {
  padding: 3rem 2rem;
  text-align: center;
  text-decoration: none;
  background-color: var(--cream);
  border: 1px solid transparent;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.link-card:hover {
  transform: translateY(-5px);
  border-color: var(--sage-green);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.link-card h3 {
  color: var(--sage-dark);
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}

.link-card p {
  color: var(--text-secondary);
  font-size: 1rem;
  margin: 0 auto;
}

/* Mobile */
@media (max-width: 768px) {
  .hero {
    height: 100vh;
  }

  .welcome-section {
    padding: 4rem 2rem;
  }

  .quick-links {
    padding: 4rem 1rem;
  }

  .links-grid {
    gap: 1rem;
    overflow-x: scroll;
  }
}
</style>
