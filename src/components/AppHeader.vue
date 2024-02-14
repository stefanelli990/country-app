<!-- AppHeaer.vue -->

<template>
    <header class="bg-white shadow-sm dark:bg-slate-800/40">
        <div class="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
            <div class="flex items-center space-x-12">
                <RouterLink to="/" class="flex items-center space-x-2 dark:text-white">
                    <h1 class="text-2xl font-bold">VueNation</h1>
                </RouterLink>
                <ul class="hidden md:flex space-x-4">
                    <li>
                        <RouterLink to="/" active-class="active-link">
                            Search Countries
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/compare-countries" active-class="active-link">
                            Compare Countries
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/about" active-class="active-link">
                            About App
                        </RouterLink>
                    </li>
                </ul>
            </div>   
            <button @click="countriesStore.openMenu" class="md:hidden">
                <Icon icon="charm:menu-hamburger" width="2rem" height="2rem" />
            </button>
            <div class="hidden md:block">
                <ToggleBtn />  
            </div>     
        </div>
    </header>
</template>

<script setup>

import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useCountriesStore } from '../stores/countriesStore'
import ToggleBtn from './ToggleBtn.vue'

const countriesStore = useCountriesStore()

</script>