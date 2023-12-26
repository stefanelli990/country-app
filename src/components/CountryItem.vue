<!-- CountryItem.vue -->

<template>
    <li class="bg-white flex flex-col items-center text-center space-y-2 rounded-md shadow-sm overflow-hidden cursor-pointer p-8">
        <span :class="countryCodez" class="border border-gray-100 rounded-md mb-2 text-[125px]"></span>
        <h1 class="text-lg font-bold">{{ name }}</h1>
    </li>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps(['name','flag','population','capital','area','code','cca3'])


const countryCodez = computed(() => {
    return `fi fi-${props.code.toLowerCase()}`
})

</script>

