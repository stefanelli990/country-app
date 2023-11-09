<template>
  <main>
    <div class="grid grid-cols-3 gap-4">
      <RecipeItem v-for="recipe in recipeStore.favoriteRecipes" :key="recipe.id" :recipe="recipe" />
    </div>
  </main>
</template>

<script setup>
import RecipeItem from '../components/RecipeItem.vue'
import { useRecipeStore } from '../stores/recipeStore'

const recipeStore = useRecipeStore()


</script>


