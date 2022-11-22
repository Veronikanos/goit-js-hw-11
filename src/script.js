import Notiflix from 'notiflix';
import { renderMarkup } from './js/markup';
import PhotosApiService from './js/api-service';
// const axios = require('axios').default;

const formElement = document.querySelector('form#search-form');
const galleryList = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const photosApiService = new PhotosApiService();

formElement.addEventListener('submit', fetchRequest);
loadMoreBtn.addEventListener('click', onLoadMore);

async function fetchRequest(event) {
  event.preventDefault();

  try {
    photosApiService.query = event.target.elements.searchQuery.value
      .trim()
      .toLowerCase();
    const { data } = await photosApiService.fetchInfo();
    const markup = data.hits.map(item => renderMarkup(item));

    // console.log(markup);

    galleryList.insertAdjacentHTML('beforeend', markup.join(''));
  } catch (error) {
    Notiflix.Notify.failure(error);
  }
}

async function onLoadMore() {
  photosApiService.incrementPage();
  const { data } = await photosApiService.fetchInfo();

  const markup = data.hits.map(item => renderMarkup(item));
  galleryList.insertAdjacentHTML('beforeend', markup.join(''));
}
