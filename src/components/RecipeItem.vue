<template>
  <RouterLink :to="{ name: 'singleRecipe', params: { id: recipe.idMeal }}">
    <div class="overflow-hidden rounded-2xl shadow-lg relative cursor-pointer h-full transition-all duration-200 hover:scale-105">
      <div class="bg-black/20 absolute top-0 left-0 right-0 h-52"></div>
      <img class="h-52 w-full object-cover" :src="recipe.strMealThumb" alt="">
      <div class="p-4 flex justify-between items-start">
        <div>
          <div class="text-lg font-semibold mr-2">{{ recipe.strMeal }}</div>
          <div class="text-gray-500 text-sm font-normal">Recipe by Steve Sanders</div>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<script setup>

const props = defineProps(['recipe'])

</script>