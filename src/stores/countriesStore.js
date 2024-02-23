// countriesStore.js

import { defineStore } from 'pinia'

export const useCountriesStore = defineStore('countriesStore', {
  state: () => {
    return { 
      countriesData: [],
      filter: 'All',
      searchTerm: '',
      firstSearchedCountry: '',
      secondSearchedCountry: '',
      firstSelectedDropdownIsShown: false,
      secondSelectedDropdownIsShown: false,
      firstSelectedCountry: '',
      secondSelectedCountry: '',
      menuIsVisible: false,
      showNavbar: true,
      searchCountriesLink: false,
      firstSelectedFlag: null,
      secondSelectedFlag: 'Serbia'
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
     dropdownFilterCountriesSearch: (state) => (searched) => {
      const firstSearchedCountry = state.firstSearchedCountry.toLowerCase().trim()
      const secondSearchedCountry = state.secondSearchedCountry.toLowerCase().trim()
      
      if(searched === '') {
        return state.countriesData
      } else {
        return state.countriesData.filter(country => country.name.common.toLowerCase().startsWith(searched))
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
      } else if(search === this.firstSearchedCountry && this.firstSearchedCountry.length > 0) {
        console.log('its first seach dropdown')
        this.firstSearchedCountry = ''
      } else if(search === this.searchSecondCountry && this.searchSecondCountry.length > 0) {
        console.log('its second search dropdown')
        this.searchSecondCountry = ''
      } 
    },
    compareCountries() {
      const countryOne = this.countriesData.filter(country => country.name.common === this.firstSearchedCountry)
      const countryTwo = this.countriesData.filter(country => country.name.common === this.searchSecondCountry)
      console.log(countryOne[0].ccn3)
      console.log(countryTwo[0].ccn3)

    }
  }
})
