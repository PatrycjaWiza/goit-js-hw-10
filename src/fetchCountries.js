function fetchCountries(name) {
  return fetch('https://restcountries.com/v3.1/name').then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
  // .then(data => {
  //   //data handling
  // })
  // .catch(error => {
  //   console.log(error);
  // });
}

export { fetchCountries };
