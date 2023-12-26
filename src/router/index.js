// index.js

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CountryDetailsView from '../views/CountryDetailsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    // Add a dynamic route for country details
    {
      path: '/:cca2',
      name: 'country-details',
      component: CountryDetailsView,
      props: true // Pass route params as props to the component
    }
  ]
})

export default router
