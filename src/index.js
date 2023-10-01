import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import GetImageApi from './img-api'

const getImageApi = new GetImageApi();

const refs = {
    form: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    submit: document.querySelector('.submit-btn'),
    loadMore: document.querySelector('.load-more')
} 

document.addEventListener('DOMContentLoaded', function() {

refs.loadMore.classList.add('hidden');
 

});


refs.form.addEventListener('submit', onSearch);
refs.loadMore.addEventListener('click', onLoadMore);


function generateImageMarkup(imageInfo) {
    return imageInfo.map(image => `

<div class="photo-card">
  <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" style="width: 300px; height: 180px"  />
  <div class="info">
    <p class="info-item">
      <b>Likes ${image.likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${image.views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${image.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${image.downloads}</b>
    </p>
  </div>
</div>




    
    `).join('');
}

function onSearch(e) {
    e.preventDefault();
    
    

    getImageApi.query = e.currentTarget.elements.query.value;

    if (getImageApi.query === "") {
       
       
        
        return Notiflix.Notify.failure("Enter a word to search for");

        
     
    }

    
    getImageApi.resetPage();
    getImageApi.getImage()
        .then(data => {
            const imageInfo = data.hits;
            

            if (imageInfo.length === 0) {
refs.loadMore.classList.add('hidden');
                
                 Notiflix.Notify.failure("Sorry, there are no images matching your search. Please try again.");
            }

            const markUp = generateImageMarkup(imageInfo);

            refs.gallery.innerHTML = markUp;

        })
        .catch(error => {
            console.error(error);
             refs.loadMore.classList.add('hidden');
            Notiflix.Notify.failure("An error occurred while fetching images. Please try again later.");
        });
    
  refs.loadMore.classList.remove('hidden');
    
}


function onLoadMore(e) {
   

    

    
    getImageApi.getImage()
        .then(data => {
            const additionalImageInfo = data.hits;

            if (additionalImageInfo.length === 0) {
                refs.loadMore.classList.add('hidden');
                Notiflix.Notify.failure("Sorry, there are no images matching your search. Please try again.");
            } else {
                const markUp = generateImageMarkup(additionalImageInfo);
                refs.gallery.innerHTML += markUp;
            }
        })
        .catch(error => {
            console.error(error);
             refs.loadMore.classList.add('hidden');
            Notiflix.Notify.failure("An error occurred while fetching images. Please try again later.");
        });
    
}
        









