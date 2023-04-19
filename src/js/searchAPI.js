import axios from 'axios';
import { renderList } from './fetchAPITrends.js';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { refs } from './pagination.js';

import { createPagination } from './pagination.js';
import { renderTrendCollection } from './fetchAPITrends.js';

// const API_KEY = 'f9f6d3f14431911aa9602e018f8e4b77' матвея ключ 7c0c458e245909c66f3397c50f32766a
let pageState = 1;
const DEBOUNCE_DELAY = 500;
// Сообщщение первоначально не видно
const messegeSearchFailed = document.querySelector('.notification');
messegeSearchFailed.style.display = 'none';

export const instance = axios.create({
  baseURL:
    'https://api.themoviedb.org/3/search/movie?api_key=f9f6d3f14431911aa9602e018f8e4b77&language=en-US&page=1&include_adult=false',
});

async function getMoviesByName (name, page) {
  return await instance.get(`&query=${name}&page=${page}`);
}

async function getMovieByNameRelease (name, page, releaseDate) {
  return await instance.get(
    `&query=${name}&page=${page}&release_date=${releaseDate}`
  );
}

// Получаем доступ к форме
const searchBarForm = document.querySelector('#header__form');

// Получаем доступ к инпут
const inputElementForm = document.querySelector('.header__input');

// Место для вывода выпадающего списка при поиске в input, событие input
const moviesSearchPlace = document.querySelector('.js-list-place');

// Функция с дебаунс

// Вешаем слушателя на инпут

inputElementForm.addEventListener(
  'input',
  debounce(moviesSearch, DEBOUNCE_DELAY)
);

function moviesSearch (event) {
  event.preventDefault();
  // отслеживаем при введении значения
  const userInputSearchData = event.target.value.trim();

  // получаем с сервера запрос по импуту
  getMoviesByName(userInputSearchData, pageState).then(({ data }) => {
    // записываем результат данных с сервера в переменную
    const arrayOfResultsSearch = data.results;

    if (userInputSearchData) {
      messegeSearchFailed.style.display = 'none';
    }
    moviesListResultsMarkup(arrayOfResultsSearch);
  });
}

function moviesListResultsMarkup (movies, data) {
  let counter = 0; // Инициализация счетчика
  const searchItem = movies
    .map(element => {
      // При прохождении счетчик добавляет 1 и if (counter <= 7) остановится. Можно менять сколько надо результатов выводить
      counter++;

      if (counter <= 7) {
        // if(id !== element.id)
        return `
        <li class="search__item-list" data-release="${element.release_date.slice(
          0,
          4
        )}", data-query="${element.title || element.name} ">
          <p class="search__item-descr">
            <span class="search__item-name">
              ${element.title || element.name}
            </span>
            <span class="search__item-genres">
              ${element.release_date.slice(0, 4)}
            </span>
          </p>
        </li>`;
      }
    })
    .join('');
  moviesSearchPlace.innerHTML = searchItem;
}

// Функция Убираем список при нажатии ESC

document.addEventListener('keydown', function (event) {
  // Проверяем, является ли нажатая клавиша клавишей Esc
  if (event.key === 'Escape') {
    // Удаляем меню поиска, при нажатии ESC
    moviesSearchPlace.innerHTML = '';
  }
});

// Функция Убирает список поиска под инпутом при нажатии в любом месте. Нажать в любом месте кроме обьекта списка

// Добавляем обработчик событий на весь документ
document.addEventListener('click', function (event) {
  // Проверяем, является ли элемент клика ребёнком moviesSearchPlace или самим moviesSearchPlace
  if (
    !moviesSearchPlace.contains(event.target) &&
    event.target !== moviesSearchPlace
  ) {
    // Удаляем или скрываем список в этом случае
    moviesSearchPlace.innerHTML = '';
  }
});

// функция рендера на страницу, результата извыпадающего списка, на который кликнул пользователь

// Получаем id фильма при клике на элемент списка возле input

moviesSearchPlace.addEventListener('click', event => {
  const liElement = event.target.closest('.search__item-list');
  if (liElement) {
    // console.log("Кликнули по li", liElement);
    // Тут название фильма
    const elementName = liElement.dataset.query;
    const elementData = liElement.dataset.release;

    // console.log(" Name фильма ",elementName);
    // Добавить фокус на выбранный элемент li
    liElement.focus();

    // Тут вставляем функцию поиска по ID или маркап

    getMovieByNameRelease(elementName, pageState, elementData).then(
      ({ data }) => {
        // записываем результат данных с сервера в переменную
        const arrayOfResults = data.results;
        // console.log(arrayOfResults)

        // Тут условие проверки  надо вставить или фильт

        //  const filtrName = arrayOfResults.filter(item=> item.name == elementName)
        // console.log(" Data фильма ",elementData);
        const filtrDate = arrayOfResults.filter(item =>
          item.release_date.includes(elementData)
        );
        // console.log(item.release_date.includes(elementData))
        // console.log(item.release_date)

        //  console.log(" filter ",filtrDate);
        //const newFilter = filtrDate.filter(item => item.title === elementName)

        // console.log(filtrDate)
        // if(elementName === ${element.title || element.name} & elementData === ${element.release_date.slice(0, 4)})
        // if(`${element.title || element.name}` === elementName && `${element.release_date.slice(0, 4)}` === elementData)

        renderList(document.querySelector('.gallery__list'), filtrDate);
      }
    );
  } else {
    // Если кликнули на другом элементе, игнорируем его
    return;
  }
});

// =======================================================================================================

// ========================================================================================
// Ниже функция действия searchBar по submit

searchBarForm.addEventListener('submit', onSearchBarFormSubmit);

async function onSearchBarFormSubmit (event) {
  event.preventDefault();

  // Значение поля input
  const onSearchBarInput = event.target.elements.query.value;

  // Если поле не заполнено - запрос не отправляем на сервер при нажатии
  if (!onSearchBarInput) {
    Notiflix.Notify.failure('Please enter a keyword to continue the search');
    // тут можно дополнительно вызвывать функцию sendMessage () с каким то сообщением"поле поиска не заполнено"

    event.preventDefault();
    return;
  }

  // Обьект получаем

  getMoviesByName(onSearchBarInput, pageState).then(({ data }) => {
    // записываем результат данных с сервера в переменную
    const arrayOfResults = data.results;

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

    renderList(document.querySelector('.gallery__list'), arrayOfResults);

    // ==================================================================================
    // Пагинации функция находится ниже
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
