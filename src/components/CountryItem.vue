<template>
    <li class="bg-white rounded-md shadow-sm overflow-hidden cursor-pointer p-4">
        <span :class="countryCodez" class="text-7xl border border-gray-100 rounded-md mb-2"></span>
        <h1 class="text-lg font-bold mb-2">{{ name }}</h1>
        <p class="text-sm mb-1"><span class="font-bold">Area:</span> {{ area.toLocaleString() }} km<sup>2</sup></p>
        <p class="text-sm mb-1"><span class="font-bold">Population:</span> {{ population.toLocaleString() }}</p>
        <p class="text-sm"><span class="font-bold">Capital:</span> {{ capital }}</p>
    </li>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps(['name','flag','population','capital','area','code'])


const countryCodez = computed(() => {
    return `fi fi-${props.code.toLowerCase()}`
})

</script>