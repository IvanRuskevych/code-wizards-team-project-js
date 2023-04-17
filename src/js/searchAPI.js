import axios from 'axios';
import { renderList } from './fetchAPITrends.js';
import Notiflix from 'notiflix';

import { refs } from './pagination.js';

import { createPagination } from './pagination.js';
import { renderTrendCollection } from './fetchAPITrends.js';

// const API_KEY = 'f9f6d3f14431911aa9602e018f8e4b77' матвея ключ 7c0c458e245909c66f3397c50f32766a
let pageState = 1;
// Сообщщение первоначально не видно
const messegeSearchFailed = document.querySelector('.notification');
messegeSearchFailed.style.display = 'none';

export const instance = axios.create({
  baseURL:
    'https://api.themoviedb.org/3/search/movie?api_key=f9f6d3f14431911aa9602e018f8e4b77&language=en-US&page=1&include_adult=false',
});

async function getMoviesByName(name, page) {
  return await instance.get(`&query=${name}&page=${page}`);
}

const searchBarForm = document.querySelector('#header__form');
// let headerFormInput = document.querySelector(".header__input")
// Доступ input для вывода сообщения используем headerFormInput.parentElement в функции
// let headerFormInput = searchBarForm.elements.query

// headerFormInput.addEventListener("focus", onHeaderFormInput)
// console.log(headerFormInput).value

searchBarForm.addEventListener('submit', onSearchBarFormSubmit);

async function onSearchBarFormSubmit(event) {
  event.preventDefault();

  //   const onInput = formElement.query.value;
  // Значение поля input
  const onSearchBarInput = event.target.elements.query.value;

  // Если поле не заполнено - запрос не отправляем на сервер при нажатии
  if (!onSearchBarInput) {
    Notiflix.Notify.failure('Please enter a keyword to continue the search');
    // тут можно дополнительно вызвывать функцию sendMessage () с каким то сообщением"поле поиска не заполнено"
    // sendMessage ()
    event.preventDefault();
    return;
  }

  // console.log(onSearchBarInput);
  // Обьект получаем

  getMoviesByName(onSearchBarInput, pageState).then(({ data }) => {
    // записываем результат данных с сервера в переменную
    const arrayOfResults = data.results;
    // console.log(arrayOfResults)
    // Если результат не найден по ключевым словам выдаём сообщение ошибку
    if (!arrayOfResults.length > 0) {
      Notiflix.Notify.failure(
        'Search result not successful. Enter the correct movie name.'
      );
      messegeSearchFailed.style.display = 'block';
      // Меняем класс  <p> и делаем видемым
      // elementP.style.display = 'block';
      searchBarForm.reset();
      return;
    }

    renderList(document.querySelector('.gallery__list'), data.results);

    const galleryList = document.querySelector('.gallery__list');

    const pagination = createPagination(data.total_results, data.total_pages);

    pagination.on('beforeMove', page => {
      galleryList.innerHTML = '';

      getMoviesByName(onSearchBarInput, page.page).then(data => {
        // const result = data.data
        renderList(document.querySelector('.gallery__list'), data.data.results);

        //   console.log(data.data);
        // galleryList.innerHTML = getMoviesByName(page);
      });
    });
  });

  // После нажатия submit скидываем форму
  messegeSearchFailed.style.display = 'none';
  searchBarForm.reset();
}
