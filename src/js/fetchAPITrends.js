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

getAPITrend(pageState).then(data=> console.log(data))
function resetGallery(parent) {
	parent.innerHTML = '';
}

async function getGenres(genre) {
	// const dbFilms = await getAPITrend(pageState);
	// const { results } = dbFilms;
	const genresArray = await getAPIGenres();
	return genresArray.find(item => genre == item.id).name;
}
getGenres(28).then(results=> console.log(results))
resetGallery(document.querySelector('.gallery__list'))

