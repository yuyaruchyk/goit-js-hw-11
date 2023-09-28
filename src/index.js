import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { getImage } from './img-api'

const refs = {
    form: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    loadMore: document.querySelector('.load-more')
} 



refs.form.addEventListener('submit', onSearch);
refs.loadMore.addEventListener('click', onLoadMore);

function onSearch(e) {
    e.preventDefault();
    const searchQuery = e.currentTarget.elements.searchQuery.value;
   getImage(searchQuery); 
}

function onLoadMore(e) {
    e.preventDefault();
     getImage(searchQuery); 
}





