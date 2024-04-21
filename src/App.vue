<!-- App.vue  -->

<template>
    <AppHeader/>
    <HamburgerMenu/>
</template>

<script setup>

import { onMounted } from 'vue'
import { useCountriesStore } from './stores/countriesStore'
import AppHeader from './components/AppHeader.vue'
import HamburgerMenu from './components/HamburgerMenu.vue'

const countriesStore = useCountriesStore()

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


