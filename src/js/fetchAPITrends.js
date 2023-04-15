import axios from 'axios';
const API_KEY = '7c0c458e245909c66f3397c50f32766a'
let pageState = 1;
const logoTitle = document.querySelector('.logo__title')
const logoIcon = document.querySelector('.logo__icon')

logoIcon.addEventListener('click', (e) => {
	e.preventDefault()
	renderTrendCollection(pageState)
})
logoTitle.addEventListener('click', (e) => {
	e.preventDefault()
	renderTrendCollection(pageState)
})

export const getAPITrend = async (page) => {
	const { data } = await axios.get('https://api.themoviedb.org/3/trending/all/day?', {
		params: {
			page,
			api_key: API_KEY
		}
	})
	return await data;
}

renderTrendCollection(pageState);

async function getAPIGenres(page) {
	const { data } = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=7c0c458e245909c66f3397c50f32766a&')
	return await data.genres;
}

function resetGallery(parent) {
	parent.innerHTML = '';
}

async function getGenres(genre) {
	const genresArray = await getAPIGenres();
	return genresArray.find(item => genre == item.id).name;
}

export function renderList(parent, collection) {
	const gallaryItem = collection.map(element => {
		return `
		<li class="gallery__item" data-id="${element.id}">
        <img src="https://image.tmdb.org/t/p/w500${element.poster_path}" alt="" class="gallery__item-img">
        <p class="gallery__item-descr">
          <span class="gallery__item-name">
            ${element.title || element.name}
          </span>
          <span class="gallery__item-genres">
            ${element.genre_ids} | ${(element.release_date || element.first_air_date).slice(0, 4)}
          </span>
        </p>
      </li>
		`
	}).join('');
	parent.innerHTML = gallaryItem
}

async function renderTrendCollection(page) {
	const galleryList = document.querySelector('.gallery__list')
	resetGallery(galleryList)
	const collectionTrend = await getAPITrend(page);
	console.log(collectionTrend)
	await renderList(galleryList, collectionTrend.results)
}



// ======================================

