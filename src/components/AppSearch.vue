<!-- AppSearch.vue -->

<template>
    <div class="relative w-full sm:max-w-sm md:max-w-md ">
        <Icon class="text-gray-400 absolute top-1/2 left-4 -translate-y-1/2" width="24" height="24" icon="mdi:magnify" />
        <input @keydown="toggleSearchDropdown($event)" @click="toggleSearchDropdown($event)" :value="modelValue" @input="emit('update:modelValue', $event.target.value)" class="bg-white rounded-md w-full p-4 pl-12 border border-slate-200 placeholder:font-normal dark:border-0 dark:bg-slate-950/50" type="text" :placeholder="placeholder">
        <button v-if="countriesStore.searchTerm" @click="clearInput" class="absolute top-1/2 right-2 -translate-y-1/2  p-2">
            <Icon icon="ic:round-close" width="18" height="18"/>
        </button>


        <ul ref="dropdown-content" v-if="firstDropd" class="absolute top-14 left-0 bg-white w-full max-h-[228px] overflow-y-auto rounded-md border border-slate-200 cursor-pointer">
            <li @click="selectCountry($event, 'first')" v-for="(country, index) in countriesStore.dropdownFilterCountriesOne" :key="country.id || index" class="py-3 px-4 flex items-center justify-between hover:bg-blue-50 dark:hover:bg-slate-700"><span>{{ country.name.common }}</span><img class="w-8 border border-gray-200" :src="country.flags.svg" alt=""></li>
            <li v-if="countriesStore.dropdownFilterCountriesOne.length === 0" class="py-3 px-4 flex items-center justify-between">No countrise found</li>
        </ul>


        <ul ref="dropdown-content" v-if="secondDropd" class="absolute top-14 left-0 bg-white w-full max-h-[228px] overflow-y-auto rounded-md border border-slate-200 cursor-pointer">
            <li @click="selectCountry($event, 'second')" v-for="(country, index) in countriesStore.dropdownFilterCountriesTwo" :key="country.id || index" class="py-3 px-4 flex items-center justify-between hover:bg-blue-50 dark:hover:bg-slate-700"><span>{{ country.name.common }}</span><img class="w-8 border border-gray-200" :src="country.flags.svg" alt=""></li>
            <li v-if="countriesStore.dropdownFilterCountriesTwo.length === 0" class="py-3 px-4 flex items-center justify-between">No countrise found</li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCountriesStore } from '../stores/countriesStore'
import { Icon } from '@iconify/vue'
import { onMounted } from 'vue'
import { onClickOutside } from '@vueuse/core'

const countriesStore = useCountriesStore()

const props = defineProps (['searchDropdownIsShown','countryName','placeholder','modelValue'])

const emit = defineEmits(['update:modelValue'])


const clearInput = () => {
    countriesStore.searchTerm = ''
}

const firstDropd = ref(false)
const secondDropd = ref(false)

const dropdownContent = ref(null)

const toggleSearchDropdown = (e) => {
    if(e.target.placeholder === 'Search first country...') {
        console.log('first field')
        firstDropd.value = true
    } else if(e.target.placeholder === 'Search second country...') {
        console.log('second field')
        secondDropd.value = true
    }
    console.log(countriesStore.searchFirstCountry)
}



const selectCountry = (e, dropdownType) => {
  const li = e.target.closest('li')

  if (li) {
    const countryName = li.querySelector('span').textContent
    if (dropdownType === 'first') {
      countriesStore.searchFirstCountry = countryName
    } else if (dropdownType === 'second') {
      countriesStore.searchSecondCountry = countryName
    }
  }
}

onClickOutside([dropdownContent], () => {
    firstDropd.value = false
    secondDropd.value = false
});

const fetchData = async () => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all')
    const data = await response.json()
    countriesStore.countriesData = data.sort((a, b) => a.name.common.localeCompare(b.name.common))
  } catch (error) {
    console.error('Error fetching data:', error)
  } 
}

onMounted(() => {
    fetchData()
})

</script>