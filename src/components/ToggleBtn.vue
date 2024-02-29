<template>
    <button @click="toggleDark()" class="flex items-center justify-end font-semibold space-x-1 dark:text-white">
        <Icon v-if="!isDark" icon="material-symbols-light:dark-mode-rounded" width="1.5rem" height="1.5rem" class="text-yellow-400"/>
        <Icon v-else icon="fluent:weather-sunny-28-filled" width="24" height="24" class="text-yellow-400"/>
        <span>{{ !isDark ? 'Dark' : 'Light' }} Mode</span>
    </button>
</template>

<script setup>

import { Icon } from '@iconify/vue'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)

</script>