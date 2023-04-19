import axios from 'axios';
import { statusChecked, isMovieInLibrary, addListLibrary } from './library-set';
import {
  galleryListRef,
  getLibrary,
  resetGallery,
  renderLibrary,
} from './library-get';

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
    // console.log(r);
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
  // --------------library --------------------------------
  const btnModalWatched = document.querySelector(
    'button[data-status="watched"]'
  );
  const btnModalQueue = document.querySelector('button[data-status="queue"]');

  btnModalWatched.addEventListener('click', statusChecked);
  btnModalQueue.addEventListener('click', statusChecked);

  changeModalBtnStatus(item);

  function changeModalBtnStatus(e) {
    let currentMovieId = e.target.parentNode.dataset.id;
    let currentMovieIndex = getLibrary().findIndex(
      movie => movie.id === currentMovieId
    );

    if (isMovieInLibrary(currentMovieId)) {
      if (getLibrary()[currentMovieIndex].status === 'watched') {
        btnModalWatched.textContent = 'have watched';
        btnModalWatched.classList.add('btn-turn-on');
        return;
      }
      btnModalQueue.textContent = 'in queue for watching';
      btnModalQueue.classList.add('btn-turn-on');
      return;
    }
  }
  btnModalWatched.addEventListener('click', changeBtnStyle);
  btnModalQueue.addEventListener('click', changeBtnStyle);

  function changeBtnStyle(e) {
    if (!e.target.classList.contains('btn-turn-on')) {
      if (e.target.dataset.status === 'watched') {
        btnModalWatched.textContent = 'has watched';
        btnModalQueue.textContent = 'add to queue';
        btnModalWatched.classList.add('btn-turn-on');
        btnModalQueue.classList.remove('btn-turn-on');
        btnDelRef.classList.remove('btn-turn-on');
        return;
      }
      btnModalWatched.textContent = 'add to watched';
      btnModalQueue.textContent = 'in queue for watching';
      btnModalQueue.classList.add('btn-turn-on');
      btnModalWatched.classList.remove('btn-turn-on');
      btnDelRef.classList.remove('btn-turn-on');
      return;
    }
  }
  const btnDelRef = document.querySelector('button[data-status="delete"]');
  btnDelRef.addEventListener('click', onBtnDelClick);

  function onBtnDelClick(e) {
    let currentMovieId = e.target.dataset.id;
    let hasClassBtnWatched =
      e.target.parentNode.parentNode.children[0].firstElementChild.classList.contains(
        'btn-turn-on'
      );
    let hasClassBtnQueue =
      e.target.parentNode.parentNode.children[1].firstElementChild.classList.contains(
        'btn-turn-on'
      );

    let currentMovieIndex = getLibrary().findIndex(
      movie => movie.id === currentMovieId
    );
    let newLibrary = getLibrary();
    newLibrary.splice(currentMovieIndex, 1);
    addListLibrary(newLibrary);

    if (hasClassBtnWatched) {
      btnModalWatched.textContent = 'add to watched';
      btnModalWatched.classList.remove('btn-turn-on');
      btnDelRef.classList.add('btn-turn-on');

      // resetGallery(galleryListRef);
      renderLibrary(galleryListRef, newLibrary, 'watched');
      return;
    }
    if (hasClassBtnQueue) {
      btnModalQueue.textContent = 'add to queue';
      btnModalQueue.classList.remove('btn-turn-on');
      btnDelRef.classList.add('btn-turn-on');

      // resetGallery(galleryListRef);
      renderLibrary(galleryListRef, newLibrary, 'queue');
      return;
    }
  }
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
          }" alt="${el.title}" class="modal-image" width="375" height="478"/>
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

          >Add to watched</button>
			 
			 </div>
			 <div class="modal-btn-wrap">
        <button type="button" class="modal-btn" data-id="${el.id}"

         data-release_date="${(el.release_date || el.first_air_date).slice(
           0,
           4
         )}" 
        data-status="queue"

        >Add to queue</button>         
			 </div>
       <div class="modal-btn-wrap ">
        <button type="button" class="modal-btn btn-del" data-id="${el.id}"
      
        data-status="delete"

        >del</button>         
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
    return;
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

// function btnRemoveWatched() {
//   return (btnModalWatched.textContent = 'Remove from watched');
// }

// function btnRemoveQueue() {
//   return (btnModalQueue.textContent = 'Remove from queue');
// }
// btnModalWatched.textContent = 'Remove from watched';
// btnModalWatched.textContent = 'Remove from watched';
