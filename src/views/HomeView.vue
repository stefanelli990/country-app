<template>
  <main>
    <div class="flex items-center justify-between my-12 space-x-4">
      <div class="max-w-md">
        <h1 class="text-4xl font-bold my-4">What's for dinner tonight? Let us help you decide.</h1>
        <p class="mb-4 text-xl">Search recipes for your favorite desserts, appetizers, main dish recipes, and more</p>
        <AppSearch @search="searchRecipes" />
      </div>
      <img class="w-[450px]" src="../assets/chef-illustration.svg" alt="">
    </div>

    <!-- displays radnom recipes -->
    <div v-if="showRandomRecipes">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-semibold">Random Picks</h2>
      </div>
      <div class="grid grid-cols-3 gap-4 mb-4">
     
          <RecipeItem v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
       
      </div>
    </div>

    <!-- displays searched recipes -->
    <div v-if="searchedRecipes.length">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-semibold">There are {{ searchedRecipes.length }} {{ searchedRecipes.length > 1 ? 'recipes' : 'recipe' }} for "{{ searchedTerm }}"</h2>
      </div>
      <div class="grid grid-cols-3 gap-4 mb-4">
        <RecipeItem v-for="recipe in searchedRecipes" :key="recipe.id" :recipe="recipe" />
      </div>
    </div>
   
    <!-- no recipes found -->
    <div v-if="noRecipeFound">
      <h2 class="text-2xl font-semibold">No recipes found for "{{ searchedTerm }}"</h2>
    </div>
    
    <div v-if="!recipes.length">
      Loading...
    </div>
        
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import AppSearch from '../components/AppSearch.vue'
import RecipeItem from '../components/RecipeItem.vue'

const recipes = ref([])
const searchedRecipes = ref([])
const searchedTerm = ref('')
const noRecipeFound = ref(false)
const showRandomRecipes = ref(true)



const getRecipes = async () => {
  try {
    const numberOfRecipes = 3;
    const randomRecipes = [];

    for (let i = 0; i < numberOfRecipes; i++) {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      if (response.ok) {
        const data = await response.json();
        if (data.meals) {
          randomRecipes.push(data.meals[0]);
          console.log(data.meals)
        }
      }
    }
    recipes.value = randomRecipes;
    
   
  } catch (err) {
    console.log(err)
  }
}

const searchRecipes = async (term) => {
  if (!term.trim()) {
    alert('Please enter a search term');
    return;
  }
  
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    searchedTerm.value = term
    showRandomRecipes.value = false
    if (response.ok) {
      const data = await response.json();
      if (data.meals) {
        searchedRecipes.value = data.meals;
        noRecipeFound.value = false
      } else {
        searchedRecipes.value = [];
        console.log('no recipe found')
        noRecipeFound.value = true
      }
    }
  } catch (err) {
    console.log(err)
  }
}

onMounted(getRecipes)
</script>
