<!-- CountryList.vue -->

<template>
    <LoadingSpinner v-if="countriesStore.isLoading"/>
    <ul v-else-if="getFilteredCountries.length > 0" class="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <CountryItem v-for="(country, index) in getFilteredCountries" :key="country.id || index" :name="country.name.common" :flag="country.flags.svg" :coat-of-arms="country.coatOfArms.svg" :population="country.population" :capital="country.capital && country.capital.length > 0 ? country.capital[0] : 'N/A'" :area="country.area" :code="country.cca2" @click="goToCountryDetails(country.cca2)"/>
    </ul>
    <div v-else class="text-center text-lg mt-16 font-semibold">
        No countries found for the searched term.
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCountriesStore } from '../stores/countriesStore'
import CountryItem from './CountryItem.vue'
import LoadingSpinner from './LoadingSpinner.vue';

const countriesStore = useCountriesStore()
const router = useRouter();

const goToCountryDetails = (cca2) => {
  router.push(`/${cca2}`);

}

const getFilteredCountries = computed(() => {
  if (countriesStore.filter === 'All Regions') {
    return countriesStore.filterCountries
  } else {
    return countriesStore.filterByRegion(countriesStore.filter)
  }
})

const fetchData = async () => {
  countriesStore.isLoading = true;
  try {
    const response = await fetch('https://restcountries.com/v3.1/all')
    const data = await response.json()
    countriesStore.countriesData = data.sort((a, b) => a.name.common.localeCompare(b.name.common))
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    countriesStore.isLoading = false
  }
}

onMounted(() => {
  fetchData()
})

</script>