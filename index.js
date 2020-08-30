'use strict';

const apiKey= 'rsE1ZrzEVn950EJkyjSVKwYvJADnUhotHOO34RK4';
const searchURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params){
  const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson){
  console.log(responseJson);
  $('#results-list').empty();

  for(let i=0; i<responseJson.data.length; i++){
    $('#results-list').append(
     `<li><h3>${responseJson.data[i].fullName}</h3>
     <h4>${responseJson.data[i].states}</h4>
     <p>${responseJson.data[i].description}</p>
     <a href= "${responseJson.data[i].url}">Website</a></li>`
    )};
    $('#results').removeClass('hidden');
}
function getNationalParks( stateCode, maxResults=10){
  const params = {
    stateCode: stateCode,
    limit: maxResults,
    api_key: apiKey
  }
  const queryString= formatQueryParams(params);
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('#js-form').submit(event => {
    event.preventDefault();
    const state= $('#js-state').val();
    const maxResults = $('#js-max-results').val();
    getNationalParks(state, maxResults);
  });
}

$(watchForm);