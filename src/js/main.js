//100vh мобайл
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
window.addEventListener('resize', () => {
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});
jQuery(document).ready(function ($){

});

document.querySelector('#mobile_menu_toggle').addEventListener('click',function (e) {
  e.preventDefault();
  this.classList.toggle('active');
  document.querySelector(".top__hamburger").classList.toggle('active');
  document.body.classList.toggle('hidden');
});
var masBasket = document.querySelectorAll('.js-home-page-latest-arrivals__basket');
for(let i=0; i<masBasket.length; i++){
  masBasket[i].addEventListener('click', function (e){
    e.preventDefault();
    this.classList.toggle('active');
  });
}


jQuery(($) => {
  $('.js-select').on('click', '.js-select__head', function () {
    if ($(this).hasClass('open')) {
      $(this).removeClass('open');
      $(this).next().fadeOut();
    } else {
      $('.js-select__head').removeClass('open');
      $('.js-select__list').fadeOut();
      $(this).addClass('open');
      $(this).next().fadeIn();
    }
  });

  $('.js-select').on('click', '.js-select__item', function () {
    $('.js-select__head').removeClass('open');
    $(this).parent().fadeOut();
    $(this).parent().prev().text($(this).text());
    $(this).parent().prev().prev().val($(this).text());
  });

  $(document).click(function (e) {
    if (!$(e.target).closest('.js-select').length) {
      $('.js-select__head').removeClass('open');
      $('.js-select__list').fadeOut();
    }
  });
});

$(document).ready(function() {
  $('.js-home-page-accordion-content .js-home-page-accordion-question').on('click', f_acc);
});

function f_acc(){
  $('.js-home-page-accordion-content .js-home-page-accordion-answer').not($(this).next()).hide(300);
  $('.js-home-page-accordion-content .js-home-page-accordion-question').removeClass('active');
  $(this).next().show(500);
  $(this).addClass('active');
}



var swiper1 = new Swiper(".js-home-page-content-left-slider", {
  slidesPerView: 1,
  autoplay: {
    delay: 3000,
  },
  // effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
  loop:true,
  pagination: {
    el: ".js-home-page-content-left-pagination",
  },
});
var swiper2 = new Swiper(".js-home-page-brands-slider", {
  slidesPerView: 'auto',
  spaceBetween: 48,
  breakpoints: {
    // when window width is >= 320px
    320: {
      spaceBetween: 15
    },
    // when window width is >= 480px
    480: {
      spaceBetween: 20
    },
    // when window width is >= 640px
    651: {
      spaceBetween: 25
    },
    // when window width is >= 640px
    1200: {
      spaceBetween: 48
    }
  },
  navigation: {
    nextEl: ".js-home-page-brands-next",
    prevEl: ".js-home-page-brands-prev",
  },
  pagination: {
    el: ".js-home-page-brands-pagination",
  },
  // mousewheel: true,
  // keyboard: true,
});