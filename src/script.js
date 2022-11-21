import Notiflix from 'notiflix';
import { renderMarkup } from './js/markup';

const formElement = document.querySelector('form#search-form');
const galleryList = document.querySelector('.gallery-photo');

formElement.addEventListener('submit', fetchRequest);

function fetchRequest(event) {
  event.preventDefault();

  fetchInfo(event.target.elements.searchQuery.value)
    .then(data => {
      const markup = data.hits.map(item => renderMarkup(item));

      // galleryList.insertAdjacentHTML('beforeend', markup.join(''));
      galleryList.innerHTML = markup.join('');
    })
    .catch(err => {
      Notiflix.Notify.failure(err);
    });
}

function fetchInfo(q) {
  return fetch(
    `https://pixabay.com/api/?key=31497264-8254871d687ec8d5b65884355&q=${q}&image_type=photo&total=30`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}
