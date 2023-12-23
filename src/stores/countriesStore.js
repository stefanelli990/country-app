
import { defineStore } from 'pinia'

export const useCountriesStore = defineStore('countriesStore', {
  state: () => {
    return { 
      countriesData: ([]),
      filter: 'All'
    }
  },
  getters: {
    filterByContinent: (state) => (continent) => {
      return state.countriesData.filter(country => country.continents[0] === continent);
    }
  }

})
