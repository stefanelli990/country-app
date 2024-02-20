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
      searchCountriesLink: false,
      firstSelectedFlag: null,
      secondSelectedFlag: null
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
    },
    getCountryFlag: (state) => (code) => {
      return `fi fi-${code.toLowerCase()}`
    }
  },
  actions: {
    openMenu() {
      this.menuIsVisible = true
    },
    closeMenu() {
      this.menuIsVisible = false
    },
    clearInput(search) {
      
      if(search === this.searchTerm && this.searchTerm.length > 0) {
        console.log('its app searh')
        this.searchTerm = ''
      } else if(search === this.searchFirstCountry && this.searchFirstCountry.length > 0) {
        console.log('its first seach dropdown')
        this.searchFirstCountry = ''
      } else if(search === this.searchSecondCountry && this.searchSecondCountry.length > 0) {
        console.log('its second search dropdown')
        this.searchSecondCountry = ''
      } 
    },
    compareCountries() {
      const countryOne = this.countriesData.filter(country => country.name.common === this.searchFirstCountry)
      const countryTwo = this.countriesData.filter(country => country.name.common === this.searchSecondCountry)
      console.log(countryOne[0].ccn3)
      console.log(countryTwo[0].ccn3)

    }
  }
})
