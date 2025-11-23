<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header class="site-header" :class="{ scrolled: isScrolled }">
    <div class="header-container">
      <RouterLink to="/" class="header-title" @click="closeMobileMenu">
        <span class="names">Joseph & Kaitlyn</span>
      </RouterLink>

      <!-- Hamburger Button -->
      <button
        class="hamburger"
        :class="{ open: isMobileMenuOpen }"
        @click="toggleMobileMenu"
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- Desktop Nav -->
      <nav class="nav desktop-nav">
        <RouterLink class="nav-link" exact-active-class="active" to="/">Home</RouterLink>
        <RouterLink class="nav-link" exact-active-class="active" to="/us">Our Story</RouterLink>
        <RouterLink class="nav-link" exact-active-class="active" to="/party"
          >Wedding Party</RouterLink
        >
        <RouterLink class="nav-link" exact-active-class="active" to="/chicago">Chicago</RouterLink>
        <!-- <RouterLink class="nav-link" exact-active-class="active" to="/rsvp">RSVP</RouterLink> -->
        <!-- <RouterLink class="nav-link" exact-active-class="active" to="/registry">Registry</RouterLink> -->
        <!-- <RouterLink class="nav-link" exact-active-class="active" to="/faq">FAQ</RouterLink> -->
      </nav>
    </div>

    <!-- Mobile Nav Menu -->
    <nav class="mobile-nav" :class="{ open: isMobileMenuOpen }">
      <RouterLink
        class="mobile-nav-link"
        exact-active-class="active"
        to="/"
        @click="closeMobileMenu"
        >Home</RouterLink
      >
      <RouterLink
        class="mobile-nav-link"
        exact-active-class="active"
        to="/us"
        @click="closeMobileMenu"
        >Our Story</RouterLink
      >
      <RouterLink
        class="mobile-nav-link"
        exact-active-class="active"
        to="/party"
        @click="closeMobileMenu"
        >Wedding Party</RouterLink
      >
      <RouterLink
        class="mobile-nav-link"
        exact-active-class="active"
        to="/chicago"
        @click="closeMobileMenu"
        >Chicago</RouterLink
      >
      <RouterLink
        class="mobile-nav-link"
        exact-active-class="active"
        to="/rsvp"
        @click="closeMobileMenu"
        >RSVP</RouterLink
      >
      <RouterLink
        class="mobile-nav-link"
        exact-active-class="active"
        to="/registry"
        @click="closeMobileMenu"
        >Registry</RouterLink
      >
      <RouterLink
        class="mobile-nav-link"
        exact-active-class="active"
        to="/faq"
        @click="closeMobileMenu"
        >FAQ</RouterLink
      >
    </nav>

    <!-- Overlay -->
    <div v-if="isMobileMenuOpen" class="overlay" @click="closeMobileMenu"></div>
  </header>
</template>

<style scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: rgba(245, 243, 240, 0.95);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  border-bottom: 1px solid transparent;
}

.site-header.scrolled {
  background-color: rgba(245, 243, 240, 0.98);
  border-bottom: 1px solid rgba(138, 154, 123, 0.2);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-title {
  text-decoration: none;
  color: var(--dark-wood);
  transition: color 0.3s ease;
}

.header-title:hover {
  color: var(--sage-dark);
}

.names {
  font-family: 'Georgia', 'Palatino', serif;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 400;
  letter-spacing: 0.05em;
}

.nav {
  display: flex;
  gap: clamp(1rem, 3vw, 2.5rem);
  align-items: center;
}

.nav-link {
  font-family: 'Helvetica Neue', 'Arial', sans-serif;
  font-size: clamp(0.85rem, 1.5vw, 0.95rem);
  font-weight: 500;
  text-decoration: none;
  color: var(--text-secondary);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.3s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--sage-dark);
  transition: width 0.3s ease;
}

.nav-link:hover {
  color: var(--sage-dark);
}

.nav-link:hover::after {
  width: 100%;
}

.nav-link.active {
  color: var(--sage-dark);
}

.nav-link.active::after {
  width: 100%;
}

/* Hamburger Menu */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;
}

.hamburger span {
  width: 30px;
  height: 3px;
  background-color: var(--dark-wood);
  border-radius: 2px;
  transition: all 0.3s ease;
  transform-origin: center;
}

.hamburger.open span:nth-child(1) {
  transform: rotate(45deg) translateY(10px);
}

.hamburger.open span:nth-child(2) {
  opacity: 0;
}

.hamburger.open span:nth-child(3) {
  transform: rotate(-45deg) translateY(-10px);
}

/* Mobile Navigation */
.mobile-nav {
  display: none;
  position: fixed;
  top: 0;
  right: -100%;
  width: 240px;
  height: 100vh;
  background-color: var(--cream);
  box-shadow: -2px 0 20px rgba(0, 0, 0, 0.1);
  padding: 6rem 1.5rem 1.5rem;
  transition: right 0.3s ease;
  z-index: 1000;
  flex-direction: column;
  gap: 0.5rem;
}

.mobile-nav.open {
  right: 0;
}

.mobile-nav-link {
  font-family: 'Helvetica Neue', 'Arial', sans-serif;
  font-size: 1.2rem;
  font-weight: 500;
  text-decoration: none;
  color: var(--text-secondary);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
}

.mobile-nav-link:hover {
  background-color: rgba(138, 154, 123, 0.1);
  color: var(--sage-dark);
}

.mobile-nav-link.active {
  background-color: var(--sage-green);
  color: var(--cream);
}

/* Overlay */
.overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Desktop Nav - hidden on mobile */
.desktop-nav {
  display: flex;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .header-container {
    padding: 1rem 1.5rem;
  }

  .names {
    font-size: 1.5rem;
  }

  /* Hide desktop nav */
  .desktop-nav {
    display: none;
  }

  /* Show hamburger */
  .hamburger {
    display: flex;
  }

  /* Show mobile nav */
  .mobile-nav {
    display: flex;
  }

  /* Show overlay */
  .overlay {
    display: block;
  }
}
</style>
