<!-- AppHeaer.vue -->

<template>
    <header class="bg-white shadow-sm">
        <div class="max-w-6xl mx-auto p-4 flex justify-between items-center">
            <RouterLink to="/" class="flex items-center space-x-2 ">
                <Icon icon="fluent-mdl2:world" width="28" height="28" class="text-blue-600"/>
                <h1 class="text-2xl font-bold"><span class="text-blue-600">Country</span>App</h1>
            </RouterLink>
        </div>
    </header>
</template>

<script setup>

import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'

</script>