<!-- AppSearch.vue -->

<template>
    <div class="relative w-full sm:max-w-sm md:max-w-md ">
        <Icon class="text-slate-500 absolute top-1/2 left-4 -translate-y-1/2 dark:text-white" width="24" height="24" icon="mdi:magnify" />
        <input v-model="countriesStore.searchTerm" class="bg-white rounded-md w-full p-4 pl-12 shadow-md shadow-slate-200 placeholder:font-normal placeholder:text-slate-500 dark:shadow-slate-900 dark:placeholder:text-white dark:bg-slate-800" type="text" placeholder="Search for a country...">
        <button v-if="countriesStore.searchTerm" @click="countriesStore.clearInput(countriesStore.searchTerm)" class="absolute top-1/2 right-2 -translate-y-1/2  p-2">
            <Icon icon="ic:round-close" width="18" height="18"/>
        </button>
    </div>
</template>

<script setup>

import { onBeforeRouteLeave } from 'vue-router';
import { useCountriesStore } from '../stores/countriesStore'
import { Icon } from '@iconify/vue'

const countriesStore = useCountriesStore()

onBeforeRouteLeave(() => {
    countriesStore.searchTerm = ''
})
</script>