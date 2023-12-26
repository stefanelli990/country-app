// countriesStore.js

import { defineStore } from 'pinia'

export const useCountriesStore = defineStore('countriesStore', {
  state: () => {
    return { 
      countriesData: [],
      filter: 'All',
      searchTerm: '',
    }
  },
  getters: {
    filterCountries: (state) => {
      const search = state.searchTerm.toLowerCase().trim()
  
      if(search === '') {
        return state.countriesData
      } else {
        return state.countriesData.filter(country => country.name.common.toLowerCase().startsWith(search))
      }
     },
     filterByContinent: (state) => (continent) => {
      return state.filterCountries.filter(country => country.continents[0] === continent);
    }
  }
})
