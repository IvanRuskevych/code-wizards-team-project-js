import { galleryListRef } from './library-get';

initLibrary();

function initLibrary() {
  let list = JSON.parse(localStorage.getItem('listLibrary'));
  if (list === null) {
    addListLibrary([]);
    // localStorage.setItem('listLibrary', JSON.stringify([]));
  }
}

function getLibrary() {
  const movie = JSON.parse(localStorage.getItem('listLibrary'));
  return movie;
}

function isMovieInLibrary(id) {
  let movieInLibrary = getLibrary().find(movie => movie.id === id);
  console.log(Boolean(movieInLibrary));
  return Boolean(movieInLibrary); // true
}

function addMovie(e, id, status, release) {
  let title =
    e.target.parentNode.parentNode.parentNode.children[1].children[2]
      .children[1].textContent;

  let genres =
    e.target.parentNode.parentNode.parentNode.children[1].children[3]
      .children[1].textContent;

  let poster =
    e.target.parentNode.parentNode.parentNode.previousElementSibling
      .firstElementChild.firstElementChild.src;
  console.log(poster);

  try {
    let list = JSON.parse(localStorage.getItem('listLibrary'));
    list.push({ id, status, release, title, genres, poster });
    return localStorage.setItem('listLibrary', JSON.stringify(list));
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
    console.log(error.stack);
  }
}

function addListLibrary(arr) {
  return localStorage.setItem('listLibrary', JSON.stringify(arr));
}

function statusChecked(e) {
  let id = e.target.dataset.id;
  let status = e.target.dataset.status;
  let release = e.target.dataset.release_date;

  if (!isMovieInLibrary(id)) {
    return addMovie(e, id, status, release);
  }

  let currentMovie = getLibrary().find(movie => movie.id === id);

  // наявність фільму у watched/queue
  if (status === currentMovie.status) {
    return;
  } else {
    let idMovieForDelete = getLibrary().findIndex(movie => movie.id === id);
    let arrayMovies = getLibrary();
    arrayMovies.splice(idMovieForDelete, 1);
    localStorage.setItem('listLibrary', JSON.stringify(arrayMovies));
    addMovie(e, id, status, release);
    // renderLibrary(galleryListRef, collection, status);
    return;
  }
}

export { initLibrary, statusChecked, isMovieInLibrary, addListLibrary };
