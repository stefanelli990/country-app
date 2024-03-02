<!-- CountryDetailsView.vue -->

<template>
  <main class="max-w-5xl">
    <div class="flex justify-start my-8">
      <router-link to="/" class="btn">
        <Icon icon="fluent:arrow-left-16-filled" width="1rem" height="1rem" />
        <span>Back</span>
      </router-link>
    </div>
    <LoadingSpinner v-if="countriesStore.isLoading"/>
    <div v-else-if="countryDetails" class="flex flex-col space-y-8 mb-4 md:space-x-4 lg:space-x-12 lg:flex-row lg:space-y-0">
        <div class="flex justify-center items-start">
          <span :class="countriesStore.getCountryFlag(countryDetails.cca2)" class="border border-slate-100 text-[50vw] sm:text-[250px] rounded-lg dark:border-none"></span>
        </div>
        <div class="flex flex-col flex-1">
          <h1 class="mb-8 text-2xl text-center font-extrabold lg:text-left">{{ countryDetails.name.common }}</h1>
          <div class="flex space-x-4">
            <div class="flex-1">
              <div class="mb-4 flex flex-col ">
                <span class="opacity-50">Official Name</span>
                <span>{{ countryDetails.name.official }}</span>
              </div>
              <div class="mb-4 flex flex-col ">
                <span class="opacity-50">Area</span>
                <span>{{ countryDetails.area.toLocaleString() }} km<sup>2</sup></span>
              </div>
              <div class="mb-4 flex flex-col ">
                <span class="opacity-50">Population</span>
                <span>{{ countryDetails.population.toLocaleString() }}</span>
              </div>
              <div class="mb-4 flex flex-col ">
                <span class="opacity-50">Region</span>
                <span>{{ countryDetails.region }}</span>
              </div>
              <div class="mb-4 flex flex-col ">
                <span class="opacity-50">Sub Region</span>
                <span>{{ countryDetails.subregion ? countryDetails.subregion : 'N/A' }}</span>
              </div>
          </div>

          <div class="flex-1">
            <div class="mb-4 flex flex-col">
              <span class="opacity-50">Top Level Domain</span>
              <span>{{ countryDetails.tld ? countryDetails.tld[0] : 'N/A' }}</span>
            </div>
            <div class="mb-4 flex flex-col">
              <span class="opacity-50">Capital</span>
              <span>{{ countryDetails.capital ? Object.values(countryDetails.capital).join(', ') : 'N/A' }}</span>
            </div>
            <div class="mb-4 flex flex-col">
              <span class="opacity-50">Languages</span>
              <span>{{ countryDetails.languages ? Object.values(countryDetails.languages).join(', ') : 'N/A' }}</span>
            </div>
            <div class="mb-4 flex flex-col">
              <span class="opacity-50">Denonym</span>
              <span>{{ countryDetails.demonyms ? Object.values(countryDetails.demonyms)[0].m : 'N/A' }}</span>
            </div>
            <div class="mb-4 flex flex-col">
              <span class="opacity-50">Currency</span>
              <span>{{ countryDetails.currencies ? Object.values(countryDetails.currencies)[0].name : 'N/A' }}</span>
          </div>
        </div>
         
        
      </div>
      <div class="flex flex-col max-w-md">
          <span class="opacity-50 mb-2">Border Countries</span>
          <span class="flex flex-wrap gap-2">
            <button v-for="borderCountry in countryDetails.borders" :key="borderCountry.id" @click="goToCountryDetails(borderCountry)" class="btn btn-small">{{ getCountryNames(borderCountry) }}</button>
            <span v-if="!countryDetails.borders">N/A</span>
          </span>
        </div>
    </div>
  </div>
</main>
</template>


<script setup>

import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import { useCountriesStore } from '../stores/countriesStore'

// json file with countries informations
import borderCountries from '../data/countryNamesCodes.json'

const countriesStore = useCountriesStore()

const countryDetails = ref(null)
const route = useRoute()
const router = useRouter()

const getCountryNames = (code) => {
  console.log(code)
  const country = borderCountries.find(country => country.cca3 === code)

  return country ? country.Name : "N/A"
}

const goToCountryDetails = (cca2) => {
  router.push(`/${cca2}`)
}

const fetchCountryDetails = async () => {
  const routeParam = route.params.cca2
  countriesStore.isLoading = true
  
  try {
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${routeParam}`)
    const data = await response.json()
    countryDetails.value = data[0]
    console.log(countryDetails.value)
  } catch (error) {
    console.error('Error fetching country details:', error)
  } finally {
    countriesStore.isLoading = false
  }
}

watch(() => route.params.cca2, (newValue, oldValue) => {
  fetchCountryDetails(newValue)
})

onMounted(() => {
  fetchCountryDetails()

  if (route.meta.isCountryDetailsPage) {
      console.log("You are on the country details page")
      countriesStore.searchCountriesLink = true
    } 
})

onBeforeUnmount(() => {
  console.log("Leaving the country details page");
  countriesStore.searchCountriesLink = false
})

</script>