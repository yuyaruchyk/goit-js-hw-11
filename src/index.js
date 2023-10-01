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

 <a class="gallery__link link" href="${image.largeImageURL}">
    <img
      class="gallery__image"
      src="${image.webformatURL}"
      alt="${image.tags}" loading="lazy" style="width: 300px; height: 200px; object-fit: cover"
       
     

  </a>

      <div class="info">
    <p class="info-item">
      <b>Likes <span class="span">${image.likes}</span> </b>
    </p>
    <p class="info-item">
      <b>Views <span class="span">${image.views}</span></b>
    </p>
    <p class="info-item">
      <b>Comments <span class="span">${image.comments}</span> </b>
    </p>
    <p class="info-item">
      <b>Downloads <span class="span">${image.downloads}</span> </b>
    </p>
  </div>
  
</div>
    
    `).join('');
}

const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

function onSearch(e) {
  e.preventDefault();

  getImageApi.query = e.currentTarget.elements.query.value;

  if (getImageApi.query === "") {
    Notiflix.Notify.failure("Enter a word to search for");
    return;
  }

  getImageApi.resetPage();
  getImageApi
    .getImage()
    .then(data => {
      const imageInfo = data.hits;

      if (imageInfo.length === 0) {
        refs.loadMore.classList.add('hidden');
        refs.form.reset();
        Notiflix.Notify.failure("Sorry, there are no images matching your search.");
      }

      const markUp = generateImageMarkup(imageInfo);

        refs.gallery.innerHTML = markUp;
        lightbox.refresh();
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
        console.log(data)
        const totalHits = data.totalHits;
        const additionalImageInfo = data.hits;
        console.log(data.hits)

            if (additionalImageInfo.length === totalHits || additionalImageInfo.length === 0)  {
                refs.form.reset();
                 refs.loadMore.classList.add('hidden');

                Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
            } else {
                const markUp = generateImageMarkup(additionalImageInfo);
                refs.gallery.innerHTML += markUp;
            }
        })
        .catch(error => {
            console.error(error);
             refs.loadMore.classList.add('hidden');
            Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
        });
    
}
