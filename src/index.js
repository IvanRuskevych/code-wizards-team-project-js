import './js/teamModal';

import './js/spinner';

import './js/scroll';

import './js/searchAPI';

import './js/modal';

import './js/swiper';

import './js/pagination';

import './js/library-get';

import './js/fetchAPITrends';
import { renderTrendCollection, pageState, resetGallery } from './js/fetchAPITrends';
import { btnMyLibraryRef, renderLibrary, getLibrary, markupMoviesFromLocalStorage, galleryListRef } from './js/library-get'

const homeBtn = document.querySelector('#home-button');
const logoLink = document.querySelector('.logo--link');
homeBtn.addEventListener('click', (e) => {
	e.preventDefault();
	renderTrendCollection(pageState)
	if (localStorage.getItem('active')) {
		active = JSON.parse(localStorage.getItem('active'))
	} else {
		active = false;
	}
	active = false;
	localStorage.setItem('active', JSON.stringify(active));
	
})
logoLink.addEventListener('click', (e) => {
	e.preventDefault()
	renderTrendCollection(pageState)
	if (localStorage.getItem('active')) {
		active = JSON.parse(localStorage.getItem('active'))
	} else {
		active = false;
	}
	active = false;
	localStorage.setItem('active', JSON.stringify(active));
})



const pagination = document.querySelector('#pagination');
document.querySelector('#library-button').addEventListener('click', () => {
	pagination.style.display = 'none';
});


let active;
// resetGallery(galleryListRef);
if (localStorage.getItem('active')) {
	active = JSON.parse(localStorage.getItem('active'))
} else {
	active = false;
}
console.log(active)
// btnMyLibraryRef.dataset.active = active;
// console.log(btnMyLibraryRef.dataset.active)

if (active) {
	resetGallery(document.querySelector('.gallery-js'))
	renderLibrary(document.querySelector('.gallery-js'), getLibrary(), 'watched')
	console.log('library')

} else {
	resetGallery(document.querySelector('.gallery-js'))
	renderTrendCollection(pageState)
	console.log('trend')

}


document.querySelector('#library-button').addEventListener('click', () => {
	console.log('click')
	active = true
	console.log(active)
	localStorage.setItem('active', JSON.stringify(active));
	// btnMyLibraryRef.dataset.active = !active
})

// рендер localStorage
// renderLibrary(document.querySelector('.gallery__item'), getLibrary(), 'watched')
// document.querySelector('.gallery-js').innerHTML = '';
// document.querySelector('.gallery__list').innerHTML = ''