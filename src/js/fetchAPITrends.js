import axios from 'axios';
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

async function getAPIGenres(page) {
	const {data} = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=7c0c458e245909c66f3397c50f32766a&')
	return await data.genres;
}

// getAPIGenres().then(result => {
// 	const { genres } = result;
// 	return genres;
// })

// getAPITrend(pageState).then(data=> console.log(data))
function resetGallery(parent) {
	parent.innerHTML = '';
}

async function getGenres(genre) {
	// const dbFilms = await getAPITrend(pageState);
	// const { results } = dbFilms;
	const genresArray = await getAPIGenres();
	return genresArray.find(item => genre == item.id).name;
}
// getGenres(28).then(results=> console.log(results))
// resetGallery(document.querySelector('.gallery__list'))

async function renderList(parent, collection) {
	const gallaryItem = collection.map(element => {
		// console.log(getGenres(element.genre_ids[0]))
		return `
		<li class="gallery__item" data-id="${element.id}">
        <img src="https://image.tmdb.org/t/p/w500${element.poster_path}" alt="" class="galler__item-img">
        <p class="gallery__item-descr">
          <span class="gallery__item-name">
            ${element.title||element.name}
          </span>
          <span class="gallery__item-genres">
            ${element.genre_ids} | ${(element.release_date || element.first_air_date).slice(0, 4) }
          </span>
        </p>
      </li>
		`
	}).join('');
	parent.innerHTML = gallaryItem
}

window.addEventListener('DOMContentLoaded', async () => {
	
	const collectionTrend = await getAPITrend(pageState);
	console.log(collectionTrend)
	await renderList(document.querySelector('.gallery__list'), collectionTrend.results)
});