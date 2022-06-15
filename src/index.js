// imports
import './css/styles.css';
import { fetchCountries, searchBox, searchVal } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

//loadash library
var debounce = require('lodash.debounce');

//HTML selectors & constants
const DEBOUNCE_DELAY = 300;
const countryList = document.querySelector('.country-list');
const searchBal = () => {
  searchBox.value.trim();
};
// input listener & its handleEvent & debounce delay
searchBox.addEventListener(
  'input',
  debounce(handleSearchEvent, DEBOUNCE_DELAY)
);

function handleSearchEvent(e) {
  if (!e.target.value.trim()) {
    countryList.innerHTML = '';
  } else {
    fetchCountries()
      .then(name => renderCountryList(name))
      .catch(error => {
        return Notify.failure('Oops, there is no country with that name');
      });
  }
}

// render countries to HTML
function renderCountryList(data) {
  if (data.length > 10) {
    return Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
  const markup = data
    .map(({ name, capital, population, flags, languages }) => {
      if (data.length === 1) {
        return `<li>      
        <img src="${flags.svg}" height=50px>
        <h2>${name.official}</h2>
        <p><b>Capital:</b> ${capital}</p>
        <p><b>Population:</b> ${population}</p>
        <p><b>Languages:</b> ${Object.values(languages)}</p>
        </li>`;
      } else if (data.length >= 2 && data.length <= 10) {
        return `<li style="display: flex;">        
        <img src="${flags.svg}" width= 70px>
        <p>${name.official}</p>
        </li>`;
      }
    })
    .join('');
  countryList.innerHTML = markup;
}
