import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { fetchImg } from './img-api';

const refs = {
    form: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    loadBtn: document.querySelector('.load-more')


}

refs.form.addEventListener('submit', onSubmit);

onSubmit(e) {
    e.preventDefault();

}
