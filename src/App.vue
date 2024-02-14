<!-- App.vue  -->

<template>
    <AppHeader/>
    <HamburgerMenu/>
    <RouterView />
</template>

<script setup>

import { RouterView } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import HamburgerMenu from './components/HamburgerMenu.vue';

</script>


