<template>
    <header class="bg-white shadow-sm">
        <div class="max-w-5xl mx-auto p-4 flex justify-between items-center">
            <div class="text-primaryColor flex items-center space-x-2 text-3xl font-bold"><Icon icon="fa6-solid:burger" /><span>Recipe App</span></div>
            <nav class="space-x-4">
                <RouterLink to="/">Recipes</RouterLink>
                <RouterLink to="/about">Favorite Recipes(0)</RouterLink>
            </nav>
        </div>
    </header>
</template>

<script setup>

import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue';

</script>