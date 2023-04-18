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

async function getMoviesByName(name, page) {
  return await instance.get(`&query=${name}&page=${page}`);
}



// Получаем доступ к форме
const searchBarForm = document.querySelector('#header__form');
// console.log(searchBarForm);
// Получаем доступ к инпут
const inputElementForm = document.querySelector('.header__input');
// console.log(inputElementForm);

const moviesSearchPlace = document.querySelector('.js-list-place');
// console.log(moviesSearchPlace);
// Функция с дебаунс
// inputElementForm.addEventListener('input', debounce(moviesSearch, DEBOUNCE_DELAY));
// Вешаем слушателя на инпут
// inputElementForm.addEventListener('input', (event) => {
// 	// Получаем значение введенное пользователем в input
// 	const userInput = event.target.value;

// 	// отслеживаем при введении значения
// 	console.log(userInput);
//   });

// inputElementForm.addEventListener('input', moviesSearch);
inputElementForm.addEventListener(
  'input',
  debounce(moviesSearch, DEBOUNCE_DELAY)
);


// moviesSearchPlace.addEventListener('click', event => {
// 	// Проверяем есть наш li кликнули? closest ближ родит элемент.
// 	// if (event.target.matches('.search__item-list' || ".search__item-descr" || ".search__item-name" || ".search__item-genres"))
// 	if (event.target.closest('.search__item-list, .search__item-descr, .search__item-name, .search__item-genres'))  { 
// 			const liElement = event.target.parentElement;
// 			console.log("кликнули по li", liElement)
// 			const elementId = liElement.dataset.id;
	
// 			console.log(elementId)
// 		}
	
// 	})

// Получаем id фильма при клике на элемент списка возле input

moviesSearchPlace.addEventListener('click', event => {
    const liElement = event.target.closest('.search__item-list');
    if (liElement) { 
        console.log("Кликнули по li", liElement);
        const elementId = liElement.dataset.id;
        console.log(" ID фильма ",elementId);
// Добавить фокус на выбранный элемент li
liElement.focus();



    } else {
        // Если кликнули на другом элементе, игнорируем его
        return;
    }
});



// const newListElements = document.querySelectorAll('.new-item')
// console.log(newListElements)

function moviesSearch (event) {
	event.preventDefault();
  // отслеживаем при введении значения
  const userInputSearchData = event.target.value.trim();

  // console.log(userInputSearchData);

  // получаем с сервера запрос по импуту
  getMoviesByName(userInputSearchData, pageState).then(({ data }) => {
    // записываем результат данных с сервера в переменную
    const arrayOfResultsSearch = data.results;
    // console.log(arrayOfResultsSearch);
	if(userInputSearchData){
		messegeSearchFailed.style.display = 'none';
	}
    moviesListResultsMarkup(arrayOfResultsSearch);
  });
}

function moviesListResultsMarkup(movies, index) {
  let counter = 0; // Инициализация счетчика
	const searchItem = movies
	  .map(element => {
      // При прохождении счетчик добавляет 1 и if (counter <= 7) остановится. Можно менять сколько надо результатов выводить
      counter++
		// console.log(getGenres(element.genre_ids[0]))
    if (counter <= 7) {
      return `
        <li class="search__item-list" data-id="${element.id}">
          <p class="search__item-descr">
            <span class="search__item-name">
              ${element.title || element.name}
            </span>
            <span class="search__item-genres">
              (${element.release_date.slice(0, 4)})
            </span>
          </p>
        </li>
      `;
    }
  }).join('');
  moviesSearchPlace.innerHTML = searchItem;
}

// Функция Убираем список при нажатии ESC

document.addEventListener('keydown', function(event) {
  // Проверяем, является ли нажатая клавиша клавишей Esc
  if (event.key === 'Escape') {
    // Удаляем 
    moviesSearchPlace.innerHTML = '';
  }
});

// Функция Убирает список поиска под инпутом при нажатии в любом месте. Нажать в любом месте кроме обьекта списка

// Добавляем обработчик событий на весь документ
document.addEventListener('click', function(event) {
  // Проверяем, является ли элемент клика ребёнком moviesSearchPlace или самим moviesSearchPlace
  if (!moviesSearchPlace.contains(event.target) && event.target !== moviesSearchPlace) {
    // Удаляем или скрываем список в этом случае
    moviesSearchPlace.innerHTML = '';
  }
});

// Тут функция рендера на страницу, результата извыпадающего списка, на который кликнул пользователь





// function moviesListResultsMarkup (movies) {
//   const searchItem = movies
//     .map(element => {
//       // console.log(getGenres(element.genre_ids[0]))
//       return `
// 	  <li class="search__item-list" data-id="${element.id}">
// 	<p class="search__item-descr" >
// 	  <span class="search__item-name">
// 		${element.title || element.name}
// 	  </span>
// 	  <span class="search__item-genres">
// 	  (${(element.release_date.slice(0, 4))})
// 	     </span>
// 	</p>
//   </li>
// 	`;
//     })
//     .join('');
//   moviesSearchPlace.innerHTML = searchItem;
// }

// ========================================================================================




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
