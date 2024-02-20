<!-- SearchCountriesView -->

<template>
  <main>
    <div class="flex flex-col space-y-4 justify-between items-center py-8 sticky top-0 z-10 duration-150 backdrop-blur-md bg-slate-50/80 dark:bg-slate-900/80 sm:flex-row sm:space-y-0">
      <AppSearch placeholder="Seach for a country..." v-model="countriesStore.searchTerm"/>
      <AppDropdown/>
    </div>
    <CountryList/>
  </main>
</template>

<script setup>

import AppDropdown from '../components/AppDropdown.vue'
import AppSearch from '../components/AppSearch.vue'
import CountryList from '../components/CountryList.vue'

import { useCountriesStore } from '../stores/countriesStore'

const countriesStore = useCountriesStore()

</script>
