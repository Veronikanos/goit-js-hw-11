import Notiflix from 'notiflix';
import { renderMarkup } from './js/markup';
import PhotosApiService from './js/api-service';
const axios = require('axios').default;

const formElement = document.querySelector('form#search-form');
const galleryList = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const photosApiService = new PhotosApiService();

formElement.addEventListener('submit', fetchRequest);
loadMoreBtn.addEventListener('click', onLoadMore);

async function fetchRequest(event) {
  event.preventDefault();

  try {
    const { data } = await photosApiService.fetchInfo(
      event.target.elements.searchQuery.value
    );
    const markup = data.hits.map(item => renderMarkup(item));

    // console.log(markup);

    galleryList.insertAdjacentHTML('beforeend', markup.join(''));
  } catch (error) {
    Notiflix.Notify.failure(error);
  }
}

// async function fetchInfo(userInput, pages) {
//   const BASE_URL = 'https://pixabay.com/api/';
//   const API_KEY = '31497264-8254871d687ec8d5b65884355';

//   const searchParams = new URLSearchParams({
//     q: userInput,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: true,
//     per_page: 40,
//     page: pages,
//   });

//   const response = await axios.get(
//     `${BASE_URL}?key=${API_KEY}&${searchParams}}`
//   );
//   return response;
// }

function onLoadMore() {}
