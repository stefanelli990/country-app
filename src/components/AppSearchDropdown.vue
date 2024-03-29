<template>
  
    <div class="relative ">
        <button ref="toggle" @click="toggleSearchDropdown($event)" class="bg-white rounded-md shadow-md shadow-slate-200 flex justify-between items-center w-full p-4 cursor-pointer font-semibold dark:bg-slate-800 dark:shadow-slate-900"><span>{{ selectPlaceholder }}</span><Icon icon="ion:chevron-down" width="18" height="18" /></button>
        <ul ref="dropdownContent" v-if="dropdownIsShown" class="absolute top-14 left-0 bg-white w-full max-h-[294px] border shadow-md overflow-y-auto rounded-md cursor-pointer z-10 dark:bg-slate-800 dark:border-slate-800">
          <li class="sticky top-0 z-10 border-b border-b-slate-200 dark:border-b-slate-800">
            <input ref="searchInput" :value="modelValue" @input="emit('update:modelValue', $event.target.value)" class="bg-slate-50 w-full outline-none p-4 cursor-pointer placeholder:font-medium placeholder:text-darkColor dark:bg-slate-900 dark:placeholder-white" type="text" placeholder="Type to search">
        <button v-if="modelValue" @click="countriesStore.clearInput(modelValue)" class="absolute top-1/2 right-2 -translate-y-1/2  p-2">
            <Icon icon="ic:round-close" width="18" height="18"/>
        </button>
          </li>
            <li @click="selectCountry($event, selectedFromDropdown)" v-for="(country, index) in countriesStore.dropdownFilterCountriesSearch(modelValue)" :key="country.id || index" class="py-3 px-4 flex items-center space-x-4 hover:bg-blue-50 dark:hover:bg-slate-700"><span class="country-flag text-2xl border border-slate-100 dark:border-none" :class="countriesStore.getCountryFlag(country.cca2)"></span>
                <span class="country-name">{{ country.name.common }}</span>
            </li>
            <li v-if="countriesStore.dropdownFilterCountriesSearch(modelValue).length === 0" class="py-3 px-4 flex items-center justify-between">No countrise available</li>
        </ul>
    </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { useCountriesStore } from '../stores/countriesStore'
import { Icon } from '@iconify/vue'
import { onMounted } from 'vue'
import { onClickOutside } from '@vueuse/core'

const countriesStore = useCountriesStore()

const props = defineProps (['selectPlaceholder','modelValue','countryFlag','dropdownIsShown','selectedFromDropdown'])
const emit = defineEmits(['update:modelValue'])

const dropdownContent = ref(null)
const toggle = ref(null)
const searchInput = ref(null)

const toggleSearchDropdown = (e) => {
  const checkSelectBtn = e.target.closest('button').children[0].textContent
  console.log(checkSelectBtn)
  
    if(checkSelectBtn === 'Select first country') {
      countriesStore.firstSelectedDropdownIsShown = !countriesStore.firstSelectedDropdownIsShown
      countriesStore.secondSelectedDropdownIsShown = false
    } else if(checkSelectBtn === 'Select second country') {
      countriesStore.secondSelectedDropdownIsShown = !countriesStore.secondSelectedDropdownIsShown
      countriesStore.firstSelectedDropdownIsShown = false
    }
    if(!countriesStore.firstSelectedDropdownIsShown || !countriesStore.secondSelectedDropdownIsShown) {
      countriesStore.firstSearchedCountry = ''
      countriesStore.secondSearchedCountry = ''
    }
    nextTick(() => {
    if (searchInput.value) {
      searchInput.value.focus();
    }
  });
}

const selectCountry = (e, dropdownType) => {
  const li = e.target.closest('li')
  if (li) {
    const countryName = li.querySelector('.country-name').textContent
    const countryFlag = li.querySelector('.country-flag').className
    if (dropdownType === 'first') {
      countriesStore.firstSelectedCountry = countryName
      countriesStore.firstSelectedFlag = countryFlag
    } else if (dropdownType === 'second') {
      countriesStore.secondSelectedCountry = countryName
      countriesStore.secondSelectedFlag = countryFlag
    }
  }
}

onClickOutside([dropdownContent], (e) => {
  if (!e.target.closest(['button','input'])) {
    countriesStore.firstSelectedDropdownIsShown = false
    countriesStore.secondSelectedDropdownIsShown = false
  }
}, {
  ignore: [toggle],
 
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