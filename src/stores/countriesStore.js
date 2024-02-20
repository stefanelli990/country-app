// countriesStore.js

import { defineStore } from 'pinia'

export const useCountriesStore = defineStore('countriesStore', {
  state: () => {
    return { 
      countriesData: [],
      filter: 'All',
      searchTerm: '',
      searchFirstCountry: '',
      searchFirstCountryDropdownIsVisible: false,
      searchSecondCountry: '',
      searchSecondCountryDropdownIsVisible: false,
      menuIsVisible: false,
      showNavbar: true,
      searchCountriesLink: false
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
     dropdownFilterCountriesOne: (state) => {
      const searchFirstCountry = state.searchFirstCountry.toLowerCase().trim()
      console.log(searchFirstCountry)
      if(searchFirstCountry === '') {
        return state.countriesData
      } else {
        return state.countriesData.filter(country => country.name.common.toLowerCase().startsWith(searchFirstCountry))
      }
     },
     dropdownFilterCountriesTwo: (state) => {
      const searchSecondCountry = state.searchSecondCountry.toLowerCase().trim()
     
      if(searchSecondCountry === '') {
        return state.countriesData
      } else {
        return state.countriesData.filter(country => country.name.common.toLowerCase().startsWith(searchSecondCountry))
      }
     },
     filterByContinent: (state) => (continent) => {
      return state.filterCountries.filter(country => country.continents[0] === continent);
    }
  },
  actions: {
    openMenu() {
      this.menuIsVisible = true
    },
    closeMenu() {
      this.menuIsVisible = false
    },
 
  }
})
