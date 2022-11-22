const axios = require('axios').default;

export default class PhotosApiService {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
  }

  async fetchInfo() {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '31497264-8254871d687ec8d5b65884355';

    const searchParams = new URLSearchParams({
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
    });

    const response = await axios.get(
      `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&${searchParams}&page=${this.page}}`
    );
    return response;
  }

  incementPage() {
    this.page += 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
