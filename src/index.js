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
  const markup = name
    .map(country => {
      if (name.length > 10) {
        return Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (name.length === 1) {
        return `<li>      
        <img src="${country.flag}">
        <p>${country.name}</p>
        <p><b>Capital:</b> ${country.capital}</p>
        <p><b>Population:</b> ${country.population}</p>
        <p><b>Languages:</b> ${country.languages}</p>
        </li>`;
      } else {
        return `<li>        
        <img src="${country.flag}">
        <p>${country.name}</p>
        </li>`;
      }
    })
    .join('');
  countryList.innerHTML = markup;
}
