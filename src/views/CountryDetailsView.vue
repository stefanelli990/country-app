<!-- CountryDetailsView.vue -->

<template>
  <main class="max-w-3xl">
    <!-- I added v-if="countryDetails" to check if countryDetails is not null or undefined before attempting to access countryDetails.name.common. This is a precautionary measure to avoid errors if countryDetails is initially null.

    When you fetch data asynchronously, there is a brief moment when the data may not be available, and trying to access properties on null or undefined can lead to runtime errors. By using v-if, you ensure that the content inside the h2 tag is only rendered when countryDetails is truthy (i.e., not null or undefined).

    If countryDetails is null, the <div> element with v-if="countryDetails" won't be rendered, and you won't encounter errors related to trying to access properties on null. It's a defensive programming approach to handle potential data availability issues. -->
    <router-link to="/" class="bg-white rounded-md p-4 space-x-4 w-44 flex justify-between">Back</router-link>
    <div v-if="countryDetails" class="grid grid-cols-3">
      <div class="col-span-1">
        <span :class="countryCode"></span>
      </div>
      <div class="col-span-2">
        <p>Country name: {{ countryDetails.name.common }}</p>
      </div>
      
      
      
    </div>
  </main>
</template>


<script setup>
import { useCountriesStore } from '../stores/countriesStore'
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const countriesStore = useCountriesStore()
const countryDetails = ref(null)
const route = useRoute()

const fetchCountryDetails = async () => {
  const cca2 = route.params.cca2
  countryDetails.value = countriesStore.countriesData.find(country => country.cca2 === cca2)
};

const countryCode = computed(() => {
  return `fi fi-${countryDetails.value.cca2.toLowerCase()}`
})

onMounted(() => {
  fetchCountryDetails()
})
</script>