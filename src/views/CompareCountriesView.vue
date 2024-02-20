<!-- CompareCountriesView -->

<template>
    <main>
        <div class="flex justify-center space-x-8 my-8">
            <AppSearch placeholder="Search first country..."   v-model="countriesStore.searchFirstCountry"/>
            <AppSearch placeholder="Search second country..."   v-model="countriesStore.searchSecondCountry"/>
        </div>

    </main>
</template>

<script setup>

import AppSearch from '../components/AppSearch.vue'
import { useCountriesStore } from '../stores/countriesStore'

const countriesStore = useCountriesStore()

</script>