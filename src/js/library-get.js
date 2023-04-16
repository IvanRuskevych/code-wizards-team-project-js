import { resetGallery } from './fetchAPITrends';

const btnMyLibraryRef = document.querySelector('#library-button');
console.log(btnMyLibraryRef);
const btnWatchedRef = document.querySelector(
  'button[data-status_library="watched"]'
);
console.log(btnWatchedRef);
const btnQueueRef = document.querySelector(
  'button[data-status_library="queue"]'
);
console.log(btnQueueRef);
btnMyLibraryRef.addEventListener('click', onBtnLibraryClick);
btnWatchedRef.addEventListener('click', onBtnLibraryClick);
btnQueueRef.addEventListener('click', onBtnLibraryClick);

console.log(btnMyLibraryRef.dataset.status_library);

function getLibrary() {
  const movie = JSON.parse(localStorage.getItem('listLibrary'));
  return movie;
}

function onBtnLibraryClick(e) {
  let status = e.target.dataset.status_library;
  console.log(status);
  const galleryList = document.querySelector('.gallery__list');
  resetGallery(galleryList);
  renderLibrary(galleryList, getLibrary(), status);
}

//

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
