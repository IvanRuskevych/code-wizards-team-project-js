import axios from 'axios';
import {renderList} from "./fetchAPITrends.js"
import Notiflix from 'notiflix';
// const API_KEY = 'f9f6d3f14431911aa9602e018f8e4b77' матвея ключ 7c0c458e245909c66f3397c50f32766a
let pageState = 1;
export const instance = axios.create({
	baseURL:
		'https://api.themoviedb.org/3/search/movie?api_key=f9f6d3f14431911aa9602e018f8e4b77&language=en-US&page=1&include_adult=false',
});


async function getMoviesByName(name) {
	return await instance.get(`&query=${ name }`);
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
	if(!onSearchBarInput){
		Notiflix.Notify.failure('Please enter a keyword to continue the search');
		// тут можно дополнительно вызвывать функцию sendMessage () с каким то сообщением"поле поиска не заполнено"
		// sendMessage ()
		event.preventDefault();
		return
	}

	

	// console.log(onSearchBarInput);
	// Обьект получаем

	getMoviesByName(onSearchBarInput).then(({ data }) => {

		// записываем результат данных с сервера в переменную
		const arrayOfResults = data.results;
		console.log(arrayOfResults)
// Если результат не найден по ключевым словам выдаём сообщение ошибку
		if (!arrayOfResults.length > 0) {
			Notiflix.Notify.failure('Search result not successful. Enter the correct movie name.');
			// Меняем класс  <p> и делаем видемым
			// elementP.style.display = 'block';
			searchBarForm.reset();
			return
		}


		renderList(document.querySelector('.gallery__list'), data.results)
	// 	const gallaryItem = data.results.map(element => {
	// 		// console.log(getGenres(element.genre_ids[0]))
	// 		return `
	// 	<li class="gallery__item" data-id="${element.id}">
    //     <img src="https://image.tmdb.org/t/p/w500${element.poster_path}" alt="" class="gallery__item-img">
    //     <p class="gallery__item-descr">
    //       <span class="gallery__item-name">
    //         ${element.title || element.name}
    //       </span>
    //       <span class="gallery__item-genres">
    //         ${element.genre_ids} | ${(element.release_date || element.first_air_date).slice(0, 4)}
    //       </span>
    //     </p>
    //   </li>
	// 	`
	// 	}).join('');
	// 	document.querySelector('.gallery__list').innerHTML = gallaryItem
		
	// После нажатия submit скидываем форму
	
	searchBarForm.reset();
    })
}


// function onHeaderFormInput (){
// 	console.log(headerFormInput).value


// }



// onHeaderFormInput()



// Получаем значение поля импута placeholder для работы с placeholder , При фокусе placeholder убирается при снятии фокуса появляется

// Значение placeholder
// headerFormInputPlaceholder ="Movie search";
// let headerFormInputPlaceholder = searchBarForm.query.placeholder
// console.log(headerFormInputPlaceholder);
// searchBarForm.addEventListener("focus", function(){
// 	headerFormInputPlaceholder = "";
// })
// console.log(headerFormInputPlaceholder);
// searchBarForm.addEventListener("blur", function(){
// 	searchBarForm.query.placeholder = headerFormInputPlaceholder;
// })

// Функция добавления сообщения если не через
function sendMessage () {

	
	headerFormInput.parentElement.insertAdjacentHTML ("beforeend", `<p class="header-form__error">Форма не отправлена</p>`)
  }