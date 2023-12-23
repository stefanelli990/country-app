<template>
    <AppHeader/>
    <RouterView />
</template>

<script setup>

import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import AppHeader from './components/AppHeader.vue'

import { useCountriesStore} from './stores/countriesStore'

const countriesStore = useCountriesStore()

const fetchData = async() => {
    fetch(`https://restcountries.com/v3.1/all`)
    .then(response => response.json())
    .then(data => {
        countriesStore.countriesData = data.sort((a, b) => a.name.common.localeCompare(b.name.common))
        console.log(countriesStore.countriesData)
    })
}

onMounted(() => {
    fetchData()
})
</script>


