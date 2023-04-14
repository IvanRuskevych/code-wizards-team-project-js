// // (() => {
// //   function swiperSlider() {
// //     const heroMain = document.querySelectorAll('[data-slider="team-slider"]');
// //     if (heroMain) {
// //       heroMain.forEach(slider => {
// //         let pagination = slider.querySelector('.swiper-pagination');
// //         swiper = new Swiper(slider.querySelector('.swiper'), {
// //           speed: 3000,
// //           loop: true,
// //           centeredSlides: true,
// //           autoplay: {
// //             delay: 3000,
// //             disableOnInteraction: false,
// //           },
// //           slidesPerView: 1,
// //           spaceBetween: 20,
// //           pagination: {
// //             el: pagination,
// //             clickable: true,
// //             renderBullet: function (index, className) {
// //               return '<li class="' + className + '"></li>';
// //             },
// //           },
// //           on: {
// //             transitionStart: function () {
// //               let previousIndex = this.previousIndex;
// //               let previousSlide =
// //                 slider.getElementsByClassName('swiper-slide')[previousIndex];
// //               if (previousSlide) {
// //                 setTimeout(function () {
// //                   previousSlide.classList.remove('is-play');
// //                 }, 1000);
// //               }
// //             },
// //             transitionEnd: function () {
// //               let activeIndex = this.activeIndex;
// //               let activeSlide =
// //                 slider.getElementsByClassName('swiper-slide')[activeIndex];
// //               activeSlide.classList.add('is-play');
// //             },
// //           },
// //         });
// //       });
// //     }
// //   }
// //   window.addEventListener('load', swiperSlider, false);
// // })();

// let slideIndex = 1;
// showSlides(slideIndex);

// /* Увеличиваем индекс на 1 — показываем следующий слайд*/
// function nextSlide() {
//   showSlides((slideIndex += 1));
// }

// /* Уменьшает индекс на 1 — показываем предыдущий слайд*/
// function previousSlide() {
//   showSlides((slideIndex -= 1));
// }

// /* Устанавливаем текущий слайд */
// function currentSlide(n) {
//   showSlides((slideIndex = n));
// }

// /* Функция перелистывания */
// function showSlides(n) {
//   let i;
//   let slides = document.getElementsByClassName('item');

//   if (n > slides.length) {
//     slideIndex = 1;
//   }
//   if (n < 1) {
//     slideIndex = slides.length;
//   }

//   /* Проходим по каждому слайду в цикле for */
//   for (let slide of slides) {
//     slide.style.display = 'none';
//   }
//   slides[slideIndex - 1].style.display = 'block';
// }
