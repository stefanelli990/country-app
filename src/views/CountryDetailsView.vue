<!-- CountryDetailsView.vue -->

<template>
  <main class="max-w-3xl">
    <div class="flex justify-start my-12">
      <router-link to="/" class="space-x-1 flex items-center text-xl font-semibold">
        <Icon icon="fluent:chevron-left-12-filled" width="24"/>
      <span>Back</span>
    </router-link>
    </div>
    <LoadingSpinner v-if="isLoading"/>
    <div v-else-if="countryDetails" class="flex flex-col space-y-8 md:items-center md:space-x-12 md:flex-row md:space-y-0">
        <div class="flex justify-center">
          <span :class="countryCode" class="text-[50vw] sm:text-[250px] rounded-lg border border-gray-200 dark:border-0"></span>
        </div>
        <div class="flex flex-col space-y-2">
          <div>
            <span class="text-gray-500">Official Name: </span>
            <span class="font-semibold">{{ countryDetails.name.official }}</span>
          </div>
          <div>
            <span class="text-gray-500">Continent: </span>
            <span class="font-semibold">{{ countryDetails.continents[0] }}</span>
          </div>
          <div>
            <span class="text-gray-500">Languages: </span>
            <span class="font-semibold">{{ countryDetails.languages ? Object.values(countryDetails.languages).join(', ') : 'N/A' }}</span>
          </div>
          <div>
            <span class="text-gray-500">Area: </span>
            <span class="font-semibold">{{ countryDetails.area.toLocaleString() }} km<sup>2</sup></span>
          </div>
          <div>
            <span class="text-gray-500">Population: </span>
            <span class="font-semibold">{{ countryDetails.population.toLocaleString() }}</span>
          </div>
          <div>
            <span class="text-gray-500">Capital: </span>
            <span class="font-semibold">{{ countryDetails.capital ? Object.values(countryDetails.capital).join(', ') : 'N/A' }}</span>
          </div>
          <div>
            <span class="text-gray-500">Currency: </span>
            <span class="font-semibold">{{ countryDetails.currencies ? Object.values(countryDetails.currencies)[0].name : 'N/A' }}</span>
          </div>
        </div>
    </div>
  </main>
</template>


<script setup>

import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'
import LoadingSpinner from '../components/LoadingSpinner.vue';
import { useCountriesStore } from '../stores/countriesStore'

const countriesStore = useCountriesStore()

const countryDetails = ref(null)
const isLoading = ref(false)
const route = useRoute()

const fetchCountryDetails = async () => {
  const routeParam = route.params.cca2
  isLoading.value = true
  
  try {
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${routeParam}`)
    const data = await response.json()
    countryDetails.value = data[0]
    console.log(countryDetails.value)
  } catch (error) {
    console.error('Error fetching country details:', error)
  } finally {
    isLoading.value = false
  }
};

const countryCode = computed(() => {
  return `fi fi-${countryDetails.value.cca2.toLowerCase()}`
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