import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutUs from '../components/AboutUs.vue'
import ChicagoView from '../views/ChicagoView.vue'
import WeddingPartyView from '../views/WeddingPartyView.vue'
import RsvpView from '../views/RsvpView.vue'
import RegistryView from '../views/RegistryView.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/us',
      name: 'us',
      component: AboutUs,
    },
    {
      path: '/chicago',
      name: 'chicago',
      component: ChicagoView,
    },
    {
      path: '/party',
      name: 'party',
      component: WeddingPartyView,
    },
    // {
    //   path: '/rsvp',
    //   name: 'rsvp',
    //   component: RsvpView,
    // },
    // {
    //   path: '/registry',
    //   name: 'registry',
    //   component: RegistryView,
    // },
    // {
    //   path: '/faq',
    //   name: 'faq',
    //   component: AboutView,
    // },
  ],
  scrollBehavior(to, from, savedPosition) {
    // If navigating to a hash (anchor link), scroll to that element
    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            el: to.hash,
            behavior: 'smooth',
          })
        }, 100)
      })
    }

    // Always scroll to top on route change (important for mobile)
    return new Promise((resolve) => {
      setTimeout(() => {
        // Force scroll to top immediately for mobile browsers
        window.scrollTo(0, 0)
        resolve({ top: 0, left: 0, behavior: 'instant' })
      }, 0)
    })
  },
})

// Additional mobile scroll fix - force scroll restoration to manual
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

export default router
