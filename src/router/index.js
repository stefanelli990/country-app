// router index.js

import { createRouter, createWebHistory } from 'vue-router'
import SearchCountriesView from '../views/SearchCountriesView.vue'
import CompareCountriesView from '../views/CompareCountriesView.vue'
import AboutView from '../views/AboutView.vue'
import CountryDetailsView from '../views/CountryDetailsView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'search-countries',
      component: SearchCountriesView,
    },
    {
      path: '/compare-countries',
      name: 'compare-countries',
      component: CompareCountriesView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    // Add a dynamic route for country details
    {
      path: '/:cca2',
      name: 'country-details',
      component: CountryDetailsView,
      props: true,
      meta: { isCountryDetailsPage: true } 
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router