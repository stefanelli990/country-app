import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CompareView from '../views/CompareView.vue'
import SingleRecipeView from '../views/SingleRecipeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/compare',
      name: 'compare',
      component: () => import('../views/CompareView.vue')
    },
    {
      path: '/singleRecipe/:id',
      name: 'singleRecipe',
      component: () => import('../views/SingleRecipeView.vue')
    }
  ]
})

export default router
