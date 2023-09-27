import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
    form: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    loadMore: document.querySelector('.load-more')
} 

const baseUrl = 'https://pixabay.com/api/';
const apiKey = '39696630-76278aa8e60be2b194df9a30b';

refs.form.addEventListener('submit', onSearch);

function onSearch(e) {
    e.preventDefault();
    const searchQuery = e.currentTarget.elements.query.value;
    getImage(searchQuery); 
}

async function getImage(searchQuery) {
  try {
      const response = await axios.get(`${baseUrl}?key=${apiKey}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`);
      console.log(response.data); 
  } catch (error) {
    console.error(error);
  }
}

