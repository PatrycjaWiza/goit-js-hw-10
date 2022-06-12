const searchBox = document.querySelector('#search-box');
function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v2/name/${searchBox.value}?fields=name,capital,population,flag,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
export { fetchCountries, searchBox };
