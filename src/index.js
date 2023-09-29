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

    const searchQuery = refs.form.elements.searchQuery.value;
    getImage(searchQuery)
        .then(data => {
            const imageInfo = data.hits;
            console.log(imageInfo);

            const markUp = imageInfo.map(image => `
                <div class="image-container">
                    <img class="main-image" src="${image.webformatURL}" alt="${image.tags}">
                    <div class="text-container"> 
                        <p class="main-text">Tags: ${image.tags}</p>
                        <p class="main-text">Likes: ${image.likes}</p>
                        <p class="main-text">Views: ${image.views}</p>
                        <p class="main-text">Comments: ${image.comments}</p>
                        <p class="secondary-title">Downloads: ${image.downloads}</p>
                    </div>
                </div>
            `).join('');

            refs.gallery.innerHTML = markUp;

        })
        .catch(error => {
            console.error(error);
        });
}




    


  
    


function onLoadMore() {

   const searchQuery = refs.form.elements.searchQuery.value;
  getImage(searchQuery);
}








