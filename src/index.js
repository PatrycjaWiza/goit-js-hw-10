// imports
import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
//Notiflix.Notify.failure("Oops, there is no country with that name");

console.log(fetchCountries());

//loadash library
var debounce = require('lodash.debounce');

//HTML selectors & constants
const DEBOUNCE_DELAY = 300;
const countryList = document.querySelector('.country-list');
const searchBox = document.querySelector('#search-box');

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
