import axios from 'axios';
import {renderList} from "./fetchAPITrends.js"
// const API_KEY = 'f9f6d3f14431911aa9602e018f8e4b77' матвея ключ 7c0c458e245909c66f3397c50f32766a

export const instance = axios.create({
	baseURL:
		'https://api.themoviedb.org/3/search/movie?api_key=f9f6d3f14431911aa9602e018f8e4b77&language=en-US&page=1&include_adult=false',
});


async function getMoviesByName(name) {
	return await instance.get(`&query=${ name }`);
}

//   const formElement = document.forms.header__form;

const searchBarForm = document.querySelector('#header__form');
// console.log(searchBarForm);
// я матвея другое название - подставить
// const allMoviesPlace = document.querySelector('.gallery__list');
// console.log(allMoviesPlace);

searchBarForm.addEventListener('submit', onSearchBarFormSubmit);

async function onSearchBarFormSubmit(event) {
	event.preventDefault();



	//   const onSearchBarInput = formElement.query.value;

	const onSearchBarInput = event.target.elements.query.value;


	console.log(onSearchBarInput);
	// Обьект получаем

	getMoviesByName(onSearchBarInput).then(({ data }) => {
		console.log(data.results)
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
		
		renderList(document.querySelector('.gallery__list'), data.results)
		
    })
}