<!-- CompareCountriesView -->

<template>
    <main>
        <div class="space-y-8 sm:space-y-0 sm:flex justify-center items-end sm:space-x-4 mt-16 mb-8">
            <div class="flex flex-col w-full sm:max-w-xs">
                <span class="border border-gray-200 text-center mx-auto rounded-md mb-4 text-[125px] dark:border-0"  :class="countriesStore.firstSelectedFlag"></span>
                <h1 class="text-center text-xl font-bold mb-4">{{ countriesStore.firstSelectedCountry }}</h1>
                <AppSearchDropdown  v-model="countriesStore.firstSearchedCountry" :country-flag="countriesStore.firstSelectedFlag" :dropdown-is-shown="countriesStore.firstSelectedDropdownIsShown" select-placeholder="Select first country" selected-from-dropdown="first"/>
            </div>
            <div class="flex flex-col w-full sm:max-w-xs">
                <span class="border border-gray-200 text-center mx-auto rounded-md mb-4 text-[125px] dark:border-0" :class="countriesStore.secondSelectedFlag"></span>
                <h1 class="text-center text-xl font-bold mb-4">{{ countriesStore.secondSelectedCountry }}</h1>
                <AppSearchDropdown  v-model="countriesStore.secondSearchedCountry" :country-flag="countriesStore.secondSelectedFlag" :dropdown-is-shown="countriesStore.secondSelectedDropdownIsShown" select-placeholder="Select second country" selected-from-dropdown="second"/>
            </div>
            <button @click="countriesStore.compareCountries" class="py-4 px-8 bg-white text-darkColor rounded-md shadow-lg w-full sm:w-auto">Compare</button>
        </div>

      <div class="overflow-auto">
        <table class="table-auto w-full text-left mb-4 bg-white  rounded-md overflow-hidden whitespace-nowrap">
          <thead class="border-b border-b-slate-300 bg-slate-200">
            <tr>
              <th class="p-4">General information</th>
              <th class="p-4">Serbia</th>
              <th class="p-4">United States</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-b-slate-300">
              <td class="p-4">Continent:</td>
              <td class="p-4">{{ countriesStore.countryOneDetails.continent }}</td>
              <td class="p-4">{{ countriesStore.countryTwoDetails.continent }}</td>
            </tr>
            <tr class="border-b border-b-slate-300">
              <td class="p-4">Area:</td>
              <td class="p-4">{{ countriesStore.countryOneDetails.area }} km<sup>2</sup></td>
              <td class="p-4">{{ countriesStore.countryTwoDetails.area }} km<sup>2</sup></td>
            </tr>
            <tr class="border-b border-b-slate-300">
              <td class="p-4">Population:</td>
              <td class="p-4">{{ countriesStore.countryOneDetails.population }}</td>
              <td class="p-4">{{ countriesStore.countryTwoDetails.population }}</td>
            </tr>
            <tr class="">
              <td class="p-4">Capital:</td>
              <td class="p-4">{{ countriesStore.countryOneDetails.capital }}</td>
              <td class="p-4">{{ countriesStore.countryTwoDetails.capital }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
    <LoadingSpinner v-if="countriesStore.isLoading"/>
</template>

<script setup>

import AppSearchDropdown from '../components/AppSearchDropdown.vue';
import { useCountriesStore } from '../stores/countriesStore'
import LoadingSpinner from '../components/LoadingSpinner.vue';

const countriesStore = useCountriesStore()

</script>