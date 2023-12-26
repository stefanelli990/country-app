<!-- CountryDetailsView.vue -->

<template>
  <main class="max-w-3xl">
    <div class="flex justify-start my-12">
      <router-link to="/" class="bg-blue-600 text-white rounded-md px-4 py-3 space-x-2 flex items-center text-lg">
      <Icon icon="charm:chevron-left" />
      <span>Back</span>
    </router-link>
    </div>
    <div v-if="isLoading" class="text-center mt-4">Loading...</div>
    <div v-else-if="countryDetails" class="grid sm:grid-cols-2  gap-4">
      <div class="col-span-1">
        <span :class="countryCode" class="text-[50vw] sm:text-[200px] md:text-[250px] rounded-lg"></span>
      </div>
      <div class="col-span-1">
        <div class="space-y-2 text-md">
          <p>Official Name: <span class="font-semibold">{{ countryDetails.name.official }}</span></p>
          <p>Languages: <span class="font-semibold">{{ Object.values(countryDetails.languages).join(', ') }}</span></p>
          <p>Continent: <span class="font-semibold">{{ countryDetails.continents[0] }}</span></p>
          <p>Population: <span class="font-semibold">{{ countryDetails.population.toLocaleString() }}</span></p>
          <p>Capital: <span class="font-semibold">{{ Object.values(countryDetails.capital).join(', ') }}</span></p>
          <p>Area: <span class="font-semibold">{{ countryDetails.area.toLocaleString() }} km<sup>2</sup></span></p>
          <p>Currency: <span class="font-semibold">{{ Object.values(countryDetails.currencies)[0].name }}</span></p>
        </div>
      </div>
    </div>
  </main>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'

const countryDetails = ref(null)
const isLoading = ref(false)
const route = useRoute()

const fetchCountryDetails = async () => {
  const cca2 = route.params.cca2
  isLoading.value = true;
  try {
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${cca2}`)
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
})
</script>