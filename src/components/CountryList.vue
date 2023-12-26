<!-- CountryList.vue -->

<template>
    <div v-if="isLoading">Loading...</div>
    <ul v-else-if="getFilteredCountries.length > 0" class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <CountryItem v-for="(country, index) in getFilteredCountries" :key="country.id || index" :name="country.name.common" :flag="country.flags.svg" :coat-of-arms="country.coatOfArms.svg" :population="country.population" :capital="country.capital && country.capital.length > 0 ? country.capital[0] : 'N/A'" :area="country.area" :code="country.cca2" @click="goToCountryDetails(country.cca2)"/>
    </ul>
    <div v-else>
        No countries found for the searched term.
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCountriesStore } from '../stores/countriesStore'
import CountryItem from './CountryItem.vue'

const countriesStore = useCountriesStore()
const router = useRouter();

const goToCountryDetails = (cca2) => {
  router.push(`/${cca2}`);

};

const isLoading = ref(true)

const getFilteredCountries = computed(() => {
  if (countriesStore.filter === 'All') {
    return countriesStore.filterCountries
  } else {
    return countriesStore.filterByContinent(countriesStore.filter)
  }
})

const fetchData = async () => {
  isLoading.value = true;
  try {
    const response = await fetch('https://restcountries.com/v3.1/all')
    const data = await response.json()
    countriesStore.countriesData = data.sort((a, b) => a.name.common.localeCompare(b.name.common))
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchData()
})

</script>