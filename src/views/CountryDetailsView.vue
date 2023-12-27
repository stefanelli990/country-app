<!-- CountryDetailsView.vue -->

<template>
  <main class="max-w-3xl">
    <div class="flex justify-start my-12">
      <router-link to="/" class="text-blue-600 space-x-1 flex items-center text-xl">
      <Icon icon="charm:chevron-left" />
      <span>Back</span>
    </router-link>
    </div>
    <div v-if="isLoading" class="text-center mt-4">Loading...</div>
    <div v-else-if="countryDetails" class="grid sm:grid-cols-2  gap-4">
      <div class="col-span-1">
        <div class="pb-6 flex justify-center sm:block border-b border-gray-200 sm:pb-0 sm:border-b-0">
          <span :class="countryCode" class="text-[50vw] sm:text-[200px] md:text-[250px] rounded-lg"></span>
        </div>
      </div>
      <div class="col-span-1">
        <div class="space-y-2 text-md sm:pl-8 sm:border-l border-gray-200">
          <div class="flex flex-col">
            <div class="text-gray-500">Official Name</div>
            <div class="font-semibold">{{ countryDetails.name.official }}</div>
          </div>
          <div class="flex flex-col">
            <div class="text-gray-500">Continent</div>
            <div class="font-semibold">{{ countryDetails.continents[0] }}</div>
          </div>
          <div class="flex flex-col">
            <div class="text-gray-500">Languages</div>
            <div class="font-semibold">{{ Object.values(countryDetails.languages).join(', ') }}</div>
          </div>
          <div class="flex flex-col">
            <div class="text-gray-500">Area</div>
            <div class="font-semibold">{{ countryDetails.area.toLocaleString() }} km<sup>2</sup></div>
          </div>
          <div class="flex flex-col">
            <div class="text-gray-500">Population</div>
            <div class="font-semibold">{{ countryDetails.population.toLocaleString() }}</div>
          </div>
          <div class="flex flex-col">
            <div class="text-gray-500">Capital</div>
            <div class="font-semibold">{{ Object.values(countryDetails.capital).join(', ') }}</div>
          </div>
          <div class="flex flex-col">
            <div class="text-gray-500">Currency</div>
            <div class="font-semibold">{{ Object.values(countryDetails.currencies)[0].name }}</div>
          </div>
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