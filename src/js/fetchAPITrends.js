import axios from 'axios';
const API_KEY = '7c0c458e245909c66f3397c50f32766a'
// axios.defaults.baseURL = `https://api.themoviedb.org/3/movie/550?api_key=7c0c458e245909c66f3397c50f32766a`;

export const getData = async (page) => {
	const { data } = await axios.get('https://api.themoviedb.org/3/trending/all/day?api_key=7c0c458e245909c66f3397c50f32766a', {
		params: {
			page
		}
	})
	return await data;
}
// export const getData = async (page) => {
// 	const { data } = await axios.get('https://api.themoviedb.org/3/trending/all/day?api_key=7c0c458e245909c66f3397c50f32766a&page=2')
// 	return await data;
// }
getData(3).then(data=> console.log(data))
function resetGallery(parent) {
	parent.innerHTML = '';
}

async function  getGenres(data) {
	const genres = await fetch('')
}

resetGallery(document.querySelector('.gallery__list'))

