import Notiflix from 'notiflix';
import { renderMarkup } from './js/markup';
const axios = require('axios').default;

const formElement = document.querySelector('form#search-form');
const galleryList = document.querySelector('.gallery');

formElement.addEventListener('submit', fetchRequest);

function fetchRequest(event) {
  event.preventDefault();

  fetchInfo(event.target.elements.searchQuery.value) //.toLowerCase().trim()
    .then(data => {
      const markup = data.hits.map(item => renderMarkup(item));

      // galleryList.insertAdjacentHTML('beforeend', markup.join(''));
      galleryList.innerHTML = markup.join('');
    })
    .catch(err => {
      Notiflix.Notify.failure(err);
    });
}

function fetchInfo(userInput) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '31497264-8254871d687ec8d5b65884355';
  const searchParams = new URLSearchParams({
    q: userInput,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  return axios
    .get(`${BASE_URL}?key=${API_KEY}&${searchParams}&total=30`)
    .then(response => {
      if (response.status < 200 || response.status > 300) {
        throw new Error(response);
      }
      console.log(response);
      return response.data;
    });
}
