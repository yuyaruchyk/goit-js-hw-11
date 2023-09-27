import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import ImageSearch from "./img-api";


const imgService = new ImageSearch();


refs.form.addEventListener('submit', onSubmit);
refs.loadBtn.addEventListener('click', onLoad);
function onSubmit(e) {
  e.preventDefault();
  const query = e.currentTarget.elements.query.value;
    
  imgService.searchQuery = query; 
  imgService.page = 1; 
  imgService.fetchImages(query, page)
      .then(images => {
        console.log(images)
      console.log(images);
    })
    .catch(error => {
      console.log(error);
    });
}

function onLoad() {
  imgService.fetchImages(); 
}