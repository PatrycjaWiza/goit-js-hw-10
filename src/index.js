// imports
import './css/styles.css';
import { fetchCountries, searchBox } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

//loadash library
var debounce = require('lodash.debounce');

//HTML selectors & constants
const DEBOUNCE_DELAY = 300;
const countryList = document.querySelector('.country-list');
// input listener & its handleEvent & debounce delay
searchBox.addEventListener(
  'input',
  debounce(handleSearchEvent, DEBOUNCE_DELAY)
);

function handleSearchEvent() {
  fetchCountries()
    .then(name => renderCountryList(name))
    .catch(error => Notify.failure('Oops, there is no country with that name'));
}
// render countries to HTML
function renderCountryList(name) {
  // !!! SANITIZE INPUT VALUE TRIM() !!! 3of3
  if (name.length > 10) {
    return Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
  const markup = name
    .map(country => {
      if (name.length === 1) {
        return `<li>      
        <img src="${country.flag}" height=50px>
        <h2>${country.name}</h2>
        <p><b>Capital:</b> ${country.capital}</p>
        <p><b>Population:</b> ${country.population}</p>
        <p><b>Languages:</b> ${country.languages}</p>
        </li>`;
        // !!! FIX LANGUAGES !!! 2of3
      } else {
        return `<li style="display: flex;">        
        <img src="${country.flag}" width= 70px>
        <p>${country.name}</p>
        </li>`;
      }
    })
    .join('');
  countryList.innerHTML = markup;
  if (name.length < 1) {
    return (countryList.innerHTML = '');
  }
  // !!! FIX CLEAR COUNTRYLIST !!! 1of3
}
