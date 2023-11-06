<template>
    <div class="overflow-hidden rounded-xl shadow-lg">
        <img class="h-52 w-full object-cover" :src="recipe.strMealThumb" alt="">
        <div class="p-4 flex justify-between items-start">
          <div>
            <div class="text-lg font-semibold mr-2">{{ recipe.strMeal }}</div>
            <div class="text-gray-400">Recipe by Steve Sanders</div>
          </div>
            <button>
              <Icon width="28" height="28" icon="mdi:heart-outline" />
            </button>
        </div>
      </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'

const props = defineProps(['recipe'])

</script>