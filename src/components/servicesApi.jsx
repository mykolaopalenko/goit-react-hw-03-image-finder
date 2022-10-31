import axios from 'axios';

const API_KEY = '29647575-185f66041bf3c07be0622bf5a';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const BASE_FILTERS = 'image_type=photo&orientation=horizontal&per_page=12';

export const fetchGallery = async (query, page) => {
  const response = await axios.get(
    `?q=${query}&page=${page}&key=${API_KEY}&${BASE_FILTERS}`
  );
  const galleryItems = {
    gallery: response.data.hits.map(img => {
      const { id, webformatURL, largeImageURL, tags } = img;
      return {
        id,
        webformatURL,
        largeImageURL,
        tags,
      };
    }),
  };
  return galleryItems;
};
