<!-- CountryItem.vue -->

<template>
    <li class="bg-white flex flex-col items-center text-center space-y-2 rounded-md shadow-md shadow-slate-200 overflow-hidden cursor-pointer p-8 dark:bg-slate-800 dark:shadow-slate-900">
        <span :class="countriesStore.getCountryFlag(code)" class="border border-slate-100 rounded-md mb-2 text-[125px] dark:border-none"></span>
        <h1 class="text-lg font-extrabold">{{ name }}</h1>
    </li>
</template>

<script setup>

import { useCountriesStore } from '../stores/countriesStore'

const countriesStore = useCountriesStore()

const props = defineProps(['name','flag','population','capital','area','code'])

</script>

