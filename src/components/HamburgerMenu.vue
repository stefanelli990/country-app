<template>
    <div :class="countriesStore.menuIsVisible ? '-translate-x-0' : 'translate-x-full'" class="bg-white flex justify-between flex-col p-8 h-full w-64 fixed top-0 right-0 z-30 duration-200 md:hidden dark:bg-slate-800">
        <div class="space-y-4 text-end">
            <button @click="countriesStore.closeMenu">
                <Icon icon="mingcute:close-line" width="2rem" height="2rem" />
            </button>
            <nav>
                <ul class="mt-8 flex flex-col space-y-4 text-lg">
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
        <ToggleBtn size="text-lg"/>
    </div>
    <div @click="countriesStore.closeMenu" class="absolute top-0 left-0 h-full w-full bg-darkColor/30 z-20 duration-200 md:hidden" :class="countriesStore.menuIsVisible ? 'visible opacity-100' : 'invisible opacity-0'"></div>
</template>

<script setup>
import { watchEffect } from 'vue'
import { Icon } from '@iconify/vue'
import { useCountriesStore } from '../stores/countriesStore'
import ToggleBtn from './ToggleBtn.vue';

const countriesStore = useCountriesStore()

watchEffect(() => {
    const body = document.querySelector('body')
    if(countriesStore.menuIsVisible) {
        body.classList.add('overflow-y-hidden')
    } else {
        body.classList.remove('overflow-y-hidden') 
    }
})

</script>