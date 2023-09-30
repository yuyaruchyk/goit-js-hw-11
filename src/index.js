import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import GetImageApi from './img-api'

const getImageApi = new GetImageApi();

const refs = {
    form: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    loadMore: document.querySelector('.load-more')
} 




refs.form.addEventListener('submit', onSearch);
refs.loadMore.addEventListener('click', onLoadMore);


function generateImageMarkup(imageInfo) {
    return imageInfo.map(image => `
        <div class="image-container">
            <img class="main-image" src="${image.webformatURL}" alt="${image.tags}">
            <div class="text-container"> 
                <p class="main-text">Tags: ${image.tags}</p>
                <p class="main-text">Likes: ${image.likes}</p>
                <p class="main-text">Views: ${image.views}</p>
                <p class="main-text">Comments: ${image.comments}</p>
                <p class="main-text">Downloads: ${image.downloads}</p>
            </div>
        </div>
    `).join('');
}

function onSearch(e) {
    e.preventDefault();

    

    getImageApi.query = e.currentTarget.elements.query.value;
    getImageApi.getImage()
        .then(data => {
            const imageInfo = data.hits;
            console.log(imageInfo);

            if (imageInfo.length === 0) {
                 Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            }

            const markUp = generateImageMarkup(imageInfo);

            refs.gallery.innerHTML = markUp;

        })
        .catch(error => {
            console.error(error);
            Notiflix.Notify.failure("An error occurred while fetching images. Please try again later.");
        });
}


function onLoadMore(e) {
   

    

    
    getImageApi.getImage()
     .then(data => {
         const additionalImageInfo = data.hits;
           const markUp = generateImageMarkup(additionalImageInfo);
          refs.gallery.innerHTML += markUp;
      })
     .catch(error => {
         console.error(error);
         Notiflix.Notify.failure("An error occurred while fetching images. Please try again later.");
    });
}
    
     
        









