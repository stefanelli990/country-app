<!-- CountryDetailsView.vue -->

<template>
  <main class="max-w-4xl">
    <div class="flex justify-start my-8">
      <router-link to="/" class="btn">
        <Icon icon="fluent:arrow-left-16-filled" width="1rem" height="1rem" />
        <span>Back</span>
      </router-link>
    </div>
    <LoadingSpinner v-if="countriesStore.isLoading"/>
    <div v-else-if="countryDetails" class="flex flex-col space-y-8 mb-4 md:space-x-12 md:flex-row md:space-y-0">
        <div class="flex justify-center items-start">
          <span :class="countriesStore.getCountryFlag(countryDetails.cca2)" class="text-[50vw] sm:text-[250px] rounded-lg border border-gray-200 dark:border-0"></span>
        </div>
        <div class="flex flex-col bg-white flex-1 rounded-lg">
          <h1 class="p-4 border-b border-b-slate-100 text-2xl text-center font-extrabold md:text-left">{{ countryDetails.name.common }}</h1>
          <div>
            <div class="flex flex-col p-4 border-b border-b-slate-100 sm:flex-row">
            <span class="opacity-50 flex-1">Official Name</span>
            <span class="font-semibold flex-1">{{ countryDetails.name.official }}</span>
          </div>
          <div class="flex flex-col p-4 border-b border-b-slate-100 sm:flex-row">
            <span class="opacity-50 flex-1">Continent</span>
            <span class="font-semibold flex-1">{{ countryDetails.continents[0] }}</span>
          </div>
          <div class="flex flex-col p-4 border-b border-b-slate-100 sm:flex-row">
            <span class="opacity-50 flex-1">Languages</span>
            <span class="font-semibold flex-1">{{ countryDetails.languages ? Object.values(countryDetails.languages).join(', ') : 'N/A' }}</span>
          </div>
          <div class="flex flex-col p-4 border-b border-b-slate-100 sm:flex-row">
            <span class="opacity-50 flex-1">Area</span>
            <span class="font-semibold flex-1">{{ countryDetails.area.toLocaleString() }} km<sup>2</sup></span>
          </div>
          <div class="flex flex-col p-4 border-b border-b-slate-100 sm:flex-row">
            <span class="opacity-50 flex-1">Population</span>
            <span class="font-semibold flex-1">{{ countryDetails.population.toLocaleString() }}</span>
          </div>
          <div class="flex flex-col p-4 border-b border-b-slate-100 sm:flex-row">
            <span class="opacity-50 flex-1">Capital</span>
            <span class="font-semibold flex-1">{{ countryDetails.capital ? Object.values(countryDetails.capital).join(', ') : 'N/A' }}</span>
          </div>
          <div class="flex flex-col p-4 border-b border-b-slate-100 sm:flex-row">
            <span class="opacity-50 flex-1">Currency</span>
            <span class="font-semibold flex-1">{{ countryDetails.currencies ? Object.values(countryDetails.currencies)[0].name : 'N/A' }}</span>
          </div>
          <div class="flex flex-col p-4 border-b border-b-slate-100 sm:flex-row">
            <span class="opacity-50 flex-1">Border Countries</span>
            <!-- <span class="font-semibold flex-1">{{ countryDetails.borders ? Object.values(countryDetails.borders).join(', ') : 'N/A' }}</span> -->
            <span class="font-semibold flex-1"><button v-for="borderCountry in countryDetails.borders" :key="borderCountry.id" @click="goToCountryDetails(borderCountry)" class="p-1 bg-slate-400 mr-2 mb-2">{{ getCountryNames(borderCountry) }}</button></span>
          </div>
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


const countriesStore = useCountriesStore()

const countryDetails = ref(null)
const route = useRoute()
const router = useRouter()



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


const getCountryNames = (code) => {
  
  const countryNames = {
    // Example mapping of CCA3 to country names
    "USA": "United States",
    "GBR": "United Kingdom",
    // Add more mappings as needed
  };

  return countryNames[code] || "N/A";
}

</script>