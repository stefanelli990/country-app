<!-- CountryItem.vue -->

<template>
    <li class="bg-white flex flex-col items-center text-center space-y-2 rounded-md shadow-sm overflow-hidden cursor-pointer p-8 dark:bg-slate-800/50">
        <span :class="countriesStore.getCountryFlag(code)" class="border border-gray-200 rounded-md mb-2 text-[125px] dark:border-0"></span>
        <h1 class="text-lg font-bold">{{ name }}</h1>
    </li>
</template>

<script setup>

import { useCountriesStore } from '../stores/countriesStore'

const countriesStore = useCountriesStore()

const props = defineProps(['name','flag','population','capital','area','code'])

</script>

