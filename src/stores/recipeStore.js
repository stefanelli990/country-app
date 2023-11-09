// stores/recipes.js
import { defineStore } from 'pinia'

export const useRecipeStore = defineStore('recipeStore', {
  state: () => {
    return { 
      favoriteRecipes: [],
    }
  },
  actions: {
    addToFavorite(recipe) {
      this.favoriteRecipes.push(recipe);
      console.log(this.favoriteRecipes[0].isFavorite)
    },
    removeFromFavorite(recipe) {
      const index = this.favoriteRecipes.indexOf(recipe);
      if (index !== -1) {
        this.favoriteRecipes.splice(index, 1);
      }
    }
  },
})
