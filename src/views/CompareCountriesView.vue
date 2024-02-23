<!-- CompareCountriesView -->

<template>
    <main>
        <div class="space-y-4 sm:space-y-0 sm:flex justify-center items-end sm:space-x-4 my-8">
            <div class="flex flex-col w-full max-w-sm">
                <span v-show="countriesStore.firstSelectedCountry" :class="countriesStore.firstSelectedFlag" class="border border-gray-200 text-center mx-auto rounded-md mb-4 text-[125px] dark:border-0"></span>
                <h1 class="text-center text-xl font-bold mb-4">{{ countriesStore.firstSelectedCountry }}</h1>
                <AppSearchDropdown  v-model="countriesStore.firstSearchedCountry" :country-flag="countriesStore.firstSelectedFlag" :dropdown-is-shown="countriesStore.firstSelectedDropdownIsShown" select-placeholder="Select first country" selected-from-dropdown="first"/>
            </div>
            <div class="flex flex-col w-full max-w-sm">
                <span v-show="countriesStore.secondSelectedCountry" :class="countriesStore.secondSelectedFlag" class="border border-gray-200 text-center mx-auto rounded-md mb-4 text-[125px] dark:border-0"></span>
                <h1 class="text-center text-xl font-bold mb-4">{{ countriesStore.secondSelectedCountry }}</h1>
                <AppSearchDropdown  v-model="countriesStore.secondSearchedCountry" :country-flag="countriesStore.secondSelectedFlag" :dropdown-is-shown="countriesStore.secondSelectedDropdownIsShown" select-placeholder="Select second country" selected-from-dropdown="second"/>
            </div>
            <button @click="countriesStore.compareCountries" class="py-4 px-8 bg-white text-darkColor rounded-md shadow-lg w-full sm:w-auto">Compare</button>
        </div>

    </main>
</template>

<script setup>

import AppSearchDropdown from '../components/AppSearchDropdown.vue';
import { useCountriesStore } from '../stores/countriesStore'

const countriesStore = useCountriesStore()

</script>