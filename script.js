// primer dobrog async await koda
// const fetchCountryData = async (country) => {
//     try {
//       const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
//       if (response.ok) {
//         const data = await response.json();
//         console.log(data);
//       } else {
//         console.error(`Error: ${response.status}`);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

const submitForm = document.querySelector('form');
const inputField = document.querySelector('input');
const results = document.querySelector('.results');
const countryWrapper = document.querySelector('.country-wrapper');

submitForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputValue = inputField.value;
    if(inputValue) {
      fetchCountryData(inputValue);
      submitForm.reset();
    }
    
})

const fetchCountryData = async (country) => {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
      if (response.ok) {
        const data = await response.json();
        results.innerHTML = `
          <div class="country-wrapper">
            <img src=${data[0].flags.svg} alt="">
            <ul>
                <li><span>Country name:</span> ${data[0].name.common}</li>
                <li><span>Capital:</span> ${data[0].capital[0]}</li>
                <li><span>Population:</span> ${data[0].population.toLocaleString()}</li>
                <li><span>Language:</span> ${Object.values(data[0].languages).toString().split(',').join(', ')}</li>
                <li><span>Currency:</span> ${Object.keys(data[0].currencies)[0]}</li>
            </ul>
          </div>
        `
        
      } else {
        console.log(`Error: ${response.status}`);
        results.innerHTML = `<h3>Country doesn't exist!</h3>`
      }
    } catch (error) {
      console.error(error);
    }
  };
   
  