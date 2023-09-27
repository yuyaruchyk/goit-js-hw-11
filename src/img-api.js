import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

axios.defaults.headers.common['x-api-key'] = '39665010-09a2b6cf277e8f7a3d78ab77d';

export class ImageSearch {
  constructor() {
    this.searchQuery = "";
    this.page = 1;
    }
    
 


  async fetchImages() {
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=39665010-09a2b6cf277e8f7a3d78ab77d&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}`
      );

      this.page += 1;
      console.log(response.data);

    } catch (error) {
      console.error(error);
    }
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
    this.page = 1; 
  }
}