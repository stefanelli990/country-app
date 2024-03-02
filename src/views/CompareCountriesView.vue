<!-- CompareCountriesView -->

<template>
    <main>
        <div class="space-y-8 sm:space-y-0 sm:flex justify-center items-end sm:space-x-4 mt-16 mb-8">
            <div class="flex flex-col w-full sm:max-w-xs">
                <span class="border border-slate-100 text-center mx-auto rounded-md mb-4 text-[125px] dark:border-none"  :class="countriesStore.firstSelectedFlag"></span>
                <h1 class="text-center text-lg font-extrabold mb-4">{{ countriesStore.firstSelectedCountry }}</h1>
                <AppSearchDropdown  v-model="countriesStore.firstSearchedCountry" :country-flag="countriesStore.firstSelectedFlag" :dropdown-is-shown="countriesStore.firstSelectedDropdownIsShown" select-placeholder="Select first country" selected-from-dropdown="first"/>
            </div>
            <div class="flex flex-col w-full sm:max-w-xs">
                <span class="border border-slate-100 text-center mx-auto rounded-md mb-4 text-[125px] dark:border-none" :class="countriesStore.secondSelectedFlag"></span>
                <h1 class="text-center text-lg font-extrabold mb-4">{{ countriesStore.secondSelectedCountry }}</h1>
                <AppSearchDropdown  v-model="countriesStore.secondSearchedCountry" :country-flag="countriesStore.secondSelectedFlag" :dropdown-is-shown="countriesStore.secondSelectedDropdownIsShown" select-placeholder="Select second country" selected-from-dropdown="second"/>
            </div>
            <button @click="countriesStore.compareCountries" class="btn btn-large">Compare</button>
        </div>

      <div class="overflow-auto relative">
        <table class="table-auto sm:table-fixed w-full text-left whitespace-nowrap">
          <thead class="border-b border-b-slate-200 dark:border-b-slate-800">
            <tr>
              <th class="p-4 "></th>
              <th class="p-4  font-extrabold">{{ countriesStore.countryOneDetails.name }}</th>
              <th class="p-4  font-extrabold">{{ countriesStore.countryTwoDetails.name }}</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-b-slate-200 align-top dark:border-b-slate-800 whitespace-normal">
              <td class="p-4 ">Official name:</td>
              <td class="p-4 ">{{ countriesStore.countryOneDetails.officialName }}</td>
              <td class="p-4 ">{{ countriesStore.countryTwoDetails.officialName }}</td>
            </tr>
            <tr class="border-b border-b-slate-200 dark:border-b-slate-800">
              <td class="p-4 ">Region:</td>
              <td class="p-4 ">{{ countriesStore.countryOneDetails.region }}</td>
              <td class="p-4 ">{{ countriesStore.countryTwoDetails.region }}</td>
            </tr>
            <tr class="border-b border-b-slate-200 dark:border-b-slate-800">
              <td class="p-4 ">Subregion:</td>
              <td class="p-4 ">{{ countriesStore.countryOneDetails.subregion }}</td>
              <td class="p-4 ">{{ countriesStore.countryTwoDetails.subregion }}</td>
            </tr>
            <tr class="border-b border-b-slate-200 dark:border-b-slate-800">
              <td class="p-4 ">Area:</td>
              <td class="p-4 ">{{ countriesStore.countryOneDetails.area }} km<sup>2</sup></td>
              <td class="p-4 ">{{ countriesStore.countryTwoDetails.area }} km<sup>2</sup></td>
            </tr>
            <tr class="border-b border-b-slate-200 dark:border-b-slate-800">
              <td class="p-4 ">Population:</td>
              <td class="p-4 ">{{ countriesStore.countryOneDetails.population }}</td>
              <td class="p-4 ">{{ countriesStore.countryTwoDetails.population }}</td>
            </tr>
            <tr class="border-b border-b-slate-200 align-top dark:border-b-slate-800">
              <td class="p-4 ">Capital:</td>
              <td class="p-4 ">{{ countriesStore.countryOneDetails.capital }}</td>
              <td class="p-4 ">{{ countriesStore.countryTwoDetails.capital }}</td>
            </tr>
            <tr class="border-b border-b-slate-200 dark:border-b-slate-800">
              <td class="p-4 ">Demonym:</td>
              <td class="p-4 ">{{ countriesStore.countryOneDetails.demonym }}</td>
              <td class="p-4 ">{{ countriesStore.countryTwoDetails.demonym }}</td>
            </tr>
            <tr class="border-b border-b-slate-200 align-top dark:border-b-slate-800 whitespace-normal">
              <td class="p-4 ">Languages:</td>
              <td class="p-4 ">{{ countriesStore.countryOneDetails.languages }}</td>
              <td class="p-4 ">{{ countriesStore.countryTwoDetails.languages }}</td>
            </tr>
            <tr class="border-b border-b-slate-200 dark:border-b-slate-800">
              <td class="p-4 ">Currency:</td>
              <td class="p-4 ">{{ countriesStore.countryOneDetails.currency }}</td>
              <td class="p-4 ">{{ countriesStore.countryTwoDetails.currency }}</td>
            </tr>
            <tr class="border-b border-b-slate-200 dark:border-b-slate-800">
              <td class="p-4 ">Top Level Domain:</td>
              <td class="p-4 ">{{ countriesStore.countryOneDetails.topLevelDomain }}</td>
              <td class="p-4 ">{{ countriesStore.countryTwoDetails.topLevelDomain }}</td>
            </tr>
            <tr class="align-top whitespace-normal">
              <td class="p-4 ">Border Countries:</td>
              <td class="p-4 ">{{ countriesStore.converCountryNames(countriesStore.countryOneDetails.borderCountries) }}</td>
              <td class="p-4 ">{{ countriesStore.converCountryNames(countriesStore.countryTwoDetails.borderCountries) }}</td>
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