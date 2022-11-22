import Notiflix from 'notiflix';
import { renderMarkup } from './js/markup';
const axios = require('axios').default;

const formElement = document.querySelector('form#search-form');
const galleryList = document.querySelector('.gallery');

formElement.addEventListener('submit', fetchRequest);

async function fetchRequest(event) {
  event.preventDefault();

  try {
    const { data } = await fetchInfo(event.target.elements.searchQuery.value);
    const markup = data.hits.map(item => renderMarkup(item));

    galleryList.insertAdjacentHTML('beforeend', markup.join(''));
  } catch (error) {
    Notiflix.Notify.failure(error);
  }
}

async function fetchInfo(userInput) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '31497264-8254871d687ec8d5b65884355';
  const searchParams = new URLSearchParams({
    q: userInput,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  const response = await axios.get(
    `${BASE_URL}?key=${API_KEY}&${searchParams}&total=30`
  );
  return response;
}
