<template>
    <div>
      <div v-if="recipe">
        <div class="relative">
            <img class="h-96 w-full object-cover" :src="recipe.strMealThumb" :alt="recipe.strMeal" />
            <div class="h-96 absolute top-0 left-0 right-0 bottom-0 bg-black/40"></div>
        </div>
        <div class="max-w-3xl mx-auto mb-4 grid grid-cols-3 gap-x-8">
            <div class="col-span-3">
              <RouterLink to="/" class="flex items-center my-10 text-primaryColor ">
                <Icon width="24" height="24" icon="fluent:chevron-left-16-filled"/><span class="text-xl font-semibold">Back</span>
              </RouterLink>
            </div>
            <div class="col-span-2">
                <h1 class="text-3xl font-bold  mb-8">{{ recipe.strMeal }}</h1>
                <div class="flex space-x-4 text-sm mb-8 font-normal">
                    <div class="border-r border-gray-300 pr-4">
                        <p class="font-medium">Category</p>
                        <p class="text-gray-400">{{ recipe.strCategory }}</p>
                    </div>
                    <div class="border-r border-gray-300 pr-4">
                        <p class="font-medium">Source</p>
                        <p class="text-gray-400">{{ extractDomainName(recipe.strSource) }}</p>
                    </div>
                    <div class="flex space-x-2">
                        <button  v-if="recipe.isFavorite" @click="remove">
                          <Icon width="36" height="36" icon="ion:heart-sharp" class="text-primaryColor"/>
                        </button>
                        <button  v-if="!recipe.isFavorite" @click="favorite">
                          <Icon width="36" height="36" icon="ion:heart-outline" />
                        </button>
                        <span class="font-semibold">{{ recipe.isFavorite ? 'Remove from' : 'Add to' }} <br> Favorite</span>
                    </div>
                </div>
                <h2 class="text-2xl font-semibold mb-4">Instructions:</h2>
                <p class="mb-8 font-normal">{{ recipe.strInstructions }}</p>
                <!-- <h2 class="text-2xl font-semibold mb-8">Video: How to make {{ recipe.strMeal }}</h2> -->
            </div>
            <div>
                <ul class="p-6 bg-slate-200/60 space-y-3 text-sm">
                    <li class="text-primaryColor font-semibold">Ingredients:</li>
                    <li v-for="(ingredient, index) in combinedIngredients" :key="index" class="font-normal">{{ ingredient }}</li>
                </ul>
            </div>
      
        </div>
      </div>
      <!-- <div v-else>
        <p>Loading...</p>
      </div> -->
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { Icon } from '@iconify/vue'
  import { useRecipeStore } from '../stores/recipeStore';

  const recipeStore = useRecipeStore()
  
  const route = useRoute();
  const recipe = ref(null);
  const id = ref(route.params.id);

  const favorite = () => {
    // console.log(recipe)
    
    recipe.value.isFavorite = true
    recipeStore.addToFavorite(recipe.value);
    console.log(recipe.value.isFavorite)
  }

  const remove = () => {
    recipe.value.isFavorite = false
    recipeStore.removeFromFavorite(recipe.value);
    console.log(recipe.value.isFavorite)
  }
  
  const fetchRecipe = async () => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id.value}`);
      if (response.ok) {
        const data = await response.json();
        if (data.meals) {
          recipe.value = data.meals[0];
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  onMounted(fetchRecipe);

  const combinedIngredients = computed(() => {
  if (recipe.value) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe.value[`strIngredient${i}`];
      const measurement = recipe.value[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== '') {
        const capitalizedIngredient = ingredient.charAt(0).toUpperCase() + ingredient.slice(1).toLowerCase();
        const lowercaseMeasurement = measurement.toLowerCase();
        ingredients.push(`${capitalizedIngredient } - ${lowercaseMeasurement}`);
      }
    }
    return ingredients;
  }
  return [];
});

const extractDomainName = (url) => {
    if (!url) {
      return "unknown";
    }
    let domain = url.slice(url.indexOf("//") + 2, url.indexOf("/", url.indexOf("//") + 2)); // extract the domain name
    if (domain.startsWith("www.")) { // check if domain starts with "www."
      domain = domain.slice(4); // remove the "www." subdomain
    }
    return domain;
}

  </script>
  