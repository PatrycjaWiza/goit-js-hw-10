const searchBox = document.querySelector('#search-box');
function fetchCountries(name) {
  const searchVal = searchBox.value.trim();
  return fetch(
    `https://restcountries.com/v3.1/name/${searchVal}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export { fetchCountries, searchBox, searchVal };
