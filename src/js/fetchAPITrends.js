import axios from 'axios';
import { genresList } from './genres-list';
const API_KEY = '7c0c458e245909c66f3397c50f32766a'
// axios.defaults.baseURL = `https://api.themoviedb.org/3/movie/550?api_key=7c0c458e245909c66f3397c50f32766a`;
let pageState = 1;
export const getAPITrend = async (page) => {
	const { data } = await axios.get('https://api.themoviedb.org/3/trending/all/day?api_key=7c0c458e245909c66f3397c50f32766a', {
		params: {
			page
		}
	})
	return await data;
}
renderTrendCollection(pageState);

export function resetGallery(parent) {
	parent.innerHTML = '';
}



export function renderList(parent, collection) {

	const gallaryItem = collection.map(element => {
		const genre = genresGalleryFormat(element.genre_ids);
		return `
        <li class="gallery__item" data-id="${element.id}">
        <img src="https://image.tmdb.org/t/p/w500${element.poster_path}" alt="" class="gallery__item-img">
        <p class="gallery__item-descr">
          <span class="gallery__item-name">
            ${element.title || element.name}
          </span>
          <span class="gallery__item-genres">
            ${genre} | ${(element.release_date || element.first_air_date).slice(0, 4) ?? ''}
          </span>
        </p>
      </li>
        `
	}).join('');
	parent.innerHTML = gallaryItem
}
export async function renderTrendCollection(page) {
	const galleryList = document.querySelector('.gallery__list')
	resetGallery(galleryList)
	const collectionTrend = await getAPITrend(page);
	await renderList(galleryList, collectionTrend.results)
}


// ===========================================================


export function genresGalleryFormat(array) {
	const genreResult = genresList.reduce((acc, element) => {
		if (Array.isArray(array) && array.includes(element.id)) {
			acc.push(element.name);
		}
		return acc;
	}, []);

	if (!genreResult.length) {
		return 'Unknown genre';
	} else if (genreResult.length > 2) {
		return `${genreResult[0]}, ${genreResult[1]}...`;
	} else {
		return genreResult.join(', ');
	}
}

