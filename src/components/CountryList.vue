<template>

    <!-- All -->
    <ul class="grid grid-cols-3 gap-4" v-if="countriesStore.filter === 'All'">
        <CountryItem v-for="countries in countriesStore.countriesData" :key="countries" :name="countries.name.common" :flag="countries.flags.svg" :coat-of-arms="countries.coatOfArms.svg" :population="countries.population" :capital="countries.capital && countries.capital.length > 0 ? countries.capital[0] : 'N/A'" :area="countries.area" :code="countries.cca2"/>
    </ul>

    <!-- Africa -->
    <ul class="grid grid-cols-3 gap-4" v-if="countriesStore.filter === 'Africa'">
        <CountryItem v-for="countries in countriesStore.filterByContinent('Africa')" :key="countries" :name="countries.name.common" :flag="countries.flags.svg" :coat-of-arms="countries.coatOfArms.svg" :population="countries.population" :capital="countries.capital && countries.capital.length > 0 ? countries.capital[0] : 'N/A'" :area="countries.area" :code="countries.cca2"/>
    </ul>

    <!-- Asia -->
    <ul class="grid grid-cols-3 gap-4" v-if="countriesStore.filter === 'Asia'">
        <CountryItem v-for="countries in countriesStore.filterByContinent('Asia')" :key="countries" :name="countries.name.common" :flag="countries.flags.svg" :coat-of-arms="countries.coatOfArms.svg" :population="countries.population" :capital="countries.capital && countries.capital.length > 0 ? countries.capital[0] : 'N/A'" :area="countries.area" :code="countries.cca2"/>
    </ul>

    <!-- Europe -->
    <ul class="grid grid-cols-3 gap-4" v-if="countriesStore.filter === 'Europe'">
        <CountryItem v-for="countries in countriesStore.filterByContinent('Europe')" :key="countries" :name="countries.name.common" :flag="countries.flags.svg" :coat-of-arms="countries.coatOfArms.svg" :population="countries.population" :capital="countries.capital && countries.capital.length > 0 ? countries.capital[0] : 'N/A'" :area="countries.area" :code="countries.cca2"/>
    </ul>

    <!-- North America -->
    <ul class="grid grid-cols-3 gap-4" v-if="countriesStore.filter === 'North America'">
        <CountryItem v-for="countries in countriesStore.filterByContinent('North America')" :key="countries" :name="countries.name.common" :flag="countries.flags.svg" :coat-of-arms="countries.coatOfArms.svg" :population="countries.population" :capital="countries.capital && countries.capital.length > 0 ? countries.capital[0] : 'N/A'" :area="countries.area" :code="countries.cca2"/>
    </ul>

    <!-- South America -->
    <ul class="grid grid-cols-3 gap-4" v-if="countriesStore.filter === 'South America'">
        <CountryItem v-for="countries in countriesStore.filterByContinent('South America')" :key="countries" :name="countries.name.common" :flag="countries.flags.svg" :coat-of-arms="countries.coatOfArms.svg" :population="countries.population" :capital="countries.capital && countries.capital.length > 0 ? countries.capital[0] : 'N/A'" :area="countries.area" :code="countries.cca2"/>
    </ul>

    <!-- Oceania -->
    <ul class="grid grid-cols-3 gap-4" v-if="countriesStore.filter === 'Oceania'">
        <CountryItem v-for="countries in countriesStore.filterByContinent('Oceania')" :key="countries" :name="countries.name.common" :flag="countries.flags.svg" :coat-of-arms="countries.coatOfArms.svg" :population="countries.population" :capital="countries.capital && countries.capital.length > 0 ? countries.capital[0] : 'N/A'" :area="countries.area" :code="countries.cca2"/>
    </ul>

</template>

<script setup>

import { useCountriesStore } from '../stores/countriesStore'
import CountryItem from './CountryItem.vue'

const countriesStore = useCountriesStore()

</script>

