<template>
    <header class="bg-white shadow-sm">
        <div class="max-w-5xl mx-auto p-4 flex justify-between items-center">
            <RouterLink to="/" class="text-primaryColor flex items-center space-x-2 ">
                <Icon icon="fa6-solid:burger" width="32" height="32"/>
                <span class="text-2xl font-bold">Recipe App</span>
            </RouterLink>
            <nav class="space-x-4">
                <RouterLink to="/" :class="[$route.path === '/' ? 'text-primaryColor' : '']">Recipes</RouterLink>
                <RouterLink to="/about" :class="[$route.path === '/about' ? 'text-primaryColor' : '']">Favorite Recipes(0)</RouterLink>
            </nav>
        </div>
    </header>
</template>

<script setup>

import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue';

</script>