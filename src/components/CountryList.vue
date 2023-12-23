<template>

    <ul class="grid grid-cols-3 gap-4" v-if="countriesStore.filter === 'All'">
        <CountryItem v-for="(country, index) in countriesStore.filterCountries" :key="country.id || index" :name="country.name.common" :flag="country.flags.svg" :coat-of-arms="country.coatOfArms.svg" :population="country.population" :capital="country.capital && country.capital.length > 0 ? country.capital[0] : 'N/A'" :area="country.area" :code="country.cca2"/>
    </ul>

    <ul class="grid grid-cols-3 gap-4" v-else-if="countriesStore.filter === 'Africa'">
        <CountryItem v-for="(country, index) in countriesStore.filterByContinent('Africa')" :key="country.id || index" :name="country.name.common" :flag="country.flags.svg" :coat-of-arms="country.coatOfArms.svg" :population="country.population" :capital="country.capital && country.capital.length > 0 ? country.capital[0] : 'N/A'" :area="country.area" :code="country.cca2"/>
    </ul>

    <ul class="grid grid-cols-3 gap-4" v-else-if="countriesStore.filter === 'Asia'">
        <CountryItem v-for="(country, index) in countriesStore.filterByContinent('Asia')" :key="country.id || index" :name="country.name.common" :flag="country.flags.svg" :coat-of-arms="country.coatOfArms.svg" :population="country.population" :capital="country.capital && country.capital.length > 0 ? country.capital[0] : 'N/A'" :area="country.area" :code="country.cca2"/>
    </ul>

    <ul class="grid grid-cols-3 gap-4" v-else-if="countriesStore.filter === 'Europe'">
        <CountryItem v-for="(country, index) in countriesStore.filterByContinent('Europe')" :key="country.id || index" :name="country.name.common" :flag="country.flags.svg" :coat-of-arms="country.coatOfArms.svg" :population="country.population" :capital="country.capital && country.capital.length > 0 ? country.capital[0] : 'N/A'" :area="country.area" :code="country.cca2"/>
    </ul>

    <ul class="grid grid-cols-3 gap-4" v-else-if="countriesStore.filter === 'North America'">
        <CountryItem v-for="(country, index) in countriesStore.filterByContinent('North America')" :key="country.id || index" :name="country.name.common" :flag="country.flags.svg" :coat-of-arms="country.coatOfArms.svg" :population="country.population" :capital="country.capital && country.capital.length > 0 ? country.capital[0] : 'N/A'" :area="country.area" :code="country.cca2"/>
    </ul>

    <ul class="grid grid-cols-3 gap-4" v-else-if="countriesStore.filter === 'South America'">
        <CountryItem v-for="(country, index) in countriesStore.filterByContinent('South America')" :key="country.id || index" :name="country.name.common" :flag="country.flags.svg" :coat-of-arms="country.coatOfArms.svg" :population="country.population" :capital="country.capital && country.capital.length > 0 ? country.capital[0] : 'N/A'" :area="country.area" :code="country.cca2"/>
    </ul>

    <ul class="grid grid-cols-3 gap-4" v-else-if="countriesStore.filter === 'Oceania'">
        <CountryItem v-for="(country, index) in countriesStore.filterByContinent('Oceania')" :key="country.id || index" :name="country.name.common" :flag="country.flags.svg" :coat-of-arms="country.coatOfArms.svg" :population="country.population" :capital="country.capital && country.capital.length > 0 ? country.capital[0] : 'N/A'" :area="country.area" :code="country.cca2"/>
    </ul>

</template>

<script setup>

import { useCountriesStore } from '../stores/countriesStore'
import CountryItem from './CountryItem.vue'

const countriesStore = useCountriesStore()

</script>