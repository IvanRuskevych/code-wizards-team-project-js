import axios from 'axios';

import { statusChecked } from './library-set';

const API_KEY = '7c0c458e245909c66f3397c50f32766a';
const BASE_URL = 'https://api.themoviedb.org/3';
const ID_URL = `${BASE_URL}/movie/`;

async function fetchFilmById(id) {
  const movie_id = id;
  const searchParams = new URLSearchParams({
    api_key: API_KEY,
  });
  return axios.get(`${ID_URL}${movie_id}?${searchParams}`);
}

async function fetchFilmTrailer(id) {
  const searchParams = new URLSearchParams({
    api_key: API_KEY,
  });
  return axios.get(`${ID_URL}/${id}/videos?${searchParams}`);
}

import sprite from '../images/sprite.svg';
const galleryList = document.querySelector('.gallery__list');
const modal = document.querySelector('[data-modal]');
const closeModalBtn = document.querySelector('[data-modal-close]');
const modalWrap = document.querySelector('.modal-wrap');
galleryList.addEventListener('click', openModal);
modal.addEventListener('keydown', closeModal);
modal.addEventListener('click', closeModalbyClick);
closeModalBtn.addEventListener('click', closeModal);

async function openModal(item) {
  item.preventDefault();
  if (item.target.nodeName !== 'IMG') {
    return;
  }
  modal.classList.toggle('is-hidden');
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', closeModal);

  const li = item.target.closest('.gallery__item');
  const id = li.getAttribute('data-id');
  const response = await fetchFilmById(id).then(r => {
    console.log(r);
    return r.data;
  });

  renderBackdrop(response);
  modalWrap.insertAdjacentHTML('afterBegin', renderMarkupModal(response));

  const btnTreil = document.querySelector('.modal-btn-trailer');
  const wrapIMG = document.querySelector('.modal-img-wrap');
  btnTreil.addEventListener('click', onClickWatch);

  async function onClickWatch() {
    const li = item.target.closest('.gallery__item');
    const id = li.getAttribute('data-id');
    const response = await fetchFilmTrailer(id).then(r => {
      return r.data;
    });
    const officialTrail = response.results.length - 1;
    wrapIMG.remove();
    btnTreil.style.display = 'none';
    modalWrap.insertAdjacentHTML(
      'afterBegin',
      renderTrail(response.results[officialTrail])
    );
  }

  // --------------library #######################################
  const btnModalWatched = document.querySelector(
    'button[data-status="watched"]'
  );
  const btnModalQueue = document.querySelector('button[data-status="queue"]');
  // console.log(btnModalWatched);
  // console.log(btnModalQueue);

  // initial set library to localstorage

  btnModalWatched.addEventListener('click', statusChecked);
  btnModalQueue.addEventListener('click', statusChecked);

  // ########################################################################
}

function renderBackdrop(el) {
  const backdrop = document.querySelector('.backdrop-info');
  backdrop.style.backgroundImage = `url(https://image.tmdb.org/t/p/w1280/${el.backdrop_path})`;
  backdrop.style.backgroundRepeat = 'no-repeat';
  backdrop.style.backgroundSize = 'cover';
  backdrop.style.backgroundPosition = 'center';
}

function renderMarkupModal(el) {
  return `<div class="modal-img-wrap">
          <div class="modal-wrap-img-btn"><img src="https://image.tmdb.org/t/p/w500/${
            el.poster_path
          }" alt="${el.title}" class="modal-image" width="500" height="750"/>
            <button type="button" class="modal-btn-trailer"><svg class="btn-trailer-icon"><use href="${sprite}#icon-play"></use></svg>
          </button></div>
      </div>
      <div class="modal-info">
        <h2 class="modal-info-name">${el.title}</h2>
                <ul class="modal-info-list">
          <li class="modal-info-item">
            <p class="modal-info-name-value">Vote / Votes</p>
            <p class="modal-info-value"><span class="modal-info-value-vote">${el.vote_average.toFixed(
              1
            )}</span>/<span
                class="modal-info-value-votes"
                >${el.vote_count}</span
              ></p>
          </li>
          <li class="modal-info-item">
            <p class="modal-info-name-value">Popularity</p>
            <p class="modal-info-value">${el.popularity.toFixed(1)}</p>
          </li>
          <li class="modal-info-item">
            <p class="modal-info-name-value">Original Title</p>
            <p class="modal-info-value">${el.original_title}</p>
          </li>
          <li class="modal-info-item">
            <p class="modal-info-name-value">Genre</p>
            <p class="modal-info-value">${el.genres
              .map(item => item.name)
              .join(', ')}</p>
          </li>
        </ul>
        <p class="modal-info-pre-about">About</p>
        <p class="modal-info-about">
          ${el.overview}
        </p>
        <div class="btn-modal-wrap">
		      <div class="modal-btn-wrap">
          <button type="button" class="modal-btn" data-id="${el.id}"

          data-release_date="${(el.release_date || el.first_air_date).slice(
            0,
            4
          )}"
          data-status="watched"

          >Add to watched
          </button>
			 
			 </div>
			 <div class="modal-btn-wrap">
        <button type="button" class="modal-btn" data-id="${el.id}"

         data-release_date="${(el.release_date || el.first_air_date).slice(
           0,
           4
         )}" 
        data-status="queue"

        >Add to queue
          
			 </div>
        </div>
      </div>`;
}

function closeModal(e) {
  const backdrop = document.querySelector('.backdrop-info');
  if (e.key === 'Escape' || e.type === 'click') {
    modal.classList.toggle('is-hidden');
    modalWrap.innerHTML = '';
    document.body.style.overflow = '';
    backdrop.style.backgroundImage = '';
    document.removeEventListener('keydown', closeModal);
  }
}

function closeModalbyClick(e) {
  const backdrop = document.querySelector('.backdrop-info');
  if (e.target === e.currentTarget) {
    modal.classList.toggle('is-hidden');
    modalWrap.innerHTML = '';
    document.body.style.overflow = '';
    backdrop.style.backgroundImage = '';
    document.removeEventListener('keydown', closeModal);
  }
}

function renderTrail({ key }) {
  return `<iframe
  width="375"
    height="478"
    src="https://www.youtube.com/embed/${key}"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
    waitUntil()
    class='modal-image'
  ></iframe>`;
}
