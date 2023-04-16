import { resetGallery } from './fetchAPITrends';

const btnMyLibraryRef = document.querySelector('#library-button');
const btnWatchedRef = document.querySelector(
  'button[data-status_library="watched"]'
);
const btnQueueRef = document.querySelector(
  'button[data-status_library="queue"]'
);
const formSearchRef = document.querySelector('.form-wrap');

btnMyLibraryRef.addEventListener('click', onBtnLibraryClick);
btnWatchedRef.addEventListener('click', onBtnLibraryClick);
btnQueueRef.addEventListener('click', onBtnLibraryClick);

function getLibrary() {
  const movie = JSON.parse(localStorage.getItem('listLibrary'));
  return movie;
}

function onBtnLibraryClick(e) {
  if (e.target.dataset.status_library === 'library') {
    btnWatchedRef.classList.remove('visually-hidden');
    btnQueueRef.classList.remove('visually-hidden');
  }

  let status = e.target.dataset.status_library;
  console.log(status);
  const galleryList = document.querySelector('.gallery__list');
  resetGallery(galleryList);
  renderLibrary(galleryList, getLibrary(), status);
}

function renderLibrary(parent, collection, status) {
  if (status === 'library') {
    const gallaryItem = collection
      .map(element => {
        return `
		<li class="gallery__item" data-id="${element.id}">
        <img src="${element.poster}" alt="" class="gallery__item-img">
         <p class="gallery__item-descr">
            <span class="gallery__item-name">
             ${element.title}
           </span>
            <span class="gallery__item-genres">
             ${element.genres} | ${element.release}
          </span>
        </p>
      </li>
		`;
      })
      .join('');
    return (parent.innerHTML = gallaryItem);
  }
  const gallaryItem = collection
    .filter(movie => movie.status === status)
    .map(element => {
      return `
		<li class="gallery__item" data-id="${element.id}">
        <img src="${element.poster}" alt="" class="gallery__item-img">
         <p class="gallery__item-descr">
            <span class="gallery__item-name">
             ${element.title}
           </span>
            <span class="gallery__item-genres">
             ${element.genres} | ${element.release}
          </span>
        </p>
      </li>
		`;
    })
    .join('');
  return (parent.innerHTML = gallaryItem);
}

// ЗМІНА СТИЛІВ ДЛЯ WATCHED/QUEUE

function changeStyleOnButtonsLibrary(e) {
  if (e.target.dataset.status_library === 'watched') {
    if (e.target.classList.contains('library-current-btn')) {
      return;
    } else {
      btnWatchedRef.classList.add('library-current-btn');
      btnQueueRef.classList.remove('library-current-btn');
      return;
    }
  }
  btnWatchedRef.classList.remove('library-current-btn');
  btnQueueRef.classList.add('library-current-btn');
  return;
}

btnWatchedRef.addEventListener('click', changeStyleOnButtonsLibrary);
btnQueueRef.addEventListener('click', changeStyleOnButtonsLibrary);

// ЗМІНА СТИЛІВ ДЛЯ HOME / LIBRARY

const btnLibraryBox = document.querySelector('.library-btn-box');
// console.log(btnLibraryBox);
const btnHomeRef = document.querySelector('[data-status_library="home"]');
// console.log(btnHomeRef);

function changeStyleOnBtnHomeLibrary(e) {
  if (e.target.dataset.status_library === 'library') {
    if (e.target.classList.contains('btn--current')) {
      return;
    } else {
      btnMyLibraryRef.classList.add('btn--current');
      btnHomeRef.classList.remove('btn--current');
      formSearchRef.classList.add('visually-hidden');
      return;
    }
  } else if (e.target.dataset.status_library === 'home') {
    btnMyLibraryRef.classList.remove('btn--current');
    btnHomeRef.classList.add('btn--current');

    // -- НЕ ВИХОДИТЬ НАВІШАТИ КЛАСС
    btnLibraryBox.classList.add('visually-hidden');
    btnWatchedRef.classList.add('visually-hidden');
    btnQueueRef.classList.add('visually-hidden');

    // btnWatchedRef.dataset = 'hidden';
    // btnQueueRef.style.display = 'none';
    return;
  }
}

btnMyLibraryRef.addEventListener('click', changeStyleOnBtnHomeLibrary);
btnHomeRef.addEventListener('click', changeStyleOnBtnHomeLibrary);
