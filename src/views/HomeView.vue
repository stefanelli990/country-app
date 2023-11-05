<template>
  <main>
    <div class="flex items-center justify-between my-12 space-x-8">
      <div class="w-1/2">
        <h1 class="text-5xl font-bold my-4">What's for dinner tonight? Let us help you decide.</h1>
        <p class="mb-4 text-xl">Search recipes for your favorite desserts, appetizers, main dish recipes, and more</p>
        <AppSearch/>
      </div>
      <div class="w-1/2">
        <img class="w-full" src="../assets/chef-illustration.svg" alt="">
      </div>
    </div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-semibold">Random Picks</h2>
    </div>
    <div v-if="recipes.length">
      <div class="grid grid-cols-3 gap-4 mb-4">
        <RecipeItem v-for="recipe in recipes" :key="recipe.id" :recipe="recipe"/>
      </div>
    </div>
    <div v-else>
      Loading...
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import AppSearch from '../components/AppSearch.vue'
import RecipeItem from '../components/RecipeItem.vue'

const recipes = ref([])
const error = ref(null)

const getRecipes = async () => {
  try {
    const numberOfRecipes = 6; 
    const randomRecipes = [];

    for (let i = 0; i < numberOfRecipes; i++) {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      if (response.ok) {
        const data = await response.json();
        if (data.meals) {
          randomRecipes.push(data.meals[0]);
          console.log(data.meals[0])
        }
      }
    }
    recipes.value = randomRecipes;
  } catch (err) {
    error.value = err.message;
  }
}

onMounted(getRecipes)
</script>