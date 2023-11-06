<template>
    <form @submit.prevent="$emit('search', searchTerm)" class="relative w-full mb-8">
        <Icon class="text-gray-400 absolute top-1/2 left-4 -translate-y-1/2" width="24" height="24" icon="mdi:magnify" />
        <input v-model="searchTerm" class="bg-white rounded-full w-full p-3 pl-11 border border-gray-200 outline-primaryColor placeholder:font-normal" type="text" placeholder="Search...">
    </form>
</template>

<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const emit = defineEmits(['search'])

const searchTerm = ref('')

</script>