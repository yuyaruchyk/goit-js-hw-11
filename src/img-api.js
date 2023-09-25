import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export { fetchImg };

axios.defaults.headers.common['x-api-key'] = '39665010-09a2b6cf277e8f7a3d78ab77d';




async function fetchImg(searchWord) {
  try {
    const response = await axios.get(`https://pixabay.com/api/?key=39665010-09a2b6cf277e8f7a3d78ab77d&q=${searchWord}&image_type=photo&orientation=horizontal&safesearch=true`);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}