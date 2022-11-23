import Notiflix from 'notiflix';
import { getMarkupElements } from './js/markup';
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
    photosApiService.resetPage();
    galleryList.innerHTML = '';

    const { data } = await photosApiService.fetchInfo();

    if (!data.totalHits) {
      Notiflix.Notify.failure('No result');
      return;
    }
    if (data.totalHits > photosApiService.perPage) {
      loadMoreBtn.classList.remove('is-hidden');
    }
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images`);

    renderMarkup(data.hits);
  } catch (error) {
    Notiflix.Notify.failure(error);
  }
}

async function onLoadMore() {
  photosApiService.incrementPage();
  const { data } = await photosApiService.fetchInfo();

  if (data.hits.length < photosApiService.perPage) {
    reachedTheEnd();
  }
  renderMarkup(data.hits);
}

function renderMarkup(res) {
  const markup = res.map(item => getMarkupElements(item));
  galleryList.insertAdjacentHTML('beforeend', markup.join(''));
}

function reachedTheEnd() {
  loadMoreBtn.classList.add('is-hidden');
  Notiflix.Notify.info("That's all we found!");
}
