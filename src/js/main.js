//100vh мобайл
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
window.addEventListener('resize', () => {
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});
jQuery(document).ready(function ($) {

});

document.querySelector('#mobile_menu_toggle').addEventListener('click', function (e) {
    e.preventDefault();
    this.classList.toggle('active');
    document.querySelector(".top__hamburger").classList.toggle('active');
    document.body.classList.toggle('hidden');
});
var masBasket = document.querySelectorAll('.js-home-page-latest-arrivals__basket');
for (let i = 0; i < masBasket.length; i++) {
    masBasket[i].addEventListener('click', function (e) {
        e.preventDefault();
        this.classList.toggle('active');
    });
}
if(document.querySelector('.js-filters-catalog')){
    var openPopupCatalogue = document.querySelector('.js-filters-catalog');
    openPopupCatalogue.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector('.js-filters-popup-catalogue').classList.toggle('active');
        document.body.classList.toggle('hidden');
    })
}


if(document.querySelector('.js-bg')) {

    document.querySelector('.js-bg').addEventListener('click', function () {
        document.querySelector('.js-catalogue-brand-popup').classList.remove('active');
        this.classList.remove('active');
        document.body.classList.remove('hidden');

    })
}

if(document.querySelector('.js-catalogue-brand-popup__cross')) {
    document.querySelector('.js-catalogue-brand-popup__cross').addEventListener('click', function () {
        document.querySelector('.js-catalogue-brand-popup').classList.remove('active');
        document.querySelector('.js-bg').classList.remove('active');
        document.body.classList.remove('hidden');

    })
}

//
if(document.querySelector('.js-card-page-top-info-buy__btn')) {

    document.querySelector('.js-card-page-top-info-buy__btn').addEventListener('click', function () {
        document.querySelector('.js-add-product-popup').classList.toggle('active');
        document.querySelector('.js-bg').classList.toggle('active');
        document.body.classList.toggle('hidden');
    })
}


if(document.querySelector('.js-bg')) {

    document.querySelector('.js-bg').addEventListener('click', function () {
        document.querySelector('.js-add-product-popup').classList.remove('active');
        this.classList.remove('active');
        document.body.classList.remove('hidden');

    })
}

if(document.querySelector('.js-add-product-popup__cross')) {
    document.querySelector('.js-add-product-popup__cross').addEventListener('click', function () {
        document.querySelector('.js-add-product-popup').classList.remove('active');
        document.querySelector('.js-bg').classList.remove('active');
        document.body.classList.remove('hidden');

    })
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

$(document).ready(function () {
    $('.js-home-page-accordion-content .js-home-page-accordion-question').on('click', f_acc);
});

function f_acc() {
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
    loop: true,
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

var swiper3 = new Swiper(".js-catalogue-category-seen-goods-slider", {
    slidesPerView: 1,
    autoplay: {
        delay: 3000,
    },
    freeMode: true,
    pagination: {
        el: ".js-catalogue-category-seen-goods-swiper-pagination",
        clickable: true,
    },
});

var swiper41 = new Swiper(".js-card-page-top-slider1", {
    spaceBetween: 16,
    slidesPerView: 5,
    freeMode: true,
    watchSlidesProgress: true,
    breakpoints: {
        // when window width is >= 320px
        320: {
            slidesPerView: 3,
        },

        651: {
            slidesPerView: 5,
        },
        // when window width is >= 640px

    },

});
var swiper42 = new Swiper(".js-card-page-top-slider2", {
    spaceBetween: 10,
    slidesPerView: 1,
    thumbs: {
        swiper: swiper41,
    },
});

var swiper5 = new Swiper(".js-card-page-seen-goods-slider", {
    slidesPerView: 3,
    spaceBetween: 23,
    breakpoints: {
        320: {
            slidesPerView: 1,
        },
        501: {
            slidesPerView: 2,
        },
        992: {
            slidesPerView: 3,
        },
    },
    // autoplay: {
    //   delay: 3000,
    // },
    freeMode: true,
    navigation: {
        nextEl: ".js-card-page-seen-goods__next",
        prevEl: ".js-card-page-seen-goods__prev",
    },
    pagination: {
        el: ".js-card-page-seen-goods-swiper-pagination",
        clickable: true,

    },
});

const counterFunction = function () {
    const buttonsCounter = document.querySelectorAll(".js-counter__btn");
    buttonsCounter.forEach(buttonCounter => {
        buttonCounter.addEventListener('click', function () {
            const counterDirection = this.dataset.direction;
            const counterInput = this.parentElement.querySelector('.js-counter__value');
            const currentInputValue = +counterInput.value;
            let inputNewValue;
            if (counterDirection === 'plus') {
                inputNewValue = currentInputValue + 1;
            } else {
                inputNewValue = currentInputValue - 1 > 0 ? currentInputValue - 1 : 0;
            }
            counterInput.value = inputNewValue;
        })
    })

}
counterFunction();

if(document.querySelector('.js-tabcontent')){
    function openTab(evt, nameTab) {
        var i, tabcontent, tablinks;

        tabcontent = document.getElementsByClassName("js-tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        tablinks = document.getElementsByClassName("js-tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        document.getElementById(nameTab).style.display = "block";
        evt.currentTarget.className += " active";
    }
}



