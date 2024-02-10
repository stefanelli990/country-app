// router index.js

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CountryDetailsView from '../views/CountryDetailsView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    // Add a dynamic route for country details
    {
      path: '/:cca2',
      name: 'country-details',
      component: CountryDetailsView,
      props: true 
    }
  ]
})

export default router