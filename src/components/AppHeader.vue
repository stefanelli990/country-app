<!-- AppHeaer.vue -->

<template>
    <header class="bg-white shadow-sm dark:bg-slate-800/40">
        <div class="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center ">
            <RouterLink to="/" class="flex items-center space-x-2 dark:text-white">
                <h1 class="text-2xl font-bold">VueNation</h1>
            </RouterLink>
            <button @click="toggleDark()" class="flex items-center space-x-1 dark:text-white">
                <Icon v-if="!isDark" icon="material-symbols-light:dark-mode-rounded" width="24" height="24"/>
                <Icon v-else icon="fluent:weather-sunny-28-filled" width="24" height="24"/>
                <span class="font-semibold">{{ !isDark ? 'Dark' : 'Light' }} Mode</span>
            </button>
        </div>
    </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)


</script>