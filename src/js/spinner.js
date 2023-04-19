let mask = document.querySelector('.mask');

window.addEventListener('load', () => {
    mask.classList.add('hide')
    setTimeout(() => {
        mask.remove();
    }, 600)
});


// ==============================================================================================================
// import { refs } from './refs';

// export function spinnerPlay() {
//     refs.body.classList.add('loading');
// }

// export function spinnerStop() {
//     window.setTimeout(function () {
//         refs.body.classList.remove('loading');
//         refs.body.classList.add('loaded');
//     }, 1500);
// }
