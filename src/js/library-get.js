import { resetGallery } from './fetchAPITrends';
export { galleryListRef, getLibrary, renderLibrary };
const btnMyLibraryRef = document.querySelector('#library-button');
const btnWatchedRef = document.querySelector(
  'button[data-status_library="watched"]'
);
const btnQueueRef = document.querySelector(
  'button[data-status_library="queue"]'
);
const formSearchRef = document.querySelector('.form-wrap');
const btnLibraryBox = document.querySelector('.library-btn-box');
const btnHomeRef = document.querySelector('[data-status_library="home"]');
const galleryListRef = document.querySelector('.gallery__list');

btnMyLibraryRef.addEventListener('click', onBtnLibraryClick);
btnWatchedRef.addEventListener('click', onBtnLibraryClick);
btnQueueRef.addEventListener('click', onBtnLibraryClick);
btnWatchedRef.addEventListener('click', changeStyleOnButtonsLibrary);
btnQueueRef.addEventListener('click', changeStyleOnButtonsLibrary);
btnMyLibraryRef.addEventListener('click', changeStyleOnBtnHomeLibrary);
btnHomeRef.addEventListener('click', changeStyleOnBtnHomeLibrary);

function getLibrary() {
  try {
    const movie = JSON.parse(localStorage.getItem('listLibrary'));
    return movie;
  } catch (error) {
    console.log(error.name);
    console.log(error.massege);
    console.log(error.stack);
  }
}

function onBtnLibraryClick(e) {
  let status = e.target.dataset.status_library;

  if (e.target.dataset.status_library === 'library') {
    elementClassRemove(btnWatchedRef, 'visually-hidden');
    elementClassRemove(btnQueueRef, 'visually-hidden');
  }
  resetGallery(galleryListRef);
  renderLibrary(galleryListRef, getLibrary(), status);
}

function renderLibrary(parent, collection, status) {
  if (status === 'library') {
    return (parent.innerHTML = markupMoviesFromLocalStorage(
      collection,
      'watched'
    ));
  }
  return (parent.innerHTML = markupMoviesFromLocalStorage(collection, status));
}

function markupMoviesFromLocalStorage(collection, statusForMarkup) {
  return collection
    .filter(movie => movie.status === statusForMarkup)
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
}

// ЗМІНА СТИЛІВ ДЛЯ WATCHED/QUEUE
function changeStyleOnButtonsLibrary(e) {
  if (e.target.dataset.status_library === 'watched') {
    if (e.target.classList.contains('library-current-btn')) {
      return;
    }
    elementClassRemove(btnQueueRef, 'library-current-btn');
    elementClassAdd(btnWatchedRef, 'library-current-btn');
    return;
  }
  elementClassRemove(btnWatchedRef, 'library-current-btn');
  elementClassAdd(btnQueueRef, 'library-current-btn');
  return;
}

// ЗМІНА СТИЛІВ ДЛЯ HOME / LIBRARY
function changeStyleOnBtnHomeLibrary(e) {
  if (e.target.dataset.status_library === 'library') {
    if (e.target.classList.contains('btn--current')) {
      elementClassRemove(btnQueueRef, 'library-current-btn');
      elementClassAdd(btnWatchedRef, 'library-current-btn');
      return;
    }
    elementClassAdd(btnMyLibraryRef, 'btn--current');
    elementClassRemove(btnHomeRef, 'btn--current');
    elementClassAdd(formSearchRef, 'visually-hidden');
    elementClassAdd(btnLibraryBox, 'library-btn-visual');
    return;
  }
  elementClassRemove(btnMyLibraryRef, 'btn--current');
  elementClassAdd(btnHomeRef, 'btn--current');
}

function elementClassAdd(elemRef, cls) {
  elemRef.classList.add(cls);
}

function elementClassRemove(elemRef, cls) {
  elemRef.classList.remove(cls);
}
