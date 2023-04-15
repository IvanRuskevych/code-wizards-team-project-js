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
renderTrendCollection(pageState);
async function getAPIGenres(page) {
    const {data} = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=7c0c458e245909c66f3397c50f32766a&')
    return await data.genres;
}
// getAPIGenres().then(result => {
//  const { genres } = result;
//  return genres;
// })
// getAPITrend(pageState).then(data=> console.log(data))
function resetGallery(parent) {
    parent.innerHTML = '';
}
async function getGenres(genre, genresList) {
    // const dbFilms = await getAPITrend(pageState);
    // const { results } = dbFilms;
    
    return genresList.find(item => genre == item.id).name;
}


export function renderList(parent, collection, genreList) {
	
    const gallaryItem = collection.map(element => {


        return `
        <li class="gallery__item" data-id="${element.id}">
        <img src="https://image.tmdb.org/t/p/w500${element.poster_path}" alt="" class="gallery__item-img">
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
export async function renderTrendCollection(page) {
    const galleryList = document.querySelector('.gallery__list')
    resetGallery(galleryList)
	const collectionTrend = await getAPITrend(page);
	const genresArray = await getAPIGenres();
	await renderList(galleryList, collectionTrend.results)
}
