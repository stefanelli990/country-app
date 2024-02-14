<template>
    <div :class="{ 'translate-x-0': countriesStore.menuIsVisible}" class="bg-white flex justify-between flex-col p-8 min-h-screen w-64 fixed top-0 left-0 z-20 -translate-x-full duration-200 md:hidden dark:bg-slate-800">
        <div class="space-y-4">
            <button @click="countriesStore.closeMenu">
                <Icon icon="mingcute:close-line" width="2rem" height="2rem" />
            </button>
            <nav>
                <ul class="flex flex-col space-y-4">
                    <li>
                        <RouterLink to="/" active-class="active-link" @click="countriesStore.closeMenu">
                            Search Countries
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/compare-countries" active-class="active-link" @click="countriesStore.closeMenu">
                            Compare Countries
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/about" active-class="active-link" @click="countriesStore.closeMenu">
                            About App
                        </RouterLink>
                    </li>
                </ul>
            </nav>
        </div>
        <ToggleBtn/>
    </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { useCountriesStore } from '../stores/countriesStore'
import ToggleBtn from './ToggleBtn.vue';

const countriesStore = useCountriesStore()

</script>