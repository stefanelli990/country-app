<template>
    <div class="relative w-full sm:max-w-xs">
        <div class="absolute left-4 top-3" :class="!countryFlag ? 'hidden' : 'block'"><span class="text-2xl border border-slate-100" :class="countryFlag"></span></div>
        <input  @click="toggleSearchDropdown($event)" :value="modelValue" @input="emit('update:modelValue', $event.target.value)" class="bg-white rounded-md shadow-md w-full p-4 cursor-pointer placeholder:font-medium placeholder:text-darkColor dark:bg-slate-950/50" :class="{'cursor-text': emptySearch, 'pl-14': countryFlag}" type="text" :placeholder="placeholder">
        <button  v-if="emptySearch" @click="countriesStore.clearInput(checkField)" class="absolute top-1/2 right-2 -translate-y-1/2  p-2">
            <Icon icon="ic:round-close" width="18" height="18"/>
        </button>
        <button v-else class="absolute top-1/2 right-2 -translate-y-1/2 p-2 pointer-events-none">
            <Icon icon="ion:chevron-down" width="18" height="18" />
        </button>

        


        <ul ref="dropdown-content" v-if="firstDropd" class="absolute top-14 left-0 bg-white w-full max-h-[228px] overflow-y-auto rounded-md border border-slate-200 cursor-pointer">
            <li @click="selectCountry($event, 'first')" v-for="(country, index) in countriesStore.dropdownFilterCountriesOne" :key="country.id || index" class="py-3 px-4 flex items-center space-x-4 hover:bg-blue-50 dark:hover:bg-slate-700"><span class="country-flag text-2xl border border-slate-100" :class="countriesStore.getCountryFlag(country.cca2)"></span>
                <span class="country-name">{{ country.name.common }}</span>
            </li>
            <li v-if="countriesStore.dropdownFilterCountriesOne.length === 0" class="py-3 px-4 flex items-center justify-between">No countrise available</li>
        </ul>


        <ul ref="dropdown-content" v-if="secondDropd" class="absolute top-14 left-0 bg-white w-full max-h-[228px] overflow-y-auto rounded-md border border-slate-200 cursor-pointer">
            <li @click="selectCountry($event, 'second')" v-for="(country, index) in countriesStore.dropdownFilterCountriesTwo" :key="country.id || index" class="py-3 px-4 flex items-center space-x-4 hover:bg-blue-50 dark:hover:bg-slate-700"><span class="country-flag text-2xl border border-slate-100" :class="countriesStore.getCountryFlag(country.cca2)"></span>
                <span class="country-name">{{ country.name.common }}</span>
            </li>
            <li v-if="countriesStore.dropdownFilterCountriesTwo.length === 0" class="py-3 px-4 flex items-center justify-between">No countrise available</li>
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

const props = defineProps (['placeholder','modelValue','countryFlag','checkField'])

const emit = defineEmits(['update:modelValue'])

const firstDropd = ref(false)
const secondDropd = ref(false)
const emptySearch = ref(false)

const dropdownContent = ref(null)

const toggleSearchDropdown = (e) => {
    if(e.target.placeholder === 'Select first country') {
        emptySearch.value = true
        countriesStore.searchFirstCountry = ''
        countriesStore.firstSelectedFlag = null
        firstDropd.value = true
    } else if(e.target.placeholder === 'Select second country') {
        countriesStore.searchSecondCountry = ''
        countriesStore.secondSelectedFlag = null
        secondDropd.value = true
        emptySearch.value = true
    }
}

const selectCountry = (e, dropdownType) => {
  const li = e.target.closest('li')
  console.log(e.srcElement.className)
  if (li) {
    const countryName = li.querySelector('.country-name').textContent
    const countryFlag = li.querySelector('.country-flag').className
    if (dropdownType === 'first') {
      countriesStore.searchFirstCountry = countryName
      countriesStore.firstSelectedFlag = countryFlag
    } else if (dropdownType === 'second') {
      countriesStore.searchSecondCountry = countryName
      countriesStore.secondSelectedFlag = countryFlag
    }
  }
}

onClickOutside([dropdownContent], () => {
    firstDropd.value = false
    secondDropd.value = false
    emptySearch.value = false
    if(countriesStore.dropdownFilterCountriesOne.length === 0) {
      countriesStore.searchFirstCountry = ''
    } else if(countriesStore.dropdownFilterCountriesTwo.length === 0) {
      countriesStore.searchSecondCountry = ''
    }
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