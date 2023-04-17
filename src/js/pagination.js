import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import * as fetchAPITrends from './fetchAPITrends';
import axios from 'axios';

import { getAPITrend } from './fetchAPITrends';

// ================================================================================================================================

import { btnUp } from './scroll';
import { renderTrendCollection } from './fetchAPITrends';

const refs = {
  gallery: document.querySelector('.gallery-js'),
  pagination: document.querySelector('#pagination'),
  loader: document.querySelector('.loader'),
};

const TUI_VISIBLE_PAGES = 5;

export function createPagination(totalItems, visiblePages) {
  const options = {
    itemsPerPage: 20,
    totalItems: totalItems,
    visiblePages: visiblePages < 5 ? visiblePages : TUI_VISIBLE_PAGES,
  };

  const pagination = new Pagination(refs.pagination, options);

  if (visiblePages > 1) {
    refs.pagination.style.display = 'block';
  } else {
    refs.pagination.style.display = 'none';
  }

  return pagination;
}

// =======================================================================================================

function showHideLoader(element) {
  if (element.style.display === 'block') {
    element.style.display = 'none';
  } else {
    element.style.display = 'block';
  }
}
// =======================================================================================================

const galleryFilms = document.querySelector('.gallery-js');
showHideLoader(refs.loader);
getAPITrend().then(data => {
  showHideLoader(refs.loader);
  galleryFilms.insertAdjacentHTML(
    'beforeend',
    renderTrendCollection(data.page)
  );

  const pagination = createPagination(data.total_results, data.total_pages);
  pagination.on('beforeMove', ({ page }) => {
    refs.gallery.innerHTML = '';
    showHideLoader(refs.loader);
    getAPITrend(page).then(data => {
      showHideLoader(refs.loader);
      // console.log(data.results)
      refs.gallery.innerHTML = renderTrendCollection(data.page);
      // btnUp();
    });
  });
});
