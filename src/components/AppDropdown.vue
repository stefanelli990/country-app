<template>
    <div class="relative w-full  sm:w-44 z-10">
        <button @click="toggleDropdown" class="p-4 bg-white rounded-md shadow-md shadow-slate-200 flex items-center justify-between space-x-4 w-full dark:bg-slate-800 dark:shadow-slate-900" ref="toggle">
            <span>{{ countriesStore.filter }}</span>
            <Icon icon="tabler:chevron-down" width="1.25rem"/>
        </button>
        <ul v-show="dropdownIsShown" class="absolute top-14 left-0 bg-white shadow-md w-full rounded-md cursor-pointer overflow-hidden dark:bg-slate-800" ref="dropdown-content">
            <li class="py-3 px-4 hover:bg-blue-50 dark:hover:bg-slate-700" @click="countriesStore.filter = 'All Regions'">All Regions</li>
            <li class="py-3 px-4 hover:bg-blue-50 dark:hover:bg-slate-700" @click="countriesStore.filter = 'Africa'">Africa</li>
            <li class="py-3 px-4 hover:bg-blue-50 dark:hover:bg-slate-700" @click="countriesStore.filter = 'Americas'">Americas</li>
            <li class="py-3 px-4 hover:bg-blue-50 dark:hover:bg-slate-700" @click="countriesStore.filter = 'Asia'">Asia</li>
            <li class="py-3 px-4 hover:bg-blue-50 dark:hover:bg-slate-700" @click="countriesStore.filter = 'Europe'">Europe</li>
            <li class="py-3 px-4 hover:bg-blue-50 dark:hover:bg-slate-700" @click="countriesStore.filter = 'Oceania'">Oceania</li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useCountriesStore } from '../stores/countriesStore'
import { onClickOutside } from '@vueuse/core'

const countriesStore = useCountriesStore()

const dropdownIsShown = ref(false)
const dropdownContent = ref(null)
const toggle = ref(null)

const toggleDropdown = () => {
    dropdownIsShown.value = !dropdownIsShown.value
}

onClickOutside([dropdownContent], () => {
    dropdownIsShown.value = false
}, {
  ignore: [toggle]
});

</script>