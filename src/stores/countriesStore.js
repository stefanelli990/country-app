// countriesStore.js

import { defineStore } from 'pinia'
// json file with countries informations
import borderCountries from '../data/countryNamesCodes.json'

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
        officialName: 'Republic of Serbia',
        region: 'Europe',
        subregion: 'Southeast Europe',
        topLevelDomain: '.rs',
        demonym: 'Serbian',
        area: '88,361',
        population: '6,908,224',
        capital: 'Belgrade',
        languages: 'Serbian',
        currency: 'Serbian dinar',
        borderCountries: ['BIH','BGR','HRV','HUN','UNK','MKD','MNE','ROU']
      },
      countryTwoDetails: {
        name: 'United States',
        officialName: 'United States of America',
        region: 'Americas',
        subregion: 'North America',
        topLevelDomain: '.us',
        demonym: 'American',
        area: '9,372,610',
        population: '329,484,123',
        capital: 'Washington, D.C.',
        languages: 'English',
        currency: 'United States dollar',
        borderCountries: ['CAN','MEX']
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
        return state.countriesData.filter(country => country.name.common.toLowerCase().startsWith(searched.toLowerCase().trim()))
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
          officialName: countryOne.name.official,
          region: countryOne.region,
          subregion: countryOne.subregion ? countryOne.subregion : 'N/A',
          topLevelDomain: countryOne.tld[0],
          demonym: countryOne.demonyms ? Object.values(countryOne.demonyms)[0].m : 'N/A',
          area: countryOne.area.toLocaleString(),
          population: countryOne.population.toLocaleString(),
          capital: countryOne.capital ? Object.values(countryOne.capital).join(', ') : 'N/A',
          languages: countryOne.languages ? Object.values(countryOne.languages).join(', ') : 'N/A',
          currency: countryOne.currencies ? Object.values(countryOne.currencies)[0].name : 'N/A',
          borderCountries: countryOne.borders ? countryOne.borders : 'N/A'
        
        }
        this.countryTwoDetails = {
          name: countryTwo.name.common,
          officialName: countryTwo.name.official,
          region: countryTwo.region,
          subregion: countryTwo.subregion,
          topLevelDomain: countryTwo.tld[0],
          demonym: countryTwo.demonyms ? Object.values(countryTwo.demonyms)[0].m : 'N/A',
          area: countryTwo.area.toLocaleString(),
          population: countryTwo.population.toLocaleString(),
          capital: countryTwo.capital ? Object.values(countryTwo.capital).join(', ') : 'N/A',
          languages: countryTwo.languages ? Object.values(countryTwo.languages).join(', ') : 'N/A',
          currency: countryTwo.currencies ? Object.values(countryTwo.currencies)[0].name : 'N/A',
          borderCountries: countryTwo.borders ? countryTwo.borders : 'N/A'
        }
        this.isLoading = false
      }, 500);
    },
    converCountryNames(codes) {
      const countryNames = []

      if(codes !== 'N/A') {
          codes.forEach(code => {
            const country = borderCountries.find(country => country.cca3 === code)
            countryNames.push(country ? country.Name : "N/A")
            });
          } else {
              return 'N/A'
      }

      return  Object.values(countryNames).join(', ')
    }
  }
})
