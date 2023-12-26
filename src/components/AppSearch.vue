<!-- AppSearch.vue -->

<template>
    <div class="flex flex-col space-y-4 justify-between items-center my-12 sm:flex-row sm:space-y-0">
        <div class="relative w-full sm:max-w-sm md:max-w-md">
            <Icon class="text-gray-400 absolute top-1/2 left-4 -translate-y-1/2" width="24" height="24" icon="mdi:magnify" />
            <input v-model="countriesStore.searchTerm" class="bg-white rounded-md w-full p-4 pl-12 border border-gray-200 outline-blue-600 placeholder:font-normal" type="text" placeholder="Search for a country...">
        </div>
        <div class="relative w-full sm:w-44 z-10">
            <button @click="toggleDropdown" class="p-4 bg-white rounded-md flex items-center justify-between space-x-4 w-full" ref="toggle">
                <span>{{ countriesStore.filter }}</span>
                <Icon icon="tabler:chevron-down" />
            </button>
            <ul v-show="dropdownIsShown" class="absolute top-12 left-0 bg-white  w-full rounded-b-md cursor-pointer overflow-hidden" ref="dropdown-content">
                <li class="py-3 px-4 hover:bg-blue-50" @click="countriesStore.filter = 'All'">All</li>
                <li class="py-3 px-4 hover:bg-blue-50" @click="countriesStore.filter = 'Africa'">Africa</li>
                <li class="py-3 px-4 hover:bg-blue-50" @click="countriesStore.filter = 'Asia'">Asia</li>
                <li class="py-3 px-4 hover:bg-blue-50" @click="countriesStore.filter = 'Europe'">Europe</li>
                <li class="py-3 px-4 hover:bg-blue-50" @click="countriesStore.filter = 'North America'">North America</li>
                <li class="py-3 px-4 hover:bg-blue-50" @click="countriesStore.filter = 'South America'">South America</li>
                <li class="py-3 px-4 hover:bg-blue-50" @click="countriesStore.filter = 'Oceania'">Oceania</li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { useCountriesStore } from '../stores/countriesStore'
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
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