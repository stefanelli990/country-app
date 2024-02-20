<!-- CompareCountriesView -->

<template>
    <main>
        <div class="space-y-4 sm:space-y-0 sm:flex justify-center sm:space-x-4 my-8">
            <AppSearchDropdown placeholder="Select first country" v-model="countriesStore.searchFirstCountry" :country-flag="countriesStore.firstSelectedFlag" :check-field="countriesStore.searchFirstCountry"/>
            <AppSearchDropdown placeholder="Select second country" v-model="countriesStore.searchSecondCountry" :country-flag="countriesStore.secondSelectedFlag" :check-field="countriesStore.searchSecondCountry"/>
            <button @click="countriesStore.compareCountries" class="py-4 px-8 bg-white text-darkColor rounded-md shadow-lg w-full sm:w-auto">Compare</button>
        </div>

    </main>
</template>

<script setup>

import AppSearchDropdown from '../components/AppSearchDropdown.vue';
import { useCountriesStore } from '../stores/countriesStore'

const countriesStore = useCountriesStore()

</script>