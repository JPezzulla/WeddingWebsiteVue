import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutUs from '../components/AboutUs.vue'

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
      component: HomeView,
    },
    {
      path: '/rsvp',
      name: 'rsvp',
      component: HomeView,
    },
    {
      path: '/registry',
      name: 'registry',
      component: HomeView,
    },
    {
      path: '/faq',
      name: 'faq',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
