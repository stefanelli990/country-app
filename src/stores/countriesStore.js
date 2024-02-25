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
      firstSelectedCountry: 'Serbia',
      secondSelectedCountry: 'United States',
      menuIsVisible: false,
      showNavbar: true,
      searchCountriesLink: false,
      firstSelectedFlag: 'fi fi-rs',
      secondSelectedFlag: 'fi fi-us',
      isLoading: false,

      countryOneDetails: {
        name: 'Serbia',
        continent: 'Europe',
        area: '88,361',
        population: '6,908,224',
        capital: 'Belgrade'
      },
      countryTwoDetails: {
        name: 'United States',
        continent: 'North America',
        area: '9,372,610',
        population: '329,484,123',
        capital: 'Washington, D.C.'
      }
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
      } else if(search === this.secondSearchedCountry && this.secondSearchedCountry.length > 0) {
        console.log('its second search dropdown')
        this.secondSearchedCountry = ''
      } 
    },
    compareCountries() {
      this.isLoading = true
      setTimeout(() => {
        const countryOne = this.countriesData.find(country => country.name.common === this.firstSelectedCountry)
        const countryTwo = this.countriesData.find(country => country.name.common === this.secondSelectedCountry)
      
        console.log(countryOne)

        this.countryOneDetails = {
          name: countryOne.name.common,
          continent: countryOne.continents[0], 
          area: countryOne.area.toLocaleString(),
          population: countryOne.population.toLocaleString(),
          capital: countryOne.capital ? Object.values(countryOne.capital).join(', ') : 'N/A'
          // Add more properties as needed
        }
        this.countryTwoDetails = {
          name: countryTwo.name.common,
          continent: countryTwo.continents[0], 
          area: countryTwo.area.toLocaleString(),
          population: countryTwo.population.toLocaleString(),
          capital: countryTwo.capital ? Object.values(countryTwo.capital).join(', ') : 'N/A'
          // Add more properties as needed
        }
        this.isLoading = false
      }, 500);
      
      
      

    }
  }
})
