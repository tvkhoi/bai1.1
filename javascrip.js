$(document).ready(function () {
    let images = $('.main__banner img');
    let currentIndex = 0;
    let dotsContainer = $('.main__banner__dots');

    for (let i = 0; i < images.length; i++) {
        let dot = $('<span class="dot"></span>');

        if (i === currentIndex) {
            dot.addClass('active');
        }

        dotsContainer.append(dot);
    }

    images.eq(currentIndex).show();
    images.not(':eq(' + currentIndex + ')').hide();

    $('.main__banner__btn.--right').click(function () {
        images.eq(currentIndex).hide();
        currentIndex = (currentIndex + 1) % images.length;
        images.eq(currentIndex).show().css({
            "opacity": 0
        }).animate({
            opacity: 1
        }, 500);
        dotsContainer.find('.dot').removeClass('active').eq(currentIndex).addClass('active');
    });
    $('.main__banner__btn.--left').click(function () {
        images.eq(currentIndex).hide();
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        images.eq(currentIndex).show();
        dotsContainer.find('.dot').removeClass('active').eq(currentIndex).addClass('active');
    });

    dotsContainer.find('.dot').click(function () {
        let index = $(this).index();
        images.eq(currentIndex).hide();
        currentIndex = index;
        images.eq(currentIndex).show();
        dotsContainer.find('.dot').removeClass('active').eq(currentIndex).addClass('active');
    });

    $('.main__banner').on('mouseenter', function () {
        $('.main__banner__btn').show();
    }).on('mouseleave', function () {
        $('.main__banner__btn').hide();
    });

    let touchStartX = 0;
    let touchEndX = 0;

    images.on('touchstart', function (e) {
        touchStartX = e.originalEvent.touches[0].clientX;
    });
    images.on('touchmove', function (e) {
        touchEndX = e.originalEvent.touches[0].clientX;
    });
    images.on('touchend', function (e) {
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            $('.main__banner__btn.--right').click();
        }
        if (touchEndX > touchStartX + 50) {
            $('.main__banner__btn.--left').click();
        }
    }

    images.mousedown(function (e) {
        e.preventDefault();
        touchStartX = e.clientX;
    });
    images.mousemove(function (e) {
        e.preventDefault();
        touchEndX = e.clientX;
    });
    images.mouseup(function (e) {
        e.preventDefault();
        handleSwipe();
    });



});